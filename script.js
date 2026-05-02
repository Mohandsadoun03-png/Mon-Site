// ===========================
//   SNITRADZ — SCRIPT PRINCIPAL
// ===========================

const PRODUCTS = [
  { id:1,  name:'Fender Stratocaster Player',      cat:'Guitares',    price:749,  oldPrice:899, emoji:'🎸', stars:5, badge:'new',   page:'guitares.html',    img:'https://www.fmicassets.com/Damroot/Original/10001/0144502500_fen_ins_frt_1_rr.png' },
  { id:2,  name:'Yamaha U1 Piano Droit',            cat:'Pianos',      price:2990, oldPrice:null,emoji:'🎹', stars:5, badge:null,    page:'pianos.html',      img:'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&h=300&fit=crop&q=80' },
  { id:3,  name:'Pearl Export Batterie',            cat:'Batterie',    price:599,  oldPrice:749, emoji:'🥁', stars:4, badge:'promo', page:'batterie.html',    img:'https://images.unsplash.com/photo-1543443258-92b04ad5ec6b?w=400&h=300&fit=crop&q=80' },
  { id:4,  name:'Yamaha Alto Saxophone YAS-280',    cat:'Vents',       price:699,  oldPrice:null,emoji:'🎷', stars:5, badge:null,    page:'vents.html',       img:'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=300&fit=crop&q=80' },
  { id:5,  name:'Stentor Violon Student II',        cat:'Cordes',      price:189,  oldPrice:229, emoji:'🎻', stars:4, badge:'promo', page:'cordes.html',      img:'https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?w=400&h=300&fit=crop&q=80' },
  { id:6,  name:'Gibson Les Paul Standard',         cat:'Guitares',    price:2199, oldPrice:null,emoji:'🎸', stars:5, badge:'new',   page:'guitares.html',    img:'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=400&h=300&fit=crop&q=80' },
  { id:7,  name:'Roland FP-30X Piano Numérique',   cat:'Pianos',      price:649,  oldPrice:749, emoji:'🎹', stars:5, badge:'promo', page:'pianos.html',      img:'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=300&fit=crop&q=80' },
  { id:8,  name:'Zildjian A Cymbals Set',           cat:'Accessoires', price:349,  oldPrice:null,emoji:'🥁', stars:4, badge:null,    page:'accessoires.html', img:'https://images.unsplash.com/photo-1605020420620-20c943cc4669?w=400&h=300&fit=crop&q=80' },
  { id:9,  name:'Yamaha C40 Guitare Classique',    cat:'Guitares',    price:149,  oldPrice:179, emoji:'🎸', stars:4, badge:null,    page:'guitares.html',    img:'https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?w=400&h=300&fit=crop&q=80' },
  { id:10, name:'Bach Stradivarius Trompette',      cat:'Vents',       price:1899, oldPrice:null,emoji:'🎺', stars:5, badge:'new',   page:'vents.html',       img:'https://images.unsplash.com/photo-1527261834078-9b37d35a4a32?w=400&h=300&fit=crop&q=80' },
  { id:11, name:'Casio CT-S300 Clavier',            cat:'Pianos',      price:79,   oldPrice:99,  emoji:'🎹', stars:4, badge:'promo', page:'pianos.html',      img:'https://images.unsplash.com/photo-1552422535-c45813c61732?w=400&h=300&fit=crop&q=80' },
  { id:12, name:'Korg Padkontrol Pad MIDI',         cat:'Accessoires', price:129,  oldPrice:null,emoji:'🎵', stars:4, badge:null,    page:'accessoires.html', img:'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=400&h=300&fit=crop&q=80' },
  { id:13, name:'Martin D-28 Acoustique',           cat:'Guitares',    price:3199, oldPrice:null,emoji:'🎸', stars:5, badge:'new',   page:'guitares.html',    img:'https://images.unsplash.com/photo-1550985616-10810253b84d?w=400&h=300&fit=crop&q=80' },
  { id:14, name:'Pearl Cajon Primero',              cat:'Batterie',    price:119,  oldPrice:149, emoji:'🥁', stars:4, badge:null,    page:'batterie.html',    img:'https://images.unsplash.com/photo-1485579149621-3123dd979885?w=400&h=300&fit=crop&q=80' },
  { id:15, name:'Flûte traversière Yamaha YFL-222',cat:'Vents',       price:299,  oldPrice:null,emoji:'🎵', stars:5, badge:null,    page:'vents.html',       img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80' },
  { id:16, name:'Violoncelle 4/4 Stentor',          cat:'Cordes',      price:489,  oldPrice:599, emoji:'🎻', stars:4, badge:'promo', page:'cordes.html',      img:'https://images.unsplash.com/photo-1465821185615-20b3c2fbf41b?w=400&h=300&fit=crop&q=80' },
];

// ---------- PANIER ----------
function getCart() { return JSON.parse(localStorage.getItem('snitradz-cart') || '[]'); }
function saveCart(cart) { localStorage.setItem('snitradz-cart', JSON.stringify(cart)); updateCartCount(); }

function updateCartCount() {
  const total = getCart().reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('#cart-count').forEach(el => el.textContent = total);
}

function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const cart = getCart();
  const idx = cart.findIndex(i => i.id === productId);
  if (idx > -1) cart[idx].qty++;
  else cart.push({ id: product.id, name: product.name, price: product.price, emoji: product.emoji, img: product.img, qty: 1 });
  saveCart(cart);
  showToast(`✓ ${product.name} ajouté au panier`);
}

