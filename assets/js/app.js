const $gallery = document.getElementById('gallery');
const $openMenu = document.getElementById('openMenu');
const $closeMenu = document.getElementById('closeMenu');
const $menuPanel = document.querySelector('.menu-panel');
const $overlay = document.querySelector('.menu-overlay');
const $info = document.getElementById('info');
const $infoBody = document.getElementById('infoBody');
const $backToGallery = document.getElementById('backToGallery');
const $lightbox = document.getElementById('lightbox');
const $lightboxImg = document.getElementById('lightboxImg');
const $lightboxArtist = document.getElementById('lightboxArtist');
const $lightboxTitle = document.getElementById('lightboxTitle');
const $lightboxPrice = document.getElementById('lightboxPrice');
const $backToArtistGallery = document.getElementById('backToArtistGallery');

const ARTIST_MAP = {
  'artista-jufernandez': 'Juliana Fernandez',
  'artista-magadelha': 'Mariana Gadelha',
};
let currentArtist = null;

// --- Sincronização de Largura Cabeçalho/Grid ---
function syncHeaderWidth() {
  const headerContent = document.querySelector('.header-content');
  if (headerContent && $gallery && $gallery.offsetWidth > 0) {
    // Força o contêiner do cabeçalho a ter a mesma largura da galeria
    headerContent.style.width = `${$gallery.offsetWidth}px`;
    // Centraliza o header-content que agora tem largura fixa
    headerContent.style.margin = '0 auto';
  }
}

const ARTWORKS = [

  { id: 101, artist: "Camila Noris", title: "A Última Onda", price: 1900},
  { id: 102, artist: "Camila Noris", title: "Blue Dream", price: 1050},
  { id: 103, artist: "Camila Noris", title: "Jabuticabeira", price: 1150},
  { id: 104, artist: "Camila Noris", title: "Manacá", price: 3600},
  { id: 105, artist: "Camila Noris", title: "Pitangueira", price: 2300},
  { id: 106, artist: "Camila Noris", title: "Summer Love", price: 2400},

  { id: 201, artist: "Juliana Fernandez", title: "A Vida Inteira", price: 1800},
  { id: 201, artist: "Juliana Fernandez", title: "De Uma Hora pra Outra", price: 1620},
  { id: 201, artist: "Juliana Fernandez", title: "Para Acontecer", price: 1590},

  { id: 301, artist: "Mariana Gadelha", title: "Deusa do Mar", price: 1200},
  { id: 302, artist: "Mariana Gadelha", title: "Deusa da Ciência", price: 1200},
  { id: 303, artist: "Mariana Gadelha", title: "Deusa da Luz", price: 1600},
  { id: 304, artist: "Mariana Gadelha", title: "Polvo", price: 2400},
  { id: 305, artist: "Mariana Gadelha", title: "Homenagem a Deusa", price: 1800},



  
];

function renderGallery(items) {
  $gallery.style.display = 'grid';
  $info.classList.add('hidden');
  $gallery.innerHTML = items.map(item => `
    <article class="card ${item.sold ? 'sold' : ''}" style="cursor: pointer;">
      <div class="thumb">
        <img src="assets/img/artistas/${item.artist}/${item.title} - ${item.price}.jpg" alt="${item.title}" loading="lazy">
      </div>
      <div class="meta">
        <span class="artist">${item.artist}</span>
        <span class="title">${item.title}</span>
        ${!item.sold ? `<span class="price-badge">R$ ${item.price.toLocaleString('pt-BR')}</span>` : ''}
      </div>
    </article>
  `).join('');

  // Força a sincronização da largura após a renderização da galeria
  // Usa um pequeno timeout para garantir que o browser calculou o layout do grid
  setTimeout(syncHeaderWidth, 50);
}

async function loadSection(file) {
  try {
    const response = await fetch(`partials/${file}.html`);
    const html = await response.text();
    $gallery.style.display = 'none';
    $infoBody.innerHTML = html;
    $info.classList.remove('hidden');
    $menuPanel.classList.remove('open');
    window.scrollTo(0, 0);

    // Lógica para o botão "Ver obras da artista"
    currentArtist = null; // Reseta o artista atual
    const artistName = ARTIST_MAP[file];
    if (artistName) {
      currentArtist = artistName;
      $backToArtistGallery.classList.remove('hidden');
    } else {
      $backToArtistGallery.classList.add('hidden');
    }

  } catch (e) { console.error(e); }
}

// Eventos de Menu
$openMenu.onclick = () => $menuPanel.classList.add('open');
$closeMenu.onclick = () => $menuPanel.classList.remove('open');
$overlay.onclick = () => $menuPanel.classList.remove('open');

$menuPanel.onclick = (e) => {
  const link = e.target.closest('a[data-section]');
  if (link) {
    e.preventDefault();
    loadSection(link.getAttribute('data-section'));
  }
};

$backToGallery.onclick = () => {
  renderGallery(ARTWORKS);
  window.scrollTo(0, 0);
}

$backToArtistGallery.onclick = () => {
  if (currentArtist) {
    const artistWorks = ARTWORKS.filter(item => item.artist === currentArtist);
    renderGallery(artistWorks);
  }
  window.scrollTo(0, 0);
};

$gallery.onclick = (e) => {
  const card = e.target.closest('.card');
  if (card) {
    const img = card.querySelector('img');
    const title = img.alt;
    const artwork = ARTWORKS.find(art => art.title === title);

    if(artwork) {
      $lightboxImg.src = img.src;
      $lightboxArtist.textContent = artwork.artist;
      $lightboxTitle.textContent = artwork.title;
      $lightboxPrice.textContent = artwork.sold ? 'Vendido' : 'R$ ' + artwork.price.toLocaleString('pt-BR');
      
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
      $lightbox.classList.add('open');
    }
  }
};

$lightbox.onclick = (e) => {
  $lightbox.classList.remove('open');
  document.body.style.overflow = 'auto';
  document.body.style.paddingRight = '';
};


window.onload = () => renderGallery(ARTWORKS);



// ====== ATUALIZAÇÃO DO OBSERVADOR ======
// Atualize seu ResizeObserver existente para incluir o preenchimento do fundo
if (window.ResizeObserver) {
  const galleryObserver = new ResizeObserver(() => {
    syncHeaderWidth();      // Sua função de largura do header
    // fillBackgroundText();   // Nova função de preenchimento
  });
  galleryObserver.observe($gallery);
}


// ====== CONTROLE DE TRANSPARÊNCIA DO HEADER ======
let lastScroll = 0;
const $header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  // Se o usuário está rolando para BAIXO e não está no topo extremo
  if (currentScroll > lastScroll && currentScroll > 10) {
    $header.classList.add('scrolled-down');
  } 
  // Se o usuário está rolando para CIMA (em qualquer ponto da página)
  else {
    $header.classList.remove('scrolled-down');
  }

  lastScroll = currentScroll;
});