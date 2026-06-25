/* =====================================================================
   PAREDE VIVA — ae! cozinha
   ===================================================================== */

/* ---- Configuração compartilhada ---- */
// Substitua pelo número real da casa (formato internacional, só dígitos).
const WHATSAPP = '551134768521';

const PAGAMENTO = [
  { nome: 'Pix',                 detalhe: 'à vista' },
  { nome: 'Cartão de crédito',   detalhe: 'parcelado' },
  { nome: 'Dinheiro',            detalhe: 'à vista' }
];

const ARTIST_MAP = {
  'artista-camilanoris': 'Camila Noris',
  'artista-jufernandez': 'Juliana Fernandez',
  'artista-magadelha':   'Mariana Gadelha',
  'artista-ronaldoinc':  'Ronaldo Inc',
  'artista-milla':       'Milla Orlandi',
  'artista-silvia':      'Silvia Gerson',
  'artista-paula':       'Paula Iwata'
};

/* Mapa reverso (nome do artista -> slug do partial) p/ o link no painel de detalhe */
const SLUG_BY_ARTIST = Object.fromEntries(
  Object.entries(ARTIST_MAP).map(([slug, name]) => [name, slug])
);

/* ---- Acervo. Descrições, fichas técnicas e condições de pagamento a partir
   dos materiais enviados pelos artistas. Obras sem dados na fonte ficam com
   provisional:true (texto a revisar). ---- */
