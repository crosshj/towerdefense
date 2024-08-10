export const showNotification = (data) => {
	self.registration.showNotification(data.title, {
		body: data.body,
		badge: 'assets/towerDefenseIconTransparent.png',
		icon: 'assets/towerDefenseIconTransparent.png',
		tag: data.tag || 'teedee', //will replace other notifications with this tag
		data: { url: data.url || 'https://teedee.us' }
	});
};
