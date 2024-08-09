'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "e58727aa38e5603dd8fab2f42f621a84",
"version.json": "930e3f17e63e22682218684b688b6eb0",
"index.html": "779ade129f3f23358c4c2e52a5b6c39b",
"/": "779ade129f3f23358c4c2e52a5b6c39b",
"main.dart.js": "437977646f47f727e0ff6179a479ccb6",
"flutter.js": "383e55f7f3cce5be08fcf1f3881f585c",
"favicon.png": "19ff42efe823359d5d786aa75da2add0",
"icons/Icon-192.png": "59f560a445d935dc9856f4954c0d3487",
"icons/Icon-maskable-192.png": "59f560a445d935dc9856f4954c0d3487",
"icons/Icon-maskable-512.png": "ebcd6e377e6063257a01694d8960c35f",
"icons/Icon-512.png": "ebcd6e377e6063257a01694d8960c35f",
"manifest.json": "9fc2fdd1105952b1b5e50d007dae5e78",
"assets/AssetManifest.json": "73330f66b38b8860851254d3a2d22469",
"assets/NOTICES": "f8b6c2b7c5527bf856af1ddba7c0675e",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin.json": "f59a60ab5d85387c01ae27571cb1ca6d",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "5cca09dfaab653730f5caa2f1e109b69",
"assets/fonts/MaterialIcons-Regular.otf": "db1fdf94bca6268d3637827863409689",
"assets/assets/images/ilution.png": "c080a115ef9b113b61c38f33bb97dc50",
"assets/assets/images/team_%2520img.png": "d5f7d78a6ebaa35216380d6b669a8527",
"assets/assets/images/leaderzxa.jpg": "1a400da0ebd3b5ded28c7d180983bbd5",
"assets/assets/images/umt.png": "76ee45eb3b28195510f77c14d56f7916",
"assets/assets/images/leaderskyy.jpg": "59f64d1c6c6f0706453684d0123b723c",
"assets/assets/images/styprojects.jpg": "990043b183738fac0741216c0de5e2f0",
"assets/assets/images/impact.png": "698b5a02d0854a0e867e6084fd51bda9",
"assets/assets/images/aam.png": "6188bafd72086f0e961dab4cef048457",
"assets/assets/images/sunseap.png": "27f7b2750080b0dab12e1a5acb921640",
"assets/assets/images/rocket.png": "077ec980b3d5329e324886c326e70906",
"assets/assets/images/pet_net.jpg": "7a5d6556136918803ae177dc17ccc52d",
"assets/assets/images/everc.png": "70ed82ef542f8c804892f5477ebd2d53",
"assets/assets/images/aam_mobile.jpg": "24d57511cfa9546519c89ca21afee2ea",
"assets/assets/images/dksh.png": "b7284196a54ec54d4df85e09b1af0a18",
"assets/assets/images/leaderamm.jpg": "a24f75abcea0c54b4a54ebf351045212",
"assets/assets/images/bawlive_web.jpg": "64d3cac495200801d6a4ef8e2cb24807",
"assets/assets/anims/teams_anim.json": "2644a7d396b639bb7863edefe6b0ecd3",
"assets/assets/anims/rockets.json": "e9a2de4676f7fd95f26b7ae2409491a0",
"assets/assets/logos/outline_orange.png": "5823ce4b2ea1fdc117a12a7c9be3a9d3",
"assets/assets/logos/outline_white.png": "450c481e92bdfed4e42889cbe5b11f3e",
"assets/assets/logos/main_logo.png": "c6b2b7971c7665de74c5c2822c77d3b0",
"assets/assets/logos/outline_blue.png": "3a6f35a8469984f7f2bf49c685189426",
"assets/assets/logos/horizontal_logo.png": "954883e5855e5489ef04bd9374a04754",
"canvaskit/skwasm.js": "5d4f9263ec93efeb022bb14a3881d240",
"canvaskit/skwasm.js.symbols": "c3c05bd50bdf59da8626bbe446ce65a3",
"canvaskit/canvaskit.js.symbols": "74a84c23f5ada42fe063514c587968c6",
"canvaskit/skwasm.wasm": "4051bfc27ba29bf420d17aa0c3a98bce",
"canvaskit/chromium/canvaskit.js.symbols": "ee7e331f7f5bbf5ec937737542112372",
"canvaskit/chromium/canvaskit.js": "901bb9e28fac643b7da75ecfd3339f3f",
"canvaskit/chromium/canvaskit.wasm": "399e2344480862e2dfa26f12fa5891d7",
"canvaskit/canvaskit.js": "738255d00768497e86aa4ca510cce1e1",
"canvaskit/canvaskit.wasm": "9251bb81ae8464c4df3b072f84aa969b",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
