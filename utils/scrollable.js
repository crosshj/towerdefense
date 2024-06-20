const loadImage = async (url) => {
	let img = new Image();
	return new Promise((r) => {
		img.onload = () => r(img);
		img.src = url;
	});
};

function imageWithHorizontalMarks(img) {
	const canvas = document.createElement('canvas');
	canvas.width = img.width;
	canvas.height = img.height;
	const ctx = canvas.getContext('2d');
	ctx.drawImage(img, 0, 0, img.width, img.height);

	ctx.strokeStyle = '#999';
	ctx.lineWidth = 1;
	ctx.fillStyle = '#999';
	ctx.font = '16px Arial';
	ctx.textAlign = 'center';
	for (let y = 100; y < img.height; y += 100) {
		ctx.beginPath();
		ctx.moveTo(0, y);
		ctx.lineTo(img.width, y);
		ctx.stroke();
		ctx.fillText(`${y}px`, img.width / 2, y - 5);
	}
	return canvas;
}

function drawBGClickCanvas({
	bgClickCanvas,
	canvas,
	bgClickMap,
	offsetX,
	offsetY
}) {
	bgClickCanvas.width = canvas.clientWidth;
	bgClickCanvas.height = canvas.clientHeight;
	const bgClickContext = bgClickCanvas.getContext('2d');

	bgClickContext.save();
	bgClickContext.globalAlpha = 1.0;
	if (typeof offsetX !== 'undefined') {
		const originalHeight = bgClickMap.height;
		const newHeight = canvas.clientHeight;
		bgClickContext.drawImage(
			bgClickMap,
			offsetX,
			0,
			canvas.width,
			originalHeight,
			0,
			0,
			canvas.width,
			newHeight
		);
	}
	if (typeof offsetY !== 'undefined') {
		const originalWidth = bgClickMap.width;
		const newWidth = canvas.clientWidth;
		bgClickContext.drawImage(
			bgClickMap,
			0,
			offsetY,
			originalWidth,
			canvas.height,
			0,
			0,
			newWidth,
			canvas.height
		);
	}
	bgClickContext.restore();
}

function getClick({
	x: relativeX,
	y: relativeY,
	bgClickCanvas,
	drawClickCanvas
}) {
	const c2h = (c) => {
		const hex = c.toString(16);
		return hex.length == 1 ? '0' + hex : hex;
	};
	const rgbToHex = ([r, g, b]) => '#' + c2h(r) + c2h(g) + c2h(b);
	const getPixel = (img, x, y) => {
		const canvas = document.createElement('canvas');
		canvas.width = 1;
		canvas.height = 1;
		canvas.getContext('2d').drawImage(img, x, y, 1, 1, 0, 0, 1, 1);
		const pixelData = canvas.getContext('2d').getImageData(0, 0, 1, 1).data;
		return rgbToHex(pixelData);
	};
	drawClickCanvas();
	const pixel = getPixel(bgClickCanvas, relativeX, relativeY);
	return pixel;
}

