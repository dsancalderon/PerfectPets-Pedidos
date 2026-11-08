const CLIENTS = [
  { id: 'matius', name: 'Matius', type: 'Peluquería canina y felina', image: 'matius-clean.webp', contact: 'Sede Ciudadela Colsubsidio', phone: '3015651510', address: 'Cra. 111ª #88-26 · Ciudadela Colsubsidio', extra: 'Sede Tabora: Cll. 75 #78-94 · 320 389 1147', social: '@Matius_peluqueriacanina', source: 'Matius.jpeg' },
  { id: 'patas', name: 'Patas al Agua', type: 'Petshop & Grooming spa', image: 'patas-al-agua-clean.webp', phone: '3248906122', address: 'Calle 86C #110C-33', social: '@patasalagua_pet', source: 'Patas_al_Agua.jpeg' },
  { id: 'peluditos', name: 'Peluditos & Vanidosos', type: 'Estética canina y guardería', image: 'peluditos-clean.webp', phone: '3160425821', address: 'Calle 88 #113-06, local 2 · Ciudadela Colsubsidio', social: '@peluditosyvanidosos', source: 'Peluditos_y_Vanidosos.jpeg' },
  { id: 'spa', name: 'Spa Tu Gato', type: 'Spa y cuidado de mascotas', image: 'spa-tu-gato-clean.webp', contact: 'CVA Nancy', phone: '3133182208', landline: '6014673021', address: 'Calle 81 #109-04 · Barrio Bolivia, Bogotá', email: 'spatuperrospatugato@gmail.com', extra: 'Atención con cita previa · 9 a. m. a 6 p. m.', source: 'Spa_Tu_Gato.jpeg' },
  { id: 'vet', name: 'Vet Health', type: 'Veterinaria, guardería y grooming', image: 'vet-health-clean.webp', contact: 'Dra. Yamile Mancipe', phone: '3212559492', landline: '6015170347', address: 'Cll. 86 #103D-62', source: 'Vet_Healt.jpeg' },
];
const PRODUCTS = [
  { id: 'xtreme', name: 'Champú Xtreme', tag: 'LIMPIEZA PROFUNDA', description: 'Limpieza y volumen para mantos rizados.', sizes: { '2 L': 68000, '4 L': 90000, '10 L': 195000, '20 L': 380000 } },
  { id: 'diamond', name: 'Champú Diamond', tag: 'HIDRATACIÓN', description: 'Suavidad, brillo y un pelaje manejable.', sizes: { '2 L': 68000, '4 L': 90000, '10 L': 195000, '20 L': 380000 } },
  { id: 'frutos', name: 'Acondicionador Frutos Rojos', tag: 'SUAVIDAD Y DESENREDO', description: 'Hidrata el manto y facilita el cepillado.', sizes: { '4 L': 90000, '10 L': 195000, '20 L': 380000 } },
  { id: 'coco', name: 'Acondicionador Coco', tag: 'NUTRICIÓN PROFUNDA', description: 'Nutre y suaviza con aroma a coco.', sizes: { '4 L': 90000, '10 L': 195000, '20 L': 380000 } },
  { id: 'mascarilla', name: 'Mascarilla Reparadora', tag: 'FUERZA Y BRILLO', description: 'Hidratación y nutrición para el pelaje.', sizes: { '1 L': 85000 } },
  { id: 'statik', name: 'Statik Pro', tag: 'CONTROL DEL FRIZZ', description: 'Cosmético antiestático de acabado.', sizes: { '250 ml': 30000 } },
];
const paths = {
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/>',
  chevron: '<path d="m7 10 5 5 5-5"/>', plus: '<path d="M12 5v14M5 12h14"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  bag: '<path d="M5 7h14l1 14H4L5 7Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  users: '<circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 5a3 3 0 0 1 0 6M18 15a5 5 0 0 1 3 5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin: '<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/>',
  phone: '<path d="m7 3 3 5-3 3c2 3 3 4 6 6l3-3 5 3c0 4-3 5-6 4C7 18 3 13 3 7c0-2 1-4 4-4Z"/>',
  edit: '<path d="m15 4 5 5M4 20l5-1L21 7a2 2 0 0 0-5-5L4 14v6Z"/>',
  trash: '<path d="M3 6h18M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7M14 10v7"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>', check: '<path d="m5 12 4 4L19 6"/>',
  arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
};
const icon = name => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.bag}</svg>`;
document.querySelectorAll('[data-icon]').forEach(el => el.innerHTML = icon(el.dataset.icon));
const $ = selector => document.querySelector(selector);
const money = value => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);
const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const today = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Bogota', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const dateLabel = value => new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(value + 'T12:00:00Z'));
const total = order => order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
const STORAGE = 'perfect-pets.orders.v1';
const CLIENT_STORAGE = 'perfect-pets.clients.v1';
const validLogo = value => value === '' || (typeof value === 'string' && value.length < 2900000 && /^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(value));
let customClients = [], clientsBlocked = false;
try {
  const saved = JSON.parse(localStorage.getItem(CLIENT_STORAGE) || '[]');
  if (!Array.isArray(saved) || !saved.every(c => c && /^client-[a-f0-9-]{36}$/.test(c.id) && typeof c.name === 'string' && c.name.trim().length > 0 && c.name.length <= 100 && /^\d{10}$/.test(c.phone) && ['type','contact','address','email','social','extra'].every(k => typeof c[k] === 'string' && c[k].length <= 500) && validLogo(c.logo)) || new Set(saved.map(c => c.id)).size !== saved.length) throw new Error('Invalid clients');
  customClients = saved;
  CLIENTS.push(...customClients);
} catch { clientsBlocked = true; }
let orders = [], storageBlocked = false, openClient = null, draft = null, trigger = null;
function validOrder(o) {
  return o && typeof o.id === 'string' && CLIENTS.some(c => c.id === o.clientId) && /^\d{4}-\d{2}-\d{2}$/.test(o.date) && !isNaN(Date.parse(o.date)) && typeof o.notes === 'string' && Array.isArray(o.items) && o.items.length > 0 && o.items.every(i => PRODUCTS.some(p => p.id === i.productId && Object.hasOwn(p.sizes, i.size)) && Number.isSafeInteger(i.quantity) && i.quantity > 0 && i.quantity <= 999 && Number.isFinite(i.price) && i.price >= 0);
}
try {
  const saved = JSON.parse(localStorage.getItem(STORAGE) || '[]');
  if (!Array.isArray(saved) || !saved.every(validOrder)) throw new Error('Invalid saved orders');
  orders = saved;
} catch { storageBlocked = true; }
function persist(next) {
  if (storageBlocked) { toast('No se pudo leer el historial guardado. No se sobrescribirá; revisa el almacenamiento del navegador.'); return false; }
  try { localStorage.setItem(STORAGE, JSON.stringify(next)); orders = next; return true; }
  catch { toast('No se pudo guardar. Revisa el espacio y los permisos de almacenamiento del navegador.'); return false; }
}
let toastTimer;
function toast(message) { $('#toast').textContent = message; $('#toast').classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 6000); }
function clientOrders(id) { return orders.filter(o => o.clientId === id).sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id)); }
function relative(date) {
  const days = Math.round((Date.parse(today() + 'T12:00:00Z') - Date.parse(date + 'T12:00:00Z')) / 86400000);
  return days === 0 ? 'Hoy' : days === 1 ? 'Hace 1 día' : days > 1 ? `Hace ${days} días` : dateLabel(date);
}
function renderOverview() {
  $('#overview').innerHTML = `<div><span class="metric-icon purple">${icon('users')}</span><div><span class="metric-label">Clientes registrados</span><strong>${CLIENTS.length.toString().padStart(2, '0')} <small>peluquerías y veterinarias</small></strong></div></div><div><span class="metric-icon blue">${icon('bag')}</span><div><span class="metric-label">Pedidos registrados</span><strong>${orders.length.toString().padStart(2, '0')} <small>en tu historial</small></strong></div></div><div><span class="metric-icon gold">${icon('grid')}</span><div><span class="metric-label">Productos disponibles</span><strong>06 <small>cuidado profesional</small></strong></div></div>`;
}
function renderClients() {
  const query = $('#search').value.trim().toLocaleLowerCase('es');
  const filtered = CLIENTS.filter(c => ['name','type','phone','address','contact','email','social','extra'].map(k => c[k] || '').join(' ').toLocaleLowerCase('es').includes(query)).sort((a, b) => $('#sort').value === 'recent' ? (clientOrders(b.id)[0]?.date || '').localeCompare(clientOrders(a.id)[0]?.date || '') || a.name.localeCompare(b.name) : a.name.localeCompare(b.name));
  $('#client-count').textContent = filtered.length;
  $('#clients').innerHTML = filtered.length ? filtered.map(raw => {
    const c = Object.fromEntries(Object.entries(raw).map(([k,v]) => [k, escapeHtml(v)]));
    const logo = raw.logo || (raw.image ? `assets/${raw.image}` : '');
    const avatar = logo ? `<img src="${escapeHtml(logo)}" alt="Logo de ${c.name}">` : `<span class="client-initials" aria-label="Iniciales de ${c.name}">${escapeHtml(raw.name.split(/\s+/).filter(Boolean).slice(0,2).map(w => w[0]).join('').toLocaleUpperCase('es'))}</span>`;
    const history = clientOrders(c.id), expanded = openClient === c.id;
    return `<article class="client-card ${expanded ? 'expanded' : ''}">
      <h2><button class="client-toggle" data-client="${c.id}" aria-expanded="${expanded}" aria-controls="details-${c.id}"><span class="client-logo">${avatar}</span><span class="client-name"><strong>${c.name}</strong><span>${c.type}</span></span><span class="last-order ${history.length ? 'has-orders' : ''}">${icon('clock')}<span>Último pedido: <strong>${history.length ? relative(history[0].date) : 'Sin pedidos'}</strong></span></span><span class="expand-arrow">${icon('chevron')}</span></button></h2>
      <div class="client-details" id="details-${c.id}" ${expanded ? '' : 'hidden'}>
        <div class="contact-grid"><div><span class="detail-label">${icon('pin')} DIRECCIÓN</span><p>${c.address || 'Dirección pendiente'}</p>${c.extra ? `<small>${c.extra}</small>` : ''}</div><div><span class="detail-label">${icon('phone')} CONTACTO</span><p><a href="tel:+57${c.phone}">${c.phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')}</a>${c.landline ? ` <span class="muted">/ ${c.landline}</span>` : ''}</p><small>${c.contact || c.social || ''}</small>${c.email ? `<small><a href="mailto:${c.email}">${c.email}</a></small>` : ''}${c.contact && c.social ? `<small>${c.social}</small>` : ''}</div>${c.source ? `<a class="source-link" href="Tarjetas/${c.source}" target="_blank" rel="noopener">Ver tarjeta ${icon('arrow')}</a>` : ''}</div>
        <div class="history-heading"><h3>Historial de pedidos <span class="count">${history.length}</span></h3>${history.length ? `<span>Total comprado <strong>${money(history.reduce((s, o) => s + total(o), 0))}</strong></span>` : ''}</div>
        ${history.length ? `<div class="history">${history.map(orderHtml).join('')}</div>` : `<div class="empty-history"><span class="empty-icon">${icon('bag')}</span><div><strong>El próximo cuidado empieza aquí</strong><p>Registra el primer pedido de ${c.name} y empieza su historial.</p></div></div>`}
        <button class="add-order" data-add="${c.id}">${icon('plus')} Agregar pedido <span>${icon('arrow')}</span></button>
      </div></article>`;
  }).join('') : '<div class="no-results"><strong>No encontramos ese cliente</strong><p>Prueba con otro nombre, dirección o teléfono.</p><button class="button secondary" id="clear-search">Limpiar búsqueda</button></div>';
}
function orderHtml(o) {
  return `<article class="order"><div class="order-top"><div><span class="order-date">${icon('bag')} ${dateLabel(o.date)}</span><small>${o.items.reduce((s, i) => s + i.quantity, 0)} unidades · ${o.items.length} ${o.items.length === 1 ? 'referencia' : 'referencias'}</small></div><strong class="order-total">${money(total(o))}</strong><div class="order-actions"><button class="icon-button" data-edit="${escapeHtml(o.id)}" aria-label="Editar pedido del ${dateLabel(o.date)}">${icon('edit')}</button><button class="icon-button danger" data-delete="${escapeHtml(o.id)}" aria-label="Eliminar pedido del ${dateLabel(o.date)}">${icon('trash')}</button></div></div><div class="order-products">${o.items.map(i => `<span>${escapeHtml(PRODUCTS.find(p => p.id === i.productId).name)} <b>${i.size} × ${i.quantity}</b><small>${money(i.price)} c/u</small></span>`).join('')}</div>${o.notes ? `<p class="order-notes">${escapeHtml(o.notes)}</p>` : ''}</article>`;
}
function refresh() { renderOverview(); renderClients(); }
$('#search').addEventListener('input', renderClients);
$('#sort').addEventListener('change', renderClients);
document.addEventListener('keydown', e => { if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) && !document.querySelector('dialog[open]')) { e.preventDefault(); $('#search').focus(); } });
async function toggleClient(id) {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (openClient === id) {
    const panel = document.getElementById(`details-${id}`);
    openClient = null;
    const button = document.querySelector(`[data-client="${id}"]`);
    button.setAttribute('aria-expanded', 'false');
    if (!reduceMotion) {
      const animation = panel.animate([{ height: `${panel.scrollHeight}px`, opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 240, easing: 'ease-in-out' });
      await animation.finished.catch(() => {});
    }
    if (openClient === null) { renderClients(); document.querySelector(`[data-client="${id}"]`)?.focus(); }
    return;
  }
  openClient = id;
  renderClients();
  const panel = document.getElementById(`details-${id}`);
  if (!reduceMotion) panel.animate([{ height: '0px', opacity: 0 }, { height: `${panel.scrollHeight}px`, opacity: 1 }], { duration: 280, easing: 'ease-out' });
  document.querySelector(`[data-client="${id}"]`)?.focus();
}
$('#clients').addEventListener('click', e => {
  const button = e.target.closest('button'); if (!button) return;
  if (button.dataset.client) toggleClient(button.dataset.client);
  if (button.dataset.add) openOrder(button.dataset.add);
  if (button.dataset.edit) { const o = orders.find(o => o.id === button.dataset.edit); openOrder(o.clientId, o); }
  if (button.dataset.delete) openDelete(button.dataset.delete);
  if (button.id === 'clear-search') { $('#search').value = ''; renderClients(); $('#search').focus(); }
});
function productHtml(p, readonly = false) {
  return `<article class="product-card"><div class="product-photo"><img src="assets/${p.id}-clean.webp" alt="${p.name}" loading="lazy"></div><div class="product-content"><span class="product-tag">${p.tag}</span><h3>${p.name}</h3><p>${p.description}</p>${readonly ? `<div class="price-list">${Object.entries(p.sizes).map(([size, price]) => `<span>${size}<b>${money(price)}</b></span>`).join('')}</div>` : `<div class="product-controls"><label><span>Tamaño</span><select data-size="${p.id}" aria-label="Tamaño de ${p.name}">${Object.keys(p.sizes).map(size => `<option>${size}</option>`).join('')}</select></label><strong data-price="${p.id}">${money(Object.values(p.sizes)[0])}</strong><button type="button" class="product-add" data-product="${p.id}" aria-label="Agregar ${p.name}">${icon('plus')}</button></div>`}</div></article>`;
}
function openOrder(clientId, existing) {
  trigger = document.activeElement;
  draft = existing ? structuredClone(existing) : { id: crypto.randomUUID(), clientId, date: today(), items: [], notes: '' };
  const c = CLIENTS.find(c => c.id === clientId);
  $('#order-dialog').innerHTML = `<div class="modal-heading"><div><div class="eyebrow">UN NUEVO MOMENTO DE CUIDADO</div><h2 id="order-title">${existing ? 'Editar pedido' : 'Nuevo pedido'}<span>.</span></h2><p>Para <strong>${escapeHtml(c.name)}</strong></p></div><button class="icon-button" data-close aria-label="Cerrar pedido">${icon('close')}</button></div><form id="order-form"><div class="order-layout"><section class="product-picker"><div class="section-heading"><h3>Elige los productos</h3><span>Precios profesionales · COP</span></div><div class="product-grid">${PRODUCTS.map(p => productHtml(p)).join('')}</div></section><aside class="order-summary"><h3>Tu pedido <span id="draft-count" class="count">0</span></h3><div id="draft-items"></div><label class="field notes-label">Notas <span>opcional</span><textarea id="order-notes" maxlength="500" rows="2" placeholder="Un detalle para recordar…">${escapeHtml(draft.notes)}</textarea></label><div class="order-date-section"><label class="field" for="order-date">Fecha del pedido<input type="date" id="order-date" required max="${today()}" value="${draft.date}" aria-describedby="order-date-help"></label><p id="order-date-help">Selecciona la fecha de la compra, aunque registres el pedido hoy.</p></div><div class="grand-total"><span>Total del pedido<small>Pesos colombianos</small></span><strong id="draft-total">${money(0)}</strong></div><button class="button primary save-order" type="submit" id="save-order">${icon('check')} ${existing ? 'Guardar cambios' : 'Guardar pedido'}</button><p class="local-note">Guardado en este navegador.</p></aside></div></form>`;
  renderDraft(); $('#order-dialog').showModal();
  $('#order-form').addEventListener('submit', saveOrder);
  $('#order-date').addEventListener('input', e => draft.date = e.target.value);
  $('#order-notes').addEventListener('input', e => draft.notes = e.target.value);
}
function renderDraft() {
  $('#draft-count').textContent = draft.items.reduce((sum, i) => sum + i.quantity, 0);
  $('#draft-items').innerHTML = draft.items.length ? draft.items.map((i, n) => {
    const p = PRODUCTS.find(p => p.id === i.productId);
    return `<div class="draft-item"><img src="assets/${p.id}-clean.webp" alt=""><div class="draft-info"><strong>${p.name}</strong><small>${i.size} · ${money(i.price)} c/u</small><div class="quantity-control"><button type="button" data-decrease="${n}" aria-label="Reducir cantidad de ${p.name}" ${i.quantity <= 1 ? 'disabled' : ''}>−</button><input type="number" min="1" max="999" step="1" value="${i.quantity}" data-quantity="${n}" aria-label="Cantidad de ${p.name}"><button type="button" data-increase="${n}" aria-label="Aumentar cantidad de ${p.name}" ${i.quantity >= 999 ? 'disabled' : ''}>+</button></div></div><button type="button" class="remove-item" data-remove="${n}" aria-label="Quitar ${p.name}">${icon('close')}</button><b>${money(i.price * i.quantity)}</b></div>`;
  }).join('') : `<div class="empty-cart">${icon('bag')}<strong>Un pedido lleno de cuidado</strong><p>Agrega productos para ver aquí el resumen.</p></div>`;
  $('#draft-total').textContent = money(total(draft));
  $('#save-order').disabled = !draft.items.length;
}
$('#order-dialog').addEventListener('change', e => {
  if (e.target.dataset.size) { const p = PRODUCTS.find(p => p.id === e.target.dataset.size); $(`[data-price="${p.id}"]`).textContent = money(p.sizes[e.target.value]); }
  if (e.target.dataset.quantity !== undefined) {
    const value = Number(e.target.value);
    if (!Number.isInteger(value) || value < 1 || value > 999) { e.target.setCustomValidity('Ingresa una cantidad entera entre 1 y 999.'); e.target.reportValidity(); return; }
    e.target.setCustomValidity(''); draft.items[Number(e.target.dataset.quantity)].quantity = value; renderDraft();
  }
});
$('#order-dialog').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.dataset.product) {
    const p = PRODUCTS.find(p => p.id === b.dataset.product), size = $(`[data-size="${p.id}"]`).value;
    const item = draft.items.find(i => i.productId === p.id && i.size === size);
    if (item) item.quantity = Math.min(999, item.quantity + 1); else draft.items.push({ productId: p.id, size, quantity: 1, price: p.sizes[size] });
    renderDraft();
    b.innerHTML = icon('check'); setTimeout(() => { if (b.isConnected) b.innerHTML = icon('plus'); }, 700);
  }
  for (const [key, delta] of [['increase', 1], ['decrease', -1]]) if (b.dataset[key] !== undefined) { const n = Number(b.dataset[key]); draft.items[n].quantity = Math.max(1, Math.min(999, draft.items[n].quantity + delta)); renderDraft(); $(`[data-${key}="${n}"]`)?.focus(); }
  if (b.dataset.remove !== undefined) { const n = Number(b.dataset.remove); draft.items.splice(n, 1); renderDraft(); $('#order-date').focus(); }
});
async function saveOrder(e) {
  e.preventDefault();
  draft.date = $('#order-date').value; draft.notes = $('#order-notes').value.trim();
  if (!validOrder(draft) || draft.date > today()) { toast('Revisa la fecha y los productos del pedido.'); return; }
  const existing = orders.some(o => o.id === draft.id);
  const next = [...orders.filter(o => o.id !== draft.id), structuredClone(draft)];
  if (window.backend?.active) {
    try { await window.backend.saveOrder(draft); orders = next; }
    catch { toast('No se pudo guardar en Supabase. Revisa la conexión e inténtalo de nuevo.'); return; }
  } else if (!persist(next)) return;
  openClient = draft.clientId;
  $('#order-dialog').close(); refresh(); $(`[data-add="${openClient}"]`)?.focus(); toast(existing ? 'Los cambios del pedido se guardaron.' : 'Pedido guardado. Su historia sigue creciendo.');
}
function openDelete(id) {
  const o = orders.find(o => o.id === id);
  $('#delete-dialog').innerHTML = `<div class="delete-symbol">${icon('trash')}</div><h2 id="delete-title">¿Eliminar este pedido?</h2><p>Pedido del ${dateLabel(o.date)} por <strong>${money(total(o))}</strong>. Se quitará del historial de ${escapeHtml(CLIENTS.find(c => c.id === o.clientId).name)}.</p><div class="dialog-actions"><button class="button secondary" data-close>Cancelar</button><button class="button destructive" id="confirm-delete">Eliminar pedido</button></div>`;
  $('#delete-dialog').showModal();
  $('#confirm-delete').onclick = async () => {
    if (window.backend?.active) {
      try { await window.backend.deleteOrder(id); orders = orders.filter(item => item.id !== id); }
      catch { toast('No se pudo eliminar en Supabase. Revisa la conexión.'); return; }
    } else if (!persist(orders.filter(item => item.id !== id))) return;
    $('#delete-dialog').close(); refresh(); $(`[data-add="${o.clientId}"]`)?.focus(); toast('Pedido eliminado del historial.');
  };
}
$('#catalog-button').onclick = () => {
  $('#catalog-dialog').innerHTML = `<div class="modal-heading"><div><div class="eyebrow">CUIDADO QUE HACE LA DIFERENCIA</div><h2 id="catalog-title">Nuestros productos<span>.</span></h2><p>Gold Cosmetic Groomers × Perfect Pets</p></div><button class="icon-button" data-close aria-label="Cerrar catálogo">${icon('close')}</button></div><div class="catalog-body"><div class="section-heading"><h3>La fórmula de un buen cuidado</h3><span>Tarifa profesional · COP</span></div><div class="catalog-grid">${PRODUCTS.map(p => productHtml(p, true)).join('')}</div><p class="catalog-note">Tamaños y valores tomados de la tarifa profesional suministrada. Fotos de referencia.</p></div>`;
  $('#catalog-dialog').showModal();
};
let clientLogo = '', logoVersion = 0, logoPending = false;
function clientError(message) {
  $('#client-form-error').textContent = message;
  $('#client-form-error').hidden = !message;
}
function resetClientLogo() {
  logoVersion++; clientLogo = ''; logoPending = false;
  $('#client-logo').value = '';
  $('#client-logo-preview').innerHTML = icon('users');
  $('#remove-client-logo').hidden = true;
  $('#save-client').disabled = false;
}
$('#add-client-button').addEventListener('click', () => {
  $('#client-form').reset(); resetClientLogo(); clientError('');
  $('#client-dialog').showModal(); $('#client-name').focus();
});
$('#remove-client-logo').addEventListener('click', () => { resetClientLogo(); clientError(''); });
$('#client-dialog').addEventListener('close', () => { logoVersion++; logoPending = false; });
$('#client-logo').addEventListener('change', async e => {
  const file = e.target.files[0]; resetClientLogo(); clientError('');
  if (!file) return;
  if (!['image/png','image/jpeg','image/webp'].includes(file.type) || file.size > 2 * 1024 * 1024) {
    clientError('Elige una imagen PNG, JPG o WebP de hasta 2 MB.'); return;
  }
  const version = logoVersion;
  logoPending = true; $('#save-client').disabled = true;
  try {
    const data = await new Promise((resolve,reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(file); });
    const img = new Image(); img.src = data; await img.decode();
    if (version !== logoVersion) return;
    if (!validLogo(data)) throw new Error('Invalid image');
    clientLogo = data; img.alt = 'Logo del nuevo cliente';
    $('#client-logo-preview').replaceChildren(img); $('#remove-client-logo').hidden = false;
  } catch { if (version === logoVersion) clientError('No pudimos abrir esa imagen. Prueba con otro archivo.'); }
  finally { if (version === logoVersion) { logoPending = false; $('#save-client').disabled = false; } }
});
$('#client-form').addEventListener('submit', async e => {
  e.preventDefault(); clientError('');
  if (logoPending) return;
  if (clientsBlocked) { clientError('No se pudo leer la lista de clientes guardada. No se sobrescribirá; revisa el almacenamiento del navegador.'); return; }
  const values = new FormData(e.currentTarget);
  const value = key => String(values.get(key) || '').trim();
  let phone = value('phone').replace(/[^0-9]/g, '');
  if (phone.length === 12 && phone.startsWith('57')) phone = phone.slice(2);
  if (!value('name')) { clientError('Escribe el nombre de la peluquería.'); $('#client-name').focus(); return; }
  if (!/^\d{10}$/.test(phone)) { clientError('Ingresa un número colombiano de 10 dígitos, con o sin +57.'); $('#client-form [name="phone"]').focus(); return; }
  if (CLIENTS.some(c => c.name.toLocaleLowerCase('es') === value('name').toLocaleLowerCase('es') && c.phone === phone)) { clientError('Ya existe un cliente con ese nombre y teléfono. Puedes encontrarlo en el buscador.'); return; }
  const client = { id: `client-${crypto.randomUUID()}`, name: value('name'), type: value('type') || 'Peluquería canina', phone, contact: value('contact'), address: value('address'), email: value('email'), social: value('social'), extra: value('extra'), logo: clientLogo };
  const next = [...customClients, client];
  if (window.backend?.active) {
    try { await window.backend.saveClient(client); }
    catch { clientError('No se pudo guardar en Supabase. Revisa la conexión e inténtalo de nuevo.'); return; }
  } else {
    try { localStorage.setItem(CLIENT_STORAGE, JSON.stringify(next)); }
    catch { clientError('No se pudo guardar el cliente. El almacenamiento puede estar lleno o bloqueado. Prueba con un logo más pequeño.'); return; }
  }
  customClients = next; CLIENTS.push(client); openClient = client.id;
  $('#search').value = ''; $('#client-dialog').close(); refresh();
  const card = $(`[data-client="${client.id}"]`); card.focus(); card.scrollIntoView({ block: 'center' });
  toast('Cliente guardado. Ya puedes agregar su primer pedido.');
});
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.addEventListener('click', e => { if (e.target.closest('[data-close]')) dialog.close(); });
});
refresh();
if (storageBlocked) toast('No se pudo leer el historial local. Tus datos guardados no se han modificado.');


