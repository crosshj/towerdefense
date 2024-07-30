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
	console.log('Service Worker registered with scope:', registration.scope);

	// FAILSAFE: make sure progress is happening
	let currentProgress = 0;
	let previousProgress = 0;
	setInterval(() => {
		if (currentProgress === previousProgress) {
			document.location.reload();
		}
	}, 5000);

	// Listen for progress updates from the service worker
	navigator.serviceWorker.addEventListener('message', (event) => {
		if (event.data.type === 'progress') {
			const progressBar = document.getElementById('progress-bar');
			progressBar.value = event.data.progress;
			previousProgress = currentProgress;
			currentProgress = event.data.progress;

			progressBar.classList.remove('hidden');
			if (event.data.progress === 100) {
				window.parent.postMessage({
					_: 'navigate',
					src: '/pages/startup/index.html'
				});
			}
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
		updateCache();
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
