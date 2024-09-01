import { handleFeathersMoxPush } from './userHandler.js';

export const showNotification = (data) => {
	self.registration.showNotification(data.title, {
		body: data.body,
		badge: 'assets/favicon.png',
		icon: data?.icon || 'assets/towerDefenseIconTransparent.png',
		tag: data.tag || 'teedee', //will replace other notifications with this tag
		data: { url: data.url || 'https://teedee.us' },
	});
};

export const handleNotificationClick = (event) => {
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
};

const _handlePush = async (event) => {
	try {
		let data;
		try {
			data = event.data.json();
		} catch (e) {
			data = { title: 'Notification', body: event.data.text() };
		}

		const feathersPush = await handleFeathersMoxPush(data);

		const clientList = await clients.matchAll({
			type: 'window',
			includeUncontrolled: true,
		});

		if (clientList.length <= 0) {
			showNotification(feathersPush || data);
			return;
		}

		// PWA is likely open, send a message to the clients
		console.log('PWA is open, sending message to client');
		for (const client of clientList) {
			client.postMessage({
				type: 'PUSH_NOTIFICATION',
				payload: data,
			});
		}
	} catch (error) {
		console.error('Error handling push event:', error);
	}
};

export const handlePush = (event) => {
	event.waitUntil(_handlePush(event));
};
