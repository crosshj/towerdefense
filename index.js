import { installable } from './utils/installable.js';
import { loadSounds } from '/visuals/assets.js';
import { statsElement } from '/visuals/stats/stats.js';

const FADE_MS = 350;

const setupPlayable = () => {
	const iframe = `
	<iframe
		src="/pages/home/index.html"
		width="100%"
		height="100%"
	></iframe>
	`;
	const container = `
	<div class="container">
		<div class="main-header">
			<div class="title-container" style="visibility: hidden">
				<div class="back-button">&#x25C0;</div>
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

function navigate(args = {}) {
	document.body.classList.remove('fade-in');
	document.body.classList.add('fade-out');
	document.querySelector('iframe').remove();
	const mainIframe = document.createElement('iframe');
	mainIframe.width = '100%';
	mainIframe.height = '100%';
	document.body.insertAdjacentElement('afterBegin', mainIframe);
	setTimeout(() => {
		mainIframe.src = args.src || '/pages/home/index.html';
	}, FADE_MS);
	if (args?.src === '/pages/mainStage/index.html' && bgMusic) {
		bgMusic.stop();
		bgMusic = undefined;
	}
	if (['/pages/home/index.html', undefined].includes(args?.src) && !bgMusic) {
		onLoaded();
	}
}
document.body.addEventListener('mousedown', async (event) => {
	if (event.target.classList.contains('back-button')) return navigate();
});

window.addEventListener('message', async function (event) {
	const titleContainer = document.querySelector('.title-container');
	const titleEl = document.querySelector('.title');

	const { _, ...args } = event.data;
	if (_ === 'stats') {
		const statsContainer = document.querySelector('.container .stats');
		statsElement({
			container: statsContainer,
			...args
		});
	}
	if (_ === 'navigate') {
		navigate(args);
	}
	if (_ === 'loaded') {
		document.body.classList.add('fade-in');
		document.body.classList.remove('fade-out');
	}
	if (_ === 'title') {
		titleContainer.style.visibility = args.visibility;
		titleEl.innerHTML = args.title;
	}
});

let bgMusic;
const onLoaded = async () => {
	const install = await installable();
	if (install === 'standalone') {
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
