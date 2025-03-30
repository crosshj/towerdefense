import { getAnimateable } from '/vendor/DragonBones/Animateable.js';
import {
	listAvailableAnimations,
	listAvailableUnits,
} from '../../utils/units.js';

const animationControls = {};

const getFrames = async ({ skeleton, atlas, texture, animName }) => {
	const canvas = document.createElement('canvas');
	canvas.width = 128;
	canvas.height = 128;

	const animation = await getAnimateable({
		canvas,
		skeleton,
		atlas,
		texture,
		// framerate: 12,
	});

	return animation.idleFrames;
};

const switchCharacter = async ({ character, animation: _animName }) => {
	//TODO: if animation is same (animName) as already loaded, just change animation and exit

	const regex = /^(u\d+)-(.+)$/;
	const [_, base, tex] = character.match(regex);
	const canvas = document.getElementById('test-canvas');
	canvas.width = canvas.width; // clears canvas quickly
	const ctx = canvas.getContext('2d');
	const skeleton = '/assets/character/FighterBase/FighterBase_ske.json';
	const atlas = '/assets/character/FighterBase/FighterBase_tex.json';
	const texture = `/assets/character/FighterBase/skins/${tex}_tex.png`;

	const getAnimFrames = async (animName = _animName) => {
		const _frames = await getFrames({
			skeleton,
			atlas,
			texture,
			animName,
		});
		const framesContainer = document.getElementById('frames');
		framesContainer.innerHTML = '';
		for (const f of _frames) {
			framesContainer.appendChild(f);
		}
		return _frames;
	};
	let frames = await getAnimFrames();

	let interval;
	let time = 1;
	const drawFrame = (frame) => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(frame, 0, 0);
	};
	drawFrame(frames[time - 1]);

	animationControls.play = async () => {
		const frameWait = 300;
		interval = setInterval(() => {
			window.requestAnimationFrame(() => {
				time++;
				if (time > frames.length) {
					time = 1;
				}
				drawFrame(frames[time - 1]);
			});
		}, frameWait);
	};
	animationControls.pause = () => {
		interval && clearInterval(interval);
		interval = undefined;
	};
	animationControls.step = async () => {
		window.requestAnimationFrame(() => {
			time++;
			if (time > frames.length) {
				time = 1;
			}
			drawFrame(frames[time - 1]);
		});
	};
	animationControls.switch = async (anim) => {
		frames = getAnimFrames(anim);
	};
};

const onChange = async () => {
	const character = document.getElementById('charactersList').value;
	const animation = document.getElementById('animationsList').value;
	// console.log(`${character} - ${animation}`);
	await switchCharacter({ character, animation });
};

const updateCharactersList = async ({ selected = 0, units } = {}) => {
	const listEl = document.getElementById('charactersList');
	const unitsList = units || listAvailableUnits();
	listEl.innerHTML = unitsList
		.map(
			(x, i) => `
        <option ${i === selected ? 'selected' : ''} value=${x.code}>${
			i + ' - ' + x.displayName
		}</option>
    `
		)
		.reverse();
	listEl.addEventListener('change', onChange);
};

const updateAnimationsList = async ({ selected = 0 } = {}) => {
	const listEl = document.getElementById('animationsList');
	const animations = listAvailableAnimations();
	listEl.innerHTML = animations.map(
		(x, i) => `
        <option ${i === selected ? 'selected' : ''} value=${x.code}>${
			x.displayName
		}</option>
    `
	);
	listEl.addEventListener('change', onChange);
};

const attachControls = () => {
	const controls = document.querySelector('.controls');
	const playButton = document.getElementById('play');
	const pauseButton = document.getElementById('pause');
	const stepForwardButton = document.getElementById('step-forward');

	controls.addEventListener('click', function (event) {
		const target = event.target;

		if (target === playButton) {
			playButton.style.display = 'none';
			pauseButton.style.display = '';
			stepForwardButton.classList.add('disabled');
			animationControls.play && animationControls.play();
		} else if (target === pauseButton) {
			playButton.style.display = '';
			pauseButton.style.display = 'none';
			stepForwardButton.classList.remove('disabled');
			animationControls.pause && animationControls.pause();
		} else if (target === stepForwardButton) {
			if (target.classList.contains('disabled')) return;
			animationControls.step && animationControls.step();
		}
	});
};

const onLoaded = async () => {
	attachControls();
	const units = listAvailableUnits();
	const selectedUnit = units.length - 1; // 18=Openhymen
	const selectedAnim = 0; // 1=jumping
	await updateCharactersList({ selected: selectedUnit, units });
	await updateAnimationsList({ selected: selectedAnim });
	onChange();
};

document.addEventListener('DOMContentLoaded', onLoaded);
