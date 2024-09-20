import { debounce } from '../../../utils/debounce.js';
import { loadSounds } from '../../../visuals/assets/assets.js';
import { canvasVertical } from '../../../visuals/canvas.js';

const pageTitle = 'CANDY WORLD';

const clickColorMap = {
	'#d92626': 'openField-1',
	'#d92826': 'openField-2',
	'#d92a26': 'openField-3',
	'#d92d26': 'openField-4',
	'#d92f26': 'openField-5',
	'#d93126': 'openField-6',
	'#d93326': 'openField-7',
	'#d93526': 'openField-8',
	'#d93726': 'openField-9',
	'#d93926': 'openField-10',
	'#d93b26': 'forest-11',
	'#d93d26': 'forest-12',
	'#d93f26': 'forest-13',
	'#d94126': 'forest-14',
	'#d94426': 'forest-15',
	'#d94626': 'forest-16',
	'#d94826': 'forest-17',
	'#d94a26': 'forest-18',
	'#d94c26': 'forest-19',
	'#d94e26': 'forest-20',
	'#d95026': 'water-21',
	'#d95226': 'water-22',
	'#d95426': 'water-23',
	'#d95626': 'water-24',
	'#d95826': 'water-25',
	'#d95b26': 'water-26',
	'#d95d26': 'water-27',
	'#d95f26': 'water-28',
	'#d96126': 'water-29',
	'#d96326': 'water-30',
	'#d96526': 'sakura-31',
	'#d96726': 'sakura-32',
	'#d96926': 'sakura-33',
	'#d96b26': 'sakura-34',
	'#d96d26': 'sakura-35',
	'#d96f26': 'sakura-36',
	'#d97226': 'sakura-37',
	'#d97426': 'sakura-38',
	'#d97626': 'sakura-39',
	'#d97826': 'sakura-40',
	'#d97a26': 'highlands-41',
	'#d97c26': 'highlands-42',
	'#d97e26': 'highlands-43',
	'#d98026': 'highlands-44',
	'#d98226': 'highlands-45',
	'#d98426': 'highlands-46',
	'#d98626': 'highlands-47',
	'#d98926': 'highlands-48',
	'#d98b26': 'highlands-49',
	'#d98d26': 'highlands-50',
	'#d98f26': 'tropical-51',
	'#d99126': 'tropical-52',
	'#d99326': 'tropical-53',
	'#d99526': 'tropical-54',
	'#d99726': 'tropical-55',
	'#d99926': 'tropical-56',
	'#d99b26': 'tropical-57',
	'#d99d26': 'tropical-58',
	'#d9a026': 'tropical-59',
	'#d9a226': 'tropical-60',
	'#d9a426': 'oasis-61',
	'#d9a626': 'oasis-62',
	'#d9a826': 'oasis-63',
	'#d9aa26': 'oasis-64',
	'#d9ac26': 'oasis-65',
	'#d9ae26': 'oasis-66',
	'#d9b026': 'oasis-67',
	'#d9b226': 'oasis-68',
	'#d9b426': 'oasis-69',
	'#d9b726': 'oasis-70',
	'#d9b926': 'tundra-71',
	'#d9bb26': 'tundra-72',
	'#d9bd26': 'tundra-73',
	'#d9bf26': 'tundra-74',
	'#d9c126': 'tundra-75',
	'#d9c326': 'tundra-76',
	'#d9c526': 'tundra-77',
	'#d9c726': 'tundra-78',
	'#d9c926': 'tundra-79',
	'#d9cc26': 'tundra-80',
	'#d9ce26': 'industrial-81',
	'#d9d026': 'industrial-82',
	'#d9d226': 'industrial-83',
	'#d9d426': 'industrial-84',
	'#d9d626': 'industrial-85',
	'#d9d826': 'industrial-86',
	'#d7d926': 'industrial-87',
	'#d5d926': 'industrial-88',
	'#d3d926': 'industrial-89',
	'#d1d926': 'industrial-90',
	'#cfd926': 'pantheon-91',
	'#cdd926': 'pantheon-92',
	'#cbd926': 'pantheon-93',
	'#c9d926': 'pantheon-94',
	'#c7d926': 'pantheon-95',
	'#c5d926': 'pantheon-96',
	'#c2d926': 'pantheon-97',
	'#c0d926': 'pantheon-98',
	'#bed926': 'pantheon-99',
	'#bcd926': 'pantheon-100',
};

const onScroll = (args) => {
	localStorage.setItem('CANDY_WORLD_SCROLL', args.offsetY);
};

const pageDone = () => {
	window.parent.postMessage({
		_: 'title',
		title: pageTitle,
		visibility: 'visible',
	});
	const args = {
		feathers: true,
		gems: true,
		coins: true,
		friendPoints: false,
	};
	window.parent.postMessage({ _: 'stats', ...args });
	document.title = `TD: ${pageTitle}`;
	window.parent.postMessage({ _: 'loaded' });
};

const attachMain = () => {
	const link = document.querySelector('.mainLink');
	link.addEventListener('pointerdown', (e) => {
		e.preventDefault();
		e.stopPropagation();
		window.parent.postMessage({
			_: 'navigate',
			src: '/pages/stage/main/index.html',
		});
	});
};

const setup = async () => {
	attachMain();

	const bgMusic = await loadSounds('menuBackground');
	bgMusic.start(2000);

	const offsetY = localStorage.getItem('CANDY_WORLD_SCROLL') || undefined;

	const bg = await canvasVertical({
		parent: document.body,
		image: '/assets/stage/candy/background.png',
		width: 950,
		scrollBottom: 0,
		clickMap: '/assets/stage/candy/background_clicks.png',
		clickHandle: (color) => {
			const [which, number] = (clickColorMap[color] || '').split('-');
			if (!which) return;
			const src = `/pages/game/selectTeam/index.html?stage=candy&zone=${which}&number=${number}`;
			bgMusic.stop();
			window.parent.postMessage({ _: 'navigate', src });
		},
		offsetY: offsetY ? JSON.parse(offsetY) : undefined,
		onScroll: debounce(onScroll),
	});

	pageDone();
};

document.addEventListener('DOMContentLoaded', setup);
