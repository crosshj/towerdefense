import { getViewportDimensions } from '../../utils/getViewportDimensions.js';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const offscreenCanvas = document.createElement('canvas');
const offscreenContext = offscreenCanvas.getContext('2d');

let isPortrait = window.innerHeight > window.innerWidth;

let offsetX = 0;
const offscreenWidth = 2400; // Fixed width of 1900px
const offscreenHeight = 500;
let bgClickMap;

const clickColorMap = {
	'#00ffdd': 'mainStage',
	'#000cff': 'lab',
	'#0088ff': 'guild',
	'#00d0ff': 'guildRaid',
	'#00ff7b': 'specialStage',
	'#88ff00': 'arena',
	'#f6ff00': 'pvp',
	'#ffbf00': 'tower',
	'#ff0004': 'team1',
	'#ff006a': 'team2',
	'#ff00c8': 'team3',
	'#e600ff': 'team4',
	'#aa00ff': 'team5'
};
const clickUrlMap = {
	mainStage: '/',
	guild: '/pages/guild/index.html',
	lab: '/pages/lab/index.html',
	guildRaid: '/pages/guildRaid/index.html',
	specialStage: '/pages/specialStage/index.html',
	arena: '/pages/arena/index.html',
	pvp: '/pages/pvp/index.html',
	tower: '/pages/tower/index.html',
	team1: '/pages/team/index.html?slot=1',
	team2: '/pages/team/index.html?slot=2',
	team3: '/pages/team/index.html?slot=3',
	team4: '/pages/team/index.html?slot=4',
	team5: '/pages/team/index.html?slot=5'
};

const loadImage = async (url) => {
	let img = new Image();
	return new Promise((r) => {
		img.onload = () => r(img);
		img.src = url;
	});
};

function getClick(relativeX, relativeY) {
	function componentToHex(c) {
		const hex = c.toString(16);
		return hex.length == 1 ? '0' + hex : hex;
	}
	function rgbToHex([r, g, b]) {
		return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
	}
	function getPixel(img, x, y) {
		let canvas = document.createElement('canvas');
		canvas.width = 1;
		canvas.height = 1;
		canvas.getContext('2d').drawImage(img, x, y, 1, 1, 0, 0, 1, 1);
		const pixelData = canvas.getContext('2d').getImageData(0, 0, 1, 1).data;
		return rgbToHex(pixelData);
	}
	const bgClickCanvas = document.createElement('canvas');
	bgClickCanvas.width = canvas.width;
	bgClickCanvas.height = canvas.height;

	const bgClickContext = bgClickCanvas.getContext('2d');
	const shrunkHeight =
		canvas.height >= offscreenHeight ? canvas.height : offscreenHeight;
	const stretchedHeight =
		canvas.height >= offscreenHeight
			? canvas.height * (canvas.height / offscreenHeight)
			: canvas.height;
	bgClickContext.drawImage(
		bgClickMap,
		offsetX,
		0,
		canvas.width,
		shrunkHeight,
		0,
		0,
		canvas.width,
		stretchedHeight
	);
	const pixel = getPixel(bgClickCanvas, relativeX, relativeY);
	console.log(pixel);
	const whichItem = clickColorMap[pixel] || 'noItem';
	return whichItem;
}

async function resizeCanvas() {
	const viewport = getViewportDimensions();
	canvas.width = viewport.width;
	canvas.height = viewport.height;
	offsetX = (offscreenWidth - canvas.width) / 2; // Center the offscreen canvas
	await drawOffscreenCanvas();
	draw();
}

async function drawOffscreenCanvas() {
	const bgImage = await loadImage('./home_bg.jpg');
	bgClickMap = await loadImage('./home_bg_clicks.png');

	offscreenCanvas.width = offscreenWidth;
	offscreenCanvas.height = offscreenHeight;

	offscreenContext.fillStyle = 'red';
	offscreenContext.fillRect(0, 0, offscreenWidth, offscreenHeight);

	offscreenContext.drawImage(bgImage, 0, 0);

	offscreenContext.strokeStyle = 'black';
	offscreenContext.lineWidth = 1;
	offscreenContext.font = '10px Arial';
	offscreenContext.fillStyle = 'black';

	// for (let x = 100; x < offscreenWidth; x += 100) {
	// 	// Start from 100px and stop before 1900px
	// 	offscreenContext.beginPath();
	// 	offscreenContext.moveTo(x, 0);
	// 	offscreenContext.lineTo(x, offscreenHeight);
	// 	offscreenContext.stroke();
	// 	offscreenContext.fillText(x + 'px', x + 2, 10);
	// }
}

function draw() {
	//context.clearRect(0, 0, canvas.width, canvas.height);
	//drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)

	const shrunkHeight =
		canvas.height >= offscreenHeight ? canvas.height : offscreenHeight;

	const stretchedHeight =
		canvas.height >= offscreenHeight
			? canvas.height * (canvas.height / offscreenHeight)
			: canvas.height;

	context.drawImage(
		offscreenCanvas,
		offsetX,
		0,
		canvas.width,
		shrunkHeight,
		0,
		0,
		canvas.width,
		stretchedHeight
	);
}

function handleScroll(event) {
	requestAnimationFrame(() => {
		const deltaX = event.deltaX;
		offsetX = Math.min(
			Math.max(offsetX + deltaX, 0),
			offscreenWidth - canvas.width
		);
		draw();
	});
}

function handleTap(event) {
	const rect = canvas.getBoundingClientRect();
	const x = event.clientX - rect.left;
	const y = event.clientY - rect.top;
	const whichItem = getClick(x, y);
	const goToUrl = clickUrlMap[whichItem];
	if (goToUrl) {
		document.location.href = goToUrl;
	}
	console.log({ whichItem });
}

canvas.addEventListener('click', handleTap);

let isTouching = false;
let touchStartX = 0;
let velocity = 0;
let lastTimestamp = 0;
const friction = 0.93; // adjust for desired inertia

canvas.addEventListener('touchstart', (event) => {
	event.preventDefault();
	isTouching = true;
	touchStartX = event.touches[0].clientX;
	velocity = 0; // reset velocity on new touch
	lastTimestamp = event.timeStamp;
});

canvas.addEventListener('touchmove', (event) => {
	const touchEndX = event.touches[0].clientX;
	const deltaX = touchStartX - touchEndX;
	touchStartX = touchEndX;

	const deltaTime = event.timeStamp - lastTimestamp;
	velocity = deltaX / deltaTime;
	lastTimestamp = event.timeStamp;

	handleScroll({ deltaX });
});
canvas.addEventListener('touchend', () => {
	isTouching = false;
	applyInertia();
});
function applyInertia() {
	if (!isTouching) {
		velocity *= friction;
		offsetX += velocity * 16; // assuming 60fps, adjust if needed

		// Constrain scrollY to the bounds of the large canvas
		offsetX = Math.max(0, Math.min(offsetX, offscreenWidth - canvas.width));

		draw();

		if (Math.abs(velocity) > 0.1) {
			requestAnimationFrame(applyInertia);
		}
	}
}

// Add a listener for the wheel event to handle two-finger scroll on trackpads
canvas.addEventListener(
	'wheel',
	(event) => {
		handleScroll(event);
		event.preventDefault();
	},
	{ passive: false }
);

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