const ARTWORKS = [
  { id: 1,  artist: 'Camila Noris', title: 'A Última Onda', price: 1900,
    ficha: 'Acrílica sobre algodão cru · 80 × 50 cm · 2026',
    description: 'A espera pela última onda perfeita.' },
  { id: 2,  artist: 'Camila Noris', title: 'Blue Dream', price: 1050,
    ficha: 'Técnica mista sobre tela · 50 × 40 cm · 2024',
    description: 'O azul do mar, uma imensidão inóspita; um barco à deriva. Pintada na Itália.' },
  { id: 3,  artist: 'Camila Noris', title: 'Jabuticabeira', price: 1150,
    ficha: 'Acrílica e pastel a óleo sobre tela · 50 × 50 cm · 2025',
    description: 'Árvore nativa e muito presente na vida do brasileiro, a jabuticabeira é memória afetiva da infância colhendo fruta no pé. Da coleção Mata Atlântica.' },
  { id: 4,  artist: 'Camila Noris', title: 'Manacá', price: 3600,
    ficha: 'Acrílica e pastel a óleo sobre tela · 100 × 80 cm · 2025',
    description: 'O manacá atravessa três estágios durante a florada — suas flores vão de brancas a rosas e, por fim, roxas. Um convite a entender o fluxo natural da vida e a aceitar cada momento como único.' },
  { id: 5,  artist: 'Camila Noris', title: 'Pitangueira', price: 2300,
    ficha: 'Acrílica e pastel a óleo sobre tela · 90 × 60 cm · 2025',
    description: 'Pitangueira com frutos no pé. Da coleção Mata Atlântica.' },
  { id: 6,  artist: 'Camila Noris', title: 'Summer Love', price: 2400,
    ficha: 'Técnica mista sobre algodão cru · 95 × 63 cm · 2026',
    description: 'A essência do verão brasileiro: o calor na pele, a água salgada na boca, o murmurinho de gente em volta. Inspirada nas praias do Rio de Janeiro, em suas belezas e contrastes — o algodão cru realça a textura natural da fibra.' },

  { id: 7,  artist: 'Juliana Fernandez', title: 'A Vida Inteira', price: 1800,
    ficha: 'Acrílica sobre tela · 51 × 71 cm · 2025',
    pagamento: 'As três telas da série podem ser levadas juntas por R$ 4.500.',
    description: 'Abre a série "O que sobra de nós", sobre o encontro entre o orgânico e o urbano, entre o corpo e a paisagem que o abriga — ou o consome. O título nasce do verso "mesmo que demore a vida inteira para acontecer, as coisas acontecem de uma hora pra outra".' },
  { id: 8,  artist: 'Juliana Fernandez', title: 'De Uma Hora pra Outra', price: 1620,
    ficha: 'Acrílica sobre tela · 62 × 44 cm · 2025',
    pagamento: 'As três telas da série podem ser levadas juntas por R$ 4.500.',
    description: 'Parte da série "O que sobra de nós": uma narrativa visual sobre o ciclo da existência e a transformação das relações entre natureza, cidade e humanidade. O título encerra o verso que conecta as três telas.' },
  { id: 9,  artist: 'Juliana Fernandez', title: 'Para Acontecer', price: 1590,
    ficha: 'Acrílica e giz pastel oleoso sobre tela · 64 × 44 cm · 2025',
    pagamento: 'As três telas da série podem ser levadas juntas por R$ 4.500.',
    description: 'Da série "O que sobra de nós", sobre corpo, natureza e cidade em transformação. Compõe a trilogia atravessada pela frase "mesmo que demore a vida inteira para acontecer, as coisas acontecem de uma hora pra outra".' },

  { id: 10, artist: 'Mariana Gadelha', title: 'Deusa do Mar', price: 1200,
    ficha: 'Caneta Posca sobre tecido (canvas) · 20 × 20 cm · 2026',
    pagamento: 'R$ 1.200 em até 2×.',
    description: 'Homenagem à mulher das águas — as ondas representadas pelas cores e formas do mar.' },
  { id: 11, artist: 'Mariana Gadelha', title: 'Deusa da Ciência', price: 1200,
    ficha: 'Caneta Posca sobre tecido (canvas) · 25 × 35 cm · 2026',
    pagamento: 'R$ 1.000 à vista ou R$ 1.200 em até 2×.',
    description: 'Homenagem às mulheres cientistas, que nos enchem de orgulho com suas descobertas: os tubos de ensaio, a sala, a postura de quem conclui.' },
  { id: 12, artist: 'Mariana Gadelha', title: 'Deusa da Luz', price: 1600,
    ficha: 'Caneta Posca sobre tecido (canvas) · 40 × 30 cm · 2026',
    pagamento: 'R$ 1.400 à vista ou R$ 1.600 em até 3×.',
    description: 'A mulher plena, com a luz interna que ilumina tudo ao seu redor — porque a luz também é sabedoria.' },
  { id: 13, artist: 'Mariana Gadelha', title: 'Polvo', price: 2400,
    ficha: 'Caneta Posca sobre tecido (canvas) · 50 × 50 cm · 2026',
    pagamento: 'R$ 2.000 à vista ou R$ 2.400 em até 3×.',
    description: 'Seus tentáculos são também caules de uma flor: a natureza traduzida em formas e cores.' },
  { id: 14, artist: 'Mariana Gadelha', title: 'Homenagem a Deusa', price: 1800,
    ficha: 'Caneta Posca sobre tecido (canvas) · 50 × 50 cm · 2026',
    pagamento: 'R$ 1.600 à vista ou R$ 1.800 em até 3×.',
    description: 'Homenagem à deusa africana — sua luta de guerreira, cheia de música, cores e formas.' },
  { id: 15, artist: 'Mariana Gadelha', title: 'Pierrot e Colombina', price: 4800,
    ficha: 'Caneta Posca sobre tecido (canvas) · 2026',
    provisional: true,
    description: 'O amor de palco que nunca termina — dois mascarados presos no mesmo gesto eterno.' },

  { id: 16, artist: 'Milla Orlandi', title: 'Mulher Usando Luvas', price: 850,
    ficha: 'Impressão fine art (original em lápis, marcadores e pastel oleoso) sobre papel Hahnemühle Photo Rag 308 g/m² · 28 × 32 cm',
    description: 'Da série Figuras Femininas: rostos e corpos femininos pesquisados a partir de editoriais de moda, campanhas, street style e fotografias autorais, reinterpretados pela ilustração. Personagens imaginadas, que evocam o retrato com uma leitura contemporânea.' },
  { id: 17, artist: 'Milla Orlandi', title: 'Mulher Vista de Lado', price: 850,
    ficha: 'Original em lápis, marcadores e pastel oleoso sobre papel Canson 114 g/m² · 28 × 32 cm',
    description: 'Da série Figuras Femininas — um estudo da figura feminina entre o retrato e a leitura contemporânea. De perfil, a personagem oferece o mistério: vê-se apenas metade do que existe.' },

  { id: 18, artist: 'Ronaldo Inc', title: 'Amaterasu', price: 3000,
    ficha: 'Acrílica e spray sobre canvas · 40 × 60 cm · 2025 · moldura em carvalho · acompanha certificado de autenticidade',
    description: 'Evoca luz, renascimento e presença. Inspirada na deusa solar da mitologia japonesa, celebra o sagrado feminino e a energia que emerge mesmo após períodos de escuridão.' },
  { id: 19, artist: 'Ronaldo Inc', title: 'Karusu', price: 3000,
    ficha: 'Acrílica e spray sobre canvas · 40 × 60 cm · 2026 · moldura em carvalho · acompanha certificado de autenticidade',
    description: 'Dizem que o corvo, ao cruzar as estações, assume novas cores para guiar recomeços. Em Karusu, ele surge em tons lúdicos, repousando entre cerejeiras — um signo silencioso onde o invisível toca o mundo.' },
  { id: 20, artist: 'Ronaldo Inc', title: 'Tsuru', price: 3000,
    ficha: 'Acrílica e spray sobre canvas · 40 × 60 cm · 2026 · moldura em carvalho · acompanha certificado de autenticidade',
    description: 'Dizem que cada pena do tsuru guarda um desejo tecido em silêncio. Ao abrir suas cores ao vento, ele espalha a magia a que foi destinado.' },

  { id: 21, artist: 'Paula Iwata', title: 'Águas', price: 1000,
    provisional: true,
    description: 'As muitas águas de um mesmo rio — transparência que carrega tudo o que tocou.' },
  { id: 22, artist: 'Paula Iwata', title: 'O Banho do BemTeVi', price: 400,
    ficha: 'Linóleogravura — tinta a óleo preta sobre papel Canson branco · 33 × 45 cm (com moldura)',
    description: 'O instante leve do bem-te-vi na água — uma alegria pequena e cotidiana, eternizada em gravura. Da produção de gravuras da artista, que tem na natureza, na flora e na fauna sua maior inspiração.' },

  { id: 23, artist: 'Silvia Gerson', title: 'O Tucano', price: 2813,
    ficha: 'Óleo sobre tela sobre foto pública, com aplicação de galhos e cascos de tronco · 0,80 × 1,00 m · 2022',
    description: 'O tucano em pleno brilho tropical. Silvia une viagem, fotografia e pintura, intervindo sobre a imagem com os materiais que a tela pede.' },
  { id: 24, artist: 'Silvia Gerson', title: 'Pedra Vulcânica no Pacífico Latino Americano', price: 2473,
    ficha: 'Óleo sobre tela sobre foto pública, com aplicação de pedras · 0,80 × 1,00 m · 2023',
    description: 'A memória geológica do Pacífico latino-americano. A artista amplia fotos autorais ou públicas sobre a tela e intervém com materiais diversos — aqui, pedras.' }
];

