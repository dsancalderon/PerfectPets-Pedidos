// The publishable key identifies the Supabase project; RLS protects its data.
const backend = { active: false, url: '', key: '', accessToken: '', refreshToken: '' };
window.backend = backend;
const gate = document.querySelector('#backend-gate');
const sessionKey = 'perfect-pets.supabase.session';

async function backendRequest(path, options = {}, retried = false) {
  const response = await fetch(`${backend.url}${path}`, {
    ...options,
    headers: {
      apikey: backend.key,
      ...(backend.accessToken && path.startsWith('/rest/') ? { Authorization: `Bearer ${backend.accessToken}` } : {}),
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (response.status === 401 && !retried && backend.refreshToken && path.startsWith('/rest/')) {
    const data = await backendRequest('/auth/v1/token?grant_type=refresh_token', {
      method: 'POST', body: JSON.stringify({ refresh_token: backend.refreshToken }),
    }, true);
    backend.accessToken = data.access_token;
    backend.refreshToken = data.refresh_token;
    localStorage.setItem(sessionKey, JSON.stringify({ accessToken: backend.accessToken, refreshToken: backend.refreshToken }));
    return backendRequest(path, options, true);
  }
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || body.error_description || body.error || `Error ${response.status}`);
  }
  const body = await response.text();
  return body ? JSON.parse(body) : null;
}

function showGate(message = '') {
  gate.hidden = false;
  gate.innerHTML = `<div class="backend-card"><h2>Accede a Perfect Pets</h2><p>Ingresa con un usuario autorizado en Supabase.</p><form id="backend-login"><label>Correo electrónico<input name="email" type="email" required autocomplete="username"></label><label>Contraseña<input name="password" type="password" required autocomplete="current-password"></label><button class="button primary" type="submit">Entrar</button></form><p id="backend-error" role="alert">${escapeHtml(message)}</p></div>`;
  gate.querySelector('form').addEventListener('submit', async event => {
    event.preventDefault();
    const button = event.currentTarget.querySelector('button');
    button.disabled = true;
    try {
      const data = await backendRequest('/auth/v1/token?grant_type=password', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))),
      });
      backend.accessToken = data.access_token;
      backend.refreshToken = data.refresh_token;
      localStorage.setItem(sessionKey, JSON.stringify({ accessToken: backend.accessToken, refreshToken: backend.refreshToken }));
      await loadBackendData();
      gate.hidden = true;
    } catch (error) { gate.querySelector('#backend-error').textContent = error.message; }
    finally { button.disabled = false; }
  });
}

async function loadBackendData() {
  const [members, clients, savedOrders] = await Promise.all([
    backendRequest('/rest/v1/app_members?select=user_id&limit=1'),
    backendRequest('/rest/v1/clients?select=*'),
    backendRequest('/rest/v1/orders?select=*'),
  ]);
  if (!members.length) throw new Error('Esta cuenta aún no tiene acceso. Agrégala a app_members en Supabase.');
  customClients = clients.filter(c => c.id.startsWith('client-')).map(c => ({ ...c }));
  CLIENTS.splice(5, CLIENTS.length - 5, ...customClients);
  orders = savedOrders.map(o => ({ id: o.id, clientId: o.client_id, date: o.purchase_date, notes: o.notes, items: o.items }));
  storageBlocked = false;
  clientsBlocked = false;
  refresh();
}

backend.saveOrder = async order => {
  await backendRequest('/rest/v1/orders?on_conflict=id', {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify({ id: order.id, client_id: order.clientId, purchase_date: order.date, notes: order.notes, items: order.items }),
  });
};
backend.deleteOrder = async id => {
  await backendRequest(`/rest/v1/orders?id=eq.${encodeURIComponent(id)}`, { method: 'DELETE' });
};
backend.saveClient = async client => {
  await backendRequest('/rest/v1/clients', {
    method: 'POST',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify({ id: client.id, name: client.name, type: client.type, phone: client.phone, contact: client.contact, address: client.address, email: client.email, social: client.social, extra: client.extra, logo: client.logo }),
  });
};

(async () => {
  try {
    const response = await fetch('/api/config');
    if (!response.ok) throw new Error('No se pudo leer la configuración.');
    const config = await response.json();
    if (!config.url || !config.key) {
      if (['localhost', '127.0.0.1'].includes(location.hostname)) return;
      throw new Error('Faltan SUPABASE_URL y SUPABASE_PUBLISHABLE_KEY en Vercel.');
    }
    backend.url = config.url.replace(/\/$/, '');
    backend.key = config.key;
    backend.active = true;
    const saved = JSON.parse(localStorage.getItem(sessionKey) || '{}');
    backend.accessToken = saved.accessToken || '';
    backend.refreshToken = saved.refreshToken || '';
    if (backend.refreshToken) {
      try {
        const data = await backendRequest('/auth/v1/token?grant_type=refresh_token', {
          method: 'POST', body: JSON.stringify({ refresh_token: backend.refreshToken }),
        });
        backend.accessToken = data.access_token;
        backend.refreshToken = data.refresh_token;
        localStorage.setItem(sessionKey, JSON.stringify({ accessToken: backend.accessToken, refreshToken: backend.refreshToken }));
        await loadBackendData();
        return;
      } catch { localStorage.removeItem(sessionKey); backend.accessToken = ''; }
    }
    showGate();
  } catch (error) { gate.hidden = false; gate.innerHTML = `<div class="backend-card"><h2>Sin conexión con Supabase</h2><p>${escapeHtml(error.message)}</p></div>`; }
})();
