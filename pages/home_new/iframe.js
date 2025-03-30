import { SVGIcons } from '../../assets/icons.svg.js';
import { getUser } from '../../user/user.js';
import { setCurrentCharCache } from '../../utils/cache.js';
import { getUnitDetails } from '../../utils/units.js';
import { range } from '../../utils/utils.js';
import { statsRequest } from '../../visuals/stats/stats.js';
import { getTeam, getTeamWithIdle } from '/utils/getTeam.js';

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
	'settings',
];

document.addEventListener('DOMContentLoaded', async () => {
	document.title += `: ${pageTitle}`;
	window.parent.postMessage({
		_: 'title',
		title: '',
		visibility: 'hidden',
	});

	const { onFrame, onFrameCount } = await getGame();
	const gameLoop = createGameLoop({ onFrame, onFrameCount });
	gameLoop.resume();

	window.parent.postMessage({ _: 'loaded' });
});

async function getGame() {
	const { canvas, ctx } = initCanvas();
	const state = await initState();
	const assets = await loadAssets({ state });

	attachScrollHandler({ state, canvas });
	attachClickHandler({ state, canvas, assets });

	await drawControls({ state });

	// the main game loop
	const onFrame = ({ delta, now: time }) => {
		//state.scroll = Math.sin(time * 0.0005);
		clearCanvas(canvas, ctx);
		//drawCenteredTriangle(canvas, ctx, time);
		//drawCenteredRotatingSquare(canvas, ctx, time);
		drawParallaxBackground({ state, canvas, ctx, assets, time });
	};

	const onFrameCount = ({ frameCount }) => {
		if (frameCount % 10 === 0) {
			state.charAnimFrame = (state.charAnimFrame + 1) % 5;
		}
	};

	return { onFrame, onFrameCount };
}

async function initState() {
	const state = {
		scroll: 0,
		raidTeam: await getTeam('Team 1'),
		teamIdle: await getTeamWithIdle('Team 1'),
		user: await getUser(),
		charAnimFrame: 0,
	};

	// listens for changes to characters and updates raidTeam
	window.addEventListener('message', async function (event) {
		const { _, ...args } = event.data;
		if (_ === 'broadcastCharactersUpdate') {
			// console.log('home knows characters are updated');
			state.raidTeam = await getTeam('Team 1');
			state.teamIdle = await getTeamWithIdle('Team 1');
			return;
		}
		if (_ === 'broadcastUserIconUpdate') {
			await updateUserImage();
			return;
		}
	});

	return state;
}

function clearCanvas(canvas, ctx) {
	ctx.fillStyle = 'black';
	const width = canvas.width;
	const height = canvas.height;
	ctx.fillRect(0, 0, width, height);
}

function initCanvas() {
	const canvas = document.createElement('canvas');
	canvas.id = 'canvas';
	canvas.style.position = 'absolute';
	canvas.style.top = '0';
	canvas.style.left = '0';
	canvas.style.width = '100%';
	canvas.style.height = '100%';
	document.body.appendChild(canvas);

	const ctx = canvas.getContext('2d');
	const width = window.innerWidth;
	const height = window.innerHeight;

	canvas.width = width;
	canvas.height = height;

	clearCanvas(canvas, ctx);
	return { canvas, ctx };
}

function getClickReader(image) {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d', { willReadFrequently: true });
	canvas.width = image.width;
	canvas.height = image.height;
	ctx.drawImage(image, 0, 0);

	function getColorAt(x, y) {
		// console.log({
		// 	x,
		// 	y,
		// 	clickCWidth: canvas.width,
		// 	clickCHeight: canvas.height,
		// });

		if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) {
			console.log({ _: 'click outside range', x, y });
			return null;
		}
		const [r, g, b, a] = ctx.getImageData(x, y, 1, 1).data;
		if (a === 0) return null;

		const toHex = (v) => v.toString(16).padStart(2, '0');
		const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

		return { r, g, b, a, hex };
	}

	return getColorAt;
}

