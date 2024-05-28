const explodedMissile = (ctx) => (missile) => {
	const { x, y, angle } = missile;
	ctx.save();

	ctx.fillStyle = '#FFAC1C30';
	ctx.beginPath();
	ctx.ellipse(
		x + 20,
		590, // y location
		300, // radius
		50, // height of ellipse
		0,
		0,
		Math.PI * 2
	);
	ctx.fill();

	ctx.fillStyle = '#FFA01040';
	ctx.beginPath();
	ctx.ellipse(
		x + 20,
		590, // y location
		200, // radius
		40, // height of ellipse
		0,
		0,
		Math.PI * 2
	);
	ctx.fill();

	ctx.fillStyle = '#FF900040';
	ctx.beginPath();
	ctx.ellipse(
		x + 20,
		590, // y location
		90, // radius
		20, // height of ellipse
		0,
		0,
		Math.PI * 2
	);
	ctx.fill();
	ctx.restore();
};

export const renderMissile = (ctx) => (missile) => {
	const { x, y, angle } = missile;
	if (missile.exploded > 1) return explodedMissile(ctx)(missile);
	ctx.save();

	ctx.translate(x, y);
	const radianAngle = ((360 - angle) * Math.PI) / 180;
	ctx.rotate(radianAngle);

	const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 200);
	grad.addColorStop(0, '#F30');
	grad.addColorStop(0.43, '#F50');
	grad.addColorStop(0.43, '#FFFC');
	grad.addColorStop(1, '#FFF0');
	// ctx.fillStyle = '#000a';
	ctx.fillStyle = grad;
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.quadraticCurveTo(-30, 50, -100, 50);
	ctx.lineTo(-250, 50);
	ctx.lineTo(-250, -50);
	ctx.lineTo(-100, -50);
	ctx.quadraticCurveTo(-30, -50, 0, 0);
	ctx.closePath();
	ctx.fill();

	ctx.strokeStyle = '#A90';
	ctx.beginPath();
	ctx.moveTo(-150, -50);
	ctx.lineTo(-100, -50);
	ctx.quadraticCurveTo(-30, -50, 0, 0);
	ctx.quadraticCurveTo(-30, 50, -100, 50);
	ctx.lineTo(-150, 50);
	ctx.stroke();

	ctx.strokeStyle = '#b60';
	ctx.beginPath();
	ctx.moveTo(-70, -48);
	ctx.quadraticCurveTo(-100, 0, -70, 48);
	ctx.stroke();

	ctx.restore();
};