/* ---- Atalhos de DOM ---- */
const $ = (sel) => document.querySelector(sel);
const $gallery   = $('#gallery');
const $filterBar = $('#filterBar');
const $info        = $('#info');
const $infoBody    = $('#infoBody');
const $gallerySec  = $('#galeria');
const $sectionHead = $('.section-head');
const $hero        = $('.hero');
const $backToGallery       = $('#backToGallery');
const $backToArtistGallery = $('#backToArtistGallery');

const $menuPanel   = $('#menuPanel');
const $menuOverlay = $('#menuOverlay');
const $openMenu    = $('#openMenu');
const $closeMenu   = $('#closeMenu');

const $panel    = $('#detailPanel');
const $backdrop = $('#detailBackdrop');
const $header   = $('#siteHeader');

let currentArtist = null;   // artista do partial aberto
let activeFilter = null;    // filtro atual da galeria
let lastFocused = null;     // foco a restaurar ao fechar o painel

const brl = (n) => 'R$ ' + n.toLocaleString('pt-BR');
const imgPath = (a) => `assets/img/artistas/${a.artist}/${a.title} - ${a.price}.jpg`;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]
));

/* =====================================================================
   GALERIA
   ===================================================================== */
function renderGallery(items) {
  $gallery.innerHTML = items.map((a) => `
    <button class="card ${a.sold ? 'is-sold' : ''}" data-id="${a.id}" type="button"
            aria-label="${esc(a.title)}, de ${esc(a.artist)}. Abrir detalhes.">
      <span class="card-figure">
        <img src="${esc(imgPath(a))}" alt="${esc(a.title)} — ${esc(a.artist)}" loading="lazy">
      </span>
      <span class="card-caption">
        <span class="card-artist">${esc(a.artist)}</span>
        <span class="card-title">${esc(a.title)}</span>
        <span class="card-price ${a.sold ? 'sold' : ''}">${a.sold ? 'Vendido' : brl(a.price)}</span>
      </span>
    </button>
  `).join('');
}

