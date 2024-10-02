import { startAnimation } from './stars.js';

const canvas = document.querySelector('.starfield');

document.addEventListener('DOMContentLoaded', async () => {
	const winSplash = document.querySelector('.win-splash');
	const loseSplash = document.querySelector('.lose-splash');
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	if (params.status === 'win') {
		winSplash.classList.remove('hidden');
		startAnimation(canvas);
	} else {
		loseSplash.classList.remove('hidden');
	}
	const loseCancel = document.querySelector('.lose-cancel');
	loseCancel.addEventListener('mousedown', () => {
		const stage = params?.stage || 'main';
		let src = `/pages/stage/${stage}/index.html`;
		if (params.zone === 'friendBattle') {
			src = '/pages/pvp/';
		}
		if (stage === 'special') {
			src = '/pages/specialStage/index.html';
		}
		window.parent.postMessage({
			_: 'navigate',
			src,
		});
	});

	/* TODO: ads continue
		https://www.playwire.com/rewarded-video-ads-resources
	*/
});
