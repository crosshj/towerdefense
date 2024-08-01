import { getUser } from '../../user/user.js';
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
			<div class="settings modal clickable wip">
				<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 256 256" width="256" height="256">
					<defs>
						<filter id="outline">
						<feMorphology in="SourceAlpha" operator="dilate" radius="15" result="dilated"/>
						<feFlood class="outline" result="black"/>
						<feComposite in="black" in2="dilated" operator="in" result="outline"/>
						<feMerge>
							<feMergeNode in="outline"/>
							<feMergeNode in="SourceGraphic"/>
						</feMerge>
						</filter>
					</defs>
					<path 
						d="
							m 107.75 22.159
							v 21.571 c -8.835 2.117 -17.286 5.608 -25.04 10.347 l -15.234 -15.234 l -28.632 28.634 l 15.26 15.26 c -4.7448 7.7444 -8.2443 16.186 -10.371 25.016 h -21.573 v 40.493 h 21.571 c 2.1161 8.8382 5.6076 17.289 10.347 25.043 l -15.234 15.234 l 28.632 28.634 l 15.262 -15.262 c 7.7444 4.7448 16.186 8.2443 25.016 10.371 v 21.573 h 40.493 v -21.571 c 8.8375 -2.1163 17.288 -5.6078 25.041 -10.347 l 15.236 15.236 l 28.632 -28.634 l -15.26 -15.26 c 4.745 -7.745 8.2445 -16.187 10.371 -25.018 h 21.573 v -40.493 h -21.571 c -2.1163 -8.8375 -5.6078 -17.288 -10.347 -25.041 l 15.25 -15.222 l -28.64 -28.634 l -15.26 15.26 c -7.745 -4.745 -16.187 -8.2445 -25.018 -10.371 v -21.573 h -40.493 z
							m 20.247 71.5
							a 35 35 0 0 1 35 35 a 35 35 0 0 1 -35 35 a 35 35 0 0 1 -35 -35 a 35 35 0 0 1 35 -35 z
						"
						fill-rule="evenodd"
						filter="url(#outline)"
					/>
				</svg>
			</div>
		</div>
	`;
	statsRequest({
		menu: false
	});

	const setUserImage = () => {
		const userImageEl = container.querySelector('.user .image');
		userImageEl.style.backgroundImage = `url("${user.image}")`;
	};
	setUserImage();

	container.addEventListener('mousedown', (event) => {
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

const setup = async () => {
	document.title += `: ${pageTitle}`;
	window.parent.postMessage({
		_: 'title',
		title: '',
		visibility: 'hidden'
	});

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

	await drawControls();

	window.parent.postMessage({ _: 'loaded' });
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
