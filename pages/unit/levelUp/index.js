import { getCharacters } from '../../../user/characters.js';
import { characterImageGetter } from '../../../visuals/assets/character.js';
import { getCurrentCharCache } from '../../_utils/cache.js';
import { attachAllCharacters, attachControls } from '../../my-team/allChars.js';

const pageTitle = 'LEVEL UP';

const setup = async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });

	const currentChar = getCurrentCharCache();
	const unitDetailsEl = document.querySelector('.unitDetails');
	unitDetailsEl.innerHTML = currentChar
		? `
			<div>${currentChar.displayName}</div>
			<div>[ ${currentChar.id} ]</div>
		`
		: '';

	const controls = attachControls();

	const characters = await getCharacters();
	console.log('TODO: DO NOT SHOW USED/LOCKED/CURRENT CHAR IN THIS LIST!!!');

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
		const [x, y] = [e.clientX, e.clientY + 50];
		const droppedOn = document.elementFromPoint(x, y);
		if (droppedOn.classList.contains('materialsSlot')) {
			dragging.classList.add('used');
			droppedOn.innerHTML = '';
			const clone = dragging.querySelector('img').cloneNode(true);
			droppedOn.append(clone);
			//TODO: should also add this unit to the list of materials, etc
		}
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
