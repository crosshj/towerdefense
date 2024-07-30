const cacheFiles = async (event) => {
	const filesToCache = event.data.files;
	// maybe get this from the event?
	const CACHE_KEY = 'dynamic-cache-v1';
	// maybe caches from other installs should be invalidated?
	const cache = await caches.open(CACHE_KEY);
	let cachedCount = 0;

	for (let i = 0; i < filesToCache.length; i++) {
		await cache.add(filesToCache[i]);
		cachedCount++;
		const progress = (cachedCount / filesToCache.length) * 100;
		const clients = await self.clients.matchAll();
		clients.forEach((client) => {
			client.postMessage({
				type: 'progress',
				progress: progress
			});
		});
	}
};

self.addEventListener('install', (event) => {
	self.skipWaiting(); // Activate worker immediately
});

self.addEventListener('activate', (event) => {
	event.waitUntil(self.clients.claim()); // Become available to all pages
});

self.addEventListener('message', async (event) => {
	if (event?.data?.type === 'updateCache') {
		await cacheFiles(event);
	}
});

self.addEventListener('fetch', (event) => {
	const requestURL = new URL(event.request.url);
	if (requestURL.pathname.includes('/api/')) {
		// If the request contains '/api/', just fetch it from the network
		event.respondWith(fetch(event.request));
		return;
	}

	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		})
	);

	// AUTO_CACHE
	// const CACHE_NAME = 'auto-cache-v1';
	// event.respondWith(
	// 	caches.match(event.request).then((response) => {
	// 		if (response) {
	// 			return response;
	// 		}
	// 		// Fetch the request from the network and add it to the cache
	// 		return fetch(event.request).then((networkResponse) => {
	// 			return caches.open(CACHE_NAME).then((cache) => {
	// 				cache.put(event.request, networkResponse.clone());
	// 				return networkResponse;
	// 			});
	// 		});
	// 	})
	// );
});
