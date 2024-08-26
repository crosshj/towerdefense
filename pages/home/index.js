import { getUser } from '../../user/user.js';
import { canvasHorizontal } from '../../visuals/canvas.js';
import { statsRequest } from '../../visuals/stats/stats.js';
import { setCurrentCharCache } from '../../utils/cache.js';
import { getTeam } from '/utils/getTeam.js';
import { SVGIcons } from '../../assets/icons.svg.js';

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

	'#e51a1d': '/modals/character/detail.html?sub=a&slot=1',
	'#e51a7c': '/modals/character/detail.html?sub=a&slot=2',
	'#d11ae5': '/modals/character/detail.html?sub=a&slot=3',
	'#8a1ae5': '/modals/character/detail.html?sub=a&slot=4',
	'#2b1ae5': '/modals/character/detail.html?sub=a&slot=5',

	'#53e51a': '/modals/character/detail.html?sub=b&slot=1',
	'#b2e51a': '/modals/character/detail.html?sub=b&slot=2',
	'#e59b1a': '/modals/character/detail.html?sub=b&slot=3',
	'#e5541a': '/modals/character/detail.html?sub=b&slot=4',
	'#e51a3f': '/modals/character/detail.html?sub=b&slot=5'
};

const navigation = () => `
	<div class="navigation">
	<div class="my-team clickable wip">
		<div class="iconContainer">
			${SVGIcons.stars6()}
		</div>
		<span>My Team</span>
	</div>
	<div class="upgrade clickable wip">
		<div class="iconContainer">
			${SVGIcons.upgrade()}
		</div>
		<span>Upgrade</span>
	</div>
	<div class="collect clickable wip">
		<div class="iconContainer">
			${SVGIcons.book()}
		</div>
		<span>Collect</span>
	</div>
	<div class="shop clickable wip">
		<div class="iconContainer">
			${SVGIcons.shop()}
		</div>
		<span>Shop</span>
	</div>
	<div class="friends clickable wip">
		<div class="iconContainer">
			${SVGIcons.userMulti()}
		</div>
		<span>Friends</span>
	</div>
	<div class="pass clickable wip">
		<div class="iconContainer">
			${SVGIcons.ticket()}
		</div>
		<span>Pass</span>
	</div>
	<div class="giftbox modal clickable wip">
		<div class="iconContainer">
			${SVGIcons.giftBox()}
		</div>
		<span>GiftBox</span>
	</div>
	<div class="settings modal clickable wip">
		${SVGIcons.gear()}
	</div>
`;

const drawControls = async () => {
	const user = await getUser();
	const container = document.createElement('div');
	container.classList.add('controls');
	const progressAmountClass = 'progress-' + user.levelInfo.levelExpPercent10;
	container.innerHTML = `
		<div class="header">
			<div class="level">
				<div class="background"></div>
				<div class="banner modal clickable wip ${user.grade.toLowerCase()}">
					<div class="border-container">
						<div class="progress">
							<div class="progressContainer">
								<div class="progressBar ${progressAmountClass}"></div>
							</div>
						</div>
						<div class="grade">
							<span>${user.grade}</span>
						</div>
						<div class="levelLabel">
							<span>Level</span>
						</div>
						<div class="levelNumber">
							<span>${user.levelInfo.level}</span>
						</div>
					</div>
					<div class="bottom">
						<svg viewBox="0 0 100 130" preserveAspectRatio="none">
							<g class="shadow">
								<polygon points="0,0 100,0 50,100" />
							</g>
							<polygon points="0,0 100,0 50,100" />
							<!-- Bottom Border Line -->
							<g class="bottom-border">
								<line x1="0" y1="0" x2="50" y2="100" />
								<line x1="50" y1="100" x2="100" y2="0" />
							</g>
						</svg>
					</div>
				</div>
				<div class="user modal clickable wip">
					<div class="image"></div>
				</div>
			</div>
			<div class="buttons">
				<div class="event modal clickable wip">
					${SVGIcons.announce()}
				</div>
				<div class="buff modal clickable wip">
					${SVGIcons.userArrowUp()}
				</div>
				<div class="exp modal clickable wip">
					${SVGIcons.expBoost()}
				</div>
			</div>
			<div class="statsAndQuest">
				<div class="stats">
				</div>
				<div class="quest modal clickable wip">
					${SVGIcons.scroll()}
				</div>
			</div>
		</div>
		
		<div class="resources">

		</div>

		${navigation()}
	</div>
	`;
	statsRequest({
		friendPoints: false,
		menu: true
	});

	const setUserImage = () => {
		const userImageEl = container.querySelector('.user .image');
		userImageEl.style.backgroundImage = `url("${user.image}")`;
	};
	setUserImage();

	container.addEventListener('pointerup', (event) => {
		const which = Array.from(event.target.classList)
			.filter(
				(x) =>
					![
						'normal',
						'master',
						'smaster',
						'umaster',
						'legend'
					].includes(x)
			)
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

function getCharacter(which, raidTeam) {
	if (!which.includes('modals/character/detail')) {
		return undefined;
	}
	const urlParams = new URLSearchParams(which.split('?')[1]);
	const sub = urlParams.get('sub');
	const slot = parseInt(urlParams.get('slot'), 10);
	const raidArray = raidTeam[sub];
	if (!raidArray || slot < 1 || slot > 5) {
		return undefined;
	}
	return raidArray[slot - 1];
}

const setup = async () => {
	document.title += `: ${pageTitle}`;
	window.parent.postMessage({
		_: 'title',
		title: '',
		visibility: 'hidden'
	});

	let raidTeam = await getTeam('Team 1');

	const bg = await canvasHorizontal({
		parent: document.body,
		image: '/pages/home/background.png',
		offsetX: 1200 - document.body.clientWidth / 2,
		height: 500,
		clickMap: '/pages/home/background_clicks.png',
		clickHandle: (color) => {
			const which = clickColorMap[color];
			if (!which) {
				color !== '#000000' && console.log(color);
				return;
			}

			const currentCharacter = getCharacter(which, raidTeam);
			setCurrentCharCache(currentCharacter);

			window.parent.postMessage({
				_: 'navigate',
				src: which
			});
		},
		onDraw: ({ ctx, width, height }) => {
			drawTeam({ ctx, width, height, raidTeam });
		}
	});

	await drawControls();

	window.parent.postMessage({ _: 'loaded' });

	// listens for changes to characters and updates raidTeam
	window.addEventListener('message', async function (event) {
		const { _, ...args } = event.data;
		if (_ === 'broadcastCharactersUpdate') {
			// console.log('home knows characters are updated');
			raidTeam = await getTeam('Team 1');
			return;
		}
	});
};

document.addEventListener('DOMContentLoaded', setup);

const windowFocused = (e) => {
	// console.log(`this iframe just got focus: ${e.clientX} - ${e.clientY}`);
	const canvasEl = document.body.querySelector('canvas');
	canvasEl.focus();
	canvasEl.dispatchEvent(
		new MouseEvent('click', { bubbles: true, cancelable: true })
	);
};
window.addEventListener('focus', windowFocused, true);

// document.body.addEventListener('pointerup', (e) => {
// 	console.log(`this iframe just got clicked: ${e.clientX} - ${e.clientY}`);
// });

// const windowBlured = () => {
// 	console.log('this iframe just got blurred');
// };
// window.addEventListener('blur', windowBlured, true);
