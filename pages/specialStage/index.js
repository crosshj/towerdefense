import { canvasHorizontal } from '../../visuals/canvas.js';

const pageTitle = 'SPECIAL STAGE';

const setup = async () => {
	document.title += `: ${pageTitle}`;
	const bg = await canvasHorizontal({
		parent: document.body,
		image: '/pages/specialStage/background.png',
		height: 500
	});
	const controls = await canvasHorizontal({
		parent: document.body,
		height: 500
	});

	controls.ctx.fillStyle = '#777';
	controls.ctx.font = '30px Arial';
	controls.ctx.textAlign = 'left';
	controls.ctx.textBaseline = 'top';
	controls.ctx.fillText(pageTitle, 15, 15);
	controls.canvas.style.zIndex = 1;
	controls.canvas.style.pointerEvents = 'none';

	bg.canvas.addEventListener('mousedown', () => {
		// document.location.href = '/pages/home/index.html';
		window.history.back();
	});
};

setup();
