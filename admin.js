const $=s=>document.querySelector(s),esc=x=>String(x??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let R='',TK='',BR='main',NEWS=[];
const byD=(a,b)=>String(b.date||'').localeCompare(String(a.date||''));
const msg=(t,bad)=>{const m=$('#msg');m.textContent=t;m.className=bad?'bad':'ok'};
const api=async(p,o={})=>{const r=await fetch('https://api.github.com/repos/'+R+p,{...o,cache:'no-store',headers:{Authorization:'Bearer '+TK,Accept:'application/vnd.github+json','Content-Type':'application/json'}});const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(r.status+' '+(j.message||''));return j};
const u8=s=>{const b=new TextEncoder().encode(s);let o='';for(let i=0;i<b.length;i+=8192)o+=String.fromCharCode(...b.subarray(i,i+8192));return btoa(o)};
const rd=async f=>{const j=await api('/contents/'+f+'?ref='+BR);return{d:JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(j.content.replace(/\n/g,'')),c=>c.charCodeAt(0)))),sha:j.sha}};
const wr=(f,b64,sha,m)=>api('/contents/'+f,{method:'PUT',body:JSON.stringify({message:m,branch:BR,content:b64,...(sha?{sha}:{})})});
const wj=(f,d,sha,m)=>wr(f,u8(JSON.stringify(d,null,1)+'\n'),sha,m);
const shrink=f=>new Promise((ok,no)=>{const i=new Image();i.onload=()=>{const s=Math.min(1,1400/Math.max(i.width,i.height)),c=document.createElement('canvas');c.width=Math.round(i.width*s);c.height=Math.round(i.height*s);c.getContext('2d').drawImage(i,0,0,c.width,c.height);ok(c.toDataURL('image/jpeg',.82).split(',')[1])};i.onerror=()=>no(new Error('الصورة مش مقروءة'));i.src=URL.createObjectURL(f)});

async function login(){R=$('#repo').value.trim();TK=$('#tk').value.trim();
 try{const j=await api('');BR=j.default_branch||'main';(($('#rem').checked)?localStorage:sessionStorage).setItem('gh',JSON.stringify({R,TK}));start()}
 catch(e){msg('فشل الدخول: '+e.message,1)}}
async function start(){$('#lg').hidden=true;$('#app').hidden=false;msg('');resetForm();try{await loadNews();await loadCm()}catch(e){msg('تعذر تحميل البيانات: '+e.message,1)}}
function logout(){sessionStorage.removeItem('gh');localStorage.removeItem('gh');location.reload()}
function tab(n){$('#p1').hidden=n!=1;$('#p2').hidden=n!=2;$('#t1').className=n==1?'on':'';$('#t2').className=n==2?'on':''}

/* الأخبار */
async function loadNews(){const{d}=await rd('data/news.json');NEWS=(d.items||[]).sort(byD);
 $('#nl').innerHTML=NEWS.map((n,i)=>`<div class="live"><small>${esc(n.date||'')} • ${esc(n.committee||'عام')}</small><h3>${esc(n.title)}</h3><button type="button" data-e="${i}">تعديل</button><button type="button" data-d="${i}">حذف</button></div>`).join('')||'<p>مفيش أخبار لسه.</p>'}
