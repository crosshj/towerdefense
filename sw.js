/*
 chrome://inspect/#service-workers
*/

const currentVersion = '0.0.1';
const currentHash = '{GIT_COMMIT_HASH}'; //will be replaced with GH Action
const version = currentHash.includes('_HASH')
	? currentVersion
	: currentVersion + '-' + currentHash.slice(0, 7);
console.log(`TD: ${version}`);

import { cacheFiles } from './serviceWorker/cacheFiles.js';
import { showNotification } from './serviceWorker/showNotifcation.js';
import {
	handleGetByToken,
	handleSetByToken,
	invalidateUserCache
} from './serviceWorker/userHandler.js';

self.addEventListener('install', (event) => {
	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	event.waitUntil(self.clients.claim());
});

self.addEventListener('message', async (event) => {
	if (event?.data?.type === 'updateCache') {
		await cacheFiles(event);
		await invalidateUserCache();
	}
	if (event?.data?.type === 'testNotification') {
		showNotification({
			title: 'Test Notification',
			body: 'This is a test notification from TD!'
		});
	}
});

self.addEventListener('fetch', (event) => {
	const requestURL = new URL(event.request.url);

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
	showNotification(data);
});

self.addEventListener('notificationclick', function (event) {
	event.notification.close();
	const { url = 'https://teedee.us' } = event?.notification?.data || {};
	event.waitUntil(
		clients.matchAll({ type: 'window' }).then((windowClients) => {
			// Check if there is already a window/tab open with the target URL
			for (let i = 0; i < windowClients.length; i++) {
				const client = windowClients[i];
				if (client.url === url && 'focus' in client) {
					return client.focus();
				}
			}
			// If not, open a new window/tab
			if (clients.openWindow) {
				return clients.openWindow(url);
			}
		})
	);
});

// background sync
self.addEventListener('sync', (event) => {
	if (event.tag === 'sync-tag') {
		event.waitUntil(syncData());
	}
});
function syncData() {
	return new Promise((resolve) => {
		console.log('Background sync triggered!');
		resolve();
	});
}

// periodic sync
self.addEventListener('periodicsync', (event) => {
	if (event.tag === 'periodic-sync-tag') {
		event.waitUntil(periodicSyncData());
	}
});
function periodicSyncData() {
	// TODO: this is where feathers would be updated
	// in order to tell backend about this, need user token
	return new Promise((resolve) => {
		console.log('Periodic sync triggered!');
		resolve();
	});
}
