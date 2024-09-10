import { renderMissile } from '/visuals/objects/missile.js';

const missileCanvas = document.getElementById('missileCanvas');
const missileCanvasCtx = missileCanvas.getContext('2d');
renderMissile(missileCanvasCtx)({
	x: 200,
	y: 200,
	angle: -45,
});