const vertical = async (args) => {
	const { image, canvas, ctx, scrollBottom, clickMap, clickHandle } = args;
	const background = await loadImage(image);
	//const background = imageWithHorizontalMarks(await loadImage(image));
	const originalWidth = background.width;
	const newWidth = canvas.width;
	let offsetY = 0;
	if (typeof scrollBottom !== 'undefined') {
		offsetY = scrollBottom + (background.height - canvas.height);
	}

	let drawClickCanvas;
	if (clickMap && clickHandle) {
		const bgClickMap = await loadImage(clickMap);
		const bgClickCanvas = document.createElement('canvas');
		drawClickCanvas = (target) =>
			drawBGClickCanvas({
				bgClickCanvas: target,
				canvas,
				bgClickMap,
				offsetY
			});
		function handleTap(event) {
			const rect = canvas.getBoundingClientRect();
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;
			const whichItem = getClick({
				x,
				y,
				bgClickCanvas,
				drawClickCanvas: () => drawClickCanvas(bgClickCanvas)
			});
			clickHandle(whichItem);
		}
		canvas.addEventListener('click', handleTap);
	}

	const draw = () => {
		//ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(
			background,
			0,
			offsetY,
			originalWidth,
			canvas.height,
			0,
			0,
			newWidth,
			canvas.height
		);

		//drawClickCanvas(canvas);
	};
	draw();

	//TODO: add scrolling

	function handleScroll(event) {
		requestAnimationFrame(() => {
			const deltaY = event.deltaY;
			offsetY = Math.min(
				Math.max(offsetY + deltaY, 0),
				background.height - canvas.height
			);
			draw();
		});
	}

	let isTouching = false;
	let touchStartY = 0;
	let velocity = 0;
	let lastTimestamp = 0;
	const friction = 0.93; // adjust for desired inertia

	canvas.addEventListener('touchstart', (event) => {
		isTouching = true;
		touchStartY = event.touches[0].clientY;
		velocity = 0;
		lastTimestamp = event.timeStamp;
	});
	canvas.addEventListener('touchmove', (event) => {
		const touchEndY = event.touches[0].clientY;
		const deltaY = touchStartY - touchEndY;
		touchStartY = touchEndY;
		const deltaTime = event.timeStamp - lastTimestamp;
		velocity = deltaY / deltaTime;
		lastTimestamp = event.timeStamp;
		handleScroll({ deltaY });
	});
	canvas.addEventListener('touchend', () => {
		isTouching = false;
		applyInertia();
	});
	function applyInertia() {
		if (!isTouching) {
			velocity *= friction;
			offsetY += velocity * 16; // assuming 60fps, adjust if needed

			// Constrain scrollY to the bounds of the large canvas
			offsetY = Math.max(
				0,
				Math.min(offsetY, background.height - canvas.height)
			);

			draw();

			if (Math.abs(velocity) > 0.1) {
				requestAnimationFrame(applyInertia);
			}
		}
	}
	canvas.addEventListener(
		'wheel',
		(event) => {
			handleScroll(event);
			event.preventDefault();
		},
		{ passive: false }
	);
};

const horizontal = async (args) => {
	const { image, canvas, ctx, clickMap, clickHandle } = args;
	const background = await loadImage(image);
	const originalHeight = background.height;
	const newHeight = canvas.height;
	let offsetX = args.offsetX || 0;

	let drawClickCanvas;
	if (clickMap && clickHandle) {
		const bgClickMap = await loadImage(clickMap);
		const bgClickCanvas = document.createElement('canvas');

		drawClickCanvas = (target) =>
			drawBGClickCanvas({
				bgClickCanvas: target,
				canvas,
				bgClickMap,
				offsetX
			});
		function handleTap(event) {
			const rect = canvas.getBoundingClientRect();
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;
			const whichItem = getClick({
				x,
				y,
				bgClickCanvas,
				drawClickCanvas: () => drawClickCanvas(bgClickCanvas)
			});
			clickHandle(whichItem);
		}
		canvas.addEventListener('click', handleTap);
	}

	const draw = () => {
		ctx.drawImage(
			background,
			offsetX,
			0,
			canvas.width,
			originalHeight,
			0,
			0,
			canvas.width,
			newHeight
		);
		//drawClickCanvas(canvas);
	};
	draw();

	function handleScroll(event) {
		requestAnimationFrame(() => {
			const deltaX = event.deltaX;
			offsetX = Math.min(
				Math.max(offsetX + deltaX, 0),
				background.width - canvas.width
			);
			draw();
		});
	}

	let isTouching = false;
	let touchStartX = 0;
	let velocity = 0;
	let lastTimestamp = 0;
	const friction = 0.93; // adjust for desired inertia

	canvas.addEventListener('touchstart', (event) => {
		isTouching = true;
		touchStartX = event.touches[0].clientX;
		velocity = 0;
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
			offsetX = Math.max(
				0,
				Math.min(offsetX, background.width - canvas.width)
			);

			draw();

			if (Math.abs(velocity) > 0.1) {
				requestAnimationFrame(applyInertia);
			}
		}
	}

	canvas.addEventListener(
		'wheel',
		(event) => {
			handleScroll(event);
			event.preventDefault();
		},
		{ passive: false }
	);
};

export const scrollable = (args) => {
	if (args.vertical) return vertical(args);
	return horizontal(args);
};
