import { showNotification } from './notifications.js';

const ONE_DAY = 24 * 60 * 60 * 1000;
const TEN_MINUTES = 10 * 60 * 1000;

export async function registerPeriodicSync(registration) {
	try {
		// periodic sync supported?
		if ('periodicSync' in registration) {
			const status = await navigator.permissions.query({
				name: 'periodic-background-sync',
			});

			if (status.state !== 'granted') {
				console.log('Periodic sync not permitted');
				return;
			}
			const tags = await registration.periodicSync.getTags();
			if (!tags.includes('periodic-sync-tag')) {
				await registration.periodicSync.register('periodic-sync-tag', {
					minInterval: TEN_MINUTES,
				});
			}
			console.log('Periodic sync enabled!');
		}
	} catch (e) {
		console.log(e);
	}
}

async function handleSyncTag(syncEvent) {
	console.log({ syncEvent, version: self._version });
	// TODO: this is where feathers would be updated
	// in order to tell backend about this, need user token
	showNotification({
		title: 'Periodic Background Sync',
		body: `Date: ${new Date().toISOString()}, Version: ${self._version}`,
	});
	return;
}

export const periodicSyncHandler = (event) => {
	console.log('periodic sync happened');
	if (event.tag === 'periodic-sync-tag') {
		event.waitUntil(handleSyncTag(event));
	}
};

function syncData() {
	return new Promise((resolve) => {
		console.log('Background sync triggered!');
		resolve();
	});
}

export const backgroundSyncHandler = (event) => {
	if (event.tag === 'sync-tag') {
		event.waitUntil(syncData());
	}
};
