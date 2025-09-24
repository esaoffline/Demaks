
// Demaks site runtime (header/footer inject, animations, data, pages, admin, etc.)
(function(){
  const PIN_KEY='demaksPIN';
  const DEFAULT_PIN='demaks123';
  const KEY='demaksData';

  const qs = (s,sc=document)=>sc.querySelector(s);
  const qsa = (s,sc=document)=>Array.from(sc.querySelectorAll(s));

  const dataDefaults = {
    hero: {
      title: 'Demaks Servis Ekipmanları',
      subtitle: 'Hızlı, Güvenilir, İşin Erbabı',
      imgUrl: 'https://images.unsplash.com/photo-1575356895330-4b2a2f20c9b9?q=80&w=1600&auto=format&fit=crop'
    },
    services: [
      {title:'Araç Kaldırma Liftleri', desc:'2/4 kolonlu ve makas liftleri kurulum & bakım', icon:'🚗'},
      {title:'Test & Balans', desc:'Denge, test ve kalibrasyon çözümleri', icon:'⚙️'},
      {title:'Kurulum & Eğitim', desc:'Saha kurulumu ve personel eğitimi', icon:'🎓'},
      {title:'Bakım & Destek', desc:'Periyodik bakım ve hızlı destek', icon:'🛠️'},
      {title:'Yedek Parça', desc:'Orijinal yedek parça tedariki', icon:'📦'},
      {title:'Danışmanlık', desc:'Proje ve saha uygunluk analizi', icon:'🧭'}
    ],
    partners: [
      'https://placehold.co/240x120/png?text=Partner+1',
      'https://placehold.co/240x120/png?text=Partner+2',
      'https://placehold.co/240x120/png?text=Partner+3',
      'https://placehold.co/240x120/png?text=Partner+4',
      'https://placehold.co/240x120/png?text=Partner+5',
      'https://placehold.co/240x120/png?text=Partner+6'
    ],
    products: Array.from({length:20}).map((_,i)=>({
      id: 'p'+(i+1),
      title: `Araç Kaldırma Platformu ${i+1}`,
      img: `https://placehold.co/800x600/jpg?text=Urun+${i+1}`,
      desc: 'Endüstriyel kullanım için dayanıklı, servis verimliliğini artıran çözüm.'
    }))
  };

  function load(){ try{ return JSON.parse(localStorage.getItem(KEY)) || dataDefaults }catch{ return dataDefaults } }
  function save(d){ localStorage.setItem(KEY, JSON.stringify(d)); }

  // Header / Footer inject
  function renderHeaderFooter(){
    const header = qs('#siteHeader');
    const footer = qs('#siteFooter');
    if(header){
      header.innerHTML = `
      <div class="container mx-auto px-4 py-3 flex items-center justify-between">
        <a href="index.html" class="flex items-center gap-3">
          <img src="assets/DEMAKS.png" alt="Demaks" class="h-9 w-auto"/>
          <div class="leading-tight">
            <div class="text-lg font-extrabold tracking-tight text-brand">Demaks</div>
            <div class="text-[11px] text-gray-500">Servis Ekipmanları</div>
          </div>
        </a>
        <nav class="hidden md:flex items-center gap-6 text-sm font-medium">
          <a class="hover:text-brand" href="hizmetler.html">Hizmetler</a>
          <a class="hover:text-brand" href="katalog.html">Katalog</a>
          <a class="hover:text-brand" href="partnerler.html">Partnerlerimiz</a>
          <a class="hover:text-brand" href="iletisim.html">İletişim</a>
          <a class="px-4 py-2 rounded-xl bg-brand text-white hover:opacity-90" href="admin.html">Admin</a>
        </nav>
        <button id="hamb" class="md:hidden p-2 rounded-lg border"><span>☰</span></button>
      </div>
      <div id="mnav" class="md:hidden hidden border-t border-gray-100 bg-white">
        <div class="container mx-auto px-4 py-3 grid gap-2 text-sm">
          <a class="py-1" href="hizmetler.html">Hizmetler</a>
          <a class="py-1" href="katalog.html">Katalog</a>
          <a class="py-1" href="partnerler.html">Partnerlerimiz</a>
          <a class="py-1" href="iletisim.html">İletişim</a>
          <a class="py-1" href="admin.html">Admin</a>
        </div>
      </div>`;
      const hamb = qs('#hamb'); const mnav = qs('#mnav');
      hamb && hamb.addEventListener('click', ()=>{ mnav.classList.toggle('hidden'); });
    }
    if(footer){
      const year = new Date().getFullYear();
      footer.innerHTML = `
      <div class="container mx-auto px-4 py-10 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <div class="font-bold text-brand mb-2">Demaks Servis Ekipmanları</div>
          <p class="text-gray-600">Hızlı, Güvenilir, İşin Erbabı.</p>
          <div class="mt-3 text-gray-600">© ${year} Demaks</div>
        </div>
        <div>
          <div class="font-semibold mb-2">Hızlı Bağlantılar</div>
          <ul class="space-y-1 text-gray-700">
            <li><a class="hover:text-brand" href="index.html">Ana Sayfa</a></li>
            <li><a class="hover:text-brand" href="hizmetler.html">Hizmetler</a></li>
            <li><a class="hover:text-brand" href="katalog.html">Katalog</a></li>
            <li><a class="hover:text-brand" href="partnerler.html">Partnerlerimiz</a></li>
          </ul>
        </div>
        <div>
          <div class="font-semibold mb-2">İletişim & Yasal</div>
          <ul class="space-y-1 text-gray-700">
            <li><a class="hover:text-brand" href="iletisim.html">+90 533 270 05 16</a></li>
            <li><a class="hover:text-brand" href="gizlilik.html">Gizlilik Politikası</a></li>
            <li><a class="hover:text-brand" href="sitemap.xml">Sitemap</a></li>
          </ul>
        </div>
      </div>`;
    }
  }

  // Back to top + reveal animations + cookie bar
  function ux(){
    const toTop = qs('#toTop');
    window.addEventListener('scroll', ()=>{
      if(window.scrollY>400) toTop.classList.remove('hidden'); else toTop.classList.add('hidden');
    });
    toTop && toTop.addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'}));

    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('show'); });
    },{threshold:.15});
    qsa('.reveal').forEach(el=>io.observe(el));

    const CK='cookieOK';
    const bar=qs('#cookieBar');
    if(localStorage.getItem(CK)!=='1') bar.classList.remove('hidden');
    qs('#cookieAccept')?.addEventListener('click', ()=>{localStorage.setItem(CK,'1'); bar.remove();});
    qs('#cookieDecline')?.addEventListener('click', ()=>{bar.remove();});
  }

  // Home partners
  function homePartners(){
    const wrap = qs('#homePartners'); if(!wrap) return;
    const d = load();
    wrap.innerHTML = d.partners.slice(0,6).map(u=>`
      <div class="bg-white border border-gray-200 rounded-xl p-3 grid place-items-center">
        <img src="${u}" alt="Partner" class="max-h-14 object-contain" loading="lazy"/>
      </div>`).join('');
  }

  // Services page
  function renderServices(){
    const grid = qs('#servicesGrid'); if(!grid) return;
    const d = load();
    grid.innerHTML = d.services.map(s=>`
      <div class="reveal bg-white border border-gray-200 rounded-2xl p-5 hover:shadow transition">
        <div class="text-2xl">${s.icon||'🔧'}</div>
        <h3 class="mt-2 font-bold text-brand">${s.title}</h3>
        <p class="text-gray-700 text-sm mt-1">${s.desc}</p>
      </div>`).join('');
  }

  // Catalog page with lightbox & arrow keys
  function renderCatalog(){
    const grid = qs('#grid'); if(!grid) return;
    const d = load();
    const urunSayisi = qs('#urunSayisi');
    const ara = qs('#ara');
    const sirala = qs('#sirala');
    const dialog = qs('#lightbox');
    const lbImg = qs('#lbImg');
    const lbTitle = qs('#lbTitle');
    const lbDesc = qs('#lbDesc');
    const lbClose = qs('#lbClose');
    let list = [...d.products];
    let currentIndex = -1;

    function applySort(arr){
      if(sirala.value==='az') arr.sort((a,b)=>a.title.localeCompare(b.title));
      if(sirala.value==='za') arr.sort((a,b)=>b.title.localeCompare(a.title));
    }
    function render(arr){
      urunSayisi.textContent = arr.length;
      grid.innerHTML = arr.map((p,i)=>`
      <article class="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col hover:shadow transition">
        <button class="group" data-idx="${i}" aria-label="${p.title}">
          <img src="${p.img}" alt="${p.title}" class="w-full h-48 object-cover group-hover:opacity-95" loading="lazy"/>
        </button>
        <div class="p-4 flex-1 flex flex-col">
          <h3 class="font-bold text-brand">${p.title}</h3>
          <p class="text-sm text-gray-700 mt-1 line-clamp-2">${p.desc}</p>
          <div class="mt-auto pt-3">
            <a href="https://wa.me/905332700516?text=${encodeURIComponent('Merhaba, '+p.title+' ürünü hakkında bilgi almak istiyorum.')}" class="text-sm inline-block px-3 py-2 rounded-lg bg-brand text-white">Bilgi Al</a>
          </div>
        </div>
      </article>`).join('');
    }
    applySort(list); render(list);

    grid.addEventListener('click', (e)=>{
      const btn = e.target.closest('button[data-idx]'); if(!btn) return;
      currentIndex = +btn.dataset.idx;
      const p = list[currentIndex];
      lbImg.src = p.img; lbTitle.textContent = p.title; lbDesc.textContent = p.desc;
      try{ dialog.showModal(); }catch{ dialog.setAttribute('open','open'); }
    });
    lbClose?.addEventListener('click', ()=>dialog.close());
    dialog?.addEventListener('keydown', (ev)=>{
      if(ev.key==='ArrowRight'){ currentIndex = (currentIndex+1)%list.length; const p=list[currentIndex]; lbImg.src=p.img; lbTitle.textContent=p.title; lbDesc.textContent=p.desc; }
      if(ev.key==='ArrowLeft'){ currentIndex = (currentIndex-1+list.length)%list.length; const p=list[currentIndex]; lbImg.src=p.img; lbTitle.textContent=p.title; lbDesc.textContent=p.desc; }
    });

    ara?.addEventListener('input', ()=>{
      const q = ara.value.trim().toLowerCase();
      list = d.products.filter(p=> (p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)) );
      applySort(list); render(list);
    });
    sirala?.addEventListener('change', ()=>{ applySort(list); render(list); });
  }

  // Partners page
  function renderPartnersPage(){
    const grid = qs('#partnersGrid'); if(!grid) return;
    const d = load();
    let list = [...d.partners];
    function render(arr){
      grid.innerHTML = arr.map(u=>`
        <div class="bg-white border border-gray-200 rounded-xl p-3 grid place-items-center">
          <img src="${u}" alt="Partner" class="max-h-14 object-contain" loading="lazy"/>
        </div>`).join('');
    }
    render(list);
    const s = qs('#partnerAra'), sel = qs('#partnerSirala');
    s?.addEventListener('input', ()=>{
      const q = (s.value||'').toLowerCase();
      list = d.partners.filter(u => u.toLowerCase().includes(q));
      if(sel.value==='az') list.sort((a,b)=>a.localeCompare(b));
      if(sel.value==='za') list.sort((a,b)=>b.localeCompare(a));
      render(list);
    });
    sel?.addEventListener('change', ()=>{
      if(sel.value==='az') list.sort((a,b)=>a.localeCompare(b));
      if(sel.value==='za') list.sort((a,b)=>b.localeCompare(a));
      render(list);
    });
  }

  // Admin logic
  function adminInit(){
    if(!/admin\.html$/.test(location.pathname)) return;
    if(!localStorage.getItem(PIN_KEY)) localStorage.setItem(PIN_KEY, DEFAULT_PIN);
    const dlg = qs('#loginDialog'); const pinInput = qs('#pinInput'); const submit = qs('#pinSubmit');
    function openDialog(){ try{ dlg.showModal(); }catch{ dlg.setAttribute('open','open'); } }
    openDialog();
    submit?.addEventListener('click', ()=>{
      if(pinInput.value === localStorage.getItem(PIN_KEY)){ dlg.close(); } else { alert('Hatalı PIN'); }
    });

    const d = load();
    // hero
    const heroTitle = qs('#heroTitle'), heroSubtitle=qs('#heroSubtitle'), heroImgUrl=qs('#heroImgUrl');
    if(heroTitle){ heroTitle.value=d.hero.title; heroSubtitle.value=d.hero.subtitle; heroImgUrl.value=d.hero.imgUrl; }
    qs('#saveHero')?.addEventListener('click', ()=>{
      d.hero.title = heroTitle.value.trim() || dataDefaults.hero.title;
      d.hero.subtitle = heroSubtitle.value.trim() || dataDefaults.hero.subtitle;
      d.hero.imgUrl = heroImgUrl.value.trim() || dataDefaults.hero.imgUrl;
      save(d); alert('Hero güncellendi.');
    });

    // partners
    const partnerList = qs('#partnerList');
    function renderPartners(){ partnerList.innerHTML = d.partners.map((u,i)=>`
      <div class="border rounded-xl p-3 bg-white relative">
        <img src="${u}" class="h-14 object-contain mx-auto"/>
        <button data-i="${i}" class="removePartner absolute -top-2 -right-2 bg-brand text-white rounded-full w-7 h-7">×</button>
      </div>`).join(''); }
    renderPartners();
    qs('#addPartner')?.addEventListener('click', ()=>{
      const url = qs('#partnerUrl').value.trim(); if(!url) return;
      d.partners.push(url); save(d); qs('#partnerUrl').value=''; renderPartners();
    });
    partnerList?.addEventListener('click', (e)=>{
      const btn = e.target.closest('.removePartner'); if(!btn) return;
      d.partners.splice(+btn.dataset.i,1); save(d); renderPartners();
    });

    // products
    const productList = qs('#productList');
    function renderProducts(){ productList.innerHTML = d.products.map((p,i)=>`
      <div class="border rounded-2xl overflow-hidden bg-white">
        <img src="${p.img}" class="w-full h-36 object-cover"/>
        <div class="p-3">
          <div class="font-bold text-brand">${p.title}</div>
          <div class="text-sm text-gray-700 line-clamp-2">${p.desc}</div>
          <div class="mt-2 flex justify-end">
            <button data-i="${i}" class="removeProduct px-3 py-1 text-sm rounded-lg border border-brand text-brand">Sil</button>
          </div>
        </div>
      </div>`).join(''); }
    renderProducts();
    qs('#addProduct')?.addEventListener('click', ()=>{
      const title = qs('#pTitle').value.trim();
      const img = qs('#pImg').value.trim();
      const desc = qs('#pDesc').value.trim();
      if(!title || !img) return alert('Başlık ve görsel URL zorunludur.');
      d.products.push({ id:'p'+Date.now(), title, img, desc });
      save(d); qs('#pTitle').value=''; qs('#pImg').value=''; qs('#pDesc').value=''; renderProducts();
    });
    qs('#clearProducts')?.addEventListener('click', ()=>{
      if(confirm('Tüm ürünler silinsin mi?')){ d.products=[]; save(d); renderProducts(); }
    });
    productList?.addEventListener('click', (e)=>{
      const btn = e.target.closest('.removeProduct'); if(!btn) return;
      d.products.splice(+btn.dataset.i,1); save(d); renderProducts();
    });

    // PIN change
    qs('#setPinBtn')?.addEventListener('click', ()=>{
      const v = (qs('#newPin').value||'').trim(); if(v.length<4) return alert('PIN en az 4 karakter olmalı.');
      localStorage.setItem(PIN_KEY, v); qs('#newPin').value=''; alert('PIN güncellendi.');
    });

    // Backup
    qs('#exportJson')?.addEventListener('click', ()=>{
      const blob = new Blob([JSON.stringify(load(), null, 2)], {type:'application/json'});
      const url = URL.createObjectURL(blob); const a = document.createElement('a');
      a.href=url; a.download='demaks-data.json'; a.click(); URL.revokeObjectURL(url);
    });
    qs('#importJson')?.addEventListener('click', ()=>{
      const f = qs('#importFile').files?.[0]; if(!f) return alert('JSON dosyası seçin.');
      const reader = new FileReader();
      reader.onload = ()=>{ try{ const obj=JSON.parse(reader.result); localStorage.setItem(KEY, JSON.stringify(obj)); alert('Veri içe aktarıldı. Sayfayı yenileyin.'); }catch{ alert('Geçersiz JSON.')} };
      reader.readAsText(f);
    });
  }

  // Schema.org JSON-LD
  function injectSchema(){
    const script = document.createElement('script');
    script.type='application/ld+json';
    script.textContent = JSON.stringify({
      "@context":"https://schema.org",
      "@type":"LocalBusiness",
      "name":"Demaks Servis Ekipmanları",
      "url": location.origin + '/' ,
      "logo": location.origin + "/assets/DEMAKS.png",
      "telephone":"+905332700516",
      "address":{
        "@type":"PostalAddress",
        "streetAddress":"Atalar, Gültürkler Sk. No:11/A",
        "addressLocality":"Kartal",
        "addressRegion":"İstanbul",
        "postalCode":"34862",
        "addressCountry":"TR"
      }
    });
    document.head.appendChild(script);
  }

  // init
  document.addEventListener('DOMContentLoaded', function(){
    renderHeaderFooter();
    ux();
    homePartners();
    renderServices();
    renderCatalog();
    renderPartnersPage();
    adminInit();
    injectSchema();
  });
})();
