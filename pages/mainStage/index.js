import { canvasVertical } from '../../visuals/canvas.js';

const pageTitle = 'MAIN STAGE';

const clickColorMap = {
	'#fdf900': 'tropicalGraveyard',
	'#6efd00': 'openField',
	'#00fddb': 'water',
	'#0061fd': 'asian',
	'#8700fd': 'haunted'
	// '#000000': 'none'
};

const setup = async () => {
	document.title += `: ${pageTitle}`;
	const bg = await canvasVertical({
		parent: document.body,
		image: '/pages/mainStage/background.png',
		width: 950,
		scrollBottom: 0,
		clickMap: '/pages/mainStage/background_clicks.png',
		clickHandle: (color) => {
			const which = clickColorMap[color];
			if (!which) return;
			//console.log(which || color);
			document.location.href = `/pages/game/standard.html?zone=${which}&back=/pages/mainStage/index.html`;
		}
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
};

setup();
