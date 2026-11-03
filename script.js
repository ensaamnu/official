
const L={cur:'ar'},$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const I=[
'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
'<path d="M12 6v14M12 6C9 4 5 4 3 5v14c2-1 6-1 9 1 3-2 7-2 9-1V5c-2-1-6-1-9 1z"/>',
'<path d="M9 3l4 2-3 8-4-2zM8 18h9M12 16a5 5 0 005-5M7 21h10"/>',
'<circle cx="12" cy="7" r="3"/><circle cx="5" cy="10" r="2"/><circle cx="19" cy="10" r="2"/><path d="M6 20c0-4 3-6 6-6s6 2 6 6"/>',
'<path d="M3 8h4l2-3h6l2 3h4v11H3z"/><circle cx="12" cy="13" r="3.5"/>',
'<path d="M2 9l10-5 10 5-10 5zM6 11v5c3 3 9 3 12 0v-5"/>',
'<path d="M12 20s-8-5-8-11a4.5 4.5 0 018-3 4.5 4.5 0 018 3c0 6-8 11-8 11z"/>'];
const ic=n=>`<span class="ic"><svg viewBox="0 0 24 24" aria-hidden="true">${I[n]}</svg></span>`;
const C=[
{k:'SCOPH',i:0,ar:'لجنة الصحة العامة',en:'Public Health Committee',d:'تهتم بتنظيم حملات التوعية، والاحتفاء بالأيام الصحية العالمية، وتعزيز الصحة المجتمعية، وتنفيذ القوافل والأنشطة التوعوية.',a:['Awareness campaigns','International health days','Community health promotion','Health caravans','Educational awareness']},
{k:'SCONE',i:1,ar:'لجنة التعليم التمريضي',en:'Nursing Education Committee',d:'تختص بتنظيم الورش والجلسات التعليمية، وتبسيط الموضوعات العلمية، وإعداد المحتوى والملخصات، وتنفيذ المسابقات والفعاليات التمريضية.',a:['Educational workshops','Academic sessions','Simplified scientific topics','Content and study summaries','Nursing competitions']},
{k:'SCOSRE',i:2,ar:'لجنة البحث العلمي والتبادل الطلابي',en:'Scientific Research and Student Exchange Committee',d:'تعمل على تنمية مهارات البحث العلمي، والتعريف بالمنح وفرص التبادل الطلابي، والمشاركة في المسابقات والمؤتمرات والفعاليات العلمية.',a:['Research skills','Scholarships and exchange opportunities','Scientific competitions','Scientific conferences']},
{k:'ETDD',i:3,ar:'قسم التعليم والتدريب والتطوير',en:'Education, Training and Development Department',d:'يهتم بتدريب الأعضاء وتنمية مهارات القيادة والإدارة والتنظيم والعمل الجماعي، من خلال ورش تدريبية وبرامج لتطوير المهارات الشخصية والمهنية.',a:['Member training','Leadership and management','Organization and planning','Teamwork','Personal and professional development']},
{k:'Media',i:4,ar:'لجنة الميديا',en:'Media Committee',d:'تتولى صناعة الهوية الإعلامية للجمعية من خلال التصميم الجرافيكي، وكتابة المحتوى، والتصوير، والمونتاج، وإدارة منصات التواصل وتغطية الفعاليات.',a:['Graphic design','Content writing','Photography','Video editing','Social media management','Event coverage']}];
const V=[[5,'التعليم','Education'],[3,'القيادة','Leadership'],[6,'الصحة المجتمعية','Community health'],[2,'البحث والتبادل','Research and exchange'],[4,'الإعلام والتواصل','Media and communication']];
const BL=[[5,'الطلاب والخريجون','Students and alumni'],[1,'خمس لجان وأقسام','Five committees and departments'],[3,'مجتمع واحد','One community']];
const T={ar:{tbc:'يُؤكَّد لاحقًا',sec:'أمين اللجنة',asst:'مساعد أمين اللجنة'},en:{tbc:'To be confirmed',sec:'Secretary',asst:'Assistant Secretary'}};
const tiers=()=>[
{ar:'مجلس الإدارة',en:'Board leadership',c:B.board||[]},
{ar:'قيادة الجمعية',en:'Association leadership',c:B.leadership||[]},
{ar:'اللجان والأقسام',en:'Committees and departments',c:C.map(x=>({ar:x.ar,en:x.k,two:1}))}];
let S={},B={},N={items:[]};
const YR=(y,ar)=>y?(ar?'الفرقة '+['','الأولى','الثانية','الثالثة','الرابعة'][y]:'Year '+y):'';
const NW=[['الأخبار','News']];
const JN=[['رابط التسجيل','Registration link','https://forms.gle/MSTFgeU1EehJxwdHA','سجّل الآن','Register now'],['البريد الرسمي','Official email','mailto:ensaamnu@gmail.com','ensaamnu@gmail.com','ensaamnu@gmail.com']];
let sel=0;
function cards(){const ar=L.cur=='ar';
 $('#cg').innerHTML=C.map((x,i)=>`<button class="cc" role="tab" aria-selected="${i==sel}" data-i="${i}"><span class="em" style="background-image:var(--e${i})" aria-hidden="true"></span><b>${x.k}</b><span>${ar?x.ar:x.en}</span></button>`).join('');
 $$('.cc').forEach(b=>b.onclick=()=>{sel=+b.dataset.i;cards();panel()});
}
function panel(){const x=C[sel],ar=L.cur=='ar';
 $('#panel').innerHTML=`<div class="pe"><span class="em" style="background-image:var(--e${sel})" role="img" aria-label="${x.k} emblem"></span><div><h3>${x.k} — ${ar?x.ar:x.en}</h3><p lang="ar">${x.d}</p><ul class="chips">${x.a.map(a=>`<li>${a}</li>`).join('')}</ul></div></div><svg viewBox="0 0 1200 40" preserveAspectRatio="none"><path d="M0 24H300l14-5 8 11 16-27 16 36 12-15h834" fill="none" stroke="#E5B84C" stroke-width="2" vector-effect="non-scaling-stroke"/></svg>`;
}
const esc=x=>String(x).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function news(ar){
 const it=(N.items||[]).map(n=>`<div class="live"><small>${esc(n.date||'')}</small><h3>${esc(n.title||'')}</h3>${n.text?`<p>${esc(n.text)}</p>`:''}${/^https?:/.test(n.link||'')?`<a class="lk" href="${esc(n.link)}" target="_blank" rel="noopener noreferrer">${ar?'اقرأ المزيد':'Read more'}</a>`:''}</div>`).join('');
 const fb=`<div class="live"><h3>${ar?'آخر الأخبار على صفحتنا في فيسبوك':'Latest news on our Facebook page'}</h3><p>${ar?'تابع أخبار الجمعية وإعلاناتها على صفحتنا في فيسبوك.':'Follow the association’s news and announcements on our Facebook page.'}</p><a class="lk" href="${SO[0][1]}" target="_blank" rel="noopener noreferrer">${ar?'افتح الصفحة':'Open the page'}</a></div>`;
 return it+fb;
}
function rest(){const ar=L.cur=='ar',t=T[L.cur],j=ar?1:2;
 $('#vl').innerHTML=V.map(v=>`<li>${ic(v[0])}${v[j]}</li>`).join('');
 $('#bl').innerHTML=BL.map(v=>`<li>${ic(v[0])}${v[j]}</li>`).join('');
 $('#nw').innerHTML=news(ar);
 $('#join').innerHTML=JN.map(v=>`<div class="live"><h3>${v[ar?0:1]}</h3><a class="lk" href="${v[2]}"${v[2].startsWith('http')?' target="_blank" rel="noopener noreferrer"':''}>${v[ar?3:4]}</a></div>`).join('');
 $('#tiers').innerHTML=tiers().map(r=>`<div class="tier"><div class="tl">${ar?r.ar:r.en}</div><div class="cards">${r.c.map(c=>`<div class="card"><b>${ar?c.ar:c.en}</b>${c.two?(S[c.en]||[]).map((p,j)=>`<span class="pp"><small>${j?t.asst:t.sec}</small><bdi lang="ar">${p[0]}</bdi><small>${YR(p[1],ar)}</small></span>`).join(''):c.n?`<span class="pp"><bdi lang="ar">${ar?c.n:(c.n2||c.n)}</bdi><small>${YR(c.y,ar)}</small></span>`:`<span class="tbc">${t.tbc}</span>`}</div>`).join('')}</div></div>`).join('');
}
function setLang(l){L.cur=l;const h=document.documentElement;h.lang=l;h.dir=l=='ar'?'rtl':'ltr';
 $$('[data-ar]').forEach(e=>e.textContent=e.dataset[l]);$('#lang').textContent=l=='ar'?'EN':'العربية';cards();panel();rest()}
