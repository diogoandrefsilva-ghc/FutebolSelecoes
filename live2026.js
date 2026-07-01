/* live2026.js — motor 'em curso' do Mundial 2026 (Anexo C, quadro interativo,
   simulação Monte Carlo do percurso e live ESPN). Portado do simulador original
   e isolado num IIFE; o hub chama window.LIVE2026 só para edições status:"live". */
(function(){
"use strict";



/* ===================== DADOS ===================== */
const ANNEXE_VALS = ["EJIFHGLK","HGIDJFLK","EJIDHGLK","EJIDHFLK","EGIDJFLK","EGJDHFLK","EGIDHFLK","EGJDHFLI","EGJDHFIK","HGICJFLK","EJICHGLK","EJICHFLK","EGICJFLK","EGJCHFLK","EGICHFLK","EGJCHFLI","EGJCHFIK","HGICJDLK","CJIDHFLK","CGIDJFLK","CGJDHFLK","CGIDHFLK","CGJDHFLI","CGJDHFIK","EJICHDLK","EGICJDLK","EGJCHDLK","EGICHDLK","EGJCHDLI","EGJCHDIK","CJEDIFLK","CJEDHFLK","CEIDHFLK","CJEDHFLI","CJEDHFIK","CGEDJFLK","CGEDIFLK","CGEDJFLI","CGEDJFIK","CGEDHFLK","CGJDHFLE","CGJDHFEK","CGEDHFLI","CGEDHFIK","CGJDHFEI","HJBFIGLK","EJIBHGLK","EJBFIHLK","EJBFIGLK","EJBFHGLK","EGBFIHLK","EJBFHGLI","EJBFHGIK","HJBDIGLK","HJBDIFLK","IGBDJFLK","HGBDJFLK","HGBDIFLK","HGBDJFLI","HGBDJFIK","EJBDIHLK","EJBDIGLK","EJBDHGLK","EGBDIHLK","EJBDHGLI","EJBDHGIK","EJBDIFLK","EJBDHFLK","EIBDHFLK","EJBDHFLI","EJBDHFIK","EGBDJFLK","EGBDIFLK","EGBDJFLI","EGBDJFIK","EGBDHFLK","HGBDJFLE","HGBDJFEK","EGBDHFLI","EGBDHFIK","HGBDJFEI","HJBCIGLK","HJBCIFLK","IGBCJFLK","HGBCJFLK","HGBCIFLK","HGBCJFLI","HGBCJFIK","EJBCIHLK","EJBCIGLK","EJBCHGLK","EGBCIHLK","EJBCHGLI","EJBCHGIK","EJBCIFLK","EJBCHFLK","EIBCHFLK","EJBCHFLI","EJBCHFIK","EGBCJFLK","EGBCIFLK","EGBCJFLI","EGBCJFIK","EGBCHFLK","HGBCJFLE","HGBCJFEK","EGBCHFLI","EGBCHFIK","HGBCJFEI","HJBCIDLK","IGBCJDLK","HGBCJDLK","HGBCIDLK","HGBCJDLI","HGBCJDIK","CJBDIFLK","CJBDHFLK","CIBDHFLK","CJBDHFLI","CJBDHFIK","CGBDJFLK","CGBDIFLK","CGBDJFLI","CGBDJFIK","CGBDHFLK","CGBDHFLJ","HGBCJFDK","CGBDHFLI","CGBDHFIK","HGBCJFDI","EJBCIDLK","EJBCHDLK","EIBCHDLK","EJBCHDLI","EJBCHDIK","EGBCJDLK","EGBCIDLK","EGBCJDLI","EGBCJDIK","EGBCHDLK","HGBCJDLE","HGBCJDEK","EGBCHDLI","EGBCHDIK","HGBCJDEI","CJBDEFLK","CEBDIFLK","CJBDEFLI","CJBDEFIK","CEBDHFLK","CJBDHFLE","CJBDHFEK","CEBDHFLI","CEBDHFIK","CJBDHFEI","CGBDEFLK","CGBDJFLE","CGBDJFEK","CGBDEFLI","CGBDEFIK","CGBDJFEI","CGBDHFLE","CGBDHFEK","HGBCJFDE","CGBDHFEI","HJIFAGLK","EJIAHGLK","EJIFAHLK","EJIFAGLK","EGJFAHLK","EGIFAHLK","EGJFAHLI","EGJFAHIK","HJIDAGLK","HJIDAFLK","IGJDAFLK","HGJDAFLK","HGIDAFLK","HGJDAFLI","HGJDAFIK","EJIDAHLK","EJIDAGLK","EGJDAHLK","EGIDAHLK","EGJDAHLI","EGJDAHIK","EJIDAFLK","HJEDAFLK","HEIDAFLK","HJEDAFLI","HJEDAFIK","EGJDAFLK","EGIDAFLK","EGJDAFLI","EGJDAFIK","HGEDAFLK","HGJDAFLE","HGJDAFEK","HGEDAFLI","HGEDAFIK","HGJDAFEI","HJICAGLK","HJICAFLK","IGJCAFLK","HGJCAFLK","HGICAFLK","HGJCAFLI","HGJCAFIK","EJICAHLK","EJICAGLK","EGJCAHLK","EGICAHLK","EGJCAHLI","EGJCAHIK","EJICAFLK","HJECAFLK","HEICAFLK","HJECAFLI","HJECAFIK","EGJCAFLK","EGICAFLK","EGJCAFLI","EGJCAFIK","HGECAFLK","HGJCAFLE","HGJCAFEK","HGECAFLI","HGECAFIK","HGJCAFEI","HJICADLK","IGJCADLK","HGJCADLK","HGICADLK","HGJCADLI","HGJCADIK","CJIDAFLK","HJFCADLK","HFICADLK","HJFCADLI","HJFCADIK","CGJDAFLK","CGIDAFLK","CGJDAFLI","CGJDAFIK","HGFCADLK","CGJDAFLH","HGJCAFDK","HGFCADLI","HGFCADIK","HGJCAFDI","EJICADLK","HJECADLK","HEICADLK","HJECADLI","HJECADIK","EGJCADLK","EGICADLK","EGJCADLI","EGJCADIK","HGECADLK","HGJCADLE","HGJCADEK","HGECADLI","HGECADIK","HGJCADEI","CJEDAFLK","CEIDAFLK","CJEDAFLI","CJEDAFIK","HEFCADLK","HJFCADLE","HJECAFDK","HEFCADLI","HEFCADIK","HJECAFDI","CGEDAFLK","CGJDAFLE","CGJDAFEK","CGEDAFLI","CGEDAFIK","CGJDAFEI","HGFCADLE","HGECAFDK","HGJCAFDE","HGECAFDI","HJBAIGLK","HJBAIFLK","IJBFAGLK","HJBFAGLK","HGBAIFLK","HJBFAGLI","HJBFAGIK","EJBAIHLK","EJBAIGLK","EJBAHGLK","EGBAIHLK","EJBAHGLI","EJBAHGIK","EJBAIFLK","EJBFAHLK","EIBFAHLK","EJBFAHLI","EJBFAHIK","EJBFAGLK","EGBAIFLK","EJBFAGLI","EJBFAGIK","EGBFAHLK","HJBFAGLE","HJBFAGEK","EGBFAHLI","EGBFAHIK","HJBFAGEI","IJBDAHLK","IJBDAGLK","HJBDAGLK","IGBDAHLK","HJBDAGLI","HJBDAGIK","IJBDAFLK","HJBDAFLK","HIBDAFLK","HJBDAFLI","HJBDAFIK","FJBDAGLK","IGBDAFLK","FJBDAGLI","FJBDAGIK","HGBDAFLK","HGBDAFLJ","HGBDAFJK","HGBDAFLI","HGBDAFIK","HGBDAFIJ","EJBAIDLK","EJBDAHLK","EIBDAHLK","EJBDAHLI","EJBDAHIK","EJBDAGLK","EGBAIDLK","EJBDAGLI","EJBDAGIK","EGBDAHLK","HJBDAGLE","HJBDAGEK","EGBDAHLI","EGBDAHIK","HJBDAGEI","EJBDAFLK","EIBDAFLK","EJBDAFLI","EJBDAFIK","HEBDAFLK","HJBDAFLE","HJBDAFEK","HEBDAFLI","HEBDAFIK","HJBDAFEI","EGBDAFLK","EGBDAFLJ","EGBDAFJK","EGBDAFLI","EGBDAFIK","EGBDAFIJ","HGBDAFLE","HGBDAFEK","HGBDAFEJ","HGBDAFEI","IJBCAHLK","IJBCAGLK","HJBCAGLK","IGBCAHLK","HJBCAGLI","HJBCAGIK","IJBCAFLK","HJBCAFLK","HIBCAFLK","HJBCAFLI","HJBCAFIK","CJBFAGLK","IGBCAFLK","CJBFAGLI","CJBFAGIK","HGBCAFLK","HGBCAFLJ","HGBCAFJK","HGBCAFLI","HGBCAFIK","HGBCAFIJ","EJBAICLK","EJBCAHLK","EIBCAHLK","EJBCAHLI","EJBCAHIK","EJBCAGLK","EGBAICLK","EJBCAGLI","EJBCAGIK","EGBCAHLK","HJBCAGLE","HJBCAGEK","EGBCAHLI","EGBCAHIK","HJBCAGEI","EJBCAFLK","EIBCAFLK","EJBCAFLI","EJBCAFIK","HEBCAFLK","HJBCAFLE","HJBCAFEK","HEBCAFLI","HEBCAFIK","HJBCAFEI","EGBCAFLK","EGBCAFLJ","EGBCAFJK","EGBCAFLI","EGBCAFIK","EGBCAFIJ","HGBCAFLE","HGBCAFEK","HGBCAFEJ","HGBCAFEI","IJBCADLK","HJBCADLK","HIBCADLK","HJBCADLI","HJBCADIK","CJBDAGLK","IGBCADLK","CJBDAGLI","CJBDAGIK","HGBCADLK","HGBCADLJ","HGBCADJK","HGBCADLI","HGBCADIK","HGBCADIJ","CJBDAFLK","CIBDAFLK","CJBDAFLI","CJBDAFIK","HFBCADLK","CJBDAFLH","HJBCAFDK","HFBCADLI","HFBCADIK","HJBCAFDI","CGBDAFLK","CGBDAFLJ","CGBDAFJK","CGBDAFLI","CGBDAFIK","CGBDAFIJ","CGBDAFLH","HGBCAFDK","HGBCAFDJ","HGBCAFDI","EJBCADLK","EIBCADLK","EJBCADLI","EJBCADIK","HEBCADLK","HJBCADLE","HJBCADEK","HEBCADLI","HEBCADIK","HJBCADEI","EGBCADLK","EGBCADLJ","EGBCADJK","EGBCADLI","EGBCADIK","EGBCADIJ","HGBCADLE","HGBCADEK","HGBCADEJ","HGBCADEI","CEBDAFLK","CJBDAFLE","CJBDAFEK","CEBDAFLI","CEBDAFIK","CJBDAFEI","HFBCADLE","HEBCAFDK","HJBCAFDE","HEBCAFDI","CGBDAFLE","CGBDAFEK","CGBDAFEJ","CGBDAFEI","HGBCAFDE"];
const ANNEXE = {}; for(const v of ANNEXE_VALS) ANNEXE[v.split("").sort().join("")] = v;

const T = {
  "Mexico":["México","🇲🇽"],"South Africa":["África do Sul","🇿🇦"],"South Korea":["Coreia do Sul","🇰🇷"],
  "Switzerland":["Suíça","🇨🇭"],"Canada":["Canadá","🇨🇦"],"Bosnia & Herzegovina":["Bósnia e Herz.","🇧🇦"],
  "Brazil":["Brasil","🇧🇷"],"Morocco":["Marrocos","🇲🇦"],"Scotland":["Escócia","🏴󠁧󠁢󠁳󠁣󠁴󠁿"],
  "USA":["Estados Unidos","🇺🇸"],"Australia":["Austrália","🇦🇺"],"Paraguay":["Paraguai","🇵🇾"],
  "Germany":["Alemanha","🇩🇪"],"Ivory Coast":["Costa do Marfim","🇨🇮"],"Ecuador":["Equador","🇪🇨"],
  "Netherlands":["Países Baixos","🇳🇱"],"Japan":["Japão","🇯🇵"],"Sweden":["Suécia","🇸🇪"],
  "Belgium":["Bélgica","🇧🇪"],"Egypt":["Egito","🇪🇬"],"Iran":["Irão","🇮🇷"],
  "Spain":["Espanha","🇪🇸"],"Cape Verde":["Cabo Verde","🇨🇻"],"Uruguay":["Uruguai","🇺🇾"],
  "France":["França","🇫🇷"],"Norway":["Noruega","🇳🇴"],"Senegal":["Senegal","🇸🇳"],
  "Argentina":["Argentina","🇦🇷"],"Austria":["Áustria","🇦🇹"],"Algeria":["Argélia","🇩🇿"],"Jordan":["Jordânia","🇯🇴"],
  "Colombia":["Colômbia","🇨🇴"],"Portugal":["Portugal","🇵🇹"],"DR Congo":["RD Congo","🇨🇩"],"Uzbekistan":["Usbequistão","🇺🇿"],
  "England":["Inglaterra","🏴󠁧󠁢󠁥󠁮󠁧󠁿"],"Ghana":["Gana","🇬🇭"],"Croatia":["Croácia","🇭🇷"],"Panama":["Panamá","🇵🇦"],
  "Czechia":["Chéquia","🇨🇿"],"Qatar":["Catar","🇶🇦"],"Haiti":["Haiti","🇭🇹"],"Turkey":["Turquia","🇹🇷"],
  "Curacao":["Curaçao","🇨🇼"],"Tunisia":["Tunísia","🇹🇳"],"New Zealand":["Nova Zelândia","🇳🇿"],
  "Saudi Arabia":["Arábia Saudita","🇸🇦"],"Iraq":["Iraque","🇮🇶"]
};
const pt = n => (T[n]?T[n][0]:n);
const fl = n => (T[n]?T[n][1]:"🏳️");
const POR = "Portugal";

const FIFA={}; ["Spain","Argentina","France","England","Brazil","Netherlands","Portugal","Belgium","Germany","Croatia",
 "Morocco","Colombia","Uruguay","USA","Mexico","Senegal","Japan","Switzerland","Iran","Ecuador",
 "South Korea","Austria","Sweden","Norway","Australia","Egypt","Canada","Ivory Coast","Panama","Algeria",
 "Ghana","Cape Verde","South Africa","DR Congo","Bosnia & Herzegovina","Scotland","Paraguay","Uzbekistan","Jordan"]
 .forEach((t,i)=>FIFA[t]=i+1);
const frank=t=>FIFA[t]??999;

const FIXED={
  A:{w:"Mexico",r:"South Africa",t:"South Korea",ts:{pts:3,gd:-1,gf:2}},
  B:{w:"Switzerland",r:"Canada",t:"Bosnia & Herzegovina",ts:{pts:4,gd:-1,gf:5}},
  C:{w:"Brazil",r:"Morocco",t:"Scotland",ts:{pts:3,gd:-3,gf:1}},
  D:{w:"USA",r:"Australia",t:"Paraguay",ts:{pts:4,gd:-2,gf:2}},
  E:{w:"Germany",r:"Ivory Coast",t:"Ecuador",ts:{pts:4,gd:0,gf:2}},
  F:{w:"Netherlands",r:"Japan",t:"Sweden",ts:{pts:4,gd:0,gf:7}},
  G:{w:"Belgium",r:"Egypt",t:"Iran",ts:{pts:3,gd:0,gf:3}},
  H:{w:"Spain",r:"Cape Verde",t:"Uruguay",ts:{pts:2,gd:-1,gf:3}},
  I:{w:"France",r:"Norway",t:"Senegal",ts:{pts:3,gd:2,gf:8}}
};

const GROUPS={
  J:{teams:["Argentina","Austria","Algeria","Jordan"],
     fixed:[["Argentina","Algeria",3,0],["Austria","Jordan",3,1],["Argentina","Austria",2,0],["Algeria","Jordan",2,1]],
     rem:[["Algeria","Austria"],["Jordan","Argentina"]]},
  K:{teams:["Colombia","Portugal","DR Congo","Uzbekistan"],
     fixed:[["Colombia","Uzbekistan",3,1],["Portugal","DR Congo",1,1],["Colombia","DR Congo",1,0],["Portugal","Uzbekistan",5,0]],
     rem:[["Colombia","Portugal"],["DR Congo","Uzbekistan"]]},
  L:{teams:["England","Ghana","Croatia","Panama"],
     fixed:[["England","Croatia",4,2],["Ghana","Panama",1,0],["England","Ghana",0,0],["Croatia","Panama",1,0]],
     rem:[["Panama","England"],["Croatia","Ghana"]]}
};
// resultados reais dos jogos da 3.ª jornada de J/K/L (fase de grupos concluída)
const DEFAULT={ J:[[3,3],[1,3]], K:[[0,0],[3,1]], L:[[0,2],[2,1]] };

/* ===================== MOTOR ===================== */
function statsOf(names, matches){
  const s={}; names.forEach(n=>s[n]={pts:0,w:0,d:0,l:0,gf:0,ga:0,gd:0});
  for(const m of matches){ const h=m[0],a=m[1],hg=m[2],ag=m[3];
    if(hg==null||ag==null) continue; if(!s[h]||!s[a]) continue;
    s[h].gf+=hg; s[h].ga+=ag; s[a].gf+=ag; s[a].ga+=hg;
    if(hg>ag){s[h].pts+=3;s[h].w++;s[a].l++;}
    else if(hg<ag){s[a].pts+=3;s[a].w++;s[h].l++;}
    else {s[h].pts++;s[a].pts++;s[h].d++;s[a].d++;} }
  names.forEach(n=>s[n].gd=s[n].gf-s[n].ga);
  return s;
}
function h2hStats(group, all){ return statsOf(group, all.filter(m=>group.includes(m[0])&&group.includes(m[1]))); }
function cmpH2H(a,b,M){ return M[b].pts-M[a].pts || M[b].gd-M[a].gd || M[b].gf-M[a].gf; }
function clusterByH2H(group,M){
  const s=[...group].sort((a,b)=>cmpH2H(a,b,M)); const cl=[]; let i=0;
  while(i<s.length){ let j=i;
    while(j<s.length && M[s[j]].pts===M[s[i]].pts && M[s[j]].gd===M[s[i]].gd && M[s[j]].gf===M[s[i]].gf) j++;
    cl.push(s.slice(i,j)); i=j; }
  return cl;
}
function breakTie(tied, all, overall){
  const M=h2hStats(tied, all); const clusters=clusterByH2H(tied,M); const out=[];
  for(const c of clusters){
    if(c.length===1){ out.push(c[0]); continue; }
    const M2=h2hStats(c, all); const cl2=clusterByH2H(c,M2);
    if(cl2.length===c.length){ out.push(...[...c].sort((a,b)=>cmpH2H(a,b,M2))); }
    else { out.push(...[...c].sort((a,b)=>
      overall[b].gd-overall[a].gd || overall[b].gf-overall[a].gf || frank(a)-frank(b))); }
  }
  return out;
}
function rankGroup(g, remScores){
  const all=[...g.fixed, g.rem[0].concat(remScores[0]), g.rem[1].concat(remScores[1])];
  const S=statsOf(g.teams, all);
  const order=[...g.teams].sort((x,y)=>S[y].pts-S[x].pts);
  const out=[]; let i=0;
  while(i<order.length){
    let j=i; while(j<order.length && S[order[j]].pts===S[order[i]].pts) j++;
    const tied=order.slice(i,j);
    if(tied.length===1) out.push(tied[0]); else out.push(...breakTie(tied, all, S));
    i=j;
  }
  return {order:out, stats:S};
}
function thirdsRanking(jkl){
  const arr=[];
  for(const G of "ABCDEFGHI".split("")) arr.push({grp:G, name:FIXED[G].t, pts:FIXED[G].ts.pts, gd:FIXED[G].ts.gd, gf:FIXED[G].ts.gf});
  for(const G of "JKL".split("")) arr.push({grp:G, name:jkl[G].name, pts:jkl[G].pts, gd:jkl[G].gd, gf:jkl[G].gf});
  arr.sort((a,b)=> b.pts-a.pts || b.gd-a.gd || b.gf-a.gf || frank(a.name)-frank(b.name));
  return arr;
}

/* ============ ESTRUTURA DO QUADRO ============ */
const SLOT_LETTERS=["A","B","D","E","G","I","K","L"];           // 1.º class. que recebe um 3.º, na ordem do Anexo C
const SLOT_MATCH  =["M79","M85","M81","M74","M82","M77","M87","M80"]; // jogo correspondente
const R32DEF={
  M73:["RU:A","RU:B"],M74:["W:E","T:1E"],M75:["W:F","RU:C"],M76:["W:C","RU:F"],
  M77:["W:I","T:1I"],M78:["RU:E","RU:I"],M79:["W:A","T:1A"],M80:["W:L","T:1L"],
  M81:["W:D","T:1D"],M82:["W:G","T:1G"],M83:["RU:K","RU:L"],M84:["W:H","RU:J"],
  M85:["W:B","T:1B"],M86:["W:J","RU:H"],M87:["W:K","T:1K"],M88:["RU:D","RU:G"]
};
const LATERDEF={
  M89:["win:M74","win:M77"],M90:["win:M73","win:M75"],M91:["win:M76","win:M78"],M92:["win:M79","win:M80"],
  M93:["win:M83","win:M84"],M94:["win:M81","win:M82"],M95:["win:M86","win:M88"],M96:["win:M85","win:M87"],
  M97:["win:M89","win:M90"],M98:["win:M93","win:M94"],M99:["win:M91","win:M92"],M100:["win:M95","win:M96"],
  M101:["win:M97","win:M98"],M102:["win:M99","win:M100"],
  M103:["lose:M101","lose:M102"],M104:["win:M101","win:M102"]
};
const ALLDEF={...R32DEF,...LATERDEF};
const CHILDREN={};
for(const id in LATERDEF){ for(const s of LATERDEF[id]){ const p=s.split(":"); if(p[0]==="win"||p[0]==="lose"){ (CHILDREN[p[1]]=CHILDREN[p[1]]||[]).push(id);} } }

const ROUNDS=[
  {name:"16-avos de final", sub:"32 equipas → 16", ids:["M73","M74","M75","M76","M77","M78","M79","M80","M81","M82","M83","M84","M85","M86","M87","M88"], two:true},
  {name:"Oitavos de final", sub:"16 → 8", ids:["M89","M90","M91","M92","M93","M94","M95","M96"], two:true},
  {name:"Quartos de final", sub:"8 → 4", ids:["M97","M98","M99","M100"], two:true},
  {name:"Meias-finais", sub:"4 → 2", ids:["M101","M102"], two:true},
  {name:"Final & 3.º/4.º lugar", sub:"o título em jogo", ids:["M104","M103"], two:true}
];

/* ============ 4.º CLASSIFICADOS + CLASSIFICAÇÕES FINAIS A–I (fonte de recurso) ============ */
// Os grupos A–I já estavam fechados; J/K/L são calculados pelo motor a partir do live.
// AI_TABLE é a classificação final (ordem 1→4) usada quando o ESPN não está acessível;
// o live do ESPN completa/atualiza golos marcados/sofridos quando disponível.
const FOURTH={A:"Czechia",B:"Qatar",C:"Haiti",D:"Turkey",E:"Curacao",F:"Tunisia",G:"New Zealand",H:"Saudi Arabia",I:"Iraq"};
const AI_TABLE={
  A:[["Mexico",9,6],["South Africa",4,-1],["South Korea",3,-1,2,3],["Czechia",1,-4]],
  B:[["Switzerland",7,4],["Canada",4,5],["Bosnia & Herzegovina",4,-1,5,6],["Qatar",1,-8]],
  C:[["Brazil",7,6],["Morocco",7,3],["Scotland",3,-3,1,4],["Haiti",0,-6]],
  D:[["USA",6,4,8,4],["Australia",4,0,2,2],["Paraguay",4,-2,2,4],["Turkey",3,-2,3,5]],
  E:[["Germany",6,7],["Ivory Coast",6,null],["Ecuador",4,0,2,2],["Curacao",null,null]],
  F:[["Netherlands",7,6,10,4],["Japan",5,4,7,3],["Sweden",4,0,7,7],["Tunisia",0,-10,2,12]],
  G:[["Belgium",5,3],["Egypt",5,2],["Iran",3,0,3,3],["New Zealand",1,-5]],
  H:[["Spain",7,5],["Cape Verde",3,0],["Uruguay",2,-1,3,4],["Saudi Arabia",1,-4]],
  I:[["France",9,8],["Norway",null,null],["Senegal",3,2,8,6],["Iraq",null,null]]
};
// V/E/D a partir dos pontos (e DG para desfazer o caso ambíguo de 3 pts)
function wdlFromPts(pts,gd){
  const m={9:[3,0,0],7:[2,1,0],6:[2,0,1],5:[1,2,0],4:[1,1,1],2:[0,2,1],1:[0,1,2],0:[0,0,3]};
  if(pts in m) return m[pts];
  if(pts===3) return (gd!=null&&gd!==0)?[1,0,2]:null;   // 3 pts com DG=0 é ambíguo (1V2D vs 3E)
  return null;
}
// Classificação final de um grupo (A–L) já com golos do live, se houver -> [{team,w,d,l,gf,ga,gd,pts}]
let STANDINGS=null;   // {A:[{team,...}],...} vindo do ESPN; null até sincronizar
function groupTable(G){
  if("JKL".includes(G)){
    const r=CUR.res[G];
    return r.order.map(t=>{ const s=r.stats[t]; return {team:t,w:s.w,d:s.d,l:s.l,gf:s.gf,ga:s.ga,gd:s.gd,pts:s.pts}; });
  }
  const live=STANDINGS&&STANDINGS[G];
  return AI_TABLE[G].map((row,i)=>{
    const [team,pts,gd,gf,ga]=row;
    const lv=live&&live.find(x=>x.team===team);
    if(lv) return lv;
    const wdl=wdlFromPts(pts,gd);
    return {team, w:wdl?wdl[0]:null, d:wdl?wdl[1]:null, l:wdl?wdl[2]:null,
            gf:gf??null, ga:ga??(gf!=null&&gd!=null?gf-gd:null), gd:gd??null, pts:pts??null};
  });
}
// Posição (1..4) e registo de uma equipa no seu grupo
function groupOf(team){
  for(const G of "ABCDEFGHI".split("")){ if([FIXED[G].w,FIXED[G].r,FIXED[G].t,FOURTH[G]].includes(team)) return G; }
  for(const G of "JKL".split(""))      { if(GROUPS[G].teams.includes(team)) return G; }
  return null;
}
function teamGroupResult(team){
  const G=groupOf(team); if(!G) return null;
  const tbl=groupTable(G); const pos=tbl.findIndex(r=>r.team===team);
  return {group:G, pos:pos+1, row:tbl[pos]};
}

/* ============ CALENDÁRIO DO MATA-ELIMINATÓRIAS (oficial FIFA 2026) ============ */
const SCHED={
  M73:{d:"2026-06-28",t:"15:00 ET",v:"SoFi Stadium",c:"Los Angeles"},        M74:{d:"2026-06-29",t:"16:30 ET",v:"Gillette Stadium",c:"Boston"},
  M75:{d:"2026-06-29",t:"21:00 ET",v:"Estádio BBVA",c:"Monterrey"},          M76:{d:"2026-06-29",t:"13:00 ET",v:"NRG Stadium",c:"Houston"},
  M77:{d:"2026-06-30",t:"17:00 ET",v:"MetLife Stadium",c:"Nova Iorque/NJ"},  M78:{d:"2026-06-30",t:"13:00 ET",v:"AT&T Stadium",c:"Dallas"},
  M79:{d:"2026-06-30",t:"21:00 ET",v:"Estádio Azteca",c:"Cidade do México"}, M80:{d:"2026-07-01",t:"12:00 ET",v:"Mercedes-Benz Stadium",c:"Atlanta"},
  M81:{d:"2026-07-01",t:"20:00 ET",v:"Levi's Stadium",c:"São Francisco"},    M82:{d:"2026-07-01",t:"16:00 ET",v:"Lumen Field",c:"Seattle"},
  M83:{d:"2026-07-02",t:"19:00 ET",v:"BMO Field",c:"Toronto"},               M84:{d:"2026-07-02",t:"15:00 ET",v:"SoFi Stadium",c:"Los Angeles"},
  M85:{d:"2026-07-02",t:"23:00 ET",v:"BC Place",c:"Vancouver"},              M86:{d:"2026-07-03",t:"18:00 ET",v:"Hard Rock Stadium",c:"Miami"},
  M87:{d:"2026-07-03",t:"21:30 ET",v:"Arrowhead Stadium",c:"Kansas City"},   M88:{d:"2026-07-03",t:"14:00 ET",v:"AT&T Stadium",c:"Dallas"},
  M89:{d:"2026-07-04",t:"17:00 ET",v:"Lincoln Financial Field",c:"Filadélfia"},
  M90:{d:"2026-07-04",t:"13:00 ET",v:"NRG Stadium",c:"Houston"},
  M91:{d:"2026-07-05",t:"16:00 ET",v:"MetLife Stadium",c:"Nova Iorque/NJ"},
  M92:{d:"2026-07-05",t:"20:00 ET",v:"Estádio Azteca",c:"Cidade do México"},
  M93:{d:"2026-07-06",t:"15:00 ET",v:"AT&T Stadium",c:"Dallas"},
  M94:{d:"2026-07-06",t:"20:00 ET",v:"Lumen Field",c:"Seattle"},
  M95:{d:"2026-07-07",t:"12:00 ET",v:"Mercedes-Benz Stadium",c:"Atlanta"},
  M96:{d:"2026-07-07",t:"16:00 ET",v:"BC Place",c:"Vancouver"},
  M97:{d:"2026-07-09",v:"Gillette Stadium",c:"Boston"},         M98:{d:"2026-07-10",v:"SoFi Stadium",c:"Los Angeles"},
  M99:{d:"2026-07-11",v:"Arrowhead Stadium",c:"Kansas City"},   M100:{d:"2026-07-11",v:"Hard Rock Stadium",c:"Miami"},
  M101:{d:"2026-07-14",v:"AT&T Stadium",c:"Dallas"},            M102:{d:"2026-07-15",v:"Mercedes-Benz Stadium",c:"Atlanta"},
  M103:{d:"2026-07-18",v:"Hard Rock Stadium",c:"Miami"},        M104:{d:"2026-07-19",v:"MetLife Stadium",c:"Nova Iorque/NJ"}
};
const MONTHS_PT=["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];
function schedLabel(id){ const s=SCHED[id]; if(!s) return ""; const dt=new Date(s.d+"T12:00:00Z");
  const dd=dt.getUTCDate(), mm=MONTHS_PT[dt.getUTCMonth()];
  return `${dd} ${mm}${s.t?(" · "+s.t):""} · ${s.v}, ${s.c}`; }

// Quem consome o vencedor / o perdedor de cada jogo (para percorrer o caminho de uma equipa)
const WIN_PARENT={}, LOSE_PARENT={};
for(const id in LATERDEF){ for(const s of LATERDEF[id]){ const [k,m]=s.split(":");
  if(k==="win") WIN_PARENT[m]=id; else if(k==="lose") LOSE_PARENT[m]=id; } }
const ROUND_OF={};
ROUNDS.forEach(r=>r.ids.forEach(id=>ROUND_OF[id]=r.name));
const ROUND_OF2={};   // rótulo curto por jogo
["M73","M74","M75","M76","M77","M78","M79","M80","M81","M82","M83","M84","M85","M86","M87","M88"].forEach(m=>ROUND_OF2[m]="16-avos");
["M89","M90","M91","M92","M93","M94","M95","M96"].forEach(m=>ROUND_OF2[m]="Oitavos");
["M97","M98","M99","M100"].forEach(m=>ROUND_OF2[m]="Quartos");
["M101","M102"].forEach(m=>ROUND_OF2[m]="Meias-finais");
ROUND_OF2["M103"]="3.º/4.º lugar"; ROUND_OF2["M104"]="Final";
// ordem de resolução do mata-eliminatórias na simulação
const SIM_ORDER=["M89","M90","M91","M92","M93","M94","M95","M96","M97","M98","M99","M100","M101","M102","M104","M103"];

/* ============ MODELO DE FORÇA (reutiliza o ranking FIFA / Elo) ============ */
function eloRating(t){ const r=Math.min(frank(t),40); return (40-r)*25; }
function pWinElo(a,b){ return 1/(1+Math.pow(10,(eloRating(b)-eloRating(a))/400)); }   // pseudo-Elo do ranking FIFA
// pWin(a,b): prob. de 'a' passar/vencer 'b' num jogo a eliminar. Precedência da FONTE:
//   1) odds de QUALIFICAÇÃO por jogo (com ajuste ao vivo) -> entram a nível de jogo em matchAdvanceProb()
//   2) odds de CAMPEÃO (força de mercado, para qualquer confronto) -> pWinMarket()
//   3) ranking FIFA (fallback) -> pWinElo()
function pWin(a,b){ const m=pWinMarket(a,b); return m!=null?m:pWinElo(a,b); }

/* ===== Probabilidades a partir de odds publicadas (ver fetchPublishedOdds) ===== */
// força de mercado a partir das odds de campeão (log da prob. justa de ser campeão)
function pWinMarket(a,b){
  if(!ODDS||!ODDS.champion) return null;
  const ca=ODDS.champion[a], cb=ODDS.champion[b];
  if(!(ca>0)||!(cb>0)) return null;
  const K=0.62;                                          // declive (quão decisiva é a diferença de favoritismo)
  const p=1/(1+Math.exp(-K*(Math.log(ca)-Math.log(cb))));
  return Math.min(0.92,Math.max(0.08,p));                // trava extremos absurdos num jogo único
}
// Poisson (linha de probabilidades 0..N golos) + resolução do confronto por diferença de golos
function _poisRow(lam,N){ const r=[]; let p=Math.exp(-lam); for(let k=0;k<=N;k++){ r[k]=p; p=p*lam/(k+1); } return r; }
function _advProb(lamA,lamB,offA,offB,q){                // P(A passa): golos esperados restantes + golos já feitos (offA/offB)
  const N=9, pa=_poisRow(lamA,N), pb=_poisRow(lamB,N);
  let win=0, lev=0;
  for(let i=0;i<=N;i++) for(let j=0;j<=N;j++){ const pp=pa[i]*pb[j], fa=offA+i, fb=offB+j;
    if(fa>fb) win+=pp; else if(fa===fb) lev+=pp; }
  return win + lev*q;                                    // empate -> prolong./penáltis (q = prob. de A o ganhar)
}
// calibra a "força" (delta de golos) que reproduz a prob. pré-jogo p0 de A passar (total ~MU golos)
function _solveDelta(p0, MU){
  const f=d=>{ const la=Math.max(0.05,MU/2+d), lb=Math.max(0.05,MU/2-d), q=1/(1+Math.exp(-1.2*d)); return _advProb(la,lb,0,0,q); };
  let lo=-1.6, hi=1.6;                                   // f é crescente em d -> bissecção
  for(let it=0; it<42; it++){ const mid=(lo+hi)/2; if(f(mid)<p0) lo=mid; else hi=mid; }
  return (lo+hi)/2;
}
// prob. de cada lado passar num jogo JÁ SORTEADO com odds de qualificação, ajustada ao resultado ao vivo
function matchAdvanceProb(id){
  if(!ODDS||!ODDS.qualify||!ODDS.qualify[id]) return null;
  const A=resolveSrc(ALLDEF[id][0]).name, B=resolveSrc(ALLDEF[id][1]).name;
  if(!A||!B) return null;
  const o=ODDS.qualify[id]; let p0A=o[A], p0B=o[B];
  if(!(p0A>0)||!(p0B>0)) return null;                    // nomes não batem com o cartão -> ignora (fallback)
  const s=p0A+p0B; p0A/=s; p0B/=s;                       // (já vem de-vigged do import; reforça normalização)
  const MU=2.6, d=_solveDelta(Math.min(0.985,Math.max(0.015,p0A)), MU);
  const lamA=Math.max(0.05,MU/2+d), lamB=Math.max(0.05,MU/2-d), qq=1/(1+Math.exp(-1.2*d));
  const lv=KO_LIVE[id];
  if(lv && lv.state==="in"){                             // ao vivo: ajusta pelo placar e tempo que falta
    const m=Math.min(120,Math.max(0,lv.minute||0)), tRem=Math.max(0,(90-m)/90);
    const pA=_advProb(lamA*tRem, lamB*tRem, lv.hg|0, lv.ag|0, qq);
    return {a:pA, b:1-pA};
  }
  return {a:p0A, b:p0B};                                 // pré-jogo / agendado: a própria odd
}

/* ============ SIMULAÇÃO DO PERCURSO DE UMA SELEÇÃO (Monte Carlo) ============ */
function r32TeamsOf(id){ return ALLDEF[id].map(src=>resolveSrc(src).name); }   // equipas concretas nos 16-avos
function teamR32Match(team){ for(const id in R32DEF){ if(r32TeamsOf(id).includes(team)) return id; } return null; }
// Devolve, para 'team': prob. de chegar a cada fase e a distribuição de adversários (condicional a lá chegar).
// Cálculo EXACTO por propagação de probabilidades no quadro (em vez de Monte Carlo): cada jogo é
// independente e a sua distribuição de vencedor/perdedor sai das distribuições dos dois jogos-filho.
// Vantagem: TODO o adversário estruturalmente possível aparece com a sua probabilidade real (por mais
// ínfima que seja — ex.: a África do Sul ou o Paraguai numa meia-final), sem ruído de amostragem.
// reach[fase] = probabilidade (0..1) de a equipa lá chegar; opp[fase] = Map(adversário -> prob. CONJUNTA
// de chegar a essa fase e defrontá-lo). Mantém N=1 para o consumo a jusante (p = reach/N, cond = conj/reach).
function simulateTeam(team, N){
  const m0=teamR32Match(team); if(!m0) return null;
  const r32={}; for(const id in R32DEF) r32[id]=r32TeamsOf(id);
  if(r32[m0].includes(null)) return {m0, incomplete:true};
  // distribuição de quem EMERGE (vence) e de quem PERDE cada jogo
  const winDist={}, loseDist={};
  function computeMatch(id){
    if(winDist[id]) return;
    const f=KO_FINAL[id];
    if(f){ winDist[id]=new Map([[f.winner,1]]); loseDist[id]=new Map([[f.loser,1]]); return; }   // jogo já decidido: determinista
    const ov=matchAdvanceProb(id);                                            // odds de qualificação (já sorteado, com ajuste ao vivo)
    if(ov){ const A=resolveSrc(ALLDEF[id][0]).name, B=resolveSrc(ALLDEF[id][1]).name;
      winDist[id]=new Map([[A,ov.a],[B,ov.b]]); loseDist[id]=new Map([[A,ov.b],[B,ov.a]]); return; }
    if(R32DEF[id]){ const [a,b]=r32[id];
      winDist[id]=new Map([[a,pWin(a,b)],[b,pWin(b,a)]]);
      loseDist[id]=new Map([[a,pWin(b,a)],[b,pWin(a,b)]]); return; }
    const sides=LATERDEF[id].map(s=>{ const [k,m]=s.split(":"); computeMatch(m); return k==="win"?winDist[m]:loseDist[m]; });
    const [D1,D2]=sides, w=new Map(), l=new Map();
    for(const [t1,p1] of D1) for(const [t2,p2] of D2){ const pp=p1*p2; if(pp<=0) continue;
      const a=pWin(t1,t2);
      w.set(t1,(w.get(t1)||0)+pp*a);     w.set(t2,(w.get(t2)||0)+pp*(1-a));
      l.set(t2,(l.get(t2)||0)+pp*a);     l.set(t1,(l.get(t1)||0)+pp*(1-a)); }
    winDist[id]=w; loseDist[id]=l;
  }
  for(const id of SIM_ORDER) computeMatch(id);

  const STAGES=["16-avos","Oitavos","Quartos","Meias-finais","Final","3.º/4.º lugar","Campeão"];
  const reach={}, opp={}; STAGES.forEach(s=>{reach[s]=0; opp[s]=new Map();});
  const path=[]; { let c=m0; path.push(c); while(WIN_PARENT[c]){ c=WIN_PARENT[c]; path.push(c);} }
  let reachP=1;
  for(let k=0;k<path.length;k++){
    const id=path[k], lab=ROUND_OF2[id];
    // distribuição do adversário neste jogo (o vencedor do OUTRO ramo)
    let oppDist;
    if(R32DEF[id]){ const o=r32[id].find(t=>t!==team); oppDist=new Map([[o,1]]); }
    else { const prev=path[k-1];
      const otherM=LATERDEF[id].map(s=>s.split(":")).find(([,m])=>m!==prev);
      oppDist = otherM[0]==="win" ? winDist[otherM[1]] : loseDist[otherM[1]]; }
    reach[lab]=reachP;
    let winP;
    const fl=KO_FINAL[id];
    if(fl){   // jogo da própria seleção já jogado: adversário e resultado reais (determinista)
      const o = fl.winner===team ? fl.loser : fl.winner;
      opp[lab].set(o,(opp[lab].get(o)||0)+reachP);
      winP = fl.winner===team ? reachP : 0;
    } else {
      const ov=matchAdvanceProb(id);                 // odds de qualificação (com ajuste ao vivo) p/ o jogo da própria seleção
      let winHere=0;
      for(const [o,pc] of oppDist){ if(pc<=0) continue;
        opp[lab].set(o,(opp[lab].get(o)||0)+reachP*pc); if(!ov) winHere += pc*pWin(team,o); }
      if(ov) winHere = (resolveSrc(ALLDEF[id][0]).name===team) ? ov.a : ov.b;   // prob. de a própria passar vem das odds
      winP = reachP*winHere;
    }
    if(id==="M104") reach["Campeão"]=winP;
    if(id==="M101"||id==="M102"){            // se perder a meia-final -> disputa do 3.º/4.º lugar
      const lossP=reachP-winP, sl=loseDist[id==="M101"?"M102":"M101"];
      let tot=0; for(const [,p] of sl) tot+=p;
      reach["3.º/4.º lugar"]=lossP;
      for(const [o,p] of sl){ if(p<=0||tot<=0) continue;
        opp["3.º/4.º lugar"].set(o,(opp["3.º/4.º lugar"].get(o)||0)+lossP*(p/tot)); }
    }
    reachP=winP;
  }
  return {m0, reach, opp, N:1, r32Opp:r32[m0].find(t=>t!==team)};
}

/* ============ CLASSIFICAÇÕES AO VIVO (ESPN) — completa os golos dos grupos A–I ============ */
// Siglas ESPN -> nome interno (para casar as entradas da classificação)
const ESPN_ABBR={MEX:"Mexico",RSA:"South Africa",KOR:"South Korea",CZE:"Czechia",
  SUI:"Switzerland",CAN:"Canada",BIH:"Bosnia & Herzegovina",QAT:"Qatar",
  BRA:"Brazil",MAR:"Morocco",SCO:"Scotland",HAI:"Haiti",
  USA:"USA",AUS:"Australia",PAR:"Paraguay",TUR:"Turkey",
  GER:"Germany",CIV:"Ivory Coast",ECU:"Ecuador",CUW:"Curacao",
  NED:"Netherlands",JPN:"Japan",SWE:"Sweden",TUN:"Tunisia",
  BEL:"Belgium",EGY:"Egypt",IRN:"Iran",NZL:"New Zealand",
  ESP:"Spain",CPV:"Cape Verde",URU:"Uruguay",KSA:"Saudi Arabia",
  FRA:"France",NOR:"Norway",SEN:"Senegal",IRQ:"Iraq",
  // equipas dos grupos J/K/L (necessárias para casar os jogos do mata-eliminatórias)
  ARG:"Argentina",AUT:"Austria",ALG:"Algeria",JOR:"Jordan",
  COL:"Colombia",POR:"Portugal",COD:"DR Congo",UZB:"Uzbekistan",
  ENG:"England",GHA:"Ghana",CRO:"Croatia",PAN:"Panama"};
// fallback por nome: normaliza (sem acentos/pontuação) e cobre alguns alias comuns da ESPN
const _norm=s=>(s||"").toLowerCase().normalize("NFD").replace(/[^a-z]/g,"");   // sem acentos/pontuação/espaços
const NAME_TO_TEAM={};
for(const n in T) NAME_TO_TEAM[_norm(n)]=n;
[["unitedstates","USA"],["czechrepublic","Czechia"],["korearepublic","South Korea"],
 ["iriran","Iran"],["cotedivoire","Ivory Coast"],["caboverde","Cape Verde"],
 ["bosniaandherzegovina","Bosnia & Herzegovina"],["democraticrepublicofcongo","DR Congo"],
 ["congodr","DR Congo"],["turkiye","Turkey"]
].forEach(([k,v])=>{ if(T[v]) NAME_TO_TEAM[k]=v; });
function espnTeamToInternal(c){
  const t=c&&c.team; if(!t) return null;
  if(t.abbreviation&&ESPN_ABBR[t.abbreviation]) return ESPN_ABBR[t.abbreviation];
  for(const k of [t.displayName,t.shortDisplayName,t.name,t.location]){ const n=NAME_TO_TEAM[_norm(k)]; if(n) return n; }
  return null;
}
function statVal(stats,names){ if(!Array.isArray(stats)) return null;
  for(const s of stats){ if(names.includes(s.name)||names.includes(s.type)){ const v=Number(s.value); if(Number.isFinite(v)) return v; } }
  return null; }
function applyStandings(json){
  try{
    const groups=json&&(json.children||json.groups); if(!Array.isArray(groups)) return false;
    const out={};
    for(const g of groups){
      const entries=g.standings&&g.standings.entries; if(!Array.isArray(entries)) continue;
      const rows=[];
      for(const e of entries){
        const ab=e.team&&e.team.abbreviation; const team=ESPN_ABBR[ab]; if(!team) continue;
        const st=e.stats||[];
        rows.push({team,
          w:statVal(st,["wins"]), d:statVal(st,["ties","draws"]), l:statVal(st,["losses"]),
          gf:statVal(st,["pointsFor","goalsFor"]), ga:statVal(st,["pointsAgainst","goalsAgainst"]),
          gd:statVal(st,["pointDifferential","goalDifference"]), pts:statVal(st,["points"]) });
      }
      if(!rows.length) continue;
      const grp=groupOf(rows[0].team); if(grp&&"ABCDEFGHI".includes(grp)) out[grp]=rows;
    }
    if(Object.keys(out).length){ STANDINGS=Object.assign(STANDINGS||{}, out); return true; }
  }catch(e){}
  return false;
}
async function fetchStandings(){
  try{
    const u="https://site.api.espn.com/apis/v2/sports/soccer/fifa.world/standings";
    const r=await fetch(u,{cache:"no-store"}); if(!r.ok) return;
    if(applyStandings(await r.json())){ renderTables(); renderSelecao(); }
  }catch(e){}
}

/* ============ ESTADO ============ */
let SCORES = JSON.parse(JSON.stringify(DEFAULT));      // valores da SIMULAÇÃO (vista "Com este resultado")
let LSCORE = { J:[null,null], K:[null,null], L:[null,null] };  // placar real/live do ESPN (verdade oficial)
let MANUAL = new Set();                                // jogos "G:mi" em modo manual (utilizador define; senão segue o live)
let FINAL = {};                                        // "G:mi" -> [h,a] resultado final trancado quando o jogo termina (persiste)
let PICKS = {};
let SEL_TEAM = POR;     // seleção escolhida no separador Percurso (banner = seletor)
let CUR = null;
let LIVE = { J:[{},{}], K:[{},{}], L:[{},{}] };   // {state,minute} por jogo (preenchido pelo ESPN)
let KO_FINAL = {};   // "M##" -> {winner,loser,hg,ag} resultado real trancado do mata-eliminatórias (persiste)
let KO_LIVE  = {};   // "M##" -> {hg,ag,state,minute} snapshot transitório por fetch (placar nos cartões)
let VIEW = "prob";   // "prob" = probabilidades pré-jogo · "result" = adversário com o resultado atual
let ODDS = null;     // odds publicadas (de-vigged): {updated,fonte,qualify:{Mxx:{team:p}},champion:{team:p}} — ver fetchPublishedOdds

const LS_KEY="mundial2026:v2";
function saveState(){ try{ localStorage.setItem(LS_KEY, JSON.stringify({scores:SCORES, view:VIEW, manual:[...MANUAL], final:FINAL, koFinal:KO_FINAL, odds:ODDS})); }catch(e){} }
function loadState(){
  try{
    const o=JSON.parse(localStorage.getItem(LS_KEY)||"null"); if(!o) return;
    if(o.scores) for(const G of "JKL".split("")){ if(Array.isArray(o.scores[G])) for(let mi=0;mi<2;mi++){ const s=o.scores[G][mi]; if(Array.isArray(s)&&Number.isFinite(s[0])&&Number.isFinite(s[1])) SCORES[G][mi]=[s[0]|0,s[1]|0]; } }
    if(Array.isArray(o.manual)) MANUAL=new Set(o.manual.filter(k=>/^[JKL]:[01]$/.test(k)));
    if(o.final&&typeof o.final==="object") for(const k in o.final){ const s=o.final[k];
      if(/^[JKL]:[01]$/.test(k)&&Array.isArray(s)&&Number.isFinite(s[0])&&Number.isFinite(s[1])){
        FINAL[k]=[s[0]|0,s[1]|0]; LSCORE[k[0]][+k[2]]=FINAL[k].slice();   // o resultado final trancado é também a verdade live
      } }
    if(o.koFinal&&typeof o.koFinal==="object") for(const id in o.koFinal){ const f=o.koFinal[id];
      if(/^M\d+$/.test(id)&&ALLDEF[id]&&f&&f.winner&&f.loser){
        KO_FINAL[id]={winner:f.winner, loser:f.loser, hg:f.hg|0, ag:f.ag|0};   // PICKS sincronizados após recompute()
        if(Array.isArray(f.pens)&&Number.isFinite(f.pens[0])&&Number.isFinite(f.pens[1])) KO_FINAL[id].pens=[f.pens[0]|0,f.pens[1]|0];
      }
    }
    if(o.odds && typeof o.odds==="object" && (o.odds.qualify||o.odds.champion)) ODDS=o.odds;   // odds importadas (já de-vigged)
    if(o.view==="result"||o.view==="prob") VIEW=o.view;
  }catch(e){}
}

/* ===== ODDS =====
   Formato (igual no paste, no ficheiro publicado e no publish):
     { updated, fonte, qualificacao:{ "M77":{Equipa:odd,...} }, campeao:{ Equipa:odd,... } }
   - odds decimais (>1); nomes em inglês interno OU em português (resolvidos por _toInternal)
   - de-vig: qualificação normaliza os 2 lados; campeão normaliza as equipas dadas
   Fontes: ficheiro publicado em AppDataJSON (todos veem) tem prioridade; senão paste local (localStorage). */
const _PT_TO_INTERNAL={}; for(const n in T) _PT_TO_INTERNAL[_norm(T[n][0])]=n;
function _toInternal(n){ if(T[n]) return n; const k=_norm(n); return NAME_TO_TEAM[k]||_PT_TO_INTERNAL[k]||null; }
// converte o objeto cru (odds decimais) -> {ok,out,nQ,nC,warn,msg}; out já de-vigged
function _parseOdds(raw){
  if(!raw||typeof raw!=="object") return {ok:false, msg:"JSON inválido."};
  const out={ updated:(typeof raw.updated==="string"?raw.updated:""), fonte:(typeof raw.fonte==="string"?raw.fonte:""), qualify:{}, champion:null };
  let nQ=0, nC=0; const warn=[];
  if(raw.qualificacao && typeof raw.qualificacao==="object"){
    for(const id in raw.qualificacao){
      if(!ALLDEF[id]){ warn.push(id); continue; }                                   // id de jogo inválido
      const o=raw.qualificacao[id]; if(!o||typeof o!=="object") continue;
      const ent=Object.keys(o).map(n=>[_toInternal(n),Number(o[n])]).filter(e=>e[0]&&e[1]>1);
      if(ent.length!==2){ warn.push(id); continue; }                                 // precisa de exatamente 2 odds válidas
      const inv=ent.map(e=>1/e[1]), sum=inv[0]+inv[1], fair={};
      ent.forEach((e,i)=>fair[e[0]]=inv[i]/sum);
      out.qualify[id]=fair; nQ++;
    }
  }
  if(raw.campeao && typeof raw.campeao==="object"){
    const ent=Object.keys(raw.campeao).map(n=>[_toInternal(n),Number(raw.campeao[n])]).filter(e=>e[0]&&e[1]>1);
    if(ent.length){ const inv=ent.map(e=>1/e[1]), sum=inv.reduce((a,b)=>a+b,0);
      out.champion={}; ent.forEach((e,i)=>out.champion[e[0]]=inv[i]/sum); nC=ent.length; }
  }
  const ok=(nQ||nC)>0;
  return {ok, out, nQ, nC, warn, msg: ok ? `${nQ} jogo(s) de qualificação · ${nC} equipa(s) de campeão.`+(warn.length?` Ignorado: ${warn.join(", ")}.`:"") : 'Sem odds reconhecidas. Usa "qualificacao" e/ou "campeao".' };
}
function applyOdds(out, persist){ ODDS=out; if(persist) saveState(); recompute(); renderKnockout(); if(_hubOnChange) _hubOnChange(); }
function oddsInfo(){ if(!ODDS) return null; return {updated:ODDS.updated||"", fonte:ODDS.fonte||"", src:ODDS.src||"local", nQualify:Object.keys(ODDS.qualify||{}).length, nChampion:ODDS.champion?Object.keys(ODDS.champion).length:0}; }

/* leitura do repo de dados AppDataJSON, onde o workflow GitHub Actions publica as odds */
const GH_OWNER="diogoandrefsilva-ghc", GH_DATA_REPO="AppDataJSON", GH_DATA_PATH="futebol-selecoes-odds-data.json";

/* odds publicadas: lidas de raw.githubusercontent.com (repo público, sem token). Prioridade sobre o paste local. */
async function fetchPublishedOdds(){
  for(const br of ["main","master"]){                       // tenta o branch por defeito (main; senão master)
    try{
      const r=await fetch(`https://raw.githubusercontent.com/${GH_OWNER}/${GH_DATA_REPO}/${br}/${GH_DATA_PATH}?ts=`+Date.now(),{cache:"no-store"});
      if(!r.ok) continue;
      const raw=await r.json();
      const p=_parseOdds(raw);
      if(p.ok){ p.out.src="remote"; applyOdds(p.out, false); }   // publicado vence; não persiste (é sempre fresco)
      return;                                                 // ficheiro encontrado nesse branch -> termina
    }catch(e){}
  }
}
// jogos por decidir (já sorteados) + equipas vivas — para montar o pedido a um agente
function oddsTargets(){
  _ensureInit();
  const matches=[];
  for(const id in R32DEF){
    if(KO_FINAL[id]) continue;
    const A=resolveSrc(R32DEF[id][0]).name, B=resolveSrc(R32DEF[id][1]).name;
    if(A&&B) matches.push({id, home:A, away:B, homePt:pt(A), awayPt:pt(B)});
  }
  const dead=new Set(); for(const id in KO_FINAL) dead.add(KO_FINAL[id].loser);
  const alive=[], seen=new Set();
  for(const id in R32DEF) for(const s of R32DEF[id]){ const n=resolveSrc(s).name; if(n&&!seen.has(n)){ seen.add(n); if(!dead.has(n)) alive.push({name:n,pt:pt(n)}); } }
  return {matches, alive};
}

function gWin(L,W){ W=W||CUR; return "ABCDEFGHI".includes(L)?FIXED[L].w:W.res[L].order[0]; }
function gRun(L,W){ W=W||CUR; return "ABCDEFGHI".includes(L)?FIXED[L].r:W.res[L].order[1]; }
function gThird(L,W){ W=W||CUR; return "ABCDEFGHI".includes(L)?FIXED[L].t:W.res[L].order[2]; }

function computeWorld(scores){   // calcula apuramento + Anexo C para um conjunto de resultados qualquer
  const res={};
  for(const G of "JKL".split("")) res[G]=rankGroup(GROUPS[G], scores[G]);
  const jkl={};
  for(const G of "JKL".split("")){ const th=res[G].order[2]; const s=res[G].stats[th]; jkl[G]={name:th,pts:s.pts,gd:s.gd,gf:s.gf}; }
  const ranked=thirdsRanking(jkl);
  const qual=ranked.slice(0,8).map(t=>t.grp);
  const key=[...qual].sort().join("");
  const val=ANNEXE[key]||"";
  const slotGroup={}; SLOT_LETTERS.forEach((L,i)=>slotGroup["1"+L]=val[i]);
  const oppOf={};   SLOT_LETTERS.forEach((L,i)=>{ if(val[i]) oppOf[val[i]]="1"+L; });
  return {res,jkl,ranked,qual,key,val,slotGroup,oppOf};
}
// ----- conjuntos de placares conforme o estado de cada jogo -----
function finiteSc(s){ return Array.isArray(s)&&Number.isFinite(s[0])&&Number.isFinite(s[1]); }
function finalSc(G,mi){ const s=FINAL[G+":"+mi]; return finiteSc(s)?s.slice():null; }   // resultado final trancado, se já terminou
function gameState(G,mi){ if(FINAL[G+":"+mi]) return "post"; const lv=(LIVE[G]&&LIVE[G][mi])||{}; return lv.state || (Date.now()>=koTs(G) ? "in" : "pre"); }
function gameMinute(G,mi){ if(FINAL[G+":"+mi]) return 90; const lv=(LIVE[G]&&LIVE[G][mi])||{}; return lv.minute||0; }
// Mundo "oficial/live" (vista Probabilidades): placar do ESPN onde existe, senão o cenário base.
function liveScores(){ const s={}; for(const G of "JKL".split("")) s[G]=[0,1].map(mi=> finalSc(G,mi)||(finiteSc(LSCORE[G][mi])?LSCORE[G][mi].slice():DEFAULT[G][mi].slice())); return s; }
// Mundo "simulado" (vista Com este resultado): jogos a decorrer seguem o live (bloqueados);
// os que o utilizador alterou usam o valor dele; os restantes mostram o oficial (se já houver) ou a base.
function simScores(){ const s={}; for(const G of "JKL".split("")) s[G]=[0,1].map(mi=>{
  const fin=finalSc(G,mi); if(fin) return fin;                  // jogo terminado: resultado final trancado (ignora manual)
  if(MANUAL.has(G+":"+mi)) return SCORES[G][mi].slice();        // modo manual: valor do utilizador
  if(finiteSc(LSCORE[G][mi])) return LSCORE[G][mi].slice();     // senão segue o live/oficial
  return DEFAULT[G][mi].slice();                                 // ainda sem dados -> base
}); return s; }
function activeScores(){ return VIEW==="result" ? simScores() : liveScores(); }
function recompute(){ CUR=computeWorld(activeScores()); }

function resolveSrc(src){
  const p=src.split(":"); const k=p[0], v=p[1];
  if(k==="W")  return {name:gWin(v),  tag:"1.º "+v};
  if(k==="RU") return {name:gRun(v),  tag:"2.º "+v};
  if(k==="T"){ const L=CUR.slotGroup[v]; return {name:L?gThird(L):null, tag:L?("3.º "+L):"3.º ?"}; }
  if(k==="win")  return {name:matchWinner(v), tag:null, ph:"Vencedor "+v.slice(1)};
  if(k==="lose") return {name:matchLoser(v),  tag:null, ph:"Perdedor "+v.slice(1)};
  return {name:null,tag:null};
}
function matchWinner(id){ const p=PICKS[id]; if(!p) return null; return resolveSrc(ALLDEF[id][p==='a'?0:1]).name; }
function matchLoser(id){  const p=PICKS[id]; if(!p) return null; return resolveSrc(ALLDEF[id][p==='a'?1:0]).name; }
function clearDescendants(id){ const q=[...(CHILDREN[id]||[])]; while(q.length){ const c=q.shift(); if(PICKS[c]!==undefined) delete PICKS[c]; (CHILDREN[c]||[]).forEach(x=>q.push(x)); } }

/* ============ HORÁRIO DOS JOGOS DE GRUPOS (usado pelo estado live) ============ */
const KICKOFF = { L:"2026-06-27T21:00:00Z", K:"2026-06-27T23:30:00Z", J:"2026-06-28T02:00:00Z" };
function koTs(G){ return Date.parse(KICKOFF[G]); }

/* ===================== RENDER ===================== */
const _n=v=>(v==null?"·":v);
function renderTables(){
  let h="";
  for(const G of "ABCDEFGHIJKL".split("")){
    const tbl=groupTable(G), qualThird=CUR.qual.includes(G);
    h+=`<div class="card"><div class="grp-h"><div class="grp-badge">${G}</div><div class="nm">Grupo ${G}</div></div>
    <table class="tbl"><thead><tr>
      <th class="l">#</th><th class="l">Equipa</th><th>J</th><th>V</th><th>E</th><th>D</th><th>GM</th><th>GS</th><th>DG</th><th>P</th>
    </tr></thead><tbody>`;
    tbl.forEach((s,i)=>{
      const t=s.team, pc=i===0?"q1":i===1?"q2":(i===2&&qualThird?"q3":"");
      const por=t===POR?" row-por":"";
      const J=(s.w!=null&&s.d!=null&&s.l!=null)?(s.w+s.d+s.l):3;
      const dg=s.gd!=null?((s.gd>=0?'+':'')+s.gd):"·";
      h+=`<tr class="${por.trim()}">
        <td class="l"><span class="pos ${pc}">${i+1}</span></td>
        <td class="l"><span class="tflag">${fl(t)}</span><span class="tname">${pt(t)}</span></td>
        <td>${J}</td><td>${_n(s.w)}</td><td>${_n(s.d)}</td><td>${_n(s.l)}</td>
        <td>${_n(s.gf)}</td><td>${_n(s.ga)}</td><td>${dg}</td><td class="pts">${_n(s.pts)}</td>
      </tr>`;
    });
    h+=`</tbody></table></div>`;
  }
  document.getElementById("tablesAll").innerHTML=h;
}

/* --- SELEÇÃO: percurso já feito + caminho potencial --- */
function teamPathMatches(m0){   // jogos que a equipa disputaria em cada ronda (caminho do vencedor)
  const out=[m0]; let cur=m0;
  while(WIN_PARENT[cur]){ cur=WIN_PARENT[cur]; out.push(cur); }
  return out;   // [16-avos, oitavos, quartos, meias, final]
}
function oppLinesHTML(map, reachCount){
  const entries=[...map.entries()].sort((a,b)=>b[1]-a[1]);
  if(!entries.length||!reachCount) return `<div class="oppmore">—</div>`;
  const cert=entries.length===1 && entries[0][1]/reachCount>=0.999;
  let h=`<div class="oppwrap">`, shown=0, rest=0, restp=0;
  for(const [o,c] of entries){
    const p=c/reachCount;
    if(shown>=6 && p<0.03){ rest++; restp+=p; continue; }
    const pct=p>=0.995?"100%":(p<0.01?"<1%":Math.round(p*100)+"%");
    const por=o===POR?" por":"";
    h+=`<div class="oppline${cert?' cert':''}${por}"><span class="of">${fl(o)}</span><span class="on">${pt(o)}</span>
      <span class="obar"><i style="width:${Math.max(2,Math.round(p*100))}%"></i></span><span class="op">${pct}</span></div>`;
    shown++;
  }
  if(rest>0) h+=`<div class="oppmore">+${rest} ${rest===1?'outro adversário':'outros adversários'} · ${Math.round(restp*100)||"<1"}%</div>`;
  return h+`</div>`;
}
function renderSelecao(){
  const team=SEL_TEAM;
  const box=document.getElementById("teamPath");
  if(!team){ box.innerHTML=`<div class="pickhint">Escolhe uma seleção para veres o percurso.</div>`; return; }
  const gr=teamGroupResult(team);
  const por=team===POR;
  // hero + percurso de grupos
  const m0=teamR32Match(team), qualified=!!m0;
  let recordTxt="";
  if(gr){ const r=gr.row, rec=(r.w!=null)?`${r.w}V ${r.d}E ${r.l}D`:"";
    const goals=(r.gf!=null&&r.ga!=null)?` · ${r.gf} GM-${r.ga} GS`:"";
    const dg=r.gd!=null?` (${r.gd>0?'+':''}${r.gd})`:"";
    recordTxt=`${rec}${goals}${dg}`; }
  const thirdMark = gr&&gr.pos===3 ? (CUR.qual.includes(gr.group)?" · melhor 3.º":"") : "";
  const seed = gr ? `${gr.pos}.º do Grupo ${gr.group}${thirdMark}` : "";
  // tag de estado: a fase em que a seleção está/ficou (ex.: "16-AVOS" se apurada; senão "ELIMINADA")
  const stageTag = qualified ? (ROUND_OF2[m0]||"16-avos").toUpperCase() : "ELIMINADA";
  let h=`<div class="teamhero ${qualified?'':'out'}"><span class="bigfl">${fl(team)}</span>
    <div class="meta"><div class="nm ${por?'por':''}">${pt(team)}</div>
      <div class="gl"><b>${seed}</b>${recordTxt?` · ${recordTxt}`:""}</div></div>
    <span class="seedtag">${stageTag}</span>
    <select class="heroSel" aria-label="Trocar de seleção" onchange="selectTeam(this.value)">${teamOptions(team)}</select>
    <span class="heroChev" aria-hidden="true">▾ trocar</span></div>`;

  // jogos / classificação da fase de grupos
  h+=groupPhaseHTML(team, gr);

  if(!qualified){
    h+=`<div class="resultline">Terminou no <span class="wl out">${gr?gr.pos+'.º lugar':'fundo'}</span> do grupo e não se apurou para o mata-eliminatórias.</div>`;
    box.innerHTML=h; return;
  }

  const sim=simulateTeam(team, 40000);
  if(!sim||sim.incomplete){ h+=`<div class="resultline">A aguardar o fecho dos grupos para traçar o caminho…</div>`; box.innerHTML=h; return; }
  const path=teamPathMatches(m0);
  const labels=["16-avos","Oitavos","Quartos","Meias-finais","Final"];
  h+=`<div class="stagewrap">`;
  labels.forEach((lab,k)=>{
    const id=path[k]; const rc=sim.reach[lab]||0, p=rc/sim.N;
    const cls = p>=0.999?"done" : p>0?"reachable" : "gone";
    const rcls = p>=0.999?"done" : p<=0?"gone":(p>=0.5?"hi":"");
    const reachTxt = p>=0.999?"garantido" : p<=0?"sem cenários" : (p<0.01?"<1%":Math.round(p*100)+"%");
    h+=`<div class="stage ${cls}">
      <div class="sh"><span class="sr">${lab==='16-avos'?'16-avos de final':lab==='Oitavos'?'Oitavos de final':lab==='Quartos'?'Quartos de final':lab}</span>
        <span class="reach ${rcls}">${k===0?'apurada':('chega '+reachTxt)}</span></div>
      <div class="when"><span class="v">${schedLabel(id)}</span></div>
      ${oppLinesHTML(sim.opp[lab], rc)}</div>`;
  });
  h+=`</div>`;
  // campeão
  const champP=(sim.reach["Campeão"]||0)/sim.N;
  h+=`<div class="champline"><span class="cup">🏆</span><span class="ct ${por?'por':''}">${pt(team)} campeão</span>
       <span class="cp">${champP<0.001?'<0,1%':(champP*100).toFixed(champP<0.1?1:0)+"%"}</span></div>`;
  // 3.º/4.º lugar (se puder lá cair)
  const tpRc=sim.reach["3.º/4.º lugar"]||0;
  if(tpRc>0){
    h+=`<div class="card" style="margin-top:12px"><div class="grp-h"><div class="nm" style="font-size:14px">Se perder a meia-final · disputa do 3.º/4.º lugar</div></div>
      <div class="when" style="margin:0 0 8px"><span class="v">${schedLabel("M103")}</span></div>
      ${oppLinesHTML(sim.opp["3.º/4.º lugar"], tpRc)}</div>`;
  }
  box.innerHTML=h;
}
function teamOptions(sel){
  let h="";
  for(const G of "ABCDEFGHIJKL".split("")){
    h+=`<optgroup label="Grupo ${G}">`;
    for(const r of groupTable(G)) h+=`<option value="${r.team}" ${r.team===sel?"selected":""}>${pt(r.team)}</option>`;
    h+=`</optgroup>`;
  }
  return h;
}
function selectTeam(v){ SEL_TEAM=v; renderSelecao(); }

// Jogos da fase de grupos (J/K/L, dados de jogo a jogo) ou classificação final do grupo (A–I)
function groupMatches(G){
  if(!"JKL".includes(G)) return null;
  const sc=activeScores()[G];
  const out=[];
  for(const m of GROUPS[G].fixed) out.push({h:m[0],a:m[1],hg:m[2],ag:m[3],done:true});
  for(let mi=0;mi<2;mi++){
    const pair=GROUPS[G].rem[mi];
    const fin=finalSc(G,mi), live=finiteSc(LSCORE[G][mi])?LSCORE[G][mi]:null;
    const real=fin||live, st=gameState(G,mi);
    if(real) out.push({h:pair[0],a:pair[1],hg:real[0],ag:real[1],done:st==="post",inplay:st==="in"});
    else out.push({h:pair[0],a:pair[1],hg:null,ag:null,done:false,inplay:false,sc:sc[mi]});
  }
  return out;
}
function groupPhaseHTML(team, gr){
  if(!gr) return "";
  const G=gr.group;
  const ms=groupMatches(G);
  if(ms){
    let r=`<div class="gp-h">Fase de grupos · Grupo ${G}</div><div class="gpmatches">`;
    for(const m of ms){
      const tm=(m.h===team||m.a===team)?" tm":"";
      const hw=m.hg!=null&&m.hg>m.ag, aw=m.ag!=null&&m.ag>m.hg;
      const scTxt = m.hg!=null ? `${m.hg}–${m.ag}` : (m.inplay?"a jogar":"por jogar");
      const scCls = m.hg!=null ? "" : " up";
      r+=`<div class="gpm${tm}">
        <div class="s h${hw?' win':''}"><span class="nm">${pt(m.h)}</span><span class="fl">${fl(m.h)}</span></div>
        <span class="sc${scCls}">${scTxt}</span>
        <div class="s a${aw?' win':''}"><span class="fl">${fl(m.a)}</span><span class="nm">${pt(m.a)}</span></div>
      </div>`;
    }
    return r+`</div>`;
  }
  // A–I: sem dados jogo a jogo -> classificação final do grupo
  const tbl=groupTable(G);
  let r=`<div class="gp-h">Fase de grupos · Grupo ${G}</div>
    <table class="tbl" style="margin:0 0 16px"><thead><tr>
      <th class="l">Equipa</th><th>J</th><th>DG</th><th>Pts</th></tr></thead><tbody>`;
  tbl.forEach((row,i)=>{
    const me=row.team===team;
    const j=(row.w!=null)?row.w+row.d+row.l:"";
    const dg=row.gd!=null?`${row.gd>0?'+':''}${row.gd}`:"";
    r+=`<tr ${me?'class="row-por"':''}>
      <td class="l"><span class="pos ${i<2?'q1':''}">${i+1}</span><span class="tflag">${fl(row.team)}</span><span class="tname">${pt(row.team)}</span></td>
      <td>${j}</td><td>${dg}</td><td class="pts">${row.pts??""}</td></tr>`;
  });
  return r+`</tbody></table>`;
}
function renderThirds(){
  const R=CUR.ranked; let h="";
  R.forEach((t,i)=>{
    const inq=i<8;
    if(i===8) h+=`<div class="cutline">LINHA DE CORTE · passam os 8 melhores</div>`;
    const slot=CUR.oppOf[t.grp];
    let opp;
    if(inq && slot){ const wl=slot.slice(1); const w=gWin(wl); opp=`→ ${fl(w)} ${pt(w)} · 1.º ${wl}`; }
    else opp="fora do apuramento";
    const por=t.name===POR?" por":"";
    h+=`<div class="third ${inq?'in':'out'}${por}">
      <div class="rk">${i+1}</div>
      <div class="fl">${fl(t.name)}</div>
      <div class="info"><div class="n">${pt(t.name)}<span class="gl">3.º ${t.grp}</span></div>
        <div class="opp">${opp}</div></div>
      <div class="st">${t.pts} pts · ${t.gd>=0?'+':''}${t.gd} · ${t.gf} GM</div>
    </div>`;
  });
  document.getElementById("thirds").innerHTML=h;
}
/* (removido) Distribuição nos 16-avos */

/* --- BRACKET --- */
const COLS=[
  {name:"16-avos", ids:["M74","M77","M73","M75","M83","M84","M81","M82","M76","M78","M79","M80","M86","M88","M85","M87"]},
  {name:"Oitavos", ids:["M89","M90","M93","M94","M91","M92","M95","M96"]},
  {name:"Quartos", ids:["M97","M98","M99","M100"]},
  {name:"Meias",   ids:["M101","M102"]},
  {name:"Final",   ids:["M104"]}
];
// prob. de cada lado AVANÇAR num jogo por disputar (já sorteado): odds de qualificação (c/ ajuste live) -> campeão -> ranking
function koAdvanceProb(id){
  if(KO_FINAL[id]) return null;                            // já decidido -> mostra-se o resultado, não a prob.
  const A=resolveSrc(ALLDEF[id][0]).name, B=resolveSrc(ALLDEF[id][1]).name;
  if(!A||!B) return null;                                  // falta uma equipa (ronda futura) -> sem prob.
  const ov=matchAdvanceProb(id); if(ov) return ov;
  const pa=pWin(A,B); return {a:pa, b:1-pa};
}
function koSide(id, side, S, both, pick, score, isWin, locked, hasScore, pen, prob){
  const isPick=pick===side, isDim=pick&&pick!==side, por=S.name===POR;
  const cls=["koteam"];
  if(!S.name) cls.push("tbd");
  if(isPick) cls.push("pick");
  if(isDim)  cls.push("dim");
  if(por)    cls.push("por");
  if(isWin)  cls.push("kowin");           // vencedor real trancado
  const nm = S.name? pt(S.name) : (S.ph||S.tag||"A definir");
  const flg= S.name? fl(S.name) : "·";
  const hasProb = Number.isFinite(prob) && !hasScore && !!S.name;   // % de avançar (só jogos por disputar)
  // a posição do grupo só faz sentido enquanto o jogo não tem resultado nem prob. à direita
  const tag= (S.name&&S.tag&&!hasScore&&!hasProb)? `<span class="src">${S.tag}</span>` : "";
  const scEl= Number.isFinite(score)? `<span class="kosc">${Number.isFinite(pen)?`<span class="pen">(${pen}) </span>`:""}${score}</span>` : "";   // penáltis à esquerda -> placar principal sempre à direita
  const prEl= hasProb? `<span class="koprob">${prob<0.005?"<1":Math.round(prob*100)}%</span>` : "";
  return `<button class="${cls.join(' ')}" data-id="${id}" data-side="${side}" ${both&&!locked?'':'disabled'}>
    <span class="fl">${flg}</span><span class="nm">${nm}</span>${tag}${scEl}${prEl}</button>`;
}
function koCard(id){
  const def=ALLDEF[id];
  const A=resolveSrc(def[0]), B=resolveSrc(def[1]);
  const both=!!A.name && !!B.name, pick=PICKS[id];
  const haspor=A.name===POR||B.name===POR, champ=id==="M104";
  const num=id.slice(1);
  // placar/estado ao vivo: o resultado trancado tem prioridade; senão o snapshot do fetch atual
  const fin=KO_FINAL[id], lv=KO_LIVE[id];
  const sc = fin ? {hg:fin.hg, ag:fin.ag, pens:fin.pens||null} : (lv ? {hg:lv.hg, ag:lv.ag, pens:null} : null);
  const state = fin ? "post" : (lv ? lv.state : null);
  const winner = fin ? fin.winner : null;
  const chip = state==="in" ? `<span class="kostate live">${lv&&lv.minute?lv.minute+"'":"a jogar"}</span>` : "";   // só "live"; jogos terminados não levam chip (como nas edições anteriores)
  const corner = champ?'<span>🏆</span>':(id==='M103'?'<span>3.º/4.º</span>':'');
  const cls=["ko"]; if(haspor)cls.push("haspor"); if(champ)cls.push("champ");
  if(state==="in")cls.push("inplay"); if(fin)cls.push("locked");
  const adv = both ? koAdvanceProb(id) : null;            // % de avançar (jogos por disputar)
  return `<div class="${cls.join(' ')}">
    <div class="jno"><span>JOGO ${num}</span>${chip}${corner}</div>
    <div class="teams">${koSide(id,'a',A,both,pick,sc?sc.hg:null,winner&&winner===A.name,!!fin,!!sc, sc&&sc.pens?sc.pens[0]:null, adv?adv.a:null)}${koSide(id,'b',B,both,pick,sc?sc.ag:null,winner&&winner===B.name,!!fin,!!sc, sc&&sc.pens?sc.pens[1]:null, adv?adv.b:null)}</div></div>`;
}
function renderKnockout(){
  let cols="";
  for(const c of COLS){
    let games="";
    for(const id of c.ids) games+=`<div class="gw">${koCard(id)}</div>`;
    cols+=`<div class="col"><div class="chead">${c.name}</div><div class="games">${games}</div></div>`;
  }
  const champName=matchWinner("M104");
  const champ = champName
    ? `<div class="champ-banner"><span class="cup">🏆</span><span class="fl">${fl(champName)}</span>
         <span class="cwrap"><span class="cn ${champName===POR?'por':''}">${pt(champName)}</span><span class="ct">CAMPEÃO DO MUNDO</span></span></div>`
    : `<div class="champ-banner empty">🏆 Escolhe os vencedores até à final para coroar o campeão</div>`;
  const tp = `<div class="thirdplace"><div class="tp-h">Disputa do 3.º / 4.º lugar</div>${koCard("M103")}</div>`;
  document.getElementById("knockout").innerHTML =
    `<div class="bracket-hint"><span class="k">↔</span> Arrasta para o lado para veres o quadro todo</div>
     <div class="bracket-scroll"><div class="bracket">${cols}</div></div>
     ${champ}${tp}`;
}


/* ===================== LIVE DO MATA-ELIMINATÓRIAS ===================== */
function koPairKey(a,b){ return [a,b].sort().join("|"); }
// vencedor de um jogo ESPN entre A e B: usa a flag oficial 'winner'; senão, maior golo (cobre prolongamento);
// empate sem vencedor declarado (ex.: penáltis sem dados) -> null (não tranca).
function koWinnerOf(g,A,B){
  if(g.winner===A||g.winner===B) return g.winner;
  const sa=g.score[A], sb=g.score[B];
  if(Number.isFinite(sa)&&Number.isFinite(sb)&&sa!==sb) return sa>sb?A:B;
  return null;
}
// alinha PICKS com os vencedores já trancados em KO_FINAL (ordem do quadro: R32 antes das fases seguintes,
// para que resolveSrc("win:M##") já tenha o predecessor resolvido). Descarta um tranco que deixou de encaixar.
function syncKoPicks(){
  for(const id in ALLDEF){ const f=KO_FINAL[id]; if(!f) continue;
    const a=resolveSrc(ALLDEF[id][0]).name, b=resolveSrc(ALLDEF[id][1]).name;
    if(f.winner===a) PICKS[id]="a";
    else if(f.winner===b) PICKS[id]="b";
    else delete KO_FINAL[id];   // a estrutura do quadro mudou; este resultado já não pertence a este cartão
  }
}
// casa cada jogo real (por par de equipas) ao cartão correspondente; tranca vencedores e regista o placar ao vivo
function applyKnockoutLive(espnGames){
  const byPair={}; for(const g of espnGames) byPair[koPairKey(g.teams[0],g.teams[1])]=g;
  KO_LIVE={};                       // snapshot transitório reconstruído a cada fetch
  let changed=false, lockedNew=true, guard=0;
  while(lockedNew && guard++<8){ lockedNew=false;
    for(const id in ALLDEF){
      const A=resolveSrc(ALLDEF[id][0]).name, B=resolveSrc(ALLDEF[id][1]).name;
      if(!A||!B) continue;                                   // cartão ainda sem as duas equipas definidas
      const g=byPair[koPairKey(A,B)]; if(!g) continue;       // sem jogo real correspondente
      const hg=g.score[A], ag=g.score[B];
      const pa=g.pens?g.pens[A]:null, pb=g.pens?g.pens[B]:null;
      const pens=(Number.isFinite(pa)&&Number.isFinite(pb))?[pa,pb]:null;   // grandes penalidades, na ordem [A,B] do cartão
      if(g.state==="post"){
        const w=koWinnerOf(g,A,B); if(!w) continue;          // empate sem vencedor declarado: não tranca
        KO_LIVE[id]={hg,ag,state:"post",minute:90};
        const prev=KO_FINAL[id];
        const winChg = !prev || prev.winner!==w;
        const penChg = !!pens && (!prev || !prev.pens || prev.pens[0]!==pens[0] || prev.pens[1]!==pens[1]);
        if(winChg || penChg){
          if(prev && prev.winner!==w) clearDescendants(id);  // correção de um resultado já trancado -> limpa o ramo
          KO_FINAL[id]={winner:w, loser:w===A?B:A, hg:hg|0, ag:ag|0};
          if(pens) KO_FINAL[id].pens=[pens[0]|0,pens[1]|0];
          PICKS[id]= w===A ? "a" : "b";
          changed=true; if(winChg) lockedNew=true;           // novo vencedor trancado -> re-resolver os ramos seguintes
        }
      } else if(g.state==="in" && !KO_FINAL[id]){
        KO_LIVE[id]={hg,ag,state:"in",minute:g.minute|0};
        changed=true;                                        // jogo a decorrer -> refresca o cartão
      }
    }
  }
  return changed;
}

const LIVE_ENABLED = true;
const ESPN_URL = "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard";
// Mesma ordem do GROUPS[*].rem, em siglas ESPN. Casamos por sigla -> casa/fora e indiferente.
const ESPN_PAIRS = {
  J: [["ALG","AUT"], ["JOR","ARG"]],   // Argelia-Austria, Jordania-Argentina
  K: [["COL","POR"], ["COD","UZB"]],   // Colombia-Portugal, RD Congo-Usbequistao
  L: [["PAN","ENG"], ["CRO","GHA"]]    // Panama-Inglaterra, Croacia-Gana
};
function setLiveStatus(txt,cls){ const el=document.getElementById("liveStatus"); if(el){ el.textContent=txt; el.className="livestatus"+(cls?(" "+cls):""); } }
// datas (YYYYMMDD) dos jogos para pedir ao ESPN — o scoreboard "de hoje" deixa de listar jogos já terminados,
// por isso pedimos explicitamente os dias de cada jogo (e o anterior, por fuso) para apanhar os resultados finais.
function ymd(t){ const d=new Date(t); return ""+d.getUTCFullYear()+String(d.getUTCMonth()+1).padStart(2,"0")+String(d.getUTCDate()).padStart(2,"0"); }
function espnDates(){
  const set=new Set(), now=Date.now();
  // hoje e ontem (±1 dia por causa do fuso) — apanha jogos a decorrer e os que terminaram há pouco
  for(const off of [-1,0]) set.add(ymd(now+off*86400000));
  // jogos de grupo (J/K/L) ainda em aberto
  for(const G in KICKOFF){ const t=koTs(G); for(const off of [-1,0]) set.add(ymd(t+off*86400000)); }
  // jogos do mata-eliminatórias já agendados (≤ hoje) e ainda por trancar — re-consulta o dia para apanhar o resultado
  for(const id in SCHED){ if(KO_FINAL[id]) continue; const t=Date.parse(SCHED[id].d+"T12:00:00Z");
    if(Number.isFinite(t) && t<=now+86400000) for(const off of [-1,0]) set.add(ymd(t+off*86400000)); }
  return [...set].sort();
}
function stateRank(s){ return s==="post"?2 : s==="in"?1 : 0; }
function applyLive(data){
  if(!data||typeof data!=="object") return false;
  const rem=data.rem||null; if(!rem) return false;
  let changed=false;
  for(const G of "JKL".split("")){
    const arr=rem[G]; if(!Array.isArray(arr)) continue;
    for(let mi=0;mi<2;mi++){
      const s=arr[mi];
      if(Array.isArray(s)&&Number.isFinite(s[0])&&Number.isFinite(s[1])){
        const nv=[Math.max(0,s[0]|0),Math.max(0,s[1]|0)], cur=LSCORE[G][mi];
        if(!cur||cur[0]!==nv[0]||cur[1]!==nv[1]){ LSCORE[G][mi]=nv; changed=true; }   // atualiza só a verdade live
      }
    }
  }
  return changed;
}
async function fetchLive(manual){
  setLiveStatus("a obter…","load");
  try{
    const ctrl=new AbortController(); const tm=setTimeout(()=>ctrl.abort(),6000);
    // pede o scoreboard "de hoje" + os dias de cada jogo, e junta tudo (assim apanha jogos já terminados)
    const urls=[ESPN_URL, ...espnDates().map(d=>ESPN_URL+"?dates="+d)];
    const jsons=await Promise.all(urls.map(u=>
      fetch(u,{cache:"no-store",signal:ctrl.signal}).then(r=>r.ok?r.json():null).catch(()=>null)));
    clearTimeout(tm);
    const events=[];
    for(const j of jsons){ if(j&&Array.isArray(j.events)) events.push(...j.events); }
    if(!events.length) throw new Error("sem eventos");

    const gmap={};                         // sigla ESPN -> {score, state, minute} (usado pelos grupos J/K/L)
    const egame={};                        // id do jogo -> {teams,score,winner,state,minute} (usado pelo mata-eliminatórias)
    for(const ev of events){
      const comp=ev.competitions&&ev.competitions[0]; if(!comp) continue;
      const st=comp.status||ev.status||{};
      const state=(st.type&&st.type.state)||null;     // "pre" | "in" | "post"
      let minute=parseInt(st.displayClock,10);
      if(!Number.isFinite(minute)){
        if(/ht/i.test(st.displayClock||"")) minute=45;
        else if(Number.isFinite(st.clock)) minute=Math.round(st.clock/60);
        else minute = state==="post" ? 90 : 0;
      }
      const parts=[];
      for(const c of (comp.competitors||[])){
        const ab=c.team&&c.team.abbreviation, sc=parseInt(c.score,10), score=Number.isFinite(sc)?sc:null;
        const psc=parseInt(c.shootoutScore,10), pen=Number.isFinite(psc)?psc:null;   // grandes penalidades (só em jogo decidido nos penáltis)
        if(ab){ const prev=gmap[ab]; if(!(prev && stateRank(prev.state)>stateRank(state))) gmap[ab]={score, state, minute}; }
        const nm=espnTeamToInternal(c); if(nm) parts.push({name:nm, score, pen, winner:c.winner===true});
      }
      if(parts.length===2 && parts[0].name!==parts[1].name){
        const id=ev.id||(parts[0].name+"|"+parts[1].name), prev=egame[id];
        if(!(prev && stateRank(prev.state)>stateRank(state)))
          egame[id]={teams:[parts[0].name,parts[1].name],
            score:{[parts[0].name]:parts[0].score,[parts[1].name]:parts[1].score},
            pens:{[parts[0].name]:parts[0].pen,[parts[1].name]:parts[1].pen},
            winner:parts[0].winner?parts[0].name:(parts[1].winner?parts[1].name:null), state, minute};
      }
    }
    const espnGames=Object.values(egame);

    const rem={}, live={};
    for(const G of "JKL".split("")){
      rem[G]=ESPN_PAIRS[G].map(([h,a])=>[gmap[h]&&gmap[h].score, gmap[a]&&gmap[a].score]);
      live[G]=ESPN_PAIRS[G].map(([h,a])=>{ const e=gmap[h]||gmap[a]||{}; return {state:e.state||null, minute:Number.isFinite(e.minute)?e.minute:0}; });
    }
    LIVE=live;

    // tranca o resultado final assim que o jogo termina (state "post"): passa a verdade permanente e persiste
    let finalsChanged=false;
    for(const G of "JKL".split("")) for(let mi=0;mi<2;mi++){
      const sc=rem[G][mi];
      if(live[G][mi].state==="post" && Array.isArray(sc)&&Number.isFinite(sc[0])&&Number.isFinite(sc[1])){
        const key=G+":"+mi, nv=[Math.max(0,sc[0]|0),Math.max(0,sc[1]|0)], cur=FINAL[key];
        if(!cur||cur[0]!==nv[0]||cur[1]!==nv[1]){ FINAL[key]=nv; LSCORE[G][mi]=nv.slice(); finalsChanged=true; }
      }
    }

    // mata-eliminatórias: casa os jogos reais aos cartões do quadro (por par de equipas) e tranca vencedores
    const koChanged=applyKnockoutLive(espnGames);

    const updated=new Date().toLocaleTimeString("pt-PT",{hour:"2-digit",minute:"2-digit"});
    // o live só mexe em LSCORE; quando o placar/estado de J/K/L (ou do mata-eliminatórias) muda, recalcula todo o mundo
    if(applyLive({rem})||finalsChanged||koChanged) scoreChanged();
    const champ=!!KO_FINAL["M104"];
    setLiveStatus(champ?("terminado · "+updated):("ao vivo · "+updated), champ?"":"ok");
  }catch(e){ setLiveStatus(manual?"sem ligação — tenta de novo":"sem ligação","warn"); }
}

/* ===================== INTEGRAÇÃO COM O HUB ===================== */
let _inited=false,_mounted=false,_hubOnChange=null;
function _ensureInit(){ if(_inited) return; _inited=true; loadState(); recompute(); syncKoPicks(); }

/* renders que pertencem ao hub (grupos/terceiros/percurso completo) ficam neutralizados;
   quando o motor quer refrescar o percurso, pede ao hub via _hubOnChange */
renderTables=function(){};
renderThirds=function(){};
renderSelecao=function(){ if(_hubOnChange) _hubOnChange(); };
function scoreChanged(){ recompute(); renderKnockout(); saveState(); if(_hubOnChange) _hubOnChange(); }

function _onKoClick(e){
  const b=e.target.closest("button.koteam"); if(!b||b.disabled) return;
  const id=b.dataset.id, side=b.dataset.side;
  if(KO_FINAL[id]) return;   // resultado real trancado: não se altera manualmente
  if(PICKS[id]===side) delete PICKS[id]; else PICKS[id]=side;
  clearDescendants(id); renderKnockout(); if(_hubOnChange) _hubOnChange();
}
function mount(opts){
  _hubOnChange=(opts&&opts.onChange)||null;
  _ensureInit();
  const ko=document.getElementById("knockout");
  if(!_mounted && ko){ _mounted=true; ko.addEventListener("click",_onKoClick);
    fetchStandings(); fetchPublishedOdds();                 // odds publicadas (AppDataJSON) — todos veem
    if(LIVE_ENABLED){ fetchLive(false); setInterval(()=>fetchLive(false),60000); } }
  renderKnockout();
}
function reset(){ PICKS={}; syncKoPicks(); recompute(); renderKnockout(); saveState(); if(_hubOnChange) _hubOnChange(); }   // limpa escolhas manuais; resultados reais trancados mantêm-se

/* percurso: o mata-eliminatórias, no MESMO timeline da fase de grupos (prefix = etapa de grupos do hub) */
function percursoStagesHTML(t, prefix){
  _ensureInit();
  prefix=prefix||"";
  const m0=teamR32Match(t);
  if(!m0) return `<div class="stagewrap">${prefix}</div>`;   // eliminada nos grupos (a etapa de grupos já o diz)
  if(r32TeamsOf(m0).includes(null))
    return `<div class="stagewrap">${prefix}</div><div class="livenote"><span class="ic">🧭</span><div class="tx">A aguardar o fecho dos grupos para traçar o caminho.</div></div>`;
  const sim=simulateTeam(t,40000);
  if(!sim||sim.incomplete)
    return `<div class="stagewrap">${prefix}</div><div class="livenote"><span class="ic">🧭</span><div class="tx">A aguardar o fecho dos grupos.</div></div>`;
  const path=teamPathMatches(m0);
  const labels=["16-avos","Oitavos","Quartos","Meias-finais","Final"];
  const FULLLAB=lab=>({"16-avos":"16-avos de final","Oitavos":"Oitavos de final","Quartos":"Quartos de final"})[lab]||lab;
  let h=`<div class="stagewrap">`+prefix;
  let eliminated=false, apuradaMarked=false;
  for(let k=0;k<labels.length;k++){
    const lab=labels[k], id=path[k], fin=KO_FINAL[id];
    const playedHere = !!fin && (fin.winner===t || fin.loser===t);   // jogo REAL desta seleção nesta fase
    if(playedHere){
      // resultado real trancado: "venceu"/"eliminada" + adversário + placar à direita (igual às edições anteriores)
      const won = fin.winner===t;
      const teamIsA = resolveSrc(ALLDEF[id][0]).name===t;            // hg/ag = lados A/B do cartão
      const opp = won ? fin.loser : fin.winner;
      const myg = teamIsA ? fin.hg : fin.ag, og = teamIsA ? fin.ag : fin.hg;
      const pens = fin.pens ? (teamIsA ? ` · gp ${fin.pens[0]}–${fin.pens[1]}` : ` · gp ${fin.pens[1]}–${fin.pens[0]}`) : "";
      const rc = won?'done':'gone';
      const sl = schedLabel(id);                                     // data + local do jogo, se conhecidos
      h+=`<div class="stage ${rc}"><div class="sh"><span class="sr">${FULLLAB(lab)}</span>
        <span class="reach ${rc}">${won?'venceu':'eliminada'}</span></div>
        ${sl?`<div class="when"><span class="v">${sl}</span></div>`:""}
        <div class="oppwrap"><div class="oppline ${won?'cert':''} ${opp===POR?'por':''}">
          <span class="of">${fl(opp)}</span><span class="on">${pt(opp)}</span>
          <span class="kpath-sc">${myg}–${og}${pens}</span></div></div></div>`;
      if(!won){ eliminated=true; break; }                            // como nas edições anteriores: não mostra fases além da eliminação
      continue;
    }
    // sem jogo real desta seleção nesta fase: fase atual (já apurada, por jogar) ou fase futura (probabilidade)
    const reachC=sim.reach[lab]||0, p=reachC/sim.N;
    const cls=p>=0.999?"done":p>0?"reachable":"gone";
    let label, rcls;
    if(!apuradaMarked && p>=0.999){
      label="apurada"; rcls="done"; apuradaMarked=true;              // garantidamente presente, ainda por disputar
    } else {
      rcls=p>=0.999?"done":p<=0?"gone":(p>=0.5?"hi":"");
      label = p>=0.999 ? "apuramento garantido"
            : p<=0 ? "sem cenários"
            : ("probabilidade apuramento "+(p<0.01?"<1":Math.round(p*100))+" %");
    }
    h+=`<div class="stage ${cls}"><div class="sh"><span class="sr">${FULLLAB(lab)}</span>
      <span class="reach ${rcls}">${label}</span></div>
      <div class="when"><span class="v">${schedLabel(id)}</span></div>
      ${oppLinesHTML(sim.opp[lab],reachC)}</div>`;
  }
  h+=`</div>`;
  if(!eliminated){   // eliminada -> termina no jogo da queda (sem "campeão" nem disputa do 3.º/4.º especulativos)
    const champP=(sim.reach["Campeão"]||0)/sim.N;
    const champTxt = champP>=0.999 ? "garantido" : (champP<0.001?'<0,1%':(champP*100).toFixed(champP<0.1?1:0)+"%");
    h+=`<div class="champline"><span class="cup">🏆</span><span class="ct ${t===POR?'por':''}">${pt(t)} campeão</span>
         <span class="cp">${champTxt}</span></div>`;
    const tpRc=sim.reach["3.º/4.º lugar"]||0;
    if(tpRc>0){
      h+=`<div class="card" style="margin-top:12px"><div class="grp-h"><div class="nm" style="font-size:14px">Se perder a meia-final · disputa do 3.º/4.º lugar</div></div>
        <div class="when" style="margin:0 0 8px"><span class="v">${schedLabel("M103")}</span></div>
        ${oppLinesHTML(sim.opp["3.º/4.º lugar"],tpRc)}</div>`;
    }
  }
  return h;
}

/* item 3/4: top-3 adversários + expandir os restantes; sem "100%" quando é certeza */
oppLinesHTML=function(map, reachCount){
  const entries=[...map.entries()].sort((a,b)=>b[1]-a[1]);
  if(!entries.length||!reachCount) return `<div class="oppmore">—</div>`;
  const certain = entries.length===1 && entries[0][1]/reachCount>=0.999;
  const line=([o,c])=>{
    const p=c/reachCount, por=o===POR?' por':'';
    if(certain) return `<div class="oppline cert${por}"><span class="of">${fl(o)}</span><span class="on">${pt(o)}</span></div>`;   // 100% = jogo já agendado: sem rótulo
    const pn=p>=0.995?99:(p<0.01?0:Math.round(p*100)), pct=pn<1?'<1%':pn+'%';   // nunca 100% se não é certeza
    return `<div class="oppline${por}"><span class="of">${fl(o)}</span><span class="on">${pt(o)}</span>
      <span class="obar"><i style="width:${Math.max(2,Math.round(p*100))}%"></i></span><span class="op">${pct}</span></div>`;
  };
  let h=`<div class="oppwrap">`+entries.slice(0,3).map(line).join('');
  if(entries.length>3){
    const more=entries.length-3, lbl=more===1?'o outro adversário possível':('os outros '+more+' adversários possíveis');
    h+=`<details class="oppdetails"><summary>＋ ver ${lbl} ▾</summary>`
      + entries.slice(3).map(line).join('') + `</details>`;
  }
  return h+`</div>`;
};

/* item 6: hora portuguesa (converte a hora ET dos jogos para Europe/Lisbon) + dia da semana */
const WEEKDAYS_PT=["dom","seg","ter","qua","qui","sex","sáb"];
function fmtSched(s){ if(!s) return "";
  let day, mon, wd, timeTxt="";
  const m=s.t && /(\d{1,2}):(\d{2})/.exec(s.t);
  if(m){
    const et=new Date(`${s.d}T${m[1].padStart(2,'0')}:${m[2]}:00-04:00`);   // ET = EDT (UTC-4) no verão
    day=Number(et.toLocaleString('en-GB',{timeZone:'Europe/Lisbon',day:'numeric'}));
    mon=MONTHS_PT[Number(et.toLocaleString('en-GB',{timeZone:'Europe/Lisbon',month:'numeric'}))-1];
    wd=WEEKDAYS_PT[new Date(et.toLocaleString('en-US',{timeZone:'Europe/Lisbon'})).getDay()];
    const hm=et.toLocaleString('pt-PT',{timeZone:'Europe/Lisbon',hour:'2-digit',minute:'2-digit',hour12:false});
    timeTxt=' · '+hm.replace(':','h')+' (PT)';
  } else { const dt=new Date(s.d+'T12:00:00Z'); day=dt.getUTCDate(); mon=MONTHS_PT[dt.getUTCMonth()]; wd=WEEKDAYS_PT[dt.getUTCDay()]; }
  return `${wd}, ${day} ${mon}${timeTxt} · ${s.v}, ${s.c}`;
}
schedLabel=function(id){ return fmtSched(SCHED[id]); };

/* ===== Calendário da fase de grupos (janela 11–27 jun 2026; locais nos 16 estádios oficiais) =====
   Mesmo formato data/hora/local dos jogos do mata-eliminatórias, para cada jogo do grupo. */
// Os 16 estádios oficiais (código curto -> estádio, cidade)
const GROUP_STADIUMS={
  AZT:["Estádio Azteca","Cidade do México"], AKR:["Estádio Akron","Guadalajara"],
  BBVA:["Estádio BBVA","Monterrey"],         ATL:["Mercedes-Benz Stadium","Atlanta"],
  NY:["MetLife Stadium","Nova Iorque/NJ"],   BOS:["Gillette Stadium","Boston"],
  PHI:["Lincoln Financial Field","Filadélfia"], HOU:["NRG Stadium","Houston"],
  DAL:["AT&T Stadium","Dallas"],             KC:["Arrowhead Stadium","Kansas City"],
  SF:["Levi's Stadium","São Francisco"],     LA:["SoFi Stadium","Los Angeles"],
  SEA:["Lumen Field","Seattle"],             VAN:["BC Place","Vancouver"],
  TOR:["BMO Field","Toronto"],               MIA:["Hard Rock Stadium","Miami"]
};
// Calendário real da fase de grupos (FIFA 2026), por grupo × jogo (idx 0–5, na MESMA ordem
// dos jogos em data/2026.json): [dia de junho, código do estádio]. Datas e locais oficiais;
// não mostramos a hora exata do apito (as horas variam jogo-a-jogo e não são fiáveis à mão).
const GROUP_SCHED={
  A:[[11,"AZT"],[11,"AKR"],[18,"ATL"],[18,"AKR"],[24,"AZT"],[24,"BBVA"]],   // México em casa
  B:[[12,"TOR"],[13,"SF"],[18,"LA"],[18,"VAN"],[24,"VAN"],[24,"SEA"]],       // Canadá em casa
  C:[[13,"NY"],[13,"BOS"],[19,"BOS"],[19,"PHI"],[24,"MIA"],[24,"ATL"]],
  D:[[12,"LA"],[13,"VAN"],[19,"SEA"],[19,"SF"],[25,"LA"],[25,"SF"]],          // EUA em casa
  E:[[14,"HOU"],[14,"PHI"],[20,"TOR"],[20,"KC"],[25,"PHI"],[25,"NY"]],
  F:[[14,"DAL"],[14,"AKR"],[20,"HOU"],[20,"AKR"],[25,"DAL"],[25,"KC"]],
  G:[[15,"SEA"],[15,"LA"],[21,"LA"],[21,"VAN"],[26,"SEA"],[26,"VAN"]],
  H:[[15,"ATL"],[15,"MIA"],[21,"ATL"],[21,"MIA"],[26,"HOU"],[26,"AKR"]],
  I:[[16,"NY"],[16,"BOS"],[22,"PHI"],[22,"NY"],[26,"NY"],[26,"TOR"]],
  J:[[16,"KC"],[16,"SF"],[22,"DAL"],[22,"SF"],[27,"KC"],[27,"DAL"]],
  K:[[17,"HOU"],[17,"AZT"],[23,"HOU"],[23,"AKR"],[27,"MIA"],[27,"ATL"]],
  L:[[17,"DAL"],[17,"TOR"],[23,"BOS"],[23,"TOR"],[27,"NY"],[27,"PHI"]]
};
function groupSchedLabel(G, idx){
  const row=(GROUP_SCHED[G]||[])[idx]; if(!row||idx==null) return "";
  const [day,code]=row, vc=(code&&GROUP_STADIUMS[code])||["",""];
  return fmtSched({ d:`2026-06-${String(day).padStart(2,'0')}`, v:vc[0], c:vc[1] });   // data + local (sem hora)
}

/* ===== HUB · fase atual de uma seleção apurada (reflete os picks do bracket interativo) ===== */
function currentStage(t){
  _ensureInit();
  const m0=teamR32Match(t);
  if(!m0 || r32TeamsOf(m0).includes(null)) return null;          // eliminada nos grupos / grupos por fechar
  let cur=m0;
  while(WIN_PARENT[cur] && matchWinner(cur)===t) cur=WIN_PARENT[cur];   // sobe enquanto for a vencedora escolhida
  if(cur==="M104" && matchWinner("M104")===t) return {label:"Campeão", cls:"win"};
  const FULL={"16-avos":"16-avos de final","Oitavos":"Oitavos de final","Quartos":"Quartos de final","Meias-finais":"Meias-finais","Final":"Final"};
  const lab=ROUND_OF2[cur]||"16-avos";
  const fin=KO_FINAL[cur];
  if(fin && fin.loser===t) return {label:FULL[lab]||lab, cls:"out"};   // já caiu nesta fase -> badge "eliminada" (vermelho)
  return {label:FULL[lab]||lab, cls:"live"};
}

/* ===== PREVISÃO DOS SLOTS POR DEFINIR (quem ocupa cada lado de cada jogo) =====
   Para cada jogo, a distribuição de quem o VENCE e de quem o PERDE, propagada pelo modelo de
   força (a mesma matemática do percurso) mas RESPEITANDO as escolhas já feitas (PICKS): um jogo
   decidido pelo utilizador vira certeza e empurra-a para a frente. Serve para sugerir, nos jogos
   ainda sem adversário ("Vencedor/Perdedor Mxx"), as seleções mais prováveis em vez de "A definir". */
function bracketDists(){
  const r32={}; for(const id in R32DEF) r32[id]=r32TeamsOf(id);
  const winDist={}, loseDist={};
  function comp(id){
    if(winDist[id]) return;
    const wn=matchWinner(id);                                    // já escolhido na lista/bracket?
    if(wn){ winDist[id]=new Map([[wn,1]]); loseDist[id]=new Map([[matchLoser(id)||wn,1]]); return; }
    const ov=matchAdvanceProb(id);                               // odds de qualificação (já sorteado, com ajuste ao vivo)
    if(ov){ const A=resolveSrc(ALLDEF[id][0]).name, B=resolveSrc(ALLDEF[id][1]).name;
      winDist[id]=new Map([[A,ov.a],[B,ov.b]]); loseDist[id]=new Map([[A,ov.b],[B,ov.a]]); return; }
    if(R32DEF[id]){ const [a,b]=r32[id];
      if(a==null||b==null){ winDist[id]=new Map(); loseDist[id]=new Map(); return; }
      winDist[id]=new Map([[a,pWin(a,b)],[b,pWin(b,a)]]);
      loseDist[id]=new Map([[a,pWin(b,a)],[b,pWin(a,b)]]); return; }
    const sides=LATERDEF[id].map(s=>{ const [k,m]=s.split(":"); comp(m); return k==="win"?winDist[m]:loseDist[m]; });
    const [D1,D2]=sides, w=new Map(), l=new Map();
    for(const [t1,p1] of D1) for(const [t2,p2] of D2){ const pp=p1*p2; if(pp<=0) continue;
      const a=pWin(t1,t2);
      w.set(t1,(w.get(t1)||0)+pp*a);  w.set(t2,(w.get(t2)||0)+pp*(1-a));
      l.set(t2,(l.get(t2)||0)+pp*a);  l.set(t1,(l.get(t1)||0)+pp*(1-a)); }
    winDist[id]=w; loseDist[id]=l;
  }
  for(const id in ALLDEF) comp(id);
  return {winDist, loseDist};
}
// caminho estrutural (do vencedor) de uma seleção: todos os jogos onde ela PODE vir a jogar
function selPathSet(team){
  const m0=team&&teamR32Match(team); if(!m0) return new Set();
  const set=new Set([m0]); let c=m0;
  while(WIN_PARENT[c]){ c=WIN_PARENT[c]; set.add(c); }
  if(set.has("M101")||set.has("M102")) set.add("M103");         // se perder a meia, vai ao 3.º/4.º
  return set;
}
// previsão ordenada (desc) de quem ocupa um slot "win:Mxx"/"lose:Mxx"; null nos slots concretos
function slotPrediction(src, BD){
  const p=src.split(":"), k=p[0], m=p[1];
  if(k!=="win"&&k!=="lose") return null;
  const d = k==="win" ? BD.winDist[m] : BD.loseDist[m];
  if(!d||!d.size) return null;
  return [...d.entries()].sort((a,b)=>b[1]-a[1]);
}

/* ===== HUB · lista cronológica: calendário oficial do mata-eliminatórias (só playoffs) ===== */
function matchListHTML(selTeam){
  _ensureInit();
  const ME=selTeam||SEL_TEAM;
  const BD=bracketDists(), PATH=selPathSet(ME);
  const hdr=name=>`<div class="mlround"><span>${name}</span><span class="mlx"></span></div>`;
  const fmt=p=>{ const pn=p>=0.995?99:(p<0.01?0:Math.round(p*100)); return pn<1?'<1%':pn+'%'; };
  // distribuição (top-2 + a seleção destacada, se ficar de fora) de um slot por definir
  const predOf=src=>{ const pr=slotPrediction(src,BD); if(!pr||!pr.length) return null;
    const total=pr.reduce((s,e)=>s+e[1],0)||1, top=pr.slice(0,2); let extra=null;
    if(ME && !top.some(e=>e[0]===ME)){ const f=pr.find(e=>e[0]===ME); if(f) extra=f; }
    return {total, top, extra}; };
  const predLines=o=>{
    const line=(e,rk)=>`<span class="predline ${rk}${e[0]===ME?' sel':''}">`
      +`<span class="fl">${fl(e[0])}</span><span class="nm">${pt(e[0])}</span><span class="pp">${fmt(e[1]/o.total)}</span></span>`;
    return o.top.map((e,i)=>line(e,i===0?'p1':'p2')).join('')+(o.extra?line(o.extra,'pe'):''); };
  // um lado do jogo: concreto, ou previsão dos prováveis ocupantes, ou rótulo seco
  const side=(name,ph,o,which,win)=>{
    const cls=`s ${which}${win?' win':''}${name&&name===ME?' me':''}${!name&&o?' pred':''}`;
    if(name){ const nmfl=which==='h'
        ? `<span class="nm">${pt(name)}</span><span class="fl">${fl(name)}</span>`
        : `<span class="fl">${fl(name)}</span><span class="nm">${pt(name)}</span>`;
      return `<div class="${cls}">${nmfl}</div>`; }
    if(o) return `<div class="${cls}"><span class="predcol"><span class="plabel">${ph}</span>${predLines(o)}</span></div>`;
    return `<div class="${cls}"><span class="nm">${ph}</span><span class="fl">·</span></div>`;
  };
  let h="";
  // Só playoffs — calendário oficial FIFA, ordenado por data · hora; data/hora/local dentro da caixa
  const tmin=s=>{ const m=s&&s.t&&/(\d{1,2}):(\d{2})/.exec(s.t); return m?(+m[1]*60+ +m[2]):0; };
  const ids=Object.keys(SCHED).sort((x,y)=>{ const a=SCHED[x],b=SCHED[y]; return a.d!==b.d?(a.d<b.d?-1:1):(tmin(a)-tmin(b)); });
  const FULL={"16-avos":"16-avos de final","Oitavos":"Oitavos de final","Quartos":"Quartos de final"};
  let cur="";
  for(const id of ids){
    const rlab=FULL[ROUND_OF2[id]]||ROUND_OF2[id];
    if(rlab!==cur){ cur=rlab; h+=hdr(rlab); }
    const def=ALLDEF[id], A=resolveSrc(def[0]), B=resolveSrc(def[1]);
    const oA=A.name?null:predOf(def[0]), oB=B.name?null:predOf(def[1]);
    const winner=matchWinner(id);
    const concreteMe=A.name===ME||B.name===ME, onPath=PATH.has(id);
    const tm = concreteMe ? " tm" : (onPath ? " tm poss" : "");   // jogo possível da seleção destacada
    const predrow = (oA||oB) ? " predrow" : "";   // jogo por definir -> lados alinhados ao topo
    // placar/estado ao vivo: resultado trancado tem prioridade; senão o snapshot do fetch atual (lados na ordem A=h, B=a)
    const fin=KO_FINAL[id], lv=KO_LIVE[id];
    const sc = fin ? {hg:fin.hg, ag:fin.ag, pens:fin.pens||null} : (lv ? {hg:lv.hg, ag:lv.ag, pens:null} : null);
    const state = fin ? "post" : (lv ? lv.state : null);
    const liveChip = state==="in" ? `<span class="mlstate live">${lv&&lv.minute?lv.minute+"'":"a jogar"}</span>` : "";
    const pk = sc&&sc.pens ? `<span class="pk">gp ${sc.pens[0]}–${sc.pens[1]}</span>` : "";   // grandes penalidades (como nas edições anteriores)
    const mid = sc ? `<span class="sc">${sc.hg}–${sc.ag}${pk}</span>` : `<span class="sc up">vs</span>`;
    h+=`<div class="gpm${tm}${predrow}${state==="in"?" inplay":""}">
      ${side(A.name, A.tag||A.ph||"A definir", oA, 'h', winner&&winner===A.name)}
      <div class="mlmid">${mid}</div>
      ${side(B.name, B.tag||B.ph||"A definir", oB, 'a', winner&&winner===B.name)}
      <div class="mlin"><span class="v">${schedLabel(id)}</span>${liveChip}</div>
    </div>`;
  }
  return h;
}

window.LIVE2026={ mount, reset, percursoStagesHTML, currentStage, matchListHTML, groupSchedLabel,
  oddsInfo, oddsTargets, fetchPublishedOdds, renderKnockout:function(){ _ensureInit(); renderKnockout(); } };

})();
