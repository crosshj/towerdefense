import { calculateCombineResults } from '../../../characters/index.js';
import { getCharacters, upgradeCharacter } from '../../../user/characters.js';
import { characterImageGetter } from '../../../visuals/assets/character.js';
import { getCurrentCharCache } from '../../_utils/cache.js';
import { attachAllCharacters, attachControls } from '../../my-team/allChars.js';

const pageTitle = 'LEVEL UP';

const getMaterials = async ({ currentChar }) => {
	// TODO: DO NOT INCLUDE USED/LOCKED CHAR IN THIS LIST!!!';
	const _characters = await getCharacters();
	const characters = _characters.filter((x) => {
		return x.id !== currentChar.id;
	});
	return characters;
};

const updateUsed = () => {
	const materials = Array.from(document.querySelectorAll('.materialsSlot'));
	const allChars = Array.from(document.querySelectorAll('.character-card'));
	for (const char of allChars) {
		if (materials.some((x) => x.dataset.id === char.dataset.id)) {
			char.classList.add('used');
		} else {
			char.classList.remove('used');
		}
	}
};

const updateResults = ({ characters, actionButton, currentChar }) => {
	const materials = Array.from(document.querySelectorAll('.materialsSlot'))
		.map((x) => {
			return characters.find((c) => c.id === x.dataset.id);
		})
		.filter((x) => x);
	const levelFromText = document.querySelector(
		'.resultContainer .levelFrom .levelText'
	);
	const levelFromPercent = document.querySelector(
		'.resultContainer .levelFrom .levelPercent'
	);
	const levelToText = document.querySelector(
		'.resultContainer .levelTo .levelText'
	);
	const levelToPercent = document.querySelector(
		'.resultContainer .levelTo .levelPercent'
	);
	const profPointsFrom = document.querySelector('.profPointsFrom .amount');
	const profPointsTo = document.querySelector('.profPointsTo .amount');

	const isMaxed =
		currentChar.uncappedLevel === 4 &&
		currentChar.level === currentChar.maxLevel;

	levelFromText.innerText = `Level ${currentChar.level}`;
	levelFromPercent.innerText = isMaxed
		? 'MAX'
		: `${Number(currentChar.levelNextPercent).toFixed(0)}%`;
	profPointsFrom.innerText = currentChar.professorPoints;

	const resultsChar = calculateCombineResults({ currentChar, materials });
	levelToText.innerText = isMaxed
		? `Level ${currentChar.level}`
		: `Level ${resultsChar.level}`;
	const isMaxedNext =
		isMaxed ||
		(resultsChar.uncappedLevel === 4 &&
			resultsChar.level === resultsChar.maxLevel);
	levelToPercent.innerText = isMaxedNext
		? 'MAX'
		: resultsChar.levelNextPercent === `?`
		? '?'
		: `${Number(resultsChar.levelNextPercent).toFixed(0)}%`;
	profPointsTo.innerText = resultsChar.professorPoints;

	if (!materials.length) {
		actionButton.classList.add('disabled');
	} else {
		actionButton.classList.remove('disabled');
	}
};

const submitResults = async ({
	updateChar,
	updateAllChars,
	clearSlots,
	loadingEl,
	currentChar,
	characters
}) => {
	const materialSlots = Array.from(
		document.querySelectorAll('.materialsSlot')
	);
	const inputs = materialSlots.map((x) => {
		return characters.find((c) => c.id === x.dataset.id);
	});
	loadingEl.classList.remove('hidden');
	const newState = await upgradeCharacter(currentChar, inputs);
	clearSlots(materialSlots);
	updateChar(newState.currentChar);
	updateAllChars(newState.characters);
	//TODO: show error
	//TODO: show success
	loadingEl.classList.add('hidden');
};

const setup = async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });

	const loadingEl = document.querySelector('.container .loading');

	const currentChar = getCurrentCharCache();
	const unitDetailsEl = document.querySelector('.unitDetails');
	const unitImage = document.createElement('img');
	unitImage.src = currentChar.imageUri;
	unitDetailsEl.append(unitImage);

	let characters = [];
	const actionButton = document.querySelector(
		'.resultContainer .actionButton'
	);
	actionButton.addEventListener('pointerdown', (e) => {
		const clearSlots = (materialSlots) => {
			for (const slot of materialSlots) {
				slot.dataset.id = undefined;
				slot.innerHTML = '';
			}
			//updateUsed();
		};
		const updateChar = (newChar) => {
			console.log('update character/results', newChar);
		};
		const updateAllChars = (newChars) => {
			console.log('update characters', newChars);
		};
		submitResults({
			clearSlots,
			updateChar,
			updateAllChars,
			loadingEl,
			currentChar,
			characters
		});
	});
	updateResults({ characters, currentChar, actionButton });

	const controls = attachControls();

	characters = await getMaterials({ currentChar });

	let dragging;
	function dragStart(e) {
		const parent = e.target.closest('.character-card');
		if (parent.classList.contains('used')) {
			e.preventDefault();
			return false;
		}
		dragging = parent;
	}
	function dragEnd(e) {
		if (!dragging) return;
		const [x, y] = [e.clientX, e.clientY + 50];
		let droppedOn = document.elementFromPoint(x, y);
		if (droppedOn.tagName === 'IMG') {
			droppedOn = droppedOn.closest('.materialsSlot');
		}
		if (!droppedOn.classList.contains('materialsSlot')) return;
		dragging.classList.add('used');
		droppedOn.innerHTML = '';
		const clone = dragging.querySelector('img').cloneNode(true);
		droppedOn.dataset.id = dragging.dataset.id;
		droppedOn.append(clone);
		updateResults({ characters, currentChar, actionButton });
		updateUsed();
		dragging = undefined;
	}

	const getCharImage = await characterImageGetter();
	attachAllCharacters({
		sortBy: controls.sortBy,
		characters,
		getCharImage,
		dragStart,
		dragEnd
	});
	controls.onSort((sortBy) => {
		attachAllCharacters({
			sortBy,
			characters,
			getCharImage,
			dragStart,
			dragEnd
		});
	});

	document.title = 'TD: ' + pageTitle;

	window.parent.postMessage({
		_: 'stats',
		feathers: false,
		gems: true,
		coins: false,
		friendPoints: false
	});
	window.parent.postMessage({
		_: 'title',
		title: pageTitle,
		visibility: 'visible'
	});

	window.parent.postMessage({ _: 'loaded' });
};

document.addEventListener('DOMContentLoaded', setup);
