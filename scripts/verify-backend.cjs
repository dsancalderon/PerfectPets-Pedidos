const { chromium } = require('playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  const clients = [];
  const orders = [];
  let configRequests = 0;
  let refreshRequests = 0;
  await page.route('**/api/config', async route => {
    configRequests++;
    await new Promise(resolve => setTimeout(resolve, 700));
    await route.fulfill({ json: { url: 'https://test.supabase.co', key: 'sb_publishable_test' } });
  });
  await page.route('https://test.supabase.co/**', async route => {
    const request = route.request();
    const url = new URL(request.url());
    const headers = request.headers();
    if (url.pathname === '/auth/v1/token') {
      if (url.searchParams.get('grant_type') === 'refresh_token') refreshRequests++;
      assert.equal(headers.apikey, 'sb_publishable_test');
      assert.equal(headers.authorization, undefined);
      return route.fulfill({ json: { access_token: 'test-jwt', refresh_token: 'test-refresh' } });
    }
    assert.equal(headers.authorization, 'Bearer test-jwt');
    if (url.pathname === '/rest/v1/app_members') return route.fulfill({ json: [{ user_id: 'test-user' }] });
    if (url.pathname === '/rest/v1/clients') {
      if (request.method() === 'POST') { clients.push(request.postDataJSON()); return route.fulfill({ status: 201, body: '' }); }
      return route.fulfill({ json: clients });
    }
    if (url.pathname === '/rest/v1/orders') {
      if (request.method() === 'POST') { const order = request.postDataJSON(); const index = orders.findIndex(item => item.id === order.id); if (index < 0) orders.push(order); else orders[index] = order; return route.fulfill({ status: 201, body: '' }); }
      if (request.method() === 'DELETE') { orders.splice(orders.findIndex(item => item.id === url.searchParams.get('id').slice(3)), 1); return route.fulfill({ status: 204, body: '' }); }
      return route.fulfill({ json: orders });
    }
    throw new Error(`Unexpected request ${request.url()}`);
  });
  await page.goto('http://127.0.0.1:4173');
  assert.equal(await page.locator('#backend-gate').isVisible(), true);
  await page.locator('#backend-gate').waitFor({ state: 'visible' });
  await page.locator('#backend-login [name="email"]').fill('owner@example.com');
  await page.locator('#backend-login [name="password"]').fill('test-password');
  await page.locator('#backend-login button').click();
  await page.locator('#backend-gate').waitFor({ state: 'hidden' });
  await page.locator('[data-client="matius"]').click();
  await page.locator('[data-add="matius"]').click();
  await page.locator('#order-date').fill('2026-10-20');
  await page.locator('[data-product="xtreme"]').click();
  await page.locator('#save-order').click();
  assert.equal(orders.length, 1);
  assert.equal(orders[0].purchase_date, '2026-10-20');
  await page.reload();
  await page.locator('#backend-gate').waitFor({ state: 'hidden' });
  assert.equal(configRequests, 1, 'The project config is reused on reload');
  assert.equal(refreshRequests, 0, 'A valid session is reused on reload');
  await page.locator('[data-client="matius"]').click();
  assert.equal(await page.locator('.order').count(), 1);
  await page.locator('[data-delete]').click();
  await page.locator('#confirm-delete').click();
  assert.equal(orders.length, 0);
  await page.locator('#add-client-button').click();
  await page.locator('#client-name').fill('Huellitas Spa');
  await page.locator('#client-form [name="phone"]').fill('3001234567');
  await page.locator('#save-client').click();
  assert.equal(clients.length, 1);
  assert.equal(clients[0].name, 'Huellitas Spa');
  console.log('PASS: login, remote order save/reload/delete, remote client save.');
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
