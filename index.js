import { loadSounds } from '/visuals/assets.js';
import { statsElement } from '/visuals/stats/stats.js';

const FADE_MS = 350;

let bgMusic;
const onLoaded = async () => {
	if (!bgMusic) {
		bgMusic = await loadSounds('march');
		bgMusic.start(4000);
	}
};
document.addEventListener('DOMContentLoaded', onLoaded);
// window.addEventListener('pageshow', function (event) {
// 	if (event.persisted) onLoaded();
// });
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
	if (event.target.classList.contains('back-button')) {
		navigate();
	}
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
