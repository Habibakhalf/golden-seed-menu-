const app=document.getElementById('app'),cart={};
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmt=n=>Number(n).toFixed(2);
const step=it=>it.unit==='كيلو'?.5:1;
const ql=(it,q)=>it.unit==='كيلو'?(q===.5?'نصف كيلو':q+' كيلو'):q+' '+it.unit;
const qty=it=>`<div class="qty"><button data-a="minus" data-id="${it.id}">−</button><span>${cart[it.id]?ql(it,cart[it.id]):'0'}</span><button data-a="plus" data-id="${it.id}">+</button></div>`;
const price=it=>`<b>${fmt(it.price)} ج.م<small>/ ${esc(it.unit)}</small></b>`;
const card=it=>`<div class="card"><h2>${esc(it.ar)}</h2>${it.img?`<img src="${it.img}" alt="${esc(it.en)}">`:'<div class="noimg">بدون صورة</div>'}<div class="en">${esc(it.en)}</div><p class="desc">${esc(it.desc)}</p><div class="price">${it.tag?'<span class="tag">عرض</span>':'<span></span>'}${price(it)}</div>${qty(it)}</div>`;
const oil=it=>`<div class="oil">${it.img?`<img class="bt" src="${it.img}" alt="${esc(it.en)}">`:''}<div><h3>${esc(it.ar)}</h3><div class="en">${esc(it.en)}</div><p>${esc(it.desc)}</p>${price(it)}${qty(it)}</div></div>`;
function render(){
 const o=SITE.items.filter(i=>i.sec==='olive'),l=SITE.items.filter(i=>i.sec==='oil');
 let h=`<div class="grid">${o.map(card).join('')}</div>`;
 if(l.length)h+=`<p class="avail">زيت الزيتون</p><div class="oil-box">${l.map(oil).join('')}</div>`;
 const ln=SITE.items.filter(i=>cart[i.id]);
 if(ln.length){const tot=ln.reduce((s,i)=>s+i.price*cart[i.id],0),t='طلب جديد من المنيو 🫒\n'+ln.map(i=>`• ${i.ar} — ${ql(i,cart[i.id])} = ${fmt(i.price*cart[i.id])} ج.م`).join('\n')+`\nالإجمالي: ${fmt(tot)} ج.م\nالاسم:\nالعنوان:`;
  h+=`<div class="ob"><div>الإجمالي: <b>${fmt(tot)} ج.م</b></div><a href="https://wa.me/${SITE.phone}?text=${encodeURIComponent(t)}" target="_blank" rel="noopener">إرسال الطلب على واتساب</a></div>`}
 app.innerHTML=h}
app.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||!b.dataset.a)return;const id=+b.dataset.id,it=SITE.items.find(i=>i.id===id);if(!it)return;
 if(b.dataset.a==='plus')cart[id]=Math.round(((cart[id]||0)+step(it))*10)/10;
 else{const q=Math.round(((cart[id]||0)-step(it))*10)/10;if(q>0)cart[id]=q;else delete cart[id]}
 render()});
render();
