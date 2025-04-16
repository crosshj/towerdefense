import { Page } from '../utils/Page.js';

const pageConfig = {
	title: 'Play Games Auth',
	stats: {},
};

async function setUserPhoto(user) {
	const img = document.getElementById('user-photo');
	try {
		const fallback = '/assets/auth/fallback.png';
		const cached = sessionStorage.getItem('playGamesPhotoDataURL');

		if (cached) {
			img.src = cached;
			return;
		}

		// Show original while we try to cache it
		const photoURL = user.photoURL || user.photoUrl;
		img.src = photoURL;
		const res = await fetch(photoURL, { mode: 'cors' });
		if (!res.ok) throw new Error('Image fetch failed');

		const blob = await res.blob();
		const reader = new FileReader();
		reader.onloadend = () => {
			const dataURL = reader.result;
			sessionStorage.setItem('playGamesPhotoDataURL', dataURL);
			img.src = dataURL; // just in case image failed before
		};
		reader.readAsDataURL(blob);
	} catch (err) {
		debug.log('Error loading user photo:', err.message);
		img.src = fallback;
	}
}

function renderUser(user) {
	if (!user || user.error) return;
	document.getElementById('login-button').style.display = 'none';
	setUserPhoto(user);
	document.getElementById('user-name').textContent = user.displayName;
	document.getElementById('user-title').textContent = user.title;
	document.getElementById('user-info').hidden = false;
}

const onReady = async ({ debug, call, Capacitor }) => {
	const pluginInited = await call('playGames.initPlugin');

	if (pluginInited?.error) {
		renderUser({
			displayName: 'Play Games Error',
			title: 'user not found',
			photoURL: '/assets/auth/playGames.png',
		});
		return;
	}

	const result = await call('playGames.getCurrentUser');
	debug.log('Play Games User:', result);
	renderUser(result?.user);
};
Page(pageConfig, onReady);
