import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, normalize, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const port = Number(process.env.PORT || 3000);
const target = 'https://mnktechindia.onrender.com';
const targetHost = 'mnktechindia.onrender.com';
const root = fileURLToPath(new URL('.', import.meta.url));

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

const securityHeaders = {
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'x-frame-options': 'SAMEORIGIN',
  'permissions-policy': 'camera=(), microphone=(), geolocation=()'
};

function getHost(req) {
  const forwarded = req.headers['x-forwarded-host'];
  return String(forwarded || req.headers.host || '').split(',')[0].trim().split(':')[0].toLowerCase();
}

function redirectToCanonical(req, res) {
  const requestUrl = new URL(req.url || '/', target);
  res.writeHead(301, {
    location: requestUrl.href,
    'cache-control': 'public, max-age=86400',
    ...securityHeaders
  });
  res.end();
}

async function serveFile(req, res) {
  const requestUrl = new URL(req.url || '/', target);
  let pathname = decodeURIComponent(requestUrl.pathname);

  if (pathname === '/') pathname = '/index.html';

  const relative = normalize(pathname).replace(/^([/\\])+/, '');
  const filePath = join(root, relative);

  if (!filePath.startsWith(root)) {
    res.writeHead(400, securityHeaders);
    res.end('Bad request');
    return;
  }

  try {
    const body = await readFile(filePath);
    const ext = extname(filePath).toLowerCase();
    const headers = {
      ...securityHeaders,
      'content-type': contentTypes[ext] || 'application/octet-stream'
    };

    if (pathname === '/index.html') {
      headers['cache-control'] = 'public, max-age=300, must-revalidate';
    } else if (pathname === '/robots.txt' || pathname === '/sitemap.xml') {
      headers['cache-control'] = 'public, max-age=3600, must-revalidate';
    } else {
      headers['cache-control'] = 'public, max-age=86400';
    }

    res.writeHead(200, headers);
    res.end(body);
  } catch {
    res.writeHead(404, {
      ...securityHeaders,
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'no-store'
    });
    res.end('Not found');
  }
}

const server = http.createServer(async (req, res) => {
  const host = getHost(req);

  if (host && host !== targetHost && host !== 'localhost' && host !== '127.0.0.1') {
    redirectToCanonical(req, res);
    return;
  }

  await serveFile(req, res);
});

server.listen(port, '0.0.0.0', () => {
  console.log('MNK Technologies website serving ' + target + ' on port ' + port);
});
