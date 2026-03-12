// ---- DEFAULT PRODUCTS ----
const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "Adidas Predator Elite",
    price: 8500,
    category: "Chaussures",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    badge: "Populaire"
  },
  {
    id: 2,
    name: "Maillot FC Barcelona 2024",
    price: 3500,
    category: "Maillots",
    image: "https://images.unsplash.com/photo-1519766304817-4f37bda74a26?w=400&q=80",
    badge: "Nouveau"
  },
  {
    id: 3,
    name: "Ballon Nike Premier League",
    price: 2200,
    category: "Ballons",
    image: "https://images.unsplash.com/photo-1552318965-6e6be7484ada?w=400&q=80",
    badge: null
  },
  {
    id: 4,
    name: "Haltères Pro Set 20kg",
    price: 6800,
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    badge: "Promo"
  },
  {
    id: 5,
    name: "Nike Air Zoom Pegasus",
    price: 9200,
    category: "Chaussures",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=80",
    badge: null
  },
  {
    id: 6,
    name: "Survêtement Puma Training",
    price: 4500,
    category: "Vêtements",
    image: "https://images.unsplash.com/photo-1556906781-9a412961a28c?w=400&q=80",
    badge: "Nouveau"
  },
  {
    id: 7,
    name: "Corde à Sauter Speed",
    price: 850,
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1434596922112-19c563067271?w=400&q=80",
    badge: null
  },
  {
    id: 8,
    name: "Gants de Gardien Reusch",
    price: 3200,
    category: "Accessoires",
    image: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=400&q=80",
    badge: null
  }
];

// ---- STORAGE HELPERS ----
function getProducts() {
  const stored = localStorage.getItem('sc_products');
  if (stored) return JSON.parse(stored);
  localStorage.setItem('sc_products', JSON.stringify(DEFAULT_PRODUCTS));
  return DEFAULT_PRODUCTS;
}

// ---- RENDER PRODUCTS ----
let currentCategory = 'Tous';

function renderProducts(filter) {
  const products = getProducts();
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  const filtered = filter && filter !== 'Tous'
    ? products.filter(p => p.category === filter)
    : products;

  if (filtered.length === 0) {
    grid.innerHTML = '<div class="no-products">Aucun produit dans cette catégorie.</div>';
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="product-card" data-category="${p.category}">
      <div class="product-img-wrap">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        <img src="${p.image || 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&q=80'}"
          alt="${p.name}" loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&q=80'">
      </div>
      <div class="product-body">
        <div class="product-category">${p.category || 'Sport'}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-price">${Number(p.price).toLocaleString('fr-DZ')} <span>DZD</span></div>
        <a class="btn-whatsapp" href="${buildWALink(p.name, p.price)}" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          Commander sur WhatsApp
        </a>
      </div>
    </div>
  `).join('');
}

function buildWALink(name, price) {
  const msg = encodeURIComponent(`Bonjour Sport Corner, je veux commander ce produit : ${name} - ${Number(price).toLocaleString('fr-DZ')} DZD`);
  return `https://wa.me/213540543342?text=${msg}`;
}

// ---- CATEGORY FILTER ----
function buildCategories() {
  const products = getProducts();
  const cats = ['Tous', ...new Set(products.map(p => p.category).filter(Boolean))];
  const bar = document.getElementById('categories-bar');
  if (!bar) return;

  bar.innerHTML = cats.map(c => `
    <button class="cat-btn ${c === 'Tous' ? 'active' : ''}" data-cat="${c}">${c}</button>
  `).join('');

  bar.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      bar.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts(btn.dataset.cat);
    });
  });
}

// ---- MOBILE NAV ----
function initNav() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');
  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => nav.classList.remove('open'));
  });
}

// ---- SMOOTH SCROLL ----
function initScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  buildCategories();
  renderProducts('Tous');
  initNav();
  initScroll();
});
