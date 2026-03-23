const $gallery = document.getElementById('gallery');
// const $q = document.getElementById('q');
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
  'artista-pipilu': 'Atelie Pipilu',
  'artista-silvia': 'Silvia Gerson',
  'artista-milla': 'Milla Orlandi',
  'artista-paula': 'Paula Iwata'
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

// Observa a galeria e sincroniza a largura quando ela muda
if (window.ResizeObserver) {
  const galleryObserver = new ResizeObserver(syncHeaderWidth);
  galleryObserver.observe($gallery);
} else {
  // Fallback para navegadores antigos
  window.addEventListener('resize', syncHeaderWidth);
}
// --- Fim da Sincronização ---

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
  { id: 402, artist: "Paula Iwata", title: "Goiabeira", price: 400 },
  { id: 403, artist: "Paula Iwata", title: "Hipnose", price: 5200 },
  { id: 404, artist: "Paula Iwata", title: "Jaqueira", price: 5200 },
  { id: 406, artist: "Paula Iwata", title: "O Banho do BemTeVi", price: 400 },
  { id: 408, artist: "Paula Iwata", title: "Útero", price: 400, sold: true },
  { id: 409, artist: "Paula Iwata", title: "Bananeira", price: 400 },
  { id: 410, artist: "Paula Iwata", title: "Águas", price: 1000 }
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
        <span class="price-badge">${item.sold ? 'Vendido' : 'R$ ' + item.price.toLocaleString('pt-BR')}</span>
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

$backToGallery.onclick = () => renderGallery(ARTWORKS);

$backToArtistGallery.onclick = () => {
  if (currentArtist) {
    const artistWorks = ARTWORKS.filter(item => item.artist === currentArtist);
    renderGallery(artistWorks);
  }
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
      
      $lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }
};

$lightbox.onclick = (e) => {
  if (e.target === $lightbox) {
    $lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
};

// $q.oninput = (e) => {
//   const term = e.target.value.toLowerCase();
//   renderGallery(ARTWORKS.filter(i => i.artist.toLowerCase().includes(term) || i.title.toLowerCase().includes(term)));
// };

window.onload = () => renderGallery(ARTWORKS);