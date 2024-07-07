import { startGame } from '/engine/init.js';
import '/visuals/menuPause.js';

const zoneMap = {
	openField: 3,
	tropicalGraveyard: 1,
	water: 5,
	asian: 6, //sakura
	haunted: 4
};

const onLoaded = () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });

	window.parent.postMessage({
		_: 'stats',
		feathers: false,
		gems: false,
		coins: false,
		friendPoints: false
	});
	window.parent.postMessage({
		_: 'title',
		visibility: 'hidden'
	});
	// document.body.innerHTML = params.zone;
	// console.log(params);
	const menu = {
		hide: () => {},
		show: () => {
			window.parent.postMessage({
				_: 'navigate',
				src: '/pages/mainStage/index.html'
			});
		}
	};
	startGame({
		which: zoneMap[params.zone] || 1,
		params,
		menu
	});
	window.parent.postMessage({ _: 'loaded' });
};
document.addEventListener('DOMContentLoaded', onLoaded);
