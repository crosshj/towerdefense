import { cleanError, colorShade } from '../utils/utils.js';
import { toggleCoords } from '../engine/state.js';
import GifMaker from './gif.js';
import { renderMissile } from './objects/missile.js';
import Controls from './controls.js';
import { createPauseScreen } from './menuPause.js';
import { getCharRenderer } from './objects/unit.js';

const BOTTOM_OFFSET = 60;

const initDom = (state) => {
	const dom = document.querySelector('.container');
	const canvas = dom.querySelector('canvas');
	canvas.width = state.field.width;
	canvas.height = state.field.height;
	const ctx = canvas.getContext('2d', {
		antialias: false,
		depth: false,
		desynchronized: true
	});
	const gif =
		state.record &&
		new GifMaker({
			...state.field
		});
	ctx.imageSmoothingEnabled = false;
	return { ctx, gif };
};

let renderCharacter;

const render = (state, ctx, gif, controls) => {
	const { width: fieldWidth, height: fieldHeight } = state.field;
	const SCALAR = (x) => x * 4;
	const bottom = (height) => fieldHeight - height - SCALAR(BOTTOM_OFFSET);
	const center = (x, width) => x - width / 2;

	const { bgMid, bgTop, bgBottom } = state.assets.images;
	const bgimg = state.assets.images[state?.stage?.background || 'background'];

	controls.updateProgress('missile', state.missile.charge || 0);
	controls.updateProgress('mineral', state.mineral.charge || 0);
	controls.updateMineral(
		state.mineral.amount || 0,
		state.mineral.capacity || 0
	);
	controls.updateTeam(state);

	const drawGuides = () => {
		const line = (x, y, x1, y2, color = '#555') => {
			ctx.strokeStyle = color;
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x1, y2);
			ctx.stroke();
		};
		const width = 50;
		line(0, 457, width, 457, 'black'); //horizon
		line(0, 229, width, 229); // tower top
		line(0, 229 + 371 - 28, width, 229 + 371 - 28); // tower bottom
		line(0, 229 + 371, width, 229 + 371); // tower shadow bottom
	};

	const drawBackground = () => {
		ctx.drawImage(
			bgimg,
			0,
			0, //dx dy
			fieldWidth,
			fieldHeight //dw dh
		);

		//this is only for debuggin backgrounds
		//drawGuides();
		return; //build background in assets and remove from here

		// image, dx, dy
		// image, dx, dy, dWidth, dHeight
		// image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight

		//draw skewed, middle part
		const hScale = SCALAR(1);
		const vScale = SCALAR(1);
		const hSkew = 0;
		const vSkew = SCALAR(-1.8);
		const skewOffSet = SCALAR(90);
		ctx.transform(hScale, hSkew, vSkew, vScale, 0, 0);
		ctx.fillStyle = ctx.createPattern(bgMid, 'repeat');
		ctx.fillRect(
			skewOffSet - fieldWidth,
			SCALAR(bgTop.height - 1 + 21.5),
			fieldWidth * 3,
			SCALAR(bgMid.height)
		);
		ctx.resetTransform();

		//draw unskewed top part
		ctx.drawImage(bgTop, 0, 0, fieldWidth, SCALAR(bgTop.height));
		ctx.drawImage(
			bgTop,
			0,
			bgTop.height - 5, //sx sy
			bgTop.width,
			5, // sw sh
			0,
			fieldHeight - SCALAR(5), //dx dy
			fieldWidth,
			SCALAR(25) //dw dh
		);

		//draw unskewed bottom part
		ctx.drawImage(
			bgBottom,
			0,
			SCALAR(bgTop.height + bgMid.height) - 1, //dx dy
			fieldWidth,
			SCALAR(bgBottom.height) //dw dh
		);
	};

	const writeTicker = () => {
		controls.updateTicker(state.tick.toString().padStart(5, ' '));
	};
	writeTicker();

	const healthBar = ({ x, y, width, hp, hpMax }) => {
		const healthX = center(x, SCALAR(width));
		const healthWidth = SCALAR(width);
		ctx.strokeStyle = '#111';
		ctx.lineJoin = 'round';
		ctx.lineWidth = SCALAR(0.5);
		ctx.fillStyle = '#0002';
		ctx.fillRect(healthX, y - SCALAR(10), healthWidth, SCALAR(5));
		ctx.fillStyle = '#DE9900'; //orange
		ctx.fillRect(
			healthX,
			y - SCALAR(10),
			healthWidth * (hp > 0 ? hp / hpMax : 0),
			SCALAR(5)
		);
		ctx.strokeRect(healthX, y - SCALAR(10), healthWidth, SCALAR(5));
	};

	const shadow = ({ x, y, width, height }) => {
		const radius = width / 2;
		ctx.fillStyle = '#00000020';
		//ctx.fillStyle = 'red';
		ctx.beginPath();
		ctx.ellipse(
			x + radius,
			y + height,
			radius,
			radius / 3,
			0,
			0,
			Math.PI * 2
		);
		ctx.fill();
	};

	const renderTower = ({
		x: centerX,
		color,
		dims,
		status,
		hp,
		hpMax,
		type
	}) => {
		const [width, height] = dims;
		const [x, y] = [center(centerX, width), bottom(height)];
		const isDead = status === 'dead';
		healthBar({
			x: centerX,
			y: y - 20,
			width: width / SCALAR(1),
			hp,
			hpMax
		});
		shadow({ x: x - 40, y: y + 8, width: width + 80, height });

		let grd = ctx.createLinearGradient(x, 0, x + width, 0);
		if (!isDead) {
			grd.addColorStop(
				0,
				type === 'attacker' ? colorShade(color, -90) : color
			);
			grd.addColorStop(
				1,
				type === 'attacker' ? color : colorShade(color, -90)
			);
		} else {
			grd.addColorStop(0, type === 'attacker' ? '#111' : '#444');
			grd.addColorStop(1, type === 'attacker' ? '#444' : '#111');
		}

		ctx.fillStyle = grd;
		const radius = width / 2;
		//center
		ctx.fillRect(x, y + radius / 3, width, height - radius / 3);
		//bottom
		ctx.beginPath();
		ctx.ellipse(
			x + radius,
			y + height,
			radius,
			radius / 3,
			0,
			0,
			Math.PI * 2
		);
		ctx.fill();
		//top
		ctx.beginPath();
		ctx.ellipse(
			x + radius,
			y + radius / 3,
			radius,
			radius / 5,
			0,
			0,
			Math.PI * 2
		);
		ctx.fill();
	};

	renderCharacter =
		renderCharacter ||
		getCharRenderer({
			state,
			center,
			SCALAR,
			bottom,
			shadow,
			ctx,
			healthBar
		});

	ctx.clearRect(0, 0, fieldWidth, fieldHeight);
	drawBackground();

	const allMissiles = state.missile.instances || [];
	for (const missile of allMissiles) {
		renderMissile(ctx)(missile);
	}

	const globalModeState = toggleCoords(state, 'global');
	globalModeState.towers.forEach((tower) => {
		renderTower(tower);
		tower.deployed.forEach(renderCharacter);
	});

	if (state.towers[0].status === 'dead') {
		renderCharacter = undefined;
		alert('You lose!');
	}
	if (state.towers[1].status === 'dead') {
		renderCharacter = undefined;
		alert('You win!');
	}

	if (!state.record) return;
	if (state.towers.find((x) => x.status === 'dead')) {
		(async () => {
			const image = document.createElement('img');
			new Array(20).fill().forEach(() => {
				gif.addFrame(ctx);
			});
			image.src = await gif.finish();
			document.body.append(image);
		})();
	} else {
		gif.addFrame(ctx);
	}
};

const tryRender = (state, ctx, gif, controls) => {
	try {
		render(state, ctx, gif, controls);
		return true;
	} catch (e) {
		console.error(cleanError(e));
		return false;
	}
};

export default class Render {
	constructor({ state }) {
		const { ctx, gif } = initDom(state);
		const pauseScreen = createPauseScreen(document.body, state);
		const controls = new Controls({
			state,
			pauseScreen,
			showTicker: false, // for debugging
			showScreenInfo: false, // for debugging
			showEffects: true //TODO: this depends on statee, ie. what effects are used in game setup
		});
		return () => tryRender(state, ctx, gif, controls);
	}
}
