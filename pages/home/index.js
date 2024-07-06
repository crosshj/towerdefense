import { canvasHorizontal } from '../../visuals/canvas.js';
import { statsRequest } from '../../visuals/stats/stats.js';
import { getTeam } from '../_utils/getTeam.js';

const pageTitle = 'HOME';

const isWIP = [
	'banner',
	'user',
	'event',
	'buff',
	'quest',
	'exp',

	'my-team',
	'collect',
	'upgrade',
	'shop',
	'friends',
	'pass',
	'giftbox',
	'settings'
];

const clickColorMap = {
	'#00ffdd': '/pages/mainStage/index.html',
	'#000cff': '/pages/lab/index.html',
	'#0088ff': '/pages/guild/index.html',
	'#00d0ff': '/pages/guildRaid/index.html',
	'#00ff7b': '/pages/specialStage/index.html',
	'#88ff00': '/pages/arena/index.html',
	'#f6ff00': '/pages/pvp/index.html',
	'#ffbf00': '/pages/tower/index.html',

	'#e51a1d': '/pages/team/index.html?sub=a&slot=1',
	'#e51a7c': '/pages/team/index.html?sub=a&slot=2',
	'#d11ae5': '/pages/team/index.html?sub=a&slot=3',
	'#8a1ae5': '/pages/team/index.html?sub=a&slot=4',
	'#2b1ae5': '/pages/team/index.html?sub=a&slot=5',

	'#53e51a': '/pages/team/index.html?sub=b&slot=1',
	'#b2e51a': '/pages/team/index.html?sub=b&slot=2',
	'#e59b1a': '/pages/team/index.html?sub=b&slot=3',
	'#e5541a': '/pages/team/index.html?sub=b&slot=4',
	'#e51a3f': '/pages/team/index.html?sub=b&slot=5'
};

const drawControls = () => {
	const container = document.createElement('div');
	container.classList.add('controls');
	container.innerHTML = `
		<div class="header">
			<div class="level">
				<div class="background"></div>
				<div class="banner modal clickable wip">
					<div></div>
					<div>Newbie</div>
					<div>Level</div>
					<div>1</div>
				</div>
				<div class="user modal clickable wip">
					<div class="image"></div>
				</div>
			</div>
			<div class="buttons">
				<div class="event modal clickable wip">News</div>
				<div class="buff modal clickable wip">Buff</div>
			</div>
			<div class="statsAndQuest">
				<div class="stats">
				</div>
				<div class="quest modal clickable wip">
					Quest
				</div>
			</div>
		</div>
		
		<div class="resources">
			<div class="exp modal clickable wip">EXP</div>
		</div>
		
		<div class="navigation">
			<div class="my-team clickable wip">My Team</div>
			<div class="upgrade clickable wip">Upgrade</div>
			<div class="collect clickable wip">Collect</div>
			<div class="shop clickable wip">Shop</div>
			<div class="friends clickable wip">Friends</div>
			<div class="pass clickable wip">Pass</div>
			<div class="giftbox modal clickable wip">Giftbox</div>
			<div class="settings modal clickable wip">⚙</div>
		</div>
	`;
	statsRequest();

	container.addEventListener('mousedown', (event) => {
		const which = Array.from(event.target.classList)
			.filter((x) => x !== 'clickable')
			.filter((x) => x !== 'modal')
			.filter((x) => x !== 'wip')
			.join('_');
		let url = `/pages/_wip/index.html?which=${which}`;
		if (event.target.classList.contains('modal')) {
			url = url.replace('/pages/', '/modals/');
		}
		if (isWIP.includes(which)) {
			url = url.replace('/_wip/', `/${which}/`);
			url = url.replace(`?which=${which}`, '');
		}
		window.parent.postMessage({
			_: 'navigate',
			src: url
		});
	});

	document.body.insertAdjacentElement('afterbegin', container);
};

const drawTeam = ({ ctx, width, height, raidTeam }) => {
	ctx.globalCompositeOperation = 'source-over';
	ctx.drawImage(
		raidTeam.a[0].image,
		width / 2 - 37.5 - 127,
		height / 2 - 50 + 70,
		75 * 0.75,
		100 * 0.75
	);
	ctx.drawImage(
		raidTeam.a[1].image,
		width / 2 - 37.5 - 127 - 130,
		height / 2 - 50 + 70,
		75 * 0.75,
		100 * 0.75
	);
	ctx.drawImage(
		raidTeam.a[2].image,
		width / 2 - 37.5 - 127 - 212,
		height / 2 - 26,
		75 * 0.75,
		100 * 0.75
	);
	ctx.drawImage(
		raidTeam.a[3].image,
		width / 2 - 37.5 - 137 - 55,
		height / 2 - 70,
		75 * 0.75,
		100 * 0.75
	);
	ctx.drawImage(
		raidTeam.a[4].image,
		width / 2 - 37.5 - 92,
		height / 2 - 70,
		75 * 0.75,
		100 * 0.75
	);

	ctx.drawImage(
		raidTeam.b[0].image,
		width / 2 - 37.5 + 147,
		height / 2 - 50 + 70,
		75 * 0.75,
		100 * 0.75
	);
	ctx.drawImage(
		raidTeam.b[1].image,
		width / 2 - 37.5 + 147 + 130,
		height / 2 - 50 + 70,
		75 * 0.75,
		100 * 0.75
	);
	ctx.drawImage(
		raidTeam.b[2].image,
		width / 2 - 37.5 + 127 + 230,
		height / 2 - 26,
		75 * 0.75,
		100 * 0.75
	);
	ctx.drawImage(
		raidTeam.b[3].image,
		width / 2 - 37.5 + 137 + 75,
		height / 2 - 70,
		75 * 0.75,
		100 * 0.75
	);
	ctx.drawImage(
		raidTeam.b[4].image,
		width / 2 - 37.5 + 112,
		height / 2 - 70,
		75 * 0.75,
		100 * 0.75
	);
};

const setup = async () => {
	document.title += `: ${pageTitle}`;
	window.parent.postMessage({
		_: 'title',
		title: '',
		visibility: 'hidden'
	});

	drawControls();

	const raidTeam = await getTeam('Team 1');

	const bg = await canvasHorizontal({
		parent: document.body,
		image: '/pages/home/background.png',
		offsetX: 1200 - document.body.clientWidth / 2,
		height: 500,
		clickMap: '/pages/home/background_clicks.png',
		clickHandle: (color) => {
			const which = clickColorMap[color];
			if (!which) {
				console.log(color);
				return;
			}
			window.parent.postMessage({
				_: 'navigate',
				src: which
			});
		},
		onDraw: ({ ctx, width, height }) => {
			drawTeam({ ctx, width, height, raidTeam });
		}
	});

	window.parent.postMessage({ _: 'loaded' });
};

document.addEventListener('DOMContentLoaded', setup);
