import { setCurrentCharCache } from '../_utils/cache.js';
import { characterDiv } from './components.js';
import { handlePointerEvents } from './handlePointerEvents.js';

const useSavedSort = () => {
	const sortBy = localStorage.getItem('ALL_CHARS_SORT_BY') || 'latestDown';
	return sortBy;
};

export const attachAllCharacters = (args) => {
	const { characters, sortBy, getCharImage, dragStart, dragEnd, isUsed } =
		args;

	const allCharactersDiv = document.getElementById('all-characters');
	allCharactersDiv.innerHTML = '';

	let sorted = [...characters];

	//latest
	if (sortBy === 'latestUp') {
		sorted.sort((a, b) => Number(b.id[0]) - Number(a.id[0]));
	}
	if (sortBy === 'latestDown') {
		sorted.sort((a, b) => Number(a.id[0]) - Number(b.id[0]));
	}
	//grade
	if (sortBy === 'gradeUp') {
		sorted.sort((a, b) => a.rank - b.rank);
	}
	if (sortBy === 'gradeDown') {
		sorted.sort((a, b) => b.rank - a.rank);
	}
	//level
	if (sortBy === 'levelUp') {
		sorted.sort((a, b) => a.level - b.level);
	}
	if (sortBy === 'levelDown') {
		sorted.sort((a, b) => b.level - a.level);
	}
	//mineral
	if (sortBy === 'mineralUp') {
		sorted.sort((a, b) => a.mineralCost - b.mineralCost);
	}
	if (sortBy === 'mineralDown') {
		sorted.sort((a, b) => b.mineralCost - a.mineralCost);
	}

	sorted.forEach((character) => {
		const characterCard = document.createElement('div');
		characterCard.className = 'character-card';

		characterCard.innerHTML = characterDiv(character, getCharImage);
		characterCard.dataset.displayName = character.displayName;
		characterCard.dataset.mineralCost = character.mineralCost;
		characterCard.dataset.stars = character.stars;
		characterCard.dataset.id = character.id;

		if (typeof isUsed === 'function' && isUsed(character)) {
			characterCard.classList.add('used');
		}

		if (dragStart && dragEnd) {
			const charIcon = characterCard.querySelector('.icon');
			handlePointerEvents({
				element: charIcon,
				onTap: () => {
					const src = `/modals/character/detail.html?id=${character.id}`;
					setCurrentCharCache({
						...character,
						imageUri: getCharImage(character)
					});
					window.parent.postMessage({
						_: 'navigate',
						src
					});
				},
				onDragStart: dragStart,
				onDragEnd: dragEnd
			});
		}
		allCharactersDiv.appendChild(characterCard);
	});
};

export const attachControls = () => {
	const sortBy = useSavedSort();

	let onSortHandler = () => {
		console.log('no onSortHandler set');
	};
	const controlsDiv = document.querySelector('.container > .controls');
	const sortByButton = controlsDiv.querySelector('.sortBy');

	const innerTextToKey = (innerText = '') => {
		return innerText
			.toLowerCase()
			.replace('tower p', 'towerP')
			.replace(' ▼', 'Down')
			.replace(' ▲', 'Up');
	};

	if (sortByButton) {
		const sortByDiv = document.createElement('div');
		sortByDiv.classList.add('sortBySelector', 'hidden');
		const sortOptions = [
			'Latest ▼',
			'Grade ▼',
			'Level ▼',
			'Mineral ▼',
			// 'Tower P ▼',
			// 'Potential ▼',
			'Latest ▲',
			'Grade ▲',
			'Level ▲',
			'Mineral ▲'
			// 'Tower P ▲',
			// 'Potential ▲'
		];
		sortByDiv.innerHTML = `
			<div class="sortByContainer">
				${sortOptions
					.map((x, i) =>
						innerTextToKey(x) === sortBy
							? `<div class="active">${x}</div>`
							: `<div>${x}</div>`
					)
					.join('\n')}
			</div>
		`;
		const options = Array.from(
			sortByDiv.querySelectorAll('.sortByContainer > div')
		);
		controlsDiv.append(sortByDiv);
		sortByButton.addEventListener('pointerup', () => {
			sortByButton.classList.toggle('selected');
			sortByDiv.classList.toggle('hidden');
		});
		sortByDiv.addEventListener('pointerdown', (e) => {
			for (const opt of options) {
				opt.classList.remove('active');
			}
			e.target.classList.add('active');
			const key = innerTextToKey(e.target.innerText);
			localStorage.setItem('ALL_CHARS_SORT_BY', key);

			sortByButton.classList.toggle('selected');
			sortByDiv.classList.toggle('hidden');
			onSortHandler(key);
		});
	}
	return {
		sortBy,
		onSort: (fn) => {
			onSortHandler = fn;
		}
	};
};
