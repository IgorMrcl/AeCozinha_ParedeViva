// ====== Seletores principais ======
const $gallery = document.getElementById('gallery');
const $q = document.getElementById('q'); // existe, mas está oculto no CSS
// contador e select foram removidos do HTML; não referenciamos mais

// ====== Menu / Seções ======
const $menuBtn = document.getElementById('menuBtn');
const $menuPanel = document.getElementById('menuPanel');
const $info = document.getElementById('info');
const $infoTitle = document.getElementById('infoTitle');
const $infoBody = document.getElementById('infoBody');
const $backToGallery = document.getElementById('backToGallery');

// ====== Dados (hardcoded) ======
const ARTWORKS = [
  { id: 101, artist: "Atelie Pipilu", title: "Pastel Levemente Cremoso", price: 580 },
  { id: 102, artist: "Atelie Pipilu", title: "3 Unidade sem Glúten", price: 470 },

  { id: 201, artist: "Silvia Gerson", title: "Canoa na Patagônia Chilena", price: 2734 },
  { id: 202, artist: "Silvia Gerson", title: "Cartagena Será", price: 2995 },
  { id: 203, artist: "Silvia Gerson", title: "Chuva na Primavera", price: 3250 },
  { id: 204, artist: "Silvia Gerson", title: "O Tucano", price: 2813 },
  { id: 205, artist: "Silvia Gerson", title: "Passeio de Trem", price: 2864 },
  { id: 206, artist: "Silvia Gerson", title: "Pedra Vulcânica no Pacífico Latino Americano", price: 2473 },
  { id: 207, artist: "Silvia Gerson", title: "Religiosidade", price: 3290 },
  { id: 208, artist: "Silvia Gerson", title: "Um Chá Antes do Fim", price: 3560 },

  { id: 301, artist: "Milla Orlandi", title: "Mulher Usando Luvas", price: 850 },
  { id: 302, artist: "Milla Orlandi", title: "Martha", price: 850 },
  { id: 303, artist: "Milla Orlandi", title: "Eva", price: 850 },
  { id: 304, artist: "Milla Orlandi", title: "Julia", price: 850 },
  { id: 305, artist: "Milla Orlandi", title: "Mulher com Colar", price: 850 },
  { id: 306, artist: "Milla Orlandi", title: "Figura Sobre Fundo Azul", price: 850 },
  { id: 307, artist: "Milla Orlandi", title: "Mulher Vista de Lado", price: 850 },

  // { id: 401, artist: "Paula Iwata", title: "As Tigresas em Bronze", price: 12000 },
  { id: 402, artist: "Paula Iwata", title: "Goiabeira", price: 400 },
  { id: 403, artist: "Paula Iwata", title: "Hipnose", price: 5200 },
  { id: 404, artist: "Paula Iwata", title: "Jaqueira", price: 5200 },
  // { id: 405, artist: "Paula Iwata", title: "Musa", price: 4500 },
  { id: 406, artist: "Paula Iwata", title: "O Banho do BemTeVi", price: 400 },
  // { id: 407, artist: "Paula Iwata", title: "Pássaro Negro", price: 3000 },
  { id: 408, artist: "Paula Iwata", title: "Útero", price: 400 },
];

// ====== Estado (apenas busca) ======
let state = { q: '' };

// ====== Render ======
function render(){
  const term = state.q.toLowerCase().trim();
  let list = ARTWORKS.filter(a =>
    a.artist.toLowerCase().includes(term) || a.title.toLowerCase().includes(term)
  );

  // ordenação padrão: artista (A–Z)
  list.sort((a,b)=> a.artist.localeCompare(b.artist, 'pt-BR', {sensitivity:'base'}));

  $gallery.innerHTML = list.map(card).join('');
  attachImageHandlers();
}

function card(a){
  const priceDisplay = a.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const imgPath = buildImagePath(a.artist, a.title, a.price);
  return `
    <article class="card" aria-label="Obra: ${escapeHtml(a.title)} por ${escapeHtml(a.artist)}">
      <div class="thumb">
        <img
          src="${imgPath}"
          alt="${escapeHtml(a.title)} – ${escapeHtml(a.artist)}"
          loading="lazy"
          onerror="this.closest('article')?.remove();"
        />
        <span class="price-badge">${priceDisplay}</span>
      </div>
      <div class="meta">
        <div class="artist">${escapeHtml(a.artist)}</div>
        <div class="title">${escapeHtml(a.title)}</div>
      </div>
    </article>`;
}

// ====== Busca (o input existe mas está oculto via CSS por enquanto) ======
if ($q) {
  $q.addEventListener('input',  e => { state.q = e.target.value; showGallery(); });
}

