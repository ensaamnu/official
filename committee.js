const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=x=>String(x??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const K=(new URLSearchParams(location.search).get('c')||'').toUpperCase();
const Y=['','الأولى','الثانية','الثالثة','الرابعة'];
const T={ar:{sec:'أمين اللجنة',asst:'مساعد أمين اللجنة',lead:'قيادة اللجنة',mem:'الأعضاء',act:'أحدث الأنشطة',nw:'أخبار اللجنة',none:'سيتم إضافة المحتوى قريبًا.',all:'كل اللجان',more:'اقرأ المزيد',nf:'اللجنة غير موجودة.'},en:{sec:'Secretary',asst:'Assistant Secretary',lead:'Committee leadership',mem:'Members',act:'Latest activities',nw:'Committee news',none:'Content coming soon.',all:'All committees',more:'Read more',nf:'Committee not found.'}};
let L='ar',D={},B={},N={};
const yr=y=>y?(L=='ar'?'الفرقة '+Y[y]:'Year '+y):'';
const pp=p=>`<span class="pp"><bdi lang="ar">${esc(p[0])}</bdi><small>${yr(p[1])}</small></span>`;
const byD=(a,b)=>String(b.date||'').localeCompare(String(a.date||''));
const blk=(n,t)=>{const ar=L=='ar',tx=ar?n.text:(n.text_en||n.text);return `<div class="live">${/^images\//.test(n.image||'')?`<img class="ni" src="${esc(n.image)}" alt="" loading="lazy">`:''}<small>${esc(n.date||'')}</small><h3>${esc(ar?n.title||'':(n.title_en||n.title||''))}</h3>${tx?`<p>${esc(tx)}</p>`:''}${/^https?:/.test(n.link||'')?`<a class="lk" href="${esc(n.link)}" target="_blank" rel="noopener noreferrer">${t.more}</a>`:''}</div>`};
const sec=(h,b)=>`<h3 class="sh">${h}</h3>${b||''}`;
function draw(){
 const ar=L=='ar',t=T[L],h=document.documentElement;h.lang=L;h.dir=ar?'rtl':'ltr';
 $$('[data-ar]').forEach(e=>e.textContent=e.dataset[L]);$('#lang').textContent=ar?'EN':'العربية';
 const k=Object.keys(D).find(x=>x.toUpperCase()==K),c=D[k],m=$('#cm');
 if(!c){m.innerHTML=`<p>${t.nf}</p><a class="btn" href="index.html#committees">${t.all}</a>`;return}
 document.title=k+' | ENSAA × MNU Nursing';
 const ld=(B.committees||{})[k]||[],ns=(N.items||[]).filter(n=>n.committee==k).sort(byD),ac=(c.activities||[]).slice().sort(byD),mb=c.members||[];
 const none=`<p class="nt">${t.none}</p>`;
 m.innerHTML=`<a class="lk" href="index.html#committees">${ar?'→':'←'} ${t.all}</a>
 <h2>${esc(k)} — ${esc(ar?c.ar:c.en)}</h2>
 <p class="cd" lang="ar">${esc(c.d)}</p>
 <ul class="chips">${(c.a||[]).map(a=>`<li>${esc(a)}</li>`).join('')}</ul>
 ${sec(t.lead,`<div class="tier"><div class="cards">${[0,1].map(i=>`<div class="card"><b>${i?t.asst:t.sec}</b>${ld[i]&&ld[i][0]?pp(ld[i]):''}</div>`).join('')}</div></div>`)}
 ${sec(t.mem,mb.length?`<div class="tier"><div class="cards">${mb.map(p=>`<div class="card">${pp(p)}</div>`).join('')}</div></div>`:none)}
 ${sec(t.act,ac.length?`<div class="ph3">${ac.map(a=>blk(a,t)).join('')}</div>`:none)}
 ${sec(t.nw,ns.length?`<div class="ph3">${ns.map(n=>blk(n,t)).join('')}</div>`:none)}`;
}
$('#lang').onclick=()=>{L=L=='ar'?'en':'ar';draw()};
Promise.all(['committees','board','news'].map(f=>fetch('data/'+f+'.json',{cache:'no-cache'}).then(r=>r.json()).catch(()=>({})))).then(([d,b,n])=>{D=d;B=b;N=n;draw()});