function handleCharacterClick(which, state) {
	if (!which.includes('modals/character/detail')) {
		return;
	}
	const urlParams = new URLSearchParams(which.split('?')[1]);
	const sub = urlParams.get('sub');
	const slot = parseInt(urlParams.get('slot'), 10);
	const raidArray = state?.raidTeam?.[sub];
	if (!raidArray || slot < 1 || slot > 5) {
		return;
	}
	const characterDetails = raidArray[slot - 1];
	const currentCharacter = getUnitDetails(characterDetails, true);
	if (currentCharacter) {
		setCurrentCharCache(currentCharacter);
	}
}

function onCanvasClick(color, { state, test = false } = {}) {
	// console.log({ color });
	const clickColorMap = {
		'#00ffdd': '/pages/stage/main/index.html',
		'#00ff7b': '/pages/specialStage/index.html',
		'#88ff00': '/pages/arena/index.html',
		'#f6ff00': '/pages/pvp/index.html',
		'#ffbf00': '/pages/tower/index.html',

		// '#000cff': '/pages/lab/index.html',
		// '#0088ff': '/pages/guild/index.html',
		// '#00d0ff': '/pages/guildRaid/index.html',

		'#0088ff': '/pages/lab/index.html',
		'#00d0ff': '/pages/guild/index.html',

		'#e51a1d': '/modals/character/detail.html?sub=a&slot=1',
		'#e51a7c': '/modals/character/detail.html?sub=a&slot=2',
		'#d11ae5': '/modals/character/detail.html?sub=a&slot=3',
		'#8a1ae5': '/modals/character/detail.html?sub=a&slot=4',
		'#2b1ae5': '/modals/character/detail.html?sub=a&slot=5',

		'#53e51a': '/modals/character/detail.html?sub=b&slot=1',
		'#b2e51a': '/modals/character/detail.html?sub=b&slot=2',
		'#e59b1a': '/modals/character/detail.html?sub=b&slot=3',
		'#e5541a': '/modals/character/detail.html?sub=b&slot=4',
		'#e51a3f': '/modals/character/detail.html?sub=b&slot=5',
	};
	const matchedUrl = clickColorMap[color.hex];
	if (test) {
		return matchedUrl;
	}
	if (matchedUrl) {
		// window.parent.postMessage({
		// 	type: 'dialog',
		// 	message: matchedUrl,
		// });
		handleCharacterClick(matchedUrl, state);
		window.parent.postMessage({
			_: 'navigate',
			src: matchedUrl,
		});
	} else {
		// console.log('Clicked on color:', color.hex);
		console.log(`%c● ${color.hex}`, `color: ${color.hex}; font-size: 16px`);
	}
}

function attachClickHandler({ canvas, state, assets }) {
	const image = assets.images.bgNearClickMap;
	if (!image) return;

	const getColorAt = getClickReader(image);

	const testColor = getColorAt(1200, 90);
	const url = onCanvasClick(testColor, { state, test: true });
	if (
		testColor?.hex !== '#00ffdd' ||
		url !== '/pages/stage/main/index.html'
	) {
		console.error('attachClickHandler: Error loading click map image');
		return;
	}

	let startX = 0;
	let startY = 0;
	let moved = false;

	canvas.addEventListener('pointerdown', (e) => {
		startX = e.clientX;
		startY = e.clientY;
		moved = false;
	});

	canvas.addEventListener('pointermove', (e) => {
		if (
			Math.abs(e.clientX - startX) > 5 ||
			Math.abs(e.clientY - startY) > 5
		) {
			moved = true;
		}
	});

	canvas.addEventListener('pointerup', (e) => {
		if (moved) return;
		const aspectRatio = image.width / image.height;
		const scaledWidth = canvas.height * aspectRatio;
		const maxOffset = (scaledWidth - canvas.width) / 2;
		const offset = state.scroll * maxOffset;

		const centerOffset = (scaledWidth - canvas.width) / 2;
		const x =
			((e.clientX + centerOffset + offset) / scaledWidth) * image.width;
		const y = Math.floor((e.clientY / canvas.height) * image.height);

		const color = getColorAt(x, y);
		if (color) onCanvasClick(color, { state });
	});
}