$('#lang').onclick=()=>setLang(L.cur=='ar'?'en':'ar');
$('#sq').innerHTML='To be or not to be, we choose to lead.'.split(' ').map((w,i)=>`<span style="transition-delay:${300+i*130}ms">${w}</span>`).join(' ');
const SO=[['Facebook','https://www.facebook.com/share/19Pn8uCba2/'],['Instagram','https://www.instagram.com/ensaa_mnu_2026'],['LinkedIn','https://www.linkedin.com/in/ensaamnu/'],['YouTube','https://www.youtube.com/channel/UCAgNA7ZVKCt5_Ob7yDSiAYQ'],['X','https://x.com/ENSAAMNU'],['TikTok','https://www.tiktok.com/@ensaamnu']];
const IC={"Facebook":[512,512,"M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5l0-170.3-52.8 0 0-78.2 52.8 0 0-33.7c0-87.1 39.4-127.5 125-127.5 16.2 0 44.2 3.2 55.7 6.4l0 70.8c-6-.6-16.5-1-29.6-1-42 0-58.2 15.9-58.2 57.2l0 27.8 83.6 0-14.4 78.2-69.3 0 0 175.9C413.8 494.8 512 386.9 512 256z"],"Instagram":[448,512,"M224.3 141a115 115 0 1 0 -.6 230 115 115 0 1 0 .6-230zm-.6 40.4a74.6 74.6 0 1 1 .6 149.2 74.6 74.6 0 1 1 -.6-149.2zm93.4-45.1a26.8 26.8 0 1 1 53.6 0 26.8 26.8 0 1 1 -53.6 0zm129.7 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM399 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"],"LinkedIn":[448,512,"M416 32L31.9 32C14.3 32 0 46.5 0 64.3L0 447.7C0 465.5 14.3 480 31.9 480L416 480c17.6 0 32-14.5 32-32.3l0-383.4C448 46.5 433.6 32 416 32zM135.4 416l-66.4 0 0-213.8 66.5 0 0 213.8-.1 0zM102.2 96a38.5 38.5 0 1 1 0 77 38.5 38.5 0 1 1 0-77zM384.3 416l-66.4 0 0-104c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9l0 105.8-66.4 0 0-213.8 63.7 0 0 29.2 .9 0c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9l0 117.2z"],"YouTube":[576,512,"M549.7 124.1C543.5 100.4 524.9 81.8 501.4 75.5 458.9 64 288.1 64 288.1 64S117.3 64 74.7 75.5C51.2 81.8 32.7 100.4 26.4 124.1 15 167 15 256.4 15 256.4s0 89.4 11.4 132.3c6.3 23.6 24.8 41.5 48.3 47.8 42.6 11.5 213.4 11.5 213.4 11.5s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zM232.2 337.6l0-162.4 142.7 81.2-142.7 81.2z"],"X":[448,512,"M357.2 48L427.8 48 273.6 224.2 455 464 313 464 201.7 318.6 74.5 464 3.8 464 168.7 275.5-5.2 48 140.4 48 240.9 180.9 357.2 48zM332.4 421.8l39.1 0-252.4-333.8-42 0 255.3 333.8z"],"TikTok":[448,512,"M448.5 209.9c-44 .1-87-13.6-122.8-39.2l0 178.7c0 33.1-10.1 65.4-29 92.6s-45.6 48-76.6 59.6-64.8 13.5-96.9 5.3-60.9-25.9-82.7-50.8-35.3-56-39-88.9 2.9-66.1 18.6-95.2 40-52.7 69.6-67.7 62.9-20.5 95.7-16l0 89.9c-15-4.7-31.1-4.6-46 .4s-27.9 14.6-37 27.3-14 28.1-13.9 43.9 5.2 31 14.5 43.7 22.4 22.1 37.4 26.9 31.1 4.8 46-.1 28-14.4 37.2-27.1 14.2-28.1 14.2-43.8l0-349.4 88 0c-.1 7.4 .6 14.9 1.9 22.2 3.1 16.3 9.4 31.9 18.7 45.7s21.3 25.6 35.2 34.6c19.9 13.1 43.2 20.1 67 20.1l0 87.4z"]};
const soc=SO.map(s=>{const i=IC[s[0]];return `<a href="${s[1]}" target="_blank" rel="noopener noreferrer" aria-label="${s[0]}"><svg viewBox="0 0 ${i[0]} ${i[1]}" aria-hidden="true"><path d="${i[2]}"/></svg><span>${s[0]}</span></a>`}).join('');
$('#soc').innerHTML=soc;$('#fsoc').innerHTML=soc;
setLang('ar');setTimeout(()=>$('#sq').classList.add('in'),80);
Promise.all(['board','news'].map(f=>fetch('data/'+f+'.json').then(r=>r.json()).catch(()=>({})))).then(([b,n])=>{B=b;S=b.committees||{};N=n;setLang(L.cur)});

