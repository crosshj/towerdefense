const starSVG = `
<svg viewBox="0 0 100 100" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <defs></defs>
  <path
    fill="black"
    d="M 94.473 50 C 94.473 61.742 89.083 73.811 81.447 81.447 C 73.811 89.083 61.742 94.473 50 94.473 C 38.258 94.473 26.189 89.083 18.553 81.447 C 10.917 73.811 5.527 61.742 5.527 50 C 5.527 38.258 10.917 26.189 18.553 18.553 C 26.189 10.917 38.258 5.527 50 5.527 C 61.742 5.527 73.811 10.917 81.447 18.553 C 89.083 26.189 94.473 38.258 94.473 50 Z M 70.841 29.159 C 65.095 23.414 58.677 20.527 50 20.527 C 41.323 20.527 34.905 23.414 29.159 29.159 C 23.414 34.905 20.527 41.323 20.527 50 C 20.527 58.677 23.414 65.095 29.159 70.841 C 34.905 76.586 41.323 79.473 50 79.473 C 58.677 79.473 65.095 76.586 70.841 70.841 C 76.586 65.095 79.473 58.677 79.473 50 C 79.473 41.323 76.586 34.905 70.841 29.159 Z"
  ></path>
</svg>
`;

export class Star {
	constructor(canvas, svgData, angle, color) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.x = canvas.width / 2;
		this.y = canvas.height / 2;
		this.size = 60; // Initial size of the SVG
		this.angle = angle; // Set the provided direction angle
		this.speed = 2 + Math.random() * 2; // Random speed
		this.growth = 0.05 + Math.random() * 0.05; // Growth rate
		this.alpha = 1; // Full opacity
		this.color = color; // Assign color
		this.svgData = svgData; // SVG string
		this.svgImage = new Image();
		this.distanceTraveled = 0; // Distance the star has moved
		this.maxDistance = 300; // Set a maximum distance before the star disappears
		this.createColoredSVG();
	}

	createColoredSVG() {
		const coloredSvg = this.svgData.replace(
			/fill="[^"]*"/g,
			`fill="${this.color}"`
		); // Replace the fill color
		const svgBlob = new Blob([coloredSvg], { type: 'image/svg+xml' });
		const url = URL.createObjectURL(svgBlob);
		this.svgImage.src = url;
	}

	update() {
		const moveDistance = this.speed;
		this.x += Math.cos(this.angle) * moveDistance;
		this.y += Math.sin(this.angle) * moveDistance;
		this.size += this.growth;
		this.alpha = Math.max(0, this.alpha - 0.01); // Clamp alpha to never go below 0
		this.distanceTraveled += moveDistance; // Track the total distance moved
	}

	draw() {
		this.ctx.save();
		this.ctx.globalAlpha = this.alpha;
		this.ctx.drawImage(
			this.svgImage,
			this.x - this.size / 2,
			this.y - this.size / 2,
			this.size,
			this.size
		);
		this.ctx.restore();
	}

	isExpired() {
		// The star expires when it travels a certain distance or becomes fully transparent
		return this.distanceTraveled >= this.maxDistance || this.alpha <= 0;
	}
}

export function startAnimation(canvas) {
	const ctx = canvas.getContext('2d');
	const stars = [];
	let angleStep = (2 * Math.PI) / 6; // Uniform step for 6 stars
	let currentAngle = 180; // Start at angle 0
	const starColors = [
		'#FF6347', // Tomato (red)
		'#FF69B4', // Hot Pink
		'#8A2BE2', // Blue Violet
		'#32CD32', // Lime Green
		'#FFD700', // Gold
		'#00BFFF', // Deep Sky Blue
		'#FF4500', // Orange Red
		'#FF1493', // Deep Pink
		'#1E90FF', // Dodger Blue
		'#ADFF2F', // Green Yellow
		'#FFA500', // Orange
		'#FF00FF', // Magenta
	];

	// Define a cooldown (in milliseconds) to control the spawning rate
	let spawnCooldown = 200; // 0.5 seconds between star spawns
	let lastSpawnTime = 0; // Timestamp of the last star spawn

	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Get the current time
		const now = Date.now();

		// Only spawn a new star if enough time has passed since the last spawn
		if (stars.length < 10 && now - lastSpawnTime >= spawnCooldown) {
			// Introduce a slight random variation to the angle near angleStep
			const randomVariation = (Math.random() - 0.5) * (angleStep / 2); // Random value between -angleStep/4 and +angleStep/4
			const angle = currentAngle + randomVariation;

			currentAngle += angleStep; // Increment the angle for the next star

			// Select a random color for the star
			const randomColor =
				starColors[Math.floor(Math.random() * starColors.length)];

			// Add the new star
			stars.push(new Star(canvas, starSVG, angle, randomColor));

			// Update the last spawn time
			lastSpawnTime = now;

			// Ensure the angle is wrapped within [0, 2π)
			if (currentAngle >= 2 * Math.PI) {
				currentAngle = currentAngle % (2 * Math.PI);
			}
		}

		// Update and draw stars
		for (let i = stars.length - 1; i >= 0; i--) {
			const star = stars[i];
			star.update();
			star.draw();

			// Remove stars that have expired (traveled too far or faded out)
			if (star.isExpired()) {
				stars.splice(i, 1);
			}
		}

		requestAnimationFrame(animate);
	}

	animate();
}