function attachScrollHandler({ state, canvas }) {
	canvas.style.touchAction = 'none';

	// Config
	const TOUCH_INVERT = true;
	const SCROLL_INVERT = false;
	const DRAG_TO_SCROLL_RATIO = 1 / canvas.width;
	const FRICTION = 0.96;
	const WHEEL_SENSITIVITY = 1 / 1000;
	const MIN_VELOCITY = 0.002;

	let isDragging = false;
	let startX = 0;
	let scrollStart = 0;
	let lastX = 0;
	let lastTime = 0;
	let velocity = 0;
	let rafId;

	const clamp = (x) => Math.max(-1, Math.min(1, x));

	const animate = () => {
		if (Math.abs(velocity) < MIN_VELOCITY) return;
		state.scroll = clamp(state.scroll + velocity);
		velocity *= FRICTION;
		rafId = requestAnimationFrame(animate);
	};

	canvas.addEventListener('pointerdown', (e) => {
		isDragging = true;
		startX = lastX = e.clientX;
		scrollStart = state.scroll;
		lastTime = performance.now();
		velocity = 0;
		cancelAnimationFrame(rafId);
		canvas.setPointerCapture(e.pointerId);
		e.preventDefault();
	});

	canvas.addEventListener('pointermove', (e) => {
		if (!isDragging) return;
		const now = performance.now();
		const dx = (e.clientX - startX) * (TOUCH_INVERT ? -1 : 1);
		state.scroll = clamp(scrollStart + dx * DRAG_TO_SCROLL_RATIO);

		// Compute velocity from last frame
		const deltaX = e.clientX - lastX;
		const dt = now - lastTime;
		if (dt > 0) {
			const frameVelocity =
				((deltaX * (TOUCH_INVERT ? -1 : 1)) / dt) *
				DRAG_TO_SCROLL_RATIO *
				16; // scaled for ~60fps
			velocity = frameVelocity;
		}
		lastX = e.clientX;
		lastTime = now;
		e.preventDefault();
	});

	canvas.addEventListener('pointerup', (e) => {
		isDragging = false;
		canvas.releasePointerCapture(e.pointerId);
		rafId = requestAnimationFrame(animate);
		e.preventDefault();
	});

	canvas.addEventListener(
		'wheel',
		(e) => {
			if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
				const direction = SCROLL_INVERT ? 1 : -1;
				state.scroll = clamp(
					state.scroll + direction * e.deltaX * WHEEL_SENSITIVITY
				);
				e.preventDefault();
			}
		},
		{ passive: false }
	);
}