/* heartbeat strip */
(()=>{
 const cv=$('#strip'),cx=cv.getContext('2d'),hero=$('#home');
 const still=matchMedia('(prefers-reduced-motion:reduce)').matches;
 let w,h,P=[],last=0,spawn=0,mv=0;
 const g=(d,s)=>Math.exp(-d*d/(s*s));
 const shape=d=>-.18*g(d+30,8)+.14*g(d+10,2.5)-g(d,3.2)+.38*g(d-9,3.5)-.3*g(d-38,10);
 function fit(){const r=devicePixelRatio||1;w=cv.clientWidth;h=cv.clientHeight;cv.width=w*r;cv.height=h*r;cx.setTransform(r,0,0,r,0,0);draw()}
 function draw(){
  cx.clearRect(0,0,w,h);const m=h*.6,a=h*.4;
  const gr=cx.createLinearGradient(0,0,w,0);gr.addColorStop(0,'rgba(229,184,76,0)');gr.addColorStop(.12,'#E5B84C');gr.addColorStop(.88,'#E5B84C');gr.addColorStop(1,'rgba(229,184,76,0)');
  cx.strokeStyle=gr;cx.lineWidth=2.2;cx.lineJoin='round';cx.beginPath();
  for(let x=0;x<=w;x+=2){let y=m;for(const p of P)y+=a*shape(x-p);x?cx.lineTo(x,y):cx.moveTo(x,y)}
  cx.stroke();
 }
 function tick(t){const dt=Math.min(t-last,50);last=t;P=P.map(p=>p+dt*.22).filter(p=>p<w+80);spawn-=dt;if(spawn<=0){P.push(-60);spawn=2600}draw();requestAnimationFrame(tick)}
 const add=x=>{if(P.length<10)P.push(x)};
 hero.addEventListener('pointerdown',e=>{if(!e.target.closest('a'))add(e.clientX-cv.getBoundingClientRect().left)});
 cv.addEventListener('pointermove',e=>{const n=performance.now();if(n-mv>420){mv=n;add(e.clientX-cv.getBoundingClientRect().left)}});
 addEventListener('resize',fit);fit();
 if(still){P=[w*.3,w*.7];draw()}else requestAnimationFrame(tick);
})();
