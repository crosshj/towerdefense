import { withCommas } from '../../utils/htmlToElement.js';
import { attachTap } from '../../utils/pointerEvents.js';

const pageTitle = 'LAB';
const pageDone = () => {
	document.title = `TD: ${pageTitle}`;
	window.parent.postMessage({
		_: 'stats',
		feathers: false,
		gems: true,
		coins: false,
		friendPoints: false,
	});
	window.parent.postMessage({
		_: 'title',
		title: pageTitle,
		visibility: 'visible',
	});
	window.parent.postMessage({ _: 'loaded' });
};

const attachLevels = async () => {
	const levelsEl = document.querySelector('.levels');
	attachTap(levelsEl, (e) => {
		const { type } = e.target.dataset;
		window.parent.postMessage({
			_: 'navigate',
			src: `/pages/lab/${type}/index.html`,
		});
	});
};

const attachBottomBar = async () => {
	//TODO: get this from somewhere!
	const amounts = {
		whiteGem: 100000,
		tealGem: 10000,
		purpleGem: 100000,
		scrolls: 100,
		fangs: 100,
		mystic: 1,
	};
	for (const [k, v] of Object.entries(amounts)) {
		const el = document.querySelector(`.bottomBar .${k}`);
		el.innerHTML = `
			<div class="amount">
				${withCommas(v)}
			</div>
		`;
	}
	const upgradeButton = document.querySelector('.upgradeAction');
	attachTap(upgradeButton, () => {
		window.parent.postMessage({
			_: 'navigate',
			src: `/modals/lab/upgrade/index.html`,
		});
	});
};

const setup = async () => {
	await attachLevels();
	await attachBottomBar();
	pageDone();
};

document.addEventListener('DOMContentLoaded', setup);