async function loadAssets({ state }) {
	const assets = {
		images: {},
	};

	const images = {
		bgFore: './assets/fore.png',
		bgNear: './assets/near.png',
		bgNearClickMap: './assets/near-clicks.png',
		bgMountain: './assets/mountains.png',
		bgMid: './assets/mid.png',
		bgFar: './assets/far.png',
		charBase: './assets/charBase.png',
	};

	await Promise.all(
		Object.entries(images).map(([key, url]) => {
			return new Promise((resolve) => {
				const img = new Image();
				img.src = url;
				img.onload = () => {
					assets.images[key] = img;
					resolve();
				};
			});
		})
	);

	createOutlineFilter({
		id: 'outline-thin-black',
		color: 'rgba(0, 0, 0, 0.5)',
		radius: 0.5,
	});

	//console.time('make homeTeam frames');

	assets.homeTeam = [];
	const canvas = new OffscreenCanvas(
		assets.images.bgNear.width,
		assets.images.bgNear.height
	);
	const ctx = canvas.getContext('2d');
	for (const tick of range(0, 4, 1)) {
		drawTeam({
			canvas,
			ctx,
			state,
			assets,
			tick,
		});
		assets.homeTeam.push(canvas.transferToImageBitmap());
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
	//console.timeEnd('make homeTeam frames');

	return assets;
}

function createGameLoop({ onFrame, onFrameCount, maxFps = 60 }) {
	const minFrameDelay = 1000 / maxFps;
	let lastTime;
	let frameCount = 0;
	let paused = true;

	function tick(now) {
		if (paused) return;

		const delta = now - lastTime;

		onFrameCount?.({ delta, now, frameCount });

		if (delta >= minFrameDelay) {
			lastTime = now - (delta % minFrameDelay);
			onFrame?.({ delta, now });
		}

		frameCount++;
		requestAnimationFrame(tick);
	}

	return {
		pause: () => (paused = true),
		resume: () => {
			if (!paused) return;
			paused = false;
			lastTime = performance.now();
			requestAnimationFrame(tick);
		},
	};
}

function drawParallaxBackground({ canvas, ctx, time, state, assets }) {
	const { scroll } = state;
	const speedFore = 1;
	const speedNear = 1;
	const speedMountain = 0.6;
	const speedMiddle = 0.05;
	const speedFar = 0.025;

	const width = canvas.width;
	const height = canvas.height;

	function drawParallaxLayerImage(speed, image) {
		const aspectRatio = image.width / image.height;
		const scaledWidth = height * aspectRatio;
		const maxOffset = (scaledWidth - width) / 2;
		const offset = scroll * speed * maxOffset;

		ctx.save();
		ctx.translate(width / 2 - scaledWidth / 2 - offset, 0);
		ctx.drawImage(image, 0, 0, scaledWidth, height);
		ctx.restore();
	}

	drawParallaxLayerImage(speedFar, assets.images.bgFar);
	drawParallaxLayerImage(speedMiddle, assets.images.bgMid);
	drawParallaxLayerImage(speedMountain, assets.images.bgMountain);

	const bgNearCanvas = document.createElement('canvas');
	bgNearCanvas.width = assets.images.bgNear.width;
	bgNearCanvas.height = assets.images.bgNear.height;
	const bgNearCtx = bgNearCanvas.getContext('2d');
	bgNearCtx.drawImage(assets.images.bgNear, 0, 0);
	bgNearCtx.drawImage(assets.homeTeam[state.charAnimFrame], 0, 0);

	drawParallaxLayerImage(speedNear, bgNearCanvas);

	drawParallaxLayerImage(speedFore, assets.images.bgFore);
}

function drawTeam({ canvas, ctx, state, assets, tick }) {
	const { width, height } = canvas;
	const { teamIdle } = state;

	const CHARACTER_SCALE = 0.68;
	const charWidth = 128 * CHARACTER_SCALE;
	const charHeight = 128 * CHARACTER_SCALE;
	const charBase = assets.images.charBase;

	const images = [
		[teamIdle.a[0].idle[tick], -187, 28],
		[teamIdle.a[1].idle[tick], -305, 23],
		[teamIdle.a[2].idle[tick], -385, -26],
		[teamIdle.a[3].idle[tick], -250, -65],
		[teamIdle.a[4].idle[tick], -135, -67],

		[teamIdle.b[0].idle[tick], 187 - charWidth, 28],
		[teamIdle.b[1].idle[tick], 305 - charWidth, 23],
		[teamIdle.b[2].idle[tick], 385 - charWidth, -26],
		[teamIdle.b[3].idle[tick], 250 - charWidth, -65],
		[teamIdle.b[4].idle[tick], 135 - charWidth, -67],
	].reverse();

	for (const [image, offsetX, offsetY] of images) {
		if (!image) continue;
		ctx.drawImage(
			charBase,
			width / 2 + offsetX - 15,
			height / 2 + offsetY + 63,
			charWidth + 30,
			55
		);
		// ctx.filter = 'contrast(1.007) saturate(1.007) url(#outline-thin-black)';
		// ctx.filter = 'url(#outline-thin-black)';
		ctx.drawImage(
			image,
			width / 2 + offsetX,
			height / 2 + offsetY,
			charWidth,
			charHeight
		);
		// ctx.filter = 'none';
	}
}

function navigationDOM() {
	return `
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
}

async function drawControls({ state }) {
	const { user } = state;
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

		${navigationDOM()}
	</div>
	`;
	statsRequest({
		friendPoints: false,
		menu: true,
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
						'legend',
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
			src: url,
		});
	});

	document.body.insertAdjacentElement('afterbegin', container);
}

