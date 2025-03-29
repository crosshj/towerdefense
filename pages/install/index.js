import { IDBStorage } from '../../utils/IDBStorage.js';
import { isSessionActive } from '../../utils/session.js';
import { range } from '../../utils/utils.js';
import { getAllThumbnails } from '../../visuals/assets/character.js';

import getDepends, { getDependsMeta } from '/$data/__depends.js';

const ONE_DAY = 24 * 60 * 60 * 1000;
const TEN_MINUTES = 10 * 60 * 1000;

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
			updateViaCache: 'none',
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

const updateCache = async ({ onProgress, isCapacitor } = {}) => {
	const { promise, resolve, reject } = getPromise();
	if (isCapacitor) {
		return;
	}

	const triggerUpdate = (worker) => {
		if (!worker?.controller) {
			console.log('service worker not available');
			setTimeout(() => {
				document.location.reload();
				``;
			}, 5000);
			return;
		}
		worker.controller.postMessage({
			type: 'updateCache',
			meta: getDependsMeta(),
			files: getDepends(),
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
		const registration = await navigator.serviceWorker.ready;
		if ('periodicSync' in registration) {
			const periodicSyncTags = await registration.periodicSync.getTags();
			console.log(JSON.stringify({ periodicSyncTags }));
		}
		const status = await navigator.permissions.query({
			name: 'periodic-background-sync',
		});
		if (status.state !== 'granted') {
			console.log('Periodic background sync not permitted');
			return;
		} else {
			console.log('Periodic background sync permission granted.');
		}
		await registration.periodicSync.register('periodic-sync-tag', {
			minInterval: TEN_MINUTES,
		});
	} catch (e) {
		console.log(e);
	}
};

const showProgress = (progressBar, progressDetail) => {
	const background = document.querySelector('.background');
	background.classList.remove('hidden');
	progressBar.classList.remove('hidden');
	progressDetail && progressDetail.classList.remove('hidden');
};

const progressListener = (event) => {
	if (!['progress', 'progressDetail'].includes(event.data.type)) return;

	const progressBar = document.getElementById('progress-bar');
	const progressDetailContainer = document.querySelector('details');
	const progressDetail = document.querySelector('.progressDetail');
	progressDetail.addEventListener('pointerup', (e) => {
		if (!e.target.classList.contains('showAdvanced')) return;
		const advancedView = document.querySelector('.advanced');
		advancedView.classList.remove('hidden');
	});

	if (event.data.progress > 0 && event.data.progress < 100) {
		showProgress(progressBar, progressDetailContainer);
	}
	if (event.data.progress > progressBar.value) {
		progressBar.value = event.data.progress;
	}
	if (event.data.progressDetail && progressDetail) {
		progressDetail.innerHTML = `
			<div>${event.data.progressDetail}</div>
			<button class="showAdvanced">ADVANCED</div>
		`;
	}
};

const cleanPrevious = async () => {
	try {
		//TODO: only clean up if version is different
		const unitImageStore = new IDBStorage('ImageDB', 'UnitStore');
		await unitImageStore.clear();
	} catch (e) {}
};

const attachAdvancedView = () => {
	const advancedView = document.querySelector('.advanced');
	advancedView.innerHTML = `
<pre>
TODO:
1) dump the application state
2) manually retry the failed files
3) bypass cache
</pre>
<button class="bypassCache">Bypass Cache</button>
	`;
	const bypassCachButton = advancedView.querySelector('.bypassCache');
	bypassCachButton.addEventListener('pointerup', () => {
		window.parent.postMessage({
			_: 'navigate',
			src: '/pages/startup/index.html',
			FADE_MS: 0,
		});
	});
};

const fakeProgress = async (time = 5000) => {
	for (const percent of range(1, 100, 1)) {
		await new Promise((res) => setTimeout(res, time / 100));
		progressListener({
			data: {
				type: 'progress',
				progress: percent,
			},
		});
	}
};

const onLoaded = async () => {
	const isCapacitor = !!window.Capacitor;
	const sessionActive = isSessionActive();
	if (sessionActive) {
		window.parent.postMessage({
			_: 'navigate',
			src: '/pages/home_new/iframe.html',
		});
		return;
	}
	attachAdvancedView();
	try {
		await cleanPrevious();
		//await registerServiceWorker(); //(might not be needed since done in main frame)
		updateCache({
			onProgress: () => {},
			isCapacitor,
		});
		// what if SW changes during one of these?
		//await backgroundSync();
		//await periodicSync();

		getAllThumbnails();
		await fakeProgress(4000);

		window.parent.postMessage({
			_: 'navigate',
			src: '/pages/startup/index.html',
			FADE_MS: 0,
		});
	} catch (e) {
		console.log(e);
	}
};
document.addEventListener('DOMContentLoaded', onLoaded);
