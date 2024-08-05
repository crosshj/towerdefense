import { getAnimateable } from '/vendor/DragonBones/Animateable.js';
import { listAvailableAnimations, listAvailableUnits } from '../units/units.js';
import { hydrateCharacters } from '../index.js';

const animationControls = {};

const updateThumbnail = ({ animation }) => {
	// TODO: do this like the app does it
	//'★'.repeat(character.stars);
	const root = document.querySelector(':root');
	const dataUrl = animation.thumbnail.toDataURL();
	root.style.setProperty('--thumbnailUrl', `url('${dataUrl}')`);
};

const characterStats = async (character) => {
	const statsDiv = document.querySelector('.stats');
	const [minHydrated, maxHydrated, uncappedMax] = await hydrateCharacters([
		{
			id: 'test-test-test',
			experience: 0,
			code: character
		},
		{
			id: 'test-test-test',
			experience: 99999999999999999,
			code: character
		},
		{
			id: 'test-test-test',
			experience: 99999999999999999,
			code: character,
			uncappedLevel: 4
		}
	]);
	console.log({ minHydrated, maxHydrated, uncappedMax });

	const levelHTML = `
		<span class="property"></span>
		<span class="value">${minHydrated.level}</span>
		<span class="value">${maxHydrated.level}</span>
		<span class="value">${uncappedMax.level}</span>
	`;
	const hpHTML = `
		<span class="property">HP</span>
		<span class="value">${minHydrated.hp}</span>
		<span class="value">${maxHydrated.hp}</span>
		<span class="value">${uncappedMax.hp}</span>
	`;
	const attackHTML = `
		<span class="property">ATTACK</span>
		<span class="value">${minHydrated.attack}</span>
		<span class="value">${maxHydrated.attack}</span>
		<span class="value">${uncappedMax.attack}</span>
	`;
	const defenseHTML = `
		<span class="property">DEFENSE</span>
		<span class="value">${minHydrated.defense}</span>
		<span class="value">${maxHydrated.defense}</span>
		<span class="value">${uncappedMax.defense}</span>
	`;

	const minHydratedHTML = Object.entries(minHydrated)
		.filter((x) => {
			return ![
				'id',
				'unit',
				'code',
				'displayName',
				'element',
				'move',
				'moveSpeed',
				'moveSpeedText',
				'stars',
				'professorPoints',
				'levelNextPercent',
				'type',
				'uncappedLevel'
			].includes(x[0]);
		})
		.sort((a, b) => {
			return a[0].localeCompare(b[0]);
		})
		.map((x) => {
			const columns = x[1]?.split
				? x[1].split('-').map((x) => x.trim())
				: [x[1], '', ''];
			return `
			<span class="property">${x[0]}</span>
			<span class="value">${columns[0]}</span>
			<span class="value">${columns[1]}</span>
			<span class="value">${columns[2]}</span>
	`;
		})
		.join('');

	statsDiv.innerHTML = [
		levelHTML,
		attackHTML,
		hpHTML,
		defenseHTML
		//minHydratedHTML
	].join('');
};

const switchCharacter = async ({ character, animation: animName }) => {
	await characterStats(character);

	//TODO: if animation is same (animName) as already loaded, just change animation and exit

	const regex = /^(u\d+)-(.+)$/;
	const [_, base, tex] = character.match(regex);
	const canvas = document.getElementById('test-canvas');
	canvas.width = canvas.width; // clears canvas quickly
	const skeleton = '/assets/character/FighterBase/FighterBase_ske.json';
	const atlas = '/assets/character/FighterBase/FighterBase_tex.json';
	const texture = `/assets/character/FighterBase/skins/${tex}_tex.png`;

	const animation = await getAnimateable({
		canvas,
		skeleton,
		atlas,
		texture
	});
	updateThumbnail({ animation });

	let interval;
	let animSet = false;
	animationControls.play = () => {
		if (!animSet) {
			animSet = true;
			animation.setAnimation(animName);
		}
		const animSpeed = 1000 / 40;
		interval = setInterval(() => {
			window.requestAnimationFrame(() => {
				animation.advanceTime();
			});
		}, animSpeed);
	};
	animationControls.pause = () => {
		interval && clearInterval(interval);
		interval = undefined;
	};
	animationControls.step = () => {
		if (!animSet) {
			animSet = true;
			animation.setAnimation(animName);
		}
		window.requestAnimationFrame(() => {
			animation.advanceTime();
		});
	};
	animationControls.switch = (anim) => {
		animation.setAnimation(anim);
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
	listEl.innerHTML = unitsList.map(
		(x, i) => `
        <option ${i === selected ? 'selected' : ''} value=${x.code}>${
			i + ' - ' + x.displayName
		}</option>
    `
	);
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
	const selectedUnit = 38; // 18=Openhymen
	const selectedAnim = 1; // 1=jumping
	await updateCharactersList({ selected: selectedUnit, units });
	await updateAnimationsList({ selected: selectedAnim });
	onChange();
};

document.addEventListener('DOMContentLoaded', onLoaded);
