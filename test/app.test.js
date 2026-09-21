const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const app = require('../src/app');

describe('API Endpoints', () => {
  let server;
  let baseUrl;

  test('Setup test server', (t, done) => {
    server = app.listen(0, () => {
      const port = server.address().port;
      baseUrl = `http://127.0.0.1:${port}`;
      done();
    });
  });

  test('GET /health returns 200 and UP status', async () => {
    const res = await fetch(`${baseUrl}/health`);
    const body = await res.json();

    assert.equal(res.status, 200);
    assert.equal(body.status, 'UP');
    assert.ok(body.timestamp);
  });

  test('GET /api/v1/system-info returns system metadata', async () => {
    const res = await fetch(`${baseUrl}/api/v1/system-info`);
    const body = await res.json();

    assert.equal(res.status, 200);
    assert.ok(body.nodeVersion);
    assert.ok(body.platform);
  });

  test('GET /non-existent returns 404', async () => {
    const res = await fetch(`${baseUrl}/non-existent`);
    const body = await res.json();

    assert.equal(res.status, 404);
    assert.equal(body.error, 'Endpoint Not Found');
  });

  test('Teardown test server', (t, done) => {
    server.close(done);
  });
});