function buildFilterBar() {
  const artists = [...new Set(ARTWORKS.map((a) => a.artist))];
  const btn = (label, value, count) =>
    `<button class="filter" type="button" data-filter="${value}" aria-pressed="${activeFilter === value}">
       ${esc(label)}<span class="count">${count}</span>
     </button>`;
  $filterBar.innerHTML =
    btn('Todas as obras', '', ARTWORKS.length) +
    artists.map((name) =>
      btn(name, name, ARTWORKS.filter((a) => a.artist === name).length)
    ).join('');
}

function applyFilter(value) {
  activeFilter = value || null;
  const items = activeFilter
    ? ARTWORKS.filter((a) => a.artist === activeFilter)
    : ARTWORKS;
  renderGallery(items);
  $filterBar.querySelectorAll('.filter').forEach((b) => {
    b.setAttribute('aria-pressed', (b.dataset.filter || null) === activeFilter ? 'true' : 'false');
  });
}

function showGallery() {
  $info.classList.add('hidden');
  $hero.classList.remove('hidden');
  $gallerySec.classList.remove('hidden');
}

$filterBar.addEventListener('click', (e) => {
  const b = e.target.closest('.filter');
  if (b) {
    applyFilter(b.dataset.filter);
    // Sobe para o cabeçalho da galeria ("A parede, obra a obra") ficar no topo
    $sectionHead.scrollIntoView({ behavior: 'auto', block: 'start' });
  }
});

$gallery.addEventListener('click', (e) => {
  const card = e.target.closest('.card');
  if (card) openDetail(Number(card.dataset.id), card);
});

/* =====================================================================
   PAINEL DE DETALHE DA OBRA
   ===================================================================== */
function buildPanel(a) {
  const waText = encodeURIComponent(
    `Olá! Tenho interesse na obra "${a.title}", de ${a.artist} (${brl(a.price)}). Vi na exposição Parede Viva, no ae! cozinha.`
  );
  const payRows = PAGAMENTO.map((p) =>
    `<li><span class="pay-name">${esc(p.nome)}</span><span class="pay-detail">${esc(p.detalhe)}</span></li>`
  ).join('');

  return `
    <button class="detail-close" id="detailClose" type="button">
      <span class="x" aria-hidden="true">&times;</span> Fechar
    </button>
    <div class="detail-media">
      <img src="${esc(imgPath(a))}" alt="${esc(a.title)} — ${esc(a.artist)}">
    </div>
    <div class="detail-body">
      ${SLUG_BY_ARTIST[a.artist]
        ? `<button class="detail-artist detail-artist-link" type="button" data-section="${esc(SLUG_BY_ARTIST[a.artist])}" aria-label="Ver perfil de ${esc(a.artist)}">${esc(a.artist)}</button>`
        : `<p class="detail-artist">${esc(a.artist)}</p>`}
      <h2 class="detail-title" id="detailTitle">${esc(a.title)}</h2>
      <p class="detail-price ${a.sold ? 'sold' : ''}">${a.sold ? 'Vendido' : brl(a.price)}</p>
      ${a.ficha ? `<p class="detail-ficha">${esc(a.ficha)}</p>` : ''}

      <hr class="detail-rule">

      <p class="detail-tag">Sobre a obra</p>
      <p class="detail-desc">${esc(a.description)}</p>
      ${a.provisional ? '<p class="detail-provisional">Descrição provisória — a ser revisada pela curadoria.</p>' : ''}

      <hr class="detail-rule">

      <p class="pay-title">Formas de pagamento</p>
      ${a.pagamento ? `<p class="pay-note">${esc(a.pagamento)}</p>` : ''}
      <ul class="pay-list">${payRows}</ul>

      ${a.sold ? '' : `
      <a class="cta" href="https://wa.me/${WHATSAPP}?text=${waText}" target="_blank" rel="noopener">
        Tenho interesse <span class="arrow" aria-hidden="true">→</span>
      </a>`}
    </div>
  `;
}

