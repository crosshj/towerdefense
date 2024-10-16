import { getCharacters, upgradeCharacter } from '../../../user/characters.js';
import { calculateCombineResults } from '../../../utils/units.js';
import { characterImageGetter } from '../../../visuals/assets/character.js';
import {
	getCurrentCharCache,
	setCurrentCharCache,
} from '../../../utils/cache.js';
import { attachAllCharacters, attachControls } from '../../my-team/allChars.js';
import { getTeams } from '../../../user/teams.js';

const pageTitle = 'LEVEL UP';

const getMaterials = async ({ currentChar, teams = {} }) => {
	const teamsString = JSON.stringify(teams);
	const _characters = await getCharacters(true /* hydrate */);
	const characters = _characters.filter((x) => {
		return (
			x.id !== currentChar.id && !x.locked && !teamsString.includes(x.id)
		);
	});
	return {
		all: _characters,
		filtered: characters,
	};
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
		: `${Math.floor(Number(currentChar.levelNextPercent))}%`;
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
			: `${Math.floor(Number(resultsChar.levelNextPercent))}%`;
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
	characters,
}) => {
	const materialSlots = Array.from(
		document.querySelectorAll('.materialsSlot')
	);
	const inputs = materialSlots.map((x) => {
		return characters.find((c) => c.id === x.dataset.id);
	});
	loadingEl.classList.remove('hidden');
	const newState = await upgradeCharacter(currentChar, inputs);

	if (newState.error) {
		//can't use characters that are on a team (should hide these)
		console.log('TODO: handle error - ', error);
		loadingEl.classList.add('hidden');
	}

	//TODO: show error
	//TODO: show success

	clearSlots(materialSlots);
	await updateChar(newState.currentChar);
	await updateAllChars(newState.characters);

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
	unitDetailsEl.addEventListener('pointerup', (e) => {
		const src = `/modals/character/detail.html?id=${currentChar.id}&back=${params?.back || ''}`;
		setCurrentCharCache(currentChar);
		window.parent.postMessage({
			_: 'navigate',
			src,
		});
	});

	let characters = [];
	const actionButton = document.querySelector(
		'.resultContainer .actionButton'
	);
	updateResults({ characters, currentChar, actionButton });

	const controls = attachControls();

	const teams = await getTeams();
	const charactersInfo = await getMaterials({ teams, currentChar });
	characters = charactersInfo.filtered;

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
		controlsState: controls.state,
		characters: controls.state.sameUnit
			? characters.filter((x) => x.code === currentChar.code)
			: characters,
		getCharImage,
		dragStart,
		dragEnd,
		params,
	});
	controls.onSort(() => {
		attachAllCharacters({
			controlsState: controls.state,
			characters: controls.state.sameUnit
				? characters.filter((x) => x.code === currentChar.code)
				: characters,
			getCharImage,
			dragStart,
			dragEnd,
			params,
		});
	});
	controls.onFilter(() => {
		attachAllCharacters({
			controlsState: controls.state,
			characters: controls.state.sameUnit
				? characters.filter((x) => x.code === currentChar.code)
				: characters,
			getCharImage,
			dragStart,
			dragEnd,
			params,
		});
	});

	actionButton.addEventListener('pointerdown', (e) => {
		const clearSlots = (materialSlots) => {
			for (const slot of materialSlots) {
				slot.dataset.id = undefined;
				slot.innerHTML = '';
			}
			//updateUsed();
		};
		const updateChar = async (newChar) => {
			if (!newChar?.id) {
				console.log('ERROR OMG!');
			}
			currentChar.id = newChar.id;
		};
		const updateAllChars = async () => {
			const charactersInfo = await getMaterials({ currentChar });
			characters = charactersInfo.filtered;
			const newChar = charactersInfo.all.find(
				(x) => x.id === currentChar.id
			);
			for (const key of Object.keys(currentChar)) {
				if (typeof newChar[key] === 'undefined') continue;
				currentChar[key] = newChar[key];
			}
			updateResults({ characters, currentChar, actionButton });
			attachAllCharacters({
				controlsState: controls.state,
				characters: controls.state.sameUnit
					? characters.filter((x) => x.code === currentChar.code)
					: characters,
				getCharImage,
				dragStart,
				dragEnd,
			});
		};
		submitResults({
			clearSlots,
			updateChar,
			updateAllChars,
			loadingEl,
			currentChar,
			characters,
		});
	});

	document.title = 'TD: ' + pageTitle;

	window.parent.postMessage({
		_: 'stats',
		feathers: false,
		gems: true,
		coins: false,
		friendPoints: false,
	});
	window.parent.postMessage({
		_: 'title',
		title: pageTitle,
		visibility: 'visible',
		back: params.back,
	});

	window.parent.postMessage({ _: 'loaded' });
};

document.addEventListener('DOMContentLoaded', setup);