// function createOutlineFilter({
// 	id = 'outline',
// 	color = 'black',
// 	radius = 2,
// } = {}) {
// 	const wrapper = document.createElement('div');
// 	wrapper.innerHTML = `
// 		<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute; width:0; height:0;">
// 			<filter id="${id}">
// 				<feMorphology in="SourceAlpha" operator="dilate" radius="${radius}" result="dilated" />
// 				<feComposite in="dilated" in2="SourceAlpha" operator="xor" result="border" />
// 				<feFlood flood-color="${color}" result="color" />
// 				<feComposite in="color" in2="border" operator="in" result="coloredBorder" />
// 				<feMerge>
// 					<feMergeNode in="coloredBorder" />
// 					<feMergeNode in="SourceGraphic" />
// 				</feMerge>
// 			</filter>
// 		</svg>
// 	`;
// 	document.body.appendChild(wrapper);
// }

function createOutlineFilter({
	id = 'outline',
	color = 'black',
	radius = 1,
} = {}) {
	const wrapper = document.createElement('div');
	wrapper.innerHTML = `
		<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute; width:0; height:0;">
			<filter id="${id}">
				<feMorphology in="SourceAlpha" operator="dilate" radius="${radius}" result="dilated" />
				<feComposite in="dilated" in2="SourceAlpha" operator="out" result="border" />
				<feFlood flood-color="${color}" result="color" />
				<feComposite in="color" in2="border" operator="in" result="coloredBorder" />
				<feMerge>
					<feMergeNode in="coloredBorder" />
					<feMergeNode in="SourceGraphic" />
				</feMerge>
			</filter>
		</svg>
	`;
	document.body.appendChild(wrapper);
}

// ------------------------------------------------------------

function drawCenteredTriangle(canvas, ctx, time) {
	ctx.save();
	ctx.translate(canvas.width / 2, canvas.height / 2);
	ctx.rotate(time * 0.001);
	ctx.translate(-canvas.width / 2, -canvas.height / 2);
	const width = canvas.width;
	const height = canvas.height;
	const centerX = width / 2;
	const centerY = height / 2;
	const size = Math.min(width, height) / 4;
	ctx.beginPath();
	ctx.moveTo(centerX, centerY - size);
	ctx.lineTo(centerX - size, centerY + size);
	ctx.lineTo(centerX + size, centerY + size);
	ctx.closePath();

	ctx.fillStyle = 'green';
	ctx.fill();

	ctx.restore();
}

function drawCenteredRotatingSquare(canvas, ctx, time) {
	ctx.save();
	ctx.translate(canvas.width / 2, canvas.height / 2);
	ctx.rotate(time * 0.001);
	ctx.translate(-canvas.width / 2, -canvas.height / 2);
	const width = canvas.width;
	const height = canvas.height;
	const centerX = width / 2;
	const centerY = height / 2;
	const size = Math.min(width, height) / 4;
	ctx.fillStyle = 'turquoise';
	ctx.fillRect(centerX - size / 2, centerY - size / 2, size, size);
	ctx.restore();
}