// ====== Menu: abre/fecha e navegação ======
if ($menuBtn && $menuPanel) {
  $menuBtn.addEventListener('click', () => {
    const open = $menuPanel.classList.toggle('open');
    $menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  document.addEventListener('click', (e) => {
    if (!$menuPanel.contains(e.target) && !$menuBtn.contains(e.target)) {
      $menuPanel.classList.remove('open');
      $menuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Agora usa loader de parciais (com fallback para SECTIONS)
  $menuPanel.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-section]');
    if (!a) return;
    e.preventDefault();
    const key = a.getAttribute('data-section');
    loadSectionContent(key);
    $menuPanel.classList.remove('open');
    $menuBtn.setAttribute('aria-expanded', 'false');
  });
}

// ====== Seções (fallback em caso de erro de fetch) ======
const SECTIONS = {
  'ae': {
    title: 'Sobre o ae!',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Integer maximus urna sit amet tincidunt fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent rhoncus lectus vitae ultrices eros convallis id.'
  },
  'projeto': {
    title: 'Sobre o projeto',
    body: 'Curabitur laoreet, justo id feugiat posuere, nisl tellus auctor nunc, id dapibus sem ante eu turpis. In vel ante et ipsum aliquam elementum. Pellentesque id mi diam. Morbi non mattis dui. Mauris faucibus augue eu justo interdum ultrices.'
  },
  'artista-pipilu': {
    title: 'Sobre a artista: Atelie Pipilu',
    body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.'
  },
  'artista-milla': {
    title: 'Sobre a artista: Milla Orlandi',
    body: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.'
  },
  'artista-paula': {
    title: 'Sobre a artista: Paula Iwata',
    body: 'Phasellus tristique, lacus sed vestibulum sagittis, risus ligula consequat odio, a molestie augue mi at ex. Integer in lacinia lorem, vitae rhoncus lorem.'
  },
  'artista-silvia': {
    title: 'Sobre a artista: Silvia Gerson',
    body: 'Aenean dignissim, leo a accumsan elementum, mauris augue mattis arcu, id maximus sem elit vitae justo. Vestibulum aliquam sapien metus pharetra velit.'
  }
};

// ====== Loader de parciais com fallback ======
const PARTIAL_MAP = {
  'ae':              'partials/sobre-ae.html',
  'projeto':         'partials/sobre-projeto.html',
  'artista-pipilu':  'partials/artista-pipilu.html',
  'artista-milla':   'partials/artista-milla.html',
  'artista-paula':   'partials/artista-paula.html',
  'artista-silvia':  'partials/artista-silvia.html'
};

async function loadSectionContent(key){
  if (!$info || !$infoBody || !$gallery) return;

  const path = PARTIAL_MAP[key];
  if (!path) return;

  try {
    const res = await fetch(path, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();

    // injeta HTML completo (com subtítulos, listas, negritos etc.)
    // como #infoBody é um <p> no seu HTML, browsers reparentam corretamente os blocos
    $infoBody.innerHTML = html;

    // opcional: limpar título dedicado se o parcial já tem <h2> próprio
    if ($infoTitle) $infoTitle.textContent = '';

    // mostra texto, esconde galeria
    $gallery.classList.add('hidden');
    $info.classList.remove('hidden');

    // sobe pro topo
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch(e){}
  } catch (err) {
    console.error('Falha ao carregar parcial; usando fallback SECTIONS:', err);
    // Fallback para texto simples
    const s = SECTIONS[key];
    if (s) {
      if ($infoTitle) $infoTitle.textContent = s.title || '';
      // se quiser manter formatação básica, pode envolver s.body num <p>
      $infoBody.innerHTML = `<p>${escapeHtml(s.body)}</p>`;
      $gallery.classList.add('hidden');
      $info.classList.remove('hidden');
      try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch(e){}
    }
  }
}

function showGallery(){
  if ($info) $info.classList.add('hidden');
  if ($gallery) $gallery.classList.remove('hidden');
  render();
}

// ====== Utils ======
function escapeHtml(str){
  return String(str).replace(/[&<>\"']/g, s=>({
    "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"
  }[s]));
}

// Path: assets/img/artistas/{ARTISTA}/{TÍTULO} - {VALOR}.jpg
function buildImagePath(artist, title, price){
  const artistPart = encodeURIComponent(artist);
  const titlePart  = encodeURIComponent(title);
  const onlyDigits = String(price).replace(/\D+/g, '');
  return `assets/img/artistas/${artistPart}/${titlePart} - ${onlyDigits}.jpg`;
}

function attachImageHandlers(){
  const imgs = $gallery.querySelectorAll('img');
  imgs.forEach(img => {
    img.addEventListener('error', () => {
      // onerror inline já remove o card; aqui poderíamos reagir se necessário
    }, { once: true });
  });
}

// Inicializa mostrando a galeria
showGallery();

/* === FIX: voltar ao catálogo e clique no logo === */
(function(){
  function showGalleryAndCloseMenu() {
    // fecha o menu, se aberto
    const btn = document.getElementById('menuBtn');
    const panel = document.getElementById('menuPanel');
    if (panel && panel.classList.contains('open')) {
      panel.classList.remove('open');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    }

    // mostra a galeria
    if (typeof showGallery === 'function') {
      showGallery();
    } else {
      // fallback caso a função tenha outro nome
      const $info = document.getElementById('info');
      const $gallery = document.getElementById('gallery');
      if ($info) $info.classList.add('hidden');
      if ($gallery) $gallery.classList.remove('hidden');
      // tenta re-renderizar
      if (typeof render === 'function') { try { render(); } catch(e){} }
    }

    // rola pro topo pra evitar ficar "preso" no texto
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch(e){}
  }

  // Botão "Voltar ao catálogo"
  const backBtn = document.getElementById('backToGallery');
  if (backBtn) {
    backBtn.addEventListener('click', function(e){
      e.preventDefault();
      showGalleryAndCloseMenu();
    });
  }

  // Clique no logo
  const brand = document.querySelector('.brand');
  if (brand) {
    brand.addEventListener('click', function(e){
      e.preventDefault(); // evita navegar para "#"
      showGalleryAndCloseMenu();
    });
  }
})();
