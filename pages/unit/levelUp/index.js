import { getCharacters } from '../../../user/characters.js';
import { characterImageGetter } from '../../../visuals/assets/character.js';
import { getCurrentCharCache } from '../../_utils/cache.js';
import { characterDiv } from '../../my-team/components.js';

const pageTitle = 'LEVEL UP';

const attachAllCharacters = async () => {
	const characters = await getCharacters();
	const allCharactersDiv = document.getElementById('all-characters');
	const getCharImage = await characterImageGetter();

	characters.forEach((character) => {
		const characterCard = document.createElement('div');
		characterCard.className = 'character-card';

		characterCard.innerHTML = characterDiv(character, getCharImage);
		characterCard.dataset.displayName = character.displayName;
		characterCard.dataset.mineralCost = character.mineralCost;
		characterCard.dataset.stars = character.stars;
		characterCard.dataset.id = character.id;

		allCharactersDiv.appendChild(characterCard);
	});
};

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

	await attachAllCharacters();

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