function resetForm(){['id','im','title','text','title_en','text_en','link'].forEach(k=>$('#'+k).value='');$('#cm').value='';$('#img').value='';$('#cur').textContent='';$('#date').value=new Date().toISOString().slice(0,10);$('#ft').textContent='خبر جديد'}
function edit(n){$('#id').value=n.id||'';$('#im').value=n.image||'';['title','text','title_en','text_en','link','date'].forEach(k=>$('#'+k).value=n[k]||'');$('#cm').value=n.committee||'';$('#cur').textContent=n.image?'الصورة الحالية: '+n.image+' (ارفع صورة جديدة لو عايز تبدلها)':'';$('#ft').textContent='تعديل خبر';scrollTo(0,0)}
async function saveNews(){try{
 const title=$('#title').value.trim();if(!title)throw new Error('العنوان مطلوب');
 msg('جاري الحفظ…');let im=$('#im').value;const f=$('#img').files[0];
 if(f){const p='images/news/'+Date.now()+'.jpg';await wr(p,await shrink(f),null,'news image');im=p}
 const{d,sha}=await rd('data/news.json'),items=d.items||[],id=$('#id').value||String(Date.now());
 const n={id,date:$('#date').value,committee:$('#cm').value,title,title_en:$('#title_en').value.trim(),text:$('#text').value.trim(),text_en:$('#text_en').value.trim(),link:$('#link').value.trim(),image:im};
 Object.keys(n).forEach(k=>!n[k]&&delete n[k]);
 const i=items.findIndex(x=>String(x.id)==id);i<0?items.unshift(n):items[i]=n;
 await wj('data/news.json',{items},sha,'news: '+title);
 msg('اتحفظ ✔ الموقع هيتحدث خلال دقيقة تقريبًا');resetForm();await loadNews()
}catch(e){msg('فشل: '+e.message,1)}}
async function delNews(n){if(!confirm('حذف الخبر "'+n.title+'"؟'))return;try{
 const{d,sha}=await rd('data/news.json');await wj('data/news.json',{items:(d.items||[]).filter(x=>String(x.id)!=String(n.id))},sha,'delete news');msg('اتمسح ✔');await loadNews()
}catch(e){msg('فشل: '+e.message,1)}}

/* اللجان */
async function loadCm(){const k=$('#ck').value,[b,c]=await Promise.all([rd('data/board.json'),rd('data/committees.json')]),l=(b.d.committees||{})[k]||[],x=c.d[k]||{};
 [0,1].forEach(i=>{$('#s'+i).value=(l[i]||[])[0]||'';$('#y'+i).value=(l[i]||[])[1]||''});
 $('#mem').value=(x.members||[]).map(m=>m[0]+' | '+(m[1]||'')).join('\n');
 $('#act').value=(x.activities||[]).map(a=>[a.date,a.title,a.text].map(v=>v||'').join(' | ')).join('\n')}
async function saveCm(){try{msg('جاري الحفظ…');const k=$('#ck').value;
 const members=$('#mem').value.split('\n').map(s=>s.trim()).filter(Boolean).map(s=>{const p=s.split('|').map(v=>v.trim());return[p[0],+p[1]||0]});
 const activities=$('#act').value.split('\n').map(s=>s.trim()).filter(Boolean).map(s=>{const p=s.split('|').map(v=>v.trim());return{date:p[0]||'',title:p[1]||'',text:p.slice(2).join(' | ')}});
 const b=await rd('data/board.json');b.d.committees=b.d.committees||{};b.d.committees[k]=[0,1].map(i=>[$('#s'+i).value.trim(),+$('#y'+i).value||0]);
 await wj('data/board.json',b.d,b.sha,'board: '+k);
 const c=await rd('data/committees.json');c.d[k]=c.d[k]||{};c.d[k].members=members;c.d[k].activities=activities;
 await wj('data/committees.json',c.d,c.sha,'committee: '+k);
 msg('اتحفظ ✔ الموقع هيتحدث خلال دقيقة تقريبًا')
}catch(e){msg('فشل: '+e.message,1)}}

$('#go').onclick=login;$('#out').onclick=logout;$('#t1').onclick=()=>tab(1);$('#t2').onclick=()=>tab(2);
$('#sv').onclick=saveNews;$('#rs').onclick=resetForm;$('#sc').onclick=saveCm;
$('#ck').onchange=()=>loadCm().catch(e=>msg(e.message,1));
$('#nl').onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.e!=null)edit(NEWS[+b.dataset.e]);if(b.dataset.d!=null)delNews(NEWS[+b.dataset.d])};
try{const s=JSON.parse(sessionStorage.getItem('gh')||localStorage.getItem('gh')||'null');if(s){R=s.R;TK=s.TK;api('').then(j=>{BR=j.default_branch||'main';start()}).catch(()=>{$('#repo').value=s.R})}}catch(e){}
