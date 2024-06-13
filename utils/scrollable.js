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
	// for (let y = 100; y < img.height; y += 100) {
	// 	ctx.beginPath();
	// 	ctx.moveTo(0, y);
	// 	ctx.lineTo(img.width, y);
	// 	ctx.stroke();
	// 	ctx.fillText(`${y}px`, img.width / 2, y - 5);
	// }
	return canvas;
}

const vertical = async (args) => {
	const { image, canvas, ctx, scrollBottom } = args;
	// const background = await loadImage(image);
	const background = imageWithHorizontalMarks(await loadImage(image));
	const originalWidth = background.width;
	const newWidth = canvas.width;
	let offsetY = 0;
	if (typeof scrollBottom !== 'undefined') {
		offsetY = scrollBottom + (background.height - canvas.height);
	}

	const draw = () => {
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
		const touchEndX = event.touches[0].clientY;
		const deltaY = touchStartY - touchEndX;
		touchStartY = touchEndX;
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

export const scrollable = (args) => {
	if (args.vertical) return vertical(args);
	return horizontal(args);
};