function removeFromCart(productId) {
  saveCart(getCart().filter(i => i.id !== productId));
  renderCart();
}

function changeQty(productId, delta) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.id === productId);
  if (idx === -1) return;
  cart[idx].qty += delta;
  if (cart[idx].qty < 1) cart.splice(idx, 1);
  saveCart(cart);
  renderCart();
}

// ---------- TOAST ----------
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) { toast = document.createElement('div'); toast.id = 'toast'; toast.className = 'toast'; document.body.appendChild(toast); }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ---------- RENDER ----------
function renderProductCard(p) {
  const stars = '★'.repeat(p.stars) + '☆'.repeat(5 - p.stars);
  const badge = p.badge === 'new'   ? '<span class="badge-new">NOUVEAU</span>'  :
                p.badge === 'promo' ? '<span class="badge-promo">PROMO</span>'  : '';
  const oldPriceHtml = p.oldPrice ? `<span class="price-old">${p.oldPrice}€</span>` : '';
  const imgHtml = p.img
    ? `<img src="${p.img}" alt="${p.name}" onerror="this.style.display='none'">`
    : `<span style="font-size:5rem">${p.emoji}</span>`;
  return `
    <div class="product-card" data-id="${p.id}">
      <div class="product-img">${imgHtml}${badge}</div>
      <div class="product-info">
        <div class="product-cat">${p.cat}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-stars">${stars}</div>
        <div class="product-price">
          <span class="price-current">${p.price}€</span>${oldPriceHtml}
        </div>
        <div class="product-actions">
          <button class="btn-cart" onclick="addToCart(${p.id})">🛒 Ajouter</button>
          <button class="btn-wish" title="Favoris">♡</button>
        </div>
      </div>
    </div>`;
}

function renderFeaturedProducts(containerId, indices) {
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = indices.map(i => renderProductCard(PRODUCTS[i])).join('');
}

function renderProductsByCategory(containerId, cat) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const list = cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);
  el.innerHTML = list.map(p => renderProductCard(p)).join('') || '<p style="text-align:center;color:var(--text-light);padding:3rem;">Aucun produit trouvé.</p>';
}

// ---------- PANIER RENDER ----------
function renderCart() {
  const el = document.getElementById('cart-items');
  if (!el) return;
  const cart = getCart();
  if (!cart.length) {
    el.innerHTML = `<div class="empty-cart"><div class="icon">🛒</div><p>Votre panier est vide</p><br><a href="catalogue.html" class="btn-primary">Continuer mes achats</a></div>`;
    updateSummary(cart); return;
  }
  el.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">${item.img ? `<img src="${item.img}" style="width:60px;height:60px;object-fit:cover;border-radius:8px;">` : item.emoji}</div>
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <div class="cart-item-price">${item.price}€</div>
        <div class="cart-qty">
          <button class="qty-btn" onclick="changeQty(${item.id},-1)">−</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
          <button class="qty-btn" onclick="removeFromCart(${item.id})" style="color:var(--red)">✕</button>
        </div>
      </div>
      <div style="font-weight:700;font-family:'Playfair Display',serif">${(item.price*item.qty).toFixed(2)}€</div>
    </div>`).join('');
  updateSummary(cart);
}

function updateSummary(cart) {
  const el = document.getElementById('cart-summary');
  if (!el) return;
  const subtotal = cart.reduce((s,i) => s + i.price*i.qty, 0);
  const livraison = subtotal >= 80 ? 0 : 5.99;
  el.innerHTML = `
    <h3>Récapitulatif</h3>
    <div class="summary-line"><span>Sous-total</span><span>${subtotal.toFixed(2)}€</span></div>
    <div class="summary-line"><span>Livraison</span><span>${livraison === 0 ? 'Gratuite ✓' : livraison.toFixed(2)+'€'}</span></div>
    <div class="summary-total"><span>Total TTC</span><span>${(subtotal+livraison).toFixed(2)}€</span></div>
    <button class="btn-primary" style="width:100%;margin-top:1.5rem;border:none;cursor:pointer;font-size:1rem" onclick="checkout()">Passer la commande →</button>
    <a href="catalogue.html" style="display:block;text-align:center;margin-top:1rem;color:var(--text-light);font-size:.9rem;">Continuer mes achats</a>`;
}

function checkout() {
  if (!getCart().length) { showToast('Votre panier est vide'); return; }
  showToast('🎉 Commande passée avec succès ! Merci !');
  localStorage.removeItem('snitradz-cart');
  updateCartCount();
  setTimeout(renderCart, 500);
}

// ---------- MENU MOBILE ----------
function toggleMenu() { document.querySelector('.nav').classList.toggle('open'); }

// ---------- INIT ----------
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(l => {
    l.getAttribute('href') === page ? l.classList.add('active') : l.classList.remove('active');
  });
});