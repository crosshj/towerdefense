/*
 chrome://inspect/#service-workers
*/

const currentVersion = '0.0.1';
const currentHash = '{GIT_COMMIT_HASH}'; //will be replaced with GH Action
self._version = currentHash.includes('_HASH')
	? currentVersion
	: currentVersion + '-' + currentHash.slice(0, 7);
console.log(`TD: ${self._version}`);

import { cacheFiles, clearCache } from './serviceWorker/cacheFiles.js';
import {
	handleNotificationClick,
	handlePush,
	showNotification,
} from './serviceWorker/notifications.js';
import {
	backgroundSyncHandler,
	periodicSyncHandler,
	registerPeriodicSync,
} from './serviceWorker/sync.js';
import {
	handleGetByToken,
	handleSetByToken,
	invalidateUserCache,
} from './serviceWorker/userHandler.js';

self.addEventListener('install', (event) => {
	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	event.waitUntil(self.clients.claim());
});

self.addEventListener('push', handlePush);
self.addEventListener('notificationclick', handleNotificationClick);
self.addEventListener('periodicsync', periodicSyncHandler);
self.addEventListener('sync', backgroundSyncHandler);

self.addEventListener('message', async (event) => {
	if (event?.data?.type === 'clearDynamicCache') {
		await clearCache();
	}
	if (event?.data?.type === 'updateCache') {
		await registerPeriodicSync(self.registration);
		await cacheFiles(event);
		await invalidateUserCache();
	}
	if (event?.data?.type === 'testNotification') {
		showNotification({
			title: 'Test Notification',
			body: 'This is a test notification from TD!',
		});
	}
});

self.addEventListener('fetch', (event) => {
	const requestURL = new URL(event.request.url);

	if (requestURL.pathname === '/version') {
		const versionInfo = {
			version: self._version,
		};
		const versionResponse = new Response(JSON.stringify(versionInfo), {
			headers: { 'Content-Type': 'application/json' },
		});
		event.respondWith(versionResponse);
		return;
	}

	if (requestURL.pathname === '/api/teedee/players/getByToken') {
		event.respondWith(handleGetByToken(event.request));
		return;
	}

	if (requestURL.pathname === '/api/teedee/players/setByToken') {
		event.respondWith(handleSetByToken(event.request));
		return;
	}

	if (requestURL.pathname.includes('/api/')) {
		// If the request contains '/api/', just fetch it from the network
		event.respondWith(fetch(event.request));
		return;
	}

	if (requestURL.pathname.endsWith('.html')) {
		const cacheRequest = new Request(requestURL.pathname);
		event.respondWith(
			caches.match(cacheRequest).then((response) => {
				return response || fetch(event.request);
			})
		);
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
