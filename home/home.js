const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const offscreenCanvas = document.createElement('canvas');
const offscreenContext = offscreenCanvas.getContext('2d');

let isPortrait = window.innerHeight > window.innerWidth;

let offsetX = 0;
const offscreenWidth = 2400; // Fixed width of 1900px
const offscreenHeight = 500;
let bgClickMap;

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
	const pixel = getPixel(bgClickMap, relativeX, relativeY);
	const whichItem =
		{
			'#01ffde': 'mainStage',
			'#010cfe': 'lab',
			'#0088ff': 'guild',
			'#01d0ff': 'guildRaid',
			'#00ff7b': 'specialStage',
			'#89fe02': 'arena',
			'#f8ff02': 'pvp',
			'#ffbd00': 'tower',
			'#fe0005': 'team1',
			'#ff006b': 'team2',
			'#fe00c7': 'team3',
			'#e600ff': 'team4',
			'#aa00ff': 'team5'
		}[pixel] || 'noItem';
	return whichItem;
}

async function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	offsetX = (offscreenWidth - canvas.width) / 2; // Center the offscreen canvas
	await drawOffscreenCanvas();
	draw();
}

async function drawOffscreenCanvas() {
	const bgImage = await loadImage('./home_bg.jpg');
	bgClickMap = await loadImage('./clickMap_bg.jpg');

	offscreenCanvas.width = offscreenWidth;
	offscreenCanvas.height = offscreenHeight;

	offscreenContext.drawImage(bgImage, 0, 0);
	//offscreenContext.fillStyle = 'white';
	//offscreenContext.fillRect(0, 0, offscreenWidth, offscreenHeight);

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
	context.clearRect(0, 0, canvas.width, canvas.height);
	//drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
	context.drawImage(
		offscreenCanvas,
		offsetX,
		0,
		canvas.width,
		canvas.height,
		0,
		0,
		canvas.width,
		window.innerHeight
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

	const relativeX = x + offsetX;
	const relativeY = y;
	const whichItem = getClick(relativeX, relativeY);
	if (whichItem === 'mainStage') {
		document.location.href = '/';
	}
	console.log({ whichItem });
}

canvas.addEventListener('click', handleTap);

let touchStartX = 0;

canvas.addEventListener('touchstart', (event) => {
	touchStartX = event.touches[0].clientX;
});

canvas.addEventListener('touchmove', (event) => {
	const touchEndX = event.touches[0].clientX;
	const deltaX = touchStartX - touchEndX;
	touchStartX = touchEndX;
	handleScroll({ deltaX });
});

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
