const CACHE_NAME = 'comfort-serie-300-v2026-11-04-3';
const APP_SHELL = ['./','./index.html','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./extensions.js'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(APP_SHELL))));
self.addEventListener('activate', e => e.waitUntil((async () => {
  const keys = await caches.keys();
  await Promise.all(keys.filter(k => k.startsWith('comfort-serie-300-') && k !== CACHE_NAME).map(k => caches.delete(k)));
  await self.clients.claim();
})()));
self.addEventListener('message', e => { if (e.data?.type === 'SKIP_WAITING') self.skipWaiting(); });
self.addEventListener('fetch', e => {
  const r=e.request;
  if(r.method!=='GET' || new URL(r.url).origin!==self.location.origin) return;
  e.respondWith((async()=>{
    try {
      const response=await fetch(r);
      if(response?.ok) (await caches.open(CACHE_NAME)).put(r,response.clone());
      return response;
    } catch(err) {
      const cached=await caches.match(r);
      if(cached) return cached;
      if(r.mode==='navigate') return (await caches.match('./index.html')) || Response.error();
      return Response.error();
    }
  })());
});
