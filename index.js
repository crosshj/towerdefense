import { statsElement } from '/visuals/stats/stats.js';
import { loadSounds } from '/visuals/assets.js';

const FADE_MS = 350;

let bgMusic, coreSounds;
const onLoaded = async () => {
	// bgMusic = await loadSounds('menuBackground');
	// coreSounds = await loadSounds('coreSounds');
	// bgMusic.start();
};
document.addEventListener('DOMContentLoaded', onLoaded);
window.addEventListener('pageshow', function (event) {
	if (event.persisted) onLoaded();
});

document.body.addEventListener('mousedown', (event) => {
	//bgMusic.stop();
	// console.log(event.target);
	if (event.target.classList.contains('back-button')) {
		const mainIframe = document.querySelector('iframe');
		document.body.classList.remove('fade-in');
		document.body.classList.add('fade-out');
		setTimeout(() => {
			mainIframe.src = '/pages/home/index.html';
		}, FADE_MS);
	}
});

window.addEventListener('message', function (event) {
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
		const mainIframe = document.querySelector('iframe');
		document.body.classList.remove('fade-in');
		document.body.classList.add('fade-out');
		setTimeout(() => {
			mainIframe.src = args.src || '/pages/home/index.html';
		}, FADE_MS);
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
