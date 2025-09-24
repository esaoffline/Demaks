(function(){
  const PIN_KEY='demaksPIN';
  const DEFAULT_PIN='demaks123';
  const KEY='demaksData';
  const qs=(s,sc=document)=>sc.querySelector(s);
  const qsa=(s,sc=document)=>Array.from(sc.querySelectorAll(s));

  const dataDefaults = {
    hero: { title:'Demaks Servis Ekipmanları', subtitle:'Hızlı, Güvenilir, İşin Erbabı', imgUrl:'assets/hero_main.jpg' },
    partners: []
  };
  function load(){ try{ return JSON.parse(localStorage.getItem(KEY)) || dataDefaults }catch{ return dataDefaults } }
  function save(d){ localStorage.setItem(KEY, JSON.stringify(d)); }

  function renderHeaderFooter(){
    const header=qs('#siteHeader'), footer=qs('#siteFooter');
    if(header){
      header.innerHTML=`
      <div class="container mx-auto px-4 py-3 flex items-center justify-between">
        <a href="index.html" class="flex items-center gap-3">
          <img src="assets/DEMAKS.png" alt="Demaks" class="h-12 w-auto"/>
        </a>
        <nav class="hidden md:flex items-center gap-6 text-sm font-medium">
          <a class="hover:text-brand" href="hizmetler.html">Hizmetler</a>
          <a class="hover:text-brand" href="katalog.html">Katalog</a>
          <a class="hover:text-brand" href="partnerler.html">Partnerlerimiz</a>
          <a class="hover:text-brand" href="iletisim.html">İletişim</a>
        </nav>
        <button id="hamb" class="md:hidden p-2 rounded-lg border"><span>☰</span></button>
      </div>
      <div id="mnav" class="md:hidden hidden border-t border-gray-100 bg-white">
        <div class="container mx-auto px-4 py-3 grid gap-2 text-sm">
          <a class="py-1" href="hizmetler.html">Hizmetler</a>
          <a class="py-1" href="katalog.html">Katalog</a>
          <a class="py-1" href="partnerler.html">Partnerlerimiz</a>
          <a class="py-1" href="iletisim.html">İletişim</a>
        </div>
      </div>`;
      const hamb=qs('#hamb'), mnav=qs('#mnav'); hamb&&hamb.addEventListener('click',()=>mnav.classList.toggle('hidden'));
    }
    if(footer){
      footer.innerHTML=`
      <div class="container mx-auto px-4 py-10 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <div class="font-bold text-brand mb-2">Demaks Servis Ekipmanları</div>
          <p class="text-gray-600">Hızlı, Güvenilir, İşin Erbabı.</p>
          <div class="mt-3 text-gray-600">© 2021 Demaks</div>
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
            <li><a class="hover:text-brand" href="mailto:d.suleymanagaoglu@demakservis.com">d.suleymanagaoglu@demakservis.com</a></li>
            <li><a class="hover:text-brand" href="gizlilik.html">Gizlilik Politikası</a></li>
            <li><a class="hover:text-brand" href="sitemap.xml">Sitemap</a></li>
          </ul>
        </div>
      </div>`;
    }
  }

  function applyHero(){
    const d=load();
    const img=qs('#heroMainImg'); if(img && d.hero?.imgUrl) img.src=d.hero.imgUrl;
    const tg=qs('#heroTagline'); if(tg && d.hero?.subtitle) tg.textContent=d.hero.subtitle;
  }

  function ux(){
    const toTop = document.getElementById('toTop');
    window.addEventListener('scroll', ()=>{ if(window.scrollY>400) toTop.classList.remove('hidden'); else toTop.classList.add('hidden'); });
    toTop && toTop.addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'}));
    const io=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')})},{threshold:.15});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
    const CK='cookieOK', bar=document.getElementById('cookieBar'); if(localStorage.getItem(CK)!=='1') bar.classList.remove('hidden');
    document.getElementById('cookieAccept')?.addEventListener('click',()=>{localStorage.setItem(CK,'1'); bar.remove();});
    document.getElementById('cookieDecline')?.addEventListener('click',()=>bar.remove());
  }

  document.addEventListener('DOMContentLoaded',()=>{
    renderHeaderFooter();
    ux();
    applyHero();
  });
})();