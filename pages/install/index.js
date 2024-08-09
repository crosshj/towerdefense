import { depends } from '../../_depends.js';
import { isSessionActive } from '../../utils/session.js';

function getPromise() {
	let resolve, reject;
	const promise = new Promise((res, rej) => {
		resolve = res;
		reject = rej;
	});
	return { promise, resolve, reject };
}

const registerServiceWorker = async () => {
	if (!('serviceWorker' in navigator)) {
		console.log('unable to register service worker');
		return;
	}
	const registration = await navigator.serviceWorker
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
	return registration;
};

const updateCache = async ({ onProgress }) => {
	const { promise, resolve, reject } = getPromise();

	const triggerUpdate = (worker) => {
		if (!worker.controller) {
			console.log('service worker not available');
			setTimeout(() => {
				document.location.reload();
			}, 1000);
			return;
		}
		worker.controller.postMessage({
			type: 'updateCache',
			files: depends
		});
		worker.addEventListener('message', (event) => {
			onProgress(event);
			if (event.data.progress === 100) {
				resolve();
			}
		});
		worker.addEventListener('controllerchange', () => {
			console.log('service worker changed while cache in progress.');
			triggerUpdate(navigator.serviceWorker);
		});
	};
	triggerUpdate(navigator.serviceWorker);

	return promise;
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
			console.log('Periodic background sync not permitted');
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

const progressListener = (event) => {
	if (event.data.type !== 'progress') return;
	const progressBar = document.getElementById('progress-bar');
	progressBar.classList.remove('hidden');
	if (event.data.progress > progressBar.value) {
		progressBar.value = event.data.progress;
	}
};

const onLoaded = async () => {
	const sessionActive = isSessionActive();
	if (sessionActive) {
		window.parent.postMessage({
			_: 'navigate',
			src: '/pages/home/index.html'
		});
		return;
	}
	try {
		//await registerServiceWorker(); //(might not be needed since done in main frame)
		await updateCache({
			onProgress: progressListener
		});
		// what if SW changes during one of these?
		await backgroundSync();
		await periodicSync();

		window.parent.postMessage({
			_: 'navigate',
			src: '/pages/startup/index.html'
		});
	} catch (e) {
		console.log(e);
	}
};
document.addEventListener('DOMContentLoaded', onLoaded);
