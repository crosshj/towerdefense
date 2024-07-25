import { listAvailableUnits } from '../units/units.js';

const animations = [
	{ code: 'idle', displayName: 'Idle' },
	{ code: 'jumping', displayName: 'Jumping' },
	{ code: 'sprite_swap', displayName: 'Swapping 1' },
	{ code: 'sprite_swap2', displayName: 'Swapping 2' }
];

const onChange = async () => {
	const character = document.getElementById('charactersList').value;
	const animation = document.getElementById('animationsList').value;
	console.log(`${character} - ${animation}`);
};

const updateCharactersList = async ({ selected = 0, units } = {}) => {
	const listEl = document.getElementById('charactersList');
	const unitsList = units || listAvailableUnits();
	listEl.innerHTML = unitsList.map(
		(x, i) => `
        <option ${i === selected ? 'selected' : ''} value=${x.code}>${
			x.displayName
		}</option>
    `
	);
	listEl.addEventListener('change', onChange);
};

const updateAnimationsList = async ({ selected = 0 } = {}) => {
	const listEl = document.getElementById('animationsList');
	listEl.innerHTML = animations.map(
		(x, i) => `
        <option ${i === selected ? 'selected' : ''} value=${x.code}>${
			x.displayName
		}</option>
    `
	);
	listEl.addEventListener('change', onChange);
};

const onLoaded = async () => {
	const units = listAvailableUnits();
	const selectedUnit = 4;
	const selectedAnim = 1;
	await updateCharactersList({ selected: selectedUnit, units });
	updateAnimationsList({ selected: selectedAnim });
};

document.addEventListener('DOMContentLoaded', onLoaded);
