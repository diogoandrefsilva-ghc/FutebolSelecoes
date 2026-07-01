// Atualiza automaticamente data/odds do Mundial 2026 no repo AppDataJSON,
// a partir de odds reais (The Odds API). Corre agendado via
// .github/workflows/update-odds.yml.
//
// - Os "jogos por decidir" e as "equipas vivas" vêm de LIVE2026.oddsTargets(),
//   corrido num browser headless (Playwright) a partir do live2026.js real do
//   repo — evita duplicar a lógica do quadro/bracket aqui.
// - Formato de saída = o mesmo que o painel admin já publica (ver _parseOdds
//   em live2026.js): { updated, fonte, qualificacao:{ "M##":{Equipa:odd,...} }, campeao:{...} }

import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function requireEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Falta a variável de ambiente ${name}.`);
  return v;
}

const ODDS_API_KEY = requireEnv("ODDS_API_KEY");
const GH_TOKEN = requireEnv("ODDS_REPO_TOKEN");
const GH_OWNER = "diogoandrefsilva-ghc";
const GH_DATA_REPO = "AppDataJSON";
const GH_DATA_PATH = "futebol-selecoes-odds-data.json";
const ODDS_API_BASE = "https://api.the-odds-api.com/v4";

// nomes internos (iguais aos usados em live2026.js) -> variantes vistas em
// casas de apostas / providers de odds, para as conseguir emparelhar.
const ALIASES = {
  "South Korea": ["Korea Republic", "Korea"],
  "Bosnia & Herzegovina": ["Bosnia and Herzegovina", "Bosnia-Herzegovina"],
  USA: ["United States", "USA"],
  "Ivory Coast": ["Côte d'Ivoire", "Cote d'Ivoire", "Ivory Coast"],
  Netherlands: ["Holland"],
  Iran: ["IR Iran"],
  "Cape Verde": ["Cabo Verde"],
  "DR Congo": ["Congo DR", "DR Congo", "Congo (DR)", "DRC"],
  Czechia: ["Czech Republic"],
  Turkey: ["Türkiye", "Turkiye"],
  Curacao: ["Curaçao"],
};

function normalize(s) {
  return (s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

// normalizado -> nome interno
function buildLookup(teamNames) {
  const lookup = new Map();
  for (const name of teamNames) {
    lookup.set(normalize(name), name);
    for (const alt of ALIASES[name] || []) lookup.set(normalize(alt), name);
  }
  return lookup;
}

function resolveTeam(apiName, lookup) {
  return lookup.get(normalize(apiName)) || null;
}

async function getTargets() {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    // precisa de um <div id="knockout"> para o mount() correr (é o que despoleta o
    // fetch ao vivo da ESPN que tranca os jogos já terminados / decide os grupos J,K,L)
    await page.setContent('<!DOCTYPE html><html><body><div id="knockout"></div></body></html>');
    const script = readFileSync(path.join(__dirname, "..", "live2026.js"), "utf8");
    await page.addScriptTag({ content: script });
    await page.evaluate(() => window.LIVE2026.mount({}));
    // fetchLive/fetchStandings correm em segundo plano (não expostos como promise) — dá-lhes tempo
    await page.waitForTimeout(9000);
    return await page.evaluate(() => window.LIVE2026.oddsTargets());
  } finally {
    await browser.close();
  }
}

async function discoverSportKeys() {
  const r = await fetch(`${ODDS_API_BASE}/sports/?apiKey=${ODDS_API_KEY}&all=true`);
  if (!r.ok) throw new Error(`GET /sports falhou: ${r.status} ${await r.text()}`);
  const sports = await r.json();
  const wc = sports.filter((s) => /fifa world cup/i.test(s.title) || /fifa world cup/i.test(s.description || ""));
  const matchSport = wc.find((s) => !/winner/i.test(s.key));
  const winnerSport = wc.find((s) => /winner/i.test(s.key));
  return { matchSportKey: matchSport?.key || null, winnerSportKey: winnerSport?.key || null };
}

async function fetchOddsEvents(sportKey, markets) {
  const url = `${ODDS_API_BASE}/sports/${sportKey}/odds/?apiKey=${ODDS_API_KEY}&regions=eu,uk&markets=${markets}&oddsFormat=decimal`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`GET odds (${sportKey}) falhou: ${r.status} ${await r.text()}`);
  return r.json();
}

// preço médio (via probabilidade implícita) por nome de resultado, entre todas as casas
function consensusPrices(markets, marketKey) {
  const acc = new Map();
  for (const m of markets || []) {
    if (m.key !== marketKey) continue;
    for (const o of m.outcomes || []) {
      const arr = acc.get(o.name) || [];
      arr.push(o.price);
      acc.set(o.name, arr);
    }
  }
  const out = new Map();
  for (const [name, prices] of acc) {
    const avgProb = prices.reduce((s, p) => s + 1 / p, 0) / prices.length;
    out.set(name, 1 / avgProb);
  }
  return out;
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

function buildQualificacao(matches, events, lookup) {
  const out = {};
  for (const match of matches) {
    const game = events.find((g) => {
      const h = resolveTeam(g.home_team, lookup);
      const a = resolveTeam(g.away_team, lookup);
      return (h === match.home && a === match.away) || (h === match.away && a === match.home);
    });
    if (!game) {
      console.warn(`Sem odds para ${match.id} (${match.home} vs ${match.away}) — ignorado.`);
      continue;
    }
    const prices = new Map();
    for (const bk of game.bookmakers || []) {
      for (const [name, price] of consensusPrices(bk.markets, "h2h")) {
        const arr = prices.get(name) || [];
        arr.push(price);
        prices.set(name, arr);
      }
    }
    const avg = new Map([...prices].map(([name, arr]) => [name, arr.reduce((s, p) => s + p, 0) / arr.length]));
    const nameHome = game.home_team,
      nameAway = game.away_team;
    let pHome = avg.get(nameHome),
      pAway = avg.get(nameAway);
    if (!pHome || !pAway) continue;
    if (avg.has("Draw")) {
      // mercado a 3 vias (inclui empate) -> remove o empate e reparte entre as 2 equipas
      const invH = 1 / pHome,
        invA = 1 / pAway,
        sum = invH + invA;
      pHome = 1 / (invH / sum);
      pAway = 1 / (invA / sum);
    }
    out[match.id] = { [match.home]: round2(pHome), [match.away]: round2(pAway) };
  }
  return out;
}

function buildCampeao(alive, events, lookup) {
  const acc = new Map();
  for (const ev of events) {
    for (const bk of ev.bookmakers || []) {
      for (const [name, price] of consensusPrices(bk.markets, "outrights")) {
        const internal = resolveTeam(name, lookup);
        if (!internal) continue;
        const arr = acc.get(internal) || [];
        arr.push(price);
        acc.set(internal, arr);
      }
    }
  }
  const aliveNames = new Set(alive.map((t) => t.name));
  const out = {};
  for (const [name, prices] of acc) {
    if (!aliveNames.has(name)) continue;
    out[name] = round2(prices.reduce((s, p) => s + p, 0) / prices.length);
  }
  return out;
}

async function publish(raw) {
  const api = `https://api.github.com/repos/${GH_OWNER}/${GH_DATA_REPO}/contents/${GH_DATA_PATH}`;
  const hdr = {
    Authorization: "Bearer " + GH_TOKEN,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  let sha = null;
  const g = await fetch(api + "?t=" + Date.now(), { headers: hdr, cache: "no-store" });
  if (g.status === 200) sha = (await g.json()).sha;
  else if (g.status !== 404) throw new Error(`GET conteúdo atual falhou: ${g.status} ${await g.text()}`);

  const pretty = JSON.stringify(raw, null, 2);
  const body = {
    message: `Atualiza odds (auto${raw.updated ? " — " + raw.updated : ""})`,
    content: Buffer.from(pretty, "utf8").toString("base64"),
  };
  if (sha) body.sha = sha;
  const r = await fetch(api, { method: "PUT", headers: hdr, body: JSON.stringify(body) });
  if (!r.ok) throw new Error(`PUT falhou: ${r.status} ${await r.text()}`);
  console.log("Publicado no GitHub (AppDataJSON) ✓");
}

