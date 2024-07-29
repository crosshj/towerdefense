import { debounce } from '../../utils/debounce.js';
import { loadSounds } from '../../visuals/assets/assets.js';
import { canvasVertical } from '../../visuals/canvas.js';

const pageTitle = 'MAIN STAGE';

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
	'#d93b26': 'openField-11',
	'#d93d26': 'openField-12',
	'#d93f26': 'openField-13',
	'#d94126': 'openField-14',
	'#d94426': 'openField-15',
	'#d94626': 'openField-16',
	'#d94826': 'openField-17',
	'#d94a26': 'openField-18',
	'#d94c26': 'openField-19',
	'#d94e26': 'openField-20',
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
	'#d97a26': 'sakura-41',
	'#d97c26': 'sakura-42',
	'#d97e26': 'sakura-43',
	'#d98026': 'sakura-44',
	'#d98226': 'sakura-45',
	'#d98426': 'sakura-46',
	'#d98626': 'sakura-47',
	'#d98926': 'sakura-48',
	'#d98b26': 'sakura-49',
	'#d98d26': 'sakura-50',
	'#d98f26': 'tropicalGraveyard-51',
	'#d99126': 'tropicalGraveyard-52',
	'#d99326': 'tropicalGraveyard-53',
	'#d99526': 'tropicalGraveyard-54',
	'#d99726': 'tropicalGraveyard-55',
	'#d99926': 'tropicalGraveyard-56',
	'#d99b26': 'tropicalGraveyard-57',
	'#d99d26': 'tropicalGraveyard-58',
	'#d9a026': 'tropicalGraveyard-59',
	'#d9a226': 'tropicalGraveyard-60',
	'#d9a426': 'tropicalGraveyard-61',
	'#d9a626': 'tropicalGraveyard-62',
	'#d9a826': 'tropicalGraveyard-63',
	'#d9aa26': 'tropicalGraveyard-64',
	'#d9ac26': 'tropicalGraveyard-65',
	'#d9ae26': 'tropicalGraveyard-66',
	'#d9b026': 'tropicalGraveyard-67',
	'#d9b226': 'tropicalGraveyard-68',
	'#d9b426': 'tropicalGraveyard-69',
	'#d9b726': 'tropicalGraveyard-70',
	'#d9b926': 'haunted-71',
	'#d9bb26': 'haunted-72',
	'#d9bd26': 'haunted-73',
	'#d9bf26': 'haunted-74',
	'#d9c126': 'haunted-75',
	'#d9c326': 'haunted-76',
	'#d9c526': 'haunted-77',
	'#d9c726': 'haunted-78',
	'#d9c926': 'haunted-79',
	'#d9cc26': 'haunted-80',
	'#d9ce26': 'haunted-81',
	'#d9d026': 'haunted-82',
	'#d9d226': 'haunted-83',
	'#d9d426': 'haunted-84',
	'#d9d626': 'haunted-85',
	'#d9d826': 'haunted-86',
	'#d7d926': 'haunted-87',
	'#d5d926': 'haunted-88',
	'#d3d926': 'haunted-89',
	'#d1d926': 'haunted-90',
	'#cfd926': 'haunted-91',
	'#cdd926': 'haunted-92',
	'#cbd926': 'haunted-93',
	'#c9d926': 'haunted-94',
	'#c7d926': 'haunted-95',
	'#c5d926': 'haunted-96',
	'#c2d926': 'haunted-97',
	'#c0d926': 'haunted-98',
	'#bed926': 'haunted-99',
	'#bcd926': 'haunted-100'
};

const onScroll = (args) => {
	localStorage.setItem('MAIN_SCROLL', args.offsetY);
};

const setup = async () => {
	const bgMusic = await loadSounds('menuBackground');
	bgMusic.start(2000);

	const offsetY = localStorage.getItem('MAIN_SCROLL') || undefined;

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
			const [which, number] = clickColorMap[color].split('-');
			console.log(`YO, stage number! ${number}`);
			if (!which) return;
			const src = `/pages/game/selectTeam/index.html?zone=${which}`;
			bgMusic.stop();
			window.parent.postMessage({ _: 'navigate', src });
		},
		offsetY: offsetY ? JSON.parse(offsetY) : undefined,
		onScroll: debounce(onScroll)
	});
	window.parent.postMessage({ _: 'loaded' });
};

document.addEventListener('DOMContentLoaded', setup);
