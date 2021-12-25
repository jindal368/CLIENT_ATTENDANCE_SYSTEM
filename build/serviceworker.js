const CACHE = 'version-1';
const urlsToCache = ['index.html' , 'offline.html'];



//installing sW
const self = this;
self.addEventListener('install' , (event) =>{
     event.waitUntil(
         caches.open(CACHE)
         .then((cache) =>{
             console.log('cache opened ');
             return  cache.addAll(urlsToCache);
         })
     )
});

// listen request
self.addEventListener('fetch' , (event) =>{
     event.respondWith(
         caches.match(event.request)
         .then(() => {
             return fetch(event.request)
             .catch(()=>caches.match('offline.html'))
         })
     )
});


//  activating SW
self.addEventListener('send' , (event) =>{
     const cachelist = [];
     cachelist.push(CACHE);

     event.waitUntil(
         caches.keys()
         .then((cachename) => Promise.all(
             cachename.map((c) =>{
                 if(!cachelist.includes(c))
                  return caches.delete(c);
             })
         ))
     )
});