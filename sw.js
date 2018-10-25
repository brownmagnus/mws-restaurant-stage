var cacheID = "fend-mws-restaurant-001";

self.addEventListener("install", event => {
  // Perform install steps
  event.waitUntil(
    caches.open(cacheID).then(cache => {
      return cache.addAll([
          '/',
          '/index.html',
          'restaurant.html',
          '/css/styles.css',
          '/data/restaurants.json',
          '/img/1.jpg',
          '/img/2.jpg',
          '/img/3.jpg',
          '/img/4.jpg',
          '/img/5.jpg',
          '/img/6.jpg',
          '/img/7.jpg',
          '/img/8.jpg',
          '/img/9.jpg',
          '/img/10.jpg',
          '/js/dbhelper.js',
          '/js/main.js',
          '/js/restaurant_info.js',
          '/img/dr-evil.gif',
          '/js/register.js'
        ])
        .catch(error => {
          console.log("Caches open failed: " + error);
        });
    })
  );
});

self.addEventListener("fetch", event => {
  let cacheRequest = event.request;

  let cacheUrlObj = new URL(event.request.url);
  if (event.request.url.indexOf("restaurant.html") > -1) {
    const cacheURL = "restaurant.html";
    cacheRequest =new Request(cacheURL);
  }

  event.respondWith(
    caches.match(cacheRequest)
    .then(response => {
      if (response) {
        return response;
      }
      let fetchRequest = event.request.clone();
      return fetch(fetchRequest)
          .then(response => {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            let responseToCache = response.clone();

            caches.open(cacheID)
              .then(cache => {
                cache.put(cacheRequest, responseToCache);
              });

            return response;
          });
    })
  );
});

self.addEventListener('activate', function(event) {

  var cacheWhitelist = ['mws-restaurant-001', 'mws-fend-restaurant-001'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
