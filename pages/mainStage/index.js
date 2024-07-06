import { loadSounds } from '../../visuals/assets/assets.js';
import { canvasVertical } from '../../visuals/canvas.js';

const pageTitle = 'MAIN STAGE';

const clickColorMap = {
	'#fdf900': 'tropicalGraveyard',
	'#6efd00': 'openField',
	'#00fddb': 'water',
	'#0061fd': 'asian',
	'#8700fd': 'haunted'
	// '#000000': 'none'
};

const setup = async () => {
	const bgMusic = await loadSounds('menuBackground');
	bgMusic.start(2000);

	window.parent.postMessage({
		_: 'title',
		title: pageTitle,
		visibility: 'visible'
	});
	const args = {
		feathers: true,
		gems: true,
		coins: true,
		friendPoints: false
	};
	window.parent.postMessage({ _: 'stats', ...args });
	document.title += `: ${pageTitle}`;
	const bg = await canvasVertical({
		parent: document.body,
		image: '/pages/mainStage/background.png',
		width: 950,
		scrollBottom: 0,
		clickMap: '/pages/mainStage/background_clicks.png',
		clickHandle: (color) => {
			const which = clickColorMap[color];
			if (!which) return;
			const src = `/pages/game/selectTeam/index.html?zone=${which}`;
			bgMusic.stop();
			window.parent.postMessage({ _: 'navigate', src });
		}
	});
	window.parent.postMessage({ _: 'loaded' });
};

document.addEventListener('DOMContentLoaded', setup);