function openDetail(id, trigger) {
  const a = ARTWORKS.find((x) => x.id === id);
  if (!a) return;
  lastFocused = trigger || document.activeElement;

  $panel.innerHTML = buildPanel(a);
  $panel.setAttribute('aria-hidden', 'false');
  $panel.classList.add('open');
  $backdrop.classList.add('open');
  lockScroll(true);

  const close = $panel.querySelector('#detailClose');
  if (close) close.focus();
}

function closeDetail() {
  $panel.classList.remove('open');
  $backdrop.classList.remove('open');
  $panel.setAttribute('aria-hidden', 'true');
  lockScroll(false);
  if (lastFocused && document.contains(lastFocused)) lastFocused.focus();
  lastFocused = null;
}

$panel.addEventListener('click', (e) => {
  if (e.target.closest('#detailClose')) { closeDetail(); return; }
  const artistLink = e.target.closest('.detail-artist-link');
  if (artistLink) {
    const slug = artistLink.dataset.section;
    closeDetail();
    if (slug) loadSection(slug);
  }
});
$backdrop.addEventListener('click', closeDetail);

/* Trava de foco simples dentro do painel + Esc */
$panel.addEventListener('keydown', (e) => {
  if (e.key !== 'Tab') return;
  const f = $panel.querySelectorAll('button, a[href]');
  if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});

/* =====================================================================
   SCROLL LOCK
   ===================================================================== */
function lockScroll(on) {
  if (on) {
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = sbw ? `${sbw}px` : '';
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }
}

/* =====================================================================
   MENU
   ===================================================================== */
function openMenu() {
  $menuPanel.classList.add('open');
  $menuOverlay.classList.add('open');
  $openMenu.setAttribute('aria-expanded', 'true');
}
function closeMenu() {
  $menuPanel.classList.remove('open');
  $menuOverlay.classList.remove('open');
  $openMenu.setAttribute('aria-expanded', 'false');
}
$openMenu.addEventListener('click', openMenu);
$closeMenu.addEventListener('click', closeMenu);
$menuOverlay.addEventListener('click', closeMenu);

$menuPanel.addEventListener('click', (e) => {
  const link = e.target.closest('a[data-section]');
  if (link) {
    e.preventDefault();
    loadSection(link.getAttribute('data-section'));
    closeMenu();
  }
});

/* =====================================================================
   VISTA DE ARTIGO (partials via fetch)
   ===================================================================== */
async function loadSection(file) {
  try {
    const res = await fetch(`partials/${file}.html`);
    const html = await res.text();
    $infoBody.innerHTML = html;

    $hero.classList.add('hidden');
    $gallerySec.classList.add('hidden');
    $info.classList.remove('hidden');

    currentArtist = ARTIST_MAP[file] || null;
    $backToArtistGallery.classList.toggle('hidden', !currentArtist);
    if (currentArtist) {
      $backToArtistGallery.textContent = `Ver as obras de ${currentArtist} →`;
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  } catch (err) {
    $infoBody.innerHTML =
      '<h2>Conteúdo indisponível</h2><p>Não foi possível carregar esta seção. Tente novamente.</p>';
    console.error(err);
  }
}

$backToGallery.addEventListener('click', () => {
  showGallery();
  applyFilter('');
  $gallerySec.scrollIntoView({ behavior: 'auto', block: 'start' });
});

$backToArtistGallery.addEventListener('click', () => {
  showGallery();
  if (currentArtist) applyFilter(currentArtist);
  $gallerySec.scrollIntoView({ behavior: 'auto', block: 'start' });
});

/* =====================================================================
   GLOBAIS: Esc e header colado
   ===================================================================== */
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if ($panel.classList.contains('open')) closeDetail();
  else if ($menuPanel.classList.contains('open')) closeMenu();
});

const onScroll = () => $header.classList.toggle('is-stuck', window.scrollY > 24);
window.addEventListener('scroll', onScroll, { passive: true });

/* =====================================================================
   INIT
   ===================================================================== */
buildFilterBar();
renderGallery(ARTWORKS);
onScroll();
