import { depends } from '../../_depends.js';
import { isSessionActive } from '../../utils/session.js';

const registerServiceWorker = async () => {
	if (!('serviceWorker' in navigator)) {
		console.log('unable to register service worker');
		return;
	}
	const registration = navigator.serviceWorker
		.register('/sw.js', {
			scope: '/',
			type: 'module',
			updateViaCache: 'none'
		})
		.catch((error) => {
			console.log('Service Worker registration failed:', error);
		});
	if (!registration) {
		console.log('unable to register service worker');
		return;
	}
	console.log('Service Worker registered');

	// FAILSAFE: make sure progress is happening
	let currentProgress = 0;
	let previousProgress = 0;
	const timeline = {};
	const failsafeInterval = setInterval(() => {
		if (currentProgress === 100) {
			clearInterval(failsafeInterval);
			return;
		}
		// should not stay stuck on 0
		if (currentProgress === previousProgress) {
			document.location.reload();
		}
		// should spend no longer than 30 seconds on one progress state
		timeline[currentProgress] = timeline[currentProgress] || 0;
		timeline[currentProgress]++;
		const stuck = timeline[currentProgress] > 3;
		if (stuck) {
			document.location.reload();
		}
	}, 5000);

	navigator.serviceWorker.addEventListener('message', (event) => {
		if (event.data.type !== 'progress') return;

		const progressBar = document.getElementById('progress-bar');
		progressBar.value = event.data.progress;
		previousProgress = currentProgress;
		currentProgress = event.data.progress;

		progressBar.classList.remove('hidden');
		if (event.data.progress === 100) {
			clearInterval(failsafeInterval);
			window.parent.postMessage({
				_: 'navigate',
				src: '/pages/startup/index.html'
			});
		}
	});
};

const updateCache = async () => {
	if (!navigator.serviceWorker.controller) {
		console.log('service worker not available');
		setTimeout(() => {
			document.location.reload();
		}, 5000);
		return;
	}
	navigator.serviceWorker.controller.postMessage({
		type: 'updateCache',
		files: depends
	});
};

const attachUpdateCacheButton = () => {
	const cacheButton = document.getElementById('updateCacheButton');
	if (!cacheButton) {
		setTimeout(() => {
			updateCache();
		}, 1000);
		return;
	}
	cacheButton.addEventListener('click', updateCache);
};

const backgroundSync = async () => {
	try {
		navigator.serviceWorker.ready.then((registration) => {
			return registration.sync.register('sync-tag');
		});
	} catch (e) {
		console.log(e);
	}
};

const periodicSync = async () => {
	try {
		const status = await navigator.permissions.query({
			name: 'periodic-background-sync'
		});
		if (status.state !== 'granted') {
			console.log('periodic background sync not permitted');
			return;
		}
		navigator.serviceWorker.ready.then(async (registration) => {
			try {
				await registration.periodicSync.register('periodic-sync-tag', {
					minInterval: 24 * 60 * 60 * 1000 // 1 day
				});
			} catch (error) {
				console.error('Periodic Sync could not be registered!', error);
			}
		});
	} catch (e) {
		console.log(e);
	}
};

const onLoaded = async () => {
	await registerServiceWorker();
	const sessionActive = isSessionActive();
	if (sessionActive) {
		window.parent.postMessage({
			_: 'navigate',
			src: '/pages/startup/index.html'
		});
		return;
	}
	attachUpdateCacheButton();
	await backgroundSync();
	await periodicSync();
};

document.addEventListener('DOMContentLoaded', onLoaded);
