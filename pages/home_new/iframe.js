document.addEventListener('DOMContentLoaded', async () => {
	const onFrame = await getGame();
	const gameLoop = createGameLoop({ onFrame });
	gameLoop.resume();
});

async function getGame() {
	const { canvas, ctx } = setupCanvas();
	const assets = await loadAssets();

	return ({ delta, now: time }) => {
		clearCanvas(canvas, ctx);
		// drawCenteredTriangle(canvas, ctx, time);
		// drawCenteredRotatingSquare(canvas, ctx, time);
		const scroll = Math.sin(time * 0.001);
		drawParallaxBackground({ canvas, ctx, scroll, assets });
	};
}

function clearCanvas(canvas, ctx) {
	ctx.fillStyle = 'black';
	const width = canvas.width;
	const height = canvas.height;
	ctx.fillRect(0, 0, width, height);
}

function setupCanvas() {
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

async function loadAssets() {
	const assets = {
		images: {},
	};

	const images = {
		bgFore: './assets/fore.png',
		bgNear: './assets/near.png',
		bgMountain: './assets/mountains.png',
		bgMid: './assets/mid.png',
		bgFar: './assets/far.png',
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

function drawParallaxBackground({ canvas, ctx, time, scroll, assets }) {
	const speedFore = 1;
	const speedNear = 1;
	const speedMountain = 0.8;
	const speedMiddle = 0.05;
	const speedFar = 0.025;

	const nearColor = 'rgba(100, 200, 50, 1)';
	const midColor = 'rgba(100, 150, 200, 1)';
	const farColor = 'rgba(50, 50, 100, 1)';
	const width = canvas.width;
	const height = canvas.height;

	const nearBGHeight = height * 0.7;
	const midBGHeight = height * 0.85;
	const farBGHeight = height;

	function getOffset(scroll, speed) {
		return (scroll * speed * width) / 2;
	}

	function drawParallaxLayer(offset, layerHeight, color, lineWidth) {
		ctx.save();
		ctx.translate(width / 2 + offset, 0);
		ctx.fillStyle = color;
		ctx.fillRect(-width, height - layerHeight, width * 2, layerHeight);
		for (let x = -width; x < width * 2; x += 50) {
			const isCenterLine = Math.abs(x) < 25;
			ctx.beginPath();
			ctx.moveTo(x, height - layerHeight);
			ctx.lineTo(x, height);
			ctx.lineWidth = isCenterLine ? lineWidth * 3 : lineWidth;
			ctx.strokeStyle = isCenterLine ? 'red' : 'white';
			ctx.stroke();
		}
		ctx.restore();
	}
	function drawParallaxLayerImage(speed, layerHeight, image) {
		const aspectRatio = image.width / image.height;
		const scaledWidth = layerHeight * aspectRatio;
		const scaledHeight = layerHeight;

		// Center the image at scroll = 0, then shift by offset
		const maxOffset = (scaledWidth - width) / 2;
		const offset = scroll * speed * maxOffset;

		ctx.save();
		ctx.translate(width / 2 - scaledWidth / 2 - offset, 0);
		ctx.drawImage(
			image,
			0,
			height - layerHeight,
			scaledWidth,
			scaledHeight
		);
		ctx.restore();
	}

	drawParallaxLayerImage(speedFar, height, assets.images.bgFar);
	drawParallaxLayerImage(speedMiddle, height, assets.images.bgMid);
	drawParallaxLayerImage(speedMountain, height, assets.images.bgMountain);
	drawParallaxLayerImage(speedNear, height, assets.images.bgNear);
	drawParallaxLayerImage(speedFore, height, assets.images.bgFore);
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
