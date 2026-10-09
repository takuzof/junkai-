const CACHE="junkai-v1133-shortcut-20261009";
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(["./index.html","./manifest.webmanifest","./icon.svg","./shortcut-icon-32.png","./shortcut-icon-192.png","./shortcut-icon-512.png","./shortcut-apple-touch-icon.png","./shortcut-favicon.ico"])))});
self.addEventListener("activate",e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith("junkai-")&&k!==CACHE)await caches.delete(k);await self.clients.claim()})()));
self.addEventListener("fetch",e=>{
 if(e.request.method!=="GET")return;
 if(e.request.mode==="navigate"){
  e.respondWith(fetch(e.request,{cache:"no-store"}).catch(()=>caches.match("./index.html")));return;
 }
 e.respondWith(fetch(e.request,{cache:"no-store"}).then(async r=>{let c=await caches.open(CACHE);c.put(e.request,r.clone());return r}).catch(()=>caches.match(e.request)));
});