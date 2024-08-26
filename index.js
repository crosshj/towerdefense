import { addStats } from './user/stats.js';
import { installable } from './utils/installable.js';
import { loadSounds } from '/visuals/assets/assets.js';
import { statsElement } from '/visuals/stats/stats.js';

const FADE_MS = 350;
let whereIsBack;
let bgMusic;

const setupPlayable = () => {
	const iframe = `
	<iframe
		src="/pages/install/index.html"
		width="100%"
		height="100%"
	></iframe>
	`;
	const container = `
	<div class="container">
		<div class="main-header">
			<div class="title-container" style="visibility: hidden">
				<div class="back-button">
					<svg viewBox="0 0 100 100">
						<path d="M 30 50 L 75 50" stroke="black" stroke-width="11"/>
						<path d="M 50 30 L 25 50 L 50 70" fill="black"/>
					</svg>
				</div>
				<div class="title"></div>
			</div>
			<div class="stats"></div>
		</div>
	</div>
	`;
	const containerEl = document.createElement('div');
	document.body.insertAdjacentElement('afterbegin', containerEl);
	containerEl.outerHTML = container;

	const iframeEl = document.createElement('iframe');
	document.body.insertAdjacentElement('afterbegin', iframeEl);
	iframeEl.outerHTML = iframe;
};

const setupSplash = (installState) => {
	const splash = `
	<div class="splash">
		<h1>Tee Dee</h1>
		<span>Tower Defense for all!</span>
		${
			installState === 'installed'
				? '<p>You have installed this app.  Open it the way you open any app on your system.</p>'
				: ''
		}
	</div>
	`;
	const splashEl = document.createElement('div');
	document.body.insertAdjacentElement('afterbegin', splashEl);
	splashEl.outerHTML = splash;
};

function showModal(args = {}) {
	const modalIframe = document.createElement('iframe');
	modalIframe.width = '100%';
	modalIframe.height = '100%';
	modalIframe.classList.add('modal');
	modalIframe.src = args.src;
	document.body.insertAdjacentElement('beforeEnd', modalIframe);
}
function closeModal() {
	const modalIframe = document.querySelector('iframe.modal');
	if (!modalIframe) return false;
	modalIframe.remove();
	document.body.dispatchEvent(new CustomEvent('modalClose'));

	setTimeout(() => {
		const mainIframe = document.querySelector('body > iframe');
		if (!mainIframe) return;
		//console.log('Before focus:', document.activeElement);
		mainIframe.contentWindow.focus();
		mainIframe.contentWindow.dispatchEvent(new Event('focus'));
		const iframeDocument =
			mainIframe.contentDocument || mainIframe.contentWindow.document;
		iframeDocument.body.focus();
		//console.log('After focus:', document.activeElement);
	}, 300);
	return true;
}

document.addEventListener('focusin', (ev) => {
	document.previousActiveElement = ev.target;
});

function navigate(args = {}) {
	document.body.classList.remove('fade-in');
	document.body.classList.add('fade-out');
	setTimeout(async () => {
		document.querySelector('iframe').remove();
		const mainIframe = document.createElement('iframe');
		mainIframe.width = '100%';
		mainIframe.height = '100%';
		mainIframe.src = args.src || '/pages/home/index.html';
		document.body.insertAdjacentElement('afterBegin', mainIframe);
		if (args?.src === '/pages/mainStage/index.html' && bgMusic) {
			bgMusic.stop();
			bgMusic = undefined;
		}
		if (
			['/pages/home/index.html', undefined].includes(args?.src) &&
			!bgMusic
		) {
			bgMusic = await loadSounds('march');
			bgMusic.start(4000);
		}
	}, FADE_MS);
	//TODO: all bg music should be handled heres
}

const handleClickable = async (e) => {
	const classList = Array.from(e.target.classList).filter(
		(x) => x !== 'clickable'
	);
	if (classList.includes('menu')) {
		showModal({
			src: `/modals/menu/index.html`
		});
		return;
	}
	console.log('handle click', classList);
	const src = `/modals/_wip/index.html`;
	showModal({ src });
};

const handleAction = async (args) => {
	if (args.minusFeathers) {
		await addStats({ feathers: -1 * args.minusFeathers });
		window.minusFeathers && window.minusFeathers(args.minusFeathers);
	}
};

document.body.addEventListener('pointerup', async (event) => {
	if (event.target.classList.contains('back-button')) {
		closeModal();
		return navigate({ src: whereIsBack });
	}
	if (event.target.classList.contains('clickable')) {
		return await handleClickable(event);
	}
});

const broadcastCharactersUpdate = () => {
	const childIframeList = Array.from(document.querySelectorAll('iframe'));
	for (const childIframe of childIframeList) {
		childIframe.contentWindow.postMessage({
			_: 'broadcastCharactersUpdate'
		});
	}
};

window.addEventListener('message', async function (event) {
	const { _, ...args } = event.data;
	if (_ === 'broadcastCharactersUpdate') {
		await broadcastCharactersUpdate(args);
		return;
	}
	if (_ === 'action') {
		await handleAction(args);
		return;
	}
	if (_ === 'stats') {
		const statsContainer = document.querySelector('.container .stats');
		statsElement({
			container: statsContainer,
			...args
		});
		return;
	}
	if (_ === 'navigate' && (args?.src || '').includes('/modals/')) {
		closeModal();
		return showModal(args);
	}
	if (_ === 'navigate') {
		const modalClosed = closeModal();
		if (modalClosed && !args?.src) return;
		navigate(args);
		return;
	}
	if (_ === 'loaded') {
		document.body.classList.add('fade-in');
		document.body.classList.remove('fade-out');
		return;
	}
	if (_ === 'title') {
		const titleContainer = document.querySelector('.title-container');
		const titleEl = document.querySelector('.title');
		titleContainer.style.visibility = args.visibility;
		titleEl.innerHTML = args.title;
		whereIsBack = args?.back ? args.back : undefined;
		return;
	}
});

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
};

const onLoaded = async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	const isWeb = params?.webOnly + '' === 'true';
	const isLocal = document.location.host.startsWith('127.0.0.1');
	const install = await installable({
		onInstall: () => document.location.reload()
	});
	if (['fullscreen', 'standalone'].includes(install) || isLocal || isWeb) {
		await registerServiceWorker();
		if (!bgMusic) {
			bgMusic = await loadSounds('march');
			bgMusic.start(4000);
		}
		setupPlayable();
		return;
	}
	setupSplash(install);
};
document.addEventListener('DOMContentLoaded', onLoaded);

// window.addEventListener('pageshow', function (event) {
// 	if (event.persisted) onLoaded();
// });
