import { canvasVertical } from '../../visuals/canvas.js';

const pageTitle = 'MAIN STAGE';

const setup = async () => {
	document.title += `: ${pageTitle}`;
	const bg = await canvasVertical({
		parent: document.body,
		image: '/pages/mainStage/background.png',
		width: 950,
		scrollBottom: 0
	});
	const controls = await canvasVertical({
		parent: document.body,
		width: 950
	});

	controls.ctx.fillStyle = '#777';
	controls.ctx.font = '30px Arial';
	controls.ctx.textAlign = 'left';
	controls.ctx.textBaseline = 'top';
	controls.ctx.fillText(pageTitle, 15, 15);
	controls.canvas.style.zIndex = 1;
	controls.canvas.style.pointerEvents = 'none';

	bg.canvas.addEventListener('mousedown', () => {
		document.location.href = '/pages/home/index.html';
	});
};

setup();
