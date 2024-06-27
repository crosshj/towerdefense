import { canvasHorizontal, canvasVertical } from '../../visuals/canvas.js';
import { statsRequest } from '../../visuals/stats/stats.js';

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
				<div class="banner clickable">
					<div></div>
					<div>Newbie</div>
					<div>Level</div>
					<div>1</div>
				</div>
				<div class="user clickable">
					<div class="image"></div>
				</div>
			</div>
			<div class="buttons">
				<div class="event clickable">Event</div>
				<div class="buff clickable">Buff</div>
			</div>
			<div class="statsAndQuest">
				<div class="stats">
				</div>
				<div class="quest clickable">
					Quest
				</div>
			</div>
		</div>
		
		<div class="resources">
			<div class="exp clickable">EXP</div>
		</div>
		
		<div class="navigation">
			<div class="my-team clickable wip">My Team</div>
			<div class="upgrade clickable wip">Upgrade</div>
			<div class="collect clickable wip">Collect</div>
			<div class="shop clickable">Shop</div>
			<div class="friends clickable">Friends</div>
			<div class="pass clickable">Pass</div>
			<div class="giftbox clickable">Giftbox</div>
			<div class="settings clickable">⚙</div>
		</div>
	`;
	statsRequest();

	container.addEventListener('mousedown', (event) => {
		const which = Array.from(event.target.classList)
			.filter((x) => x !== 'clickable')
			.filter((x) => x !== 'wip')
			.join('_');
		let url = `/pages/_wip/index.html?which=${which}`;
		if (which === 'my-team') {
			url = '/pages/my-team/index.html';
		}
		if (which === 'collect') {
			url = '/pages/collect/index.html';
		}
		if (which === 'upgrade') {
			url = '/pages/upgrade/index.html';
		}
		//window.fadingNavigate(url);
		window.parent.postMessage({
			_: 'navigate',
			src: url
		});
	});
	document.body.insertAdjacentElement('afterbegin', container);
};

const setup = async () => {
	document.title += `: ${pageTitle}`;
	window.parent.postMessage({
		_: 'title',
		title: '',
		visibility: 'hidden'
	});

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
			// const clickUrl = `${which}${
			// 	which.includes('?') ? '&' : '?'
			// }back=/pages/home/index.html`;
			//window.fadingNavigate(clickUrl);
			window.parent.postMessage({
				_: 'navigate',
				src: which
			});
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
	window.parent.postMessage({ _: 'loaded' });
};
setup();
