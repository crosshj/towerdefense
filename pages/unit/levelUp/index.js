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

	const getCharImage = await characterImageGetter();
	attachAllCharacters({
		sortBy: controls.sortBy,
		characters,
		getCharImage
	});
	controls.onSort((sortBy) => {
		attachAllCharacters({ sortBy, characters, getCharImage });
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
