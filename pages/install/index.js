import { depends } from '../../_depends.js';

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
		const stuck = timeline[currentProgress] > 6;
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

const onLoaded = async () => {
	await registerServiceWorker();
	const sessionActive = sessionStorage.getItem('SESSION_ACTIVE') === 'true';
	if (sessionActive) {
		window.parent.postMessage({
			_: 'navigate',
			src: '/pages/startup/index.html'
		});
		return;
	}
	attachUpdateCacheButton();
};

document.addEventListener('DOMContentLoaded', onLoaded);
