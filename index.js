import { statsElement } from '/visuals/stats/stats.js';
import { loadSounds } from '/visuals/assets.js';

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
		mainIframe.src = '/pages/home/index.html';
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
		mainIframe.src = args.src || '/pages/home/index.html';
	}
	if (_ === 'title') {
		titleContainer.style.visibility = args.visibility;
		titleEl.innerHTML = args.title;
	}
});
