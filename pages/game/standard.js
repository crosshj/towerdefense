import { startGame } from './engine/init.js';
import '/visuals/menuPause.js';

const onLoaded = () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });

	window.parent.postMessage({
		_: 'stats',
		visibility: 'hidden',
	});
	window.parent.postMessage({
		_: 'title',
		visibility: 'hidden',
	});

	const gameOver = async ({ state }) => {
		const status = state.towers[1].status === 'dead' ? 'win' : 'lose';
		window.parent.postMessage({
			_: 'navigate',
			src: `/modals/gameOver/index.html?status=${status}&zone=${params.zone}`,
		});

		const showGameResults = async () => {
			const queryString = new URLSearchParams(params).toString();
			const src = `/pages/game/results/index.html?${queryString}&zone=${params.zone}`;
			window.parent.postMessage({
				_: 'navigate',
				src,
			});
		};
		if (status === 'win') {
			setTimeout(showGameResults, 3000);
		}
	};

	const menu = {
		hide: () => {},
		show: () => {
			// window.parent.postMessage({
			// 	_: 'navigate',
			// 	src: '/pages/mainStage/index.html'
			// });
		},
	};
	startGame({
		zone: params.zone,
		params,
		menu,
		gameOver,
	});
	window.parent.postMessage({ _: 'loaded' });
};
document.addEventListener('DOMContentLoaded', onLoaded);
