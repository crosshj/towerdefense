/*
 chrome://inspect/#service-workers
*/

const cacheFiles = async (event) => {
	const filesToCache = event.data.files;
	// maybe get this from the event?
	const CACHE_KEY = 'dynamic-cache-v1';
	// maybe caches from other installs should be invalidated?
	const cache = await caches.open(CACHE_KEY);
	let cachedCount = 0;

	for (let i = 0; i < filesToCache.length; i++) {
		try {
			const response = await fetch(filesToCache[i], {
				cache: 'no-store'
			});
			if (!response.ok) {
				throw new Error(
					`Request for ${filesToCache[i]} failed with status ${response.status}`
				);
			}
			await cache.put(filesToCache[i], response.clone());
			cachedCount++;
			const progress = (cachedCount / filesToCache.length) * 100;
			const clients = await self.clients.matchAll();
			clients.forEach((client) => {
				client.postMessage({
					type: 'progress',
					progress: progress
				});
			});
		} catch (error) {
			console.error(
				`Failed to cache ${filesToCache[i]}: ${error.message}`
			);
		}
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
	if (event?.data?.type === 'testNotification') {
		self.registration.showNotification('Test Notification', {
			body: 'This is a test notification from TD!',
			icon: 'assets/towerDefenseIcon.png'
		});
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

self.addEventListener('push', (event) => {
	let data;
	try {
		data = event.data.json();
	} catch (e) {
		data = { title: 'Notification', body: event.data.text() };
	}

	self.registration.showNotification(data.title, {
		body: data.body,
		icon: 'assets/towerDefenseIcon.png'
	});
});