async function main() {
  const { matches, alive } = await getTargets();
  console.log(`${matches.length} jogo(s) por decidir · ${alive.length} equipa(s) viva(s).`);

  const teamNames = alive.map((t) => t.name).concat(matches.flatMap((m) => [m.home, m.away]));
  const lookup = buildLookup(teamNames);

  const { matchSportKey, winnerSportKey } = await discoverSportKeys();
  if (!matchSportKey) console.warn("Não encontrei o sport key de jogos do Mundial na The Odds API.");
  if (!winnerSportKey) console.warn("Não encontrei o sport key de vencedor do Mundial na The Odds API.");

  const qualificacao = matchSportKey ? buildQualificacao(matches, await fetchOddsEvents(matchSportKey, "h2h"), lookup) : {};
  const campeao = winnerSportKey ? buildCampeao(alive, await fetchOddsEvents(winnerSportKey, "outrights"), lookup) : {};

  if (!Object.keys(qualificacao).length && !Object.keys(campeao).length) {
    console.warn("Sem odds novas encontradas — não publico (evita apagar dados válidos).");
    return;
  }

  const raw = {
    updated: new Date().toISOString().replace("T", " ").slice(0, 16) + " UTC",
    fonte: "The Odds API (automático)",
    qualificacao,
    campeao,
  };
  await publish(raw);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
