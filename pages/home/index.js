import { canvasHorizontal, canvasVertical } from '../../visuals/canvas.js';

const pageTitle = 'HOME';

const clickColorMap = {
	'#00ffdd': '/pages/mainStage/index.html',
	'#000cff': '/pages/lab/index.html',
	'#0088ff': '/pages/guild/index.html',
	'#00d0ff': '/pages/guildRaid/index.html',
	'#00ff7b': '/pages/specialStage/index.html',
	'#88ff00': '/pages/arena/index.html',
	'#f6ff00': '/pages/pvp/index.html',
	'#ffbf00': '/pages/tower/index.html',
	'#ff0004': '/pages/team/index.html?slot=1',
	'#ff006a': '/pages/team/index.html?slot=2',
	'#ff00c8': '/pages/team/index.html?slot=3',
	'#e600ff': '/pages/team/index.html?slot=4',
	'#aa00ff': '/pages/team/index.html?slot=5'
};

const drawControls = () => {
	const container = document.createElement('div');
	container.classList.add('controls');
	container.innerHTML = `
		<div class="header">
			<div class="level">
				<div class="background"></div>
				<div class="banner">
					<div></div>
					<div>Newbie</div>
					<div>Level</div>
					<div>1</div>
				</div>
				<div class="user">
					<div class="image"></div>
				</div>
			</div>
			<div class="buttons">
				<div class="event">Event</div>
				<div class="buff">Buff</div>
			</div>
			<div class="statsAndQuest">
				<div class="stats"">
					<div class="feathers">
						F: 5007/100 max
					</div>
					<div class="gems">
						G: 2489
					</div>
					<div class="coins">
						C: 810
					</div>
					<div class="friends">
						FP: 0
					</div>
				</div>
				<div class="quest">
					Quest
				</div>
			</div>
		</div>
		
		<div class="resources">
			<div class="exp">EXP</div>
		</div>
		
		<div class="navigation">
			<div class="my-team">My Team</div>
			<div class="upgrade">Upgrade</div>
			<div class="collect">Collect</div>
			<div class="shop">Shop</div>
			<div class="friends">Friends</div>
			<div class="pass">Pass</div>
			<div class="giftbox">Giftbox</div>
			<div class="settings">⚙</div>
		</div>
	`;
	document.body.insertAdjacentElement('afterbegin', container);
};

const setup = async () => {
	document.title += `: ${pageTitle}`;

	drawControls();

	const bg = await canvasHorizontal({
		parent: document.body,
		image: '/pages/home/background.jpg',
		offsetX: 1200 - document.body.clientWidth / 2,
		height: 500,
		clickMap: '/pages/home/background_clicks.png',
		clickHandle: (color) => {
			const which = clickColorMap[color];
			if (!which) return;
			document.location.href = `${which}${
				which.includes('?') ? '&' : '?'
			}back=/pages/home/index.html`;
		}
	});
	// const controls = await canvasVertical({
	// 	parent: document.body,
	// 	width: 950
	// });

	// controls.ctx.fillStyle = '#777';
	// controls.ctx.font = '30px Arial';
	// controls.ctx.textAlign = 'left';
	// controls.ctx.textBaseline = 'top';
	// controls.ctx.fillText(pageTitle, 15, 15);
	// controls.canvas.style.zIndex = 1;
	// controls.canvas.style.pointerEvents = 'none';
};

setup();
