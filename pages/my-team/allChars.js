import { SVGIcons } from '../../assets/icons.svg.js';
import {
	getUnitsFilterCache,
	setCurrentCharCache,
	setUnitsFilterCache,
} from '../../utils/cache.js';
import { characterDiv } from './index.components.js';
import {
	attachTap,
	handlePointerEvents,
	removeTap,
} from './handlePointerEvents.js';
import { EmptyList } from './allChars.components.js';

const useSavedSort = () => {
	const sortBy = localStorage.getItem('ALL_CHARS_SORT_BY') || 'latestDown';
	return sortBy;
};

const icons = {
	notEqual: SVGIcons.notEqual(),
	refresh: SVGIcons.refresh(),
};

const attachFilterUpdateListener = ({ state }) => {
	// listens for changes to filter
	window.addEventListener('message', async function (event) {
		const { _, ...args } = event.data;
		if (_ === 'broadcastUnitFilterUpdate') {
			state.filter = getUnitsFilterCache();
			await state.onFilterHandler(state);
			return;
		}
	});
};

const attachHorizontalScroll = (scrollable) => {
	// mouse wheel
	scrollable.addEventListener('wheel', (e) => {
		e.preventDefault();
		scrollable.scrollLeft += e.deltaY;
	});

	//dragging
	let pointerFrom;
	let elementFrom;
	const onDrag = (event) => {
		scrollable.scrollLeft = elementFrom - event.clientX + pointerFrom;
	};
	scrollable.addEventListener('pointerdown', (event) => {
		if (
			event.target.classList.contains('icon') &&
			!event.target.classList.contains('used')
		)
			return;
		if (event.pointerType !== 'mouse') return;
		pointerFrom = event.clientX;
		elementFrom = scrollable.scrollLeft;
		document.addEventListener('pointermove', onDrag);
	});
	document.addEventListener('pointerup', (event) => {
		document.removeEventListener('pointermove', onDrag);
	});
};

export const attachAllCharacters = (args) => {
	const {
		characters,
		controlsState,
		getCharImage,
		dragStart,
		dragEnd,
		isUsed,
		params,
	} = args;

	const { filter = [], sortBy } = controlsState;

	const allCharactersDiv = document.getElementById('all-characters');
	allCharactersDiv.innerHTML = '';
	attachHorizontalScroll(allCharactersDiv);

	let sorted = [];

	// FILTER
	const $f = filter.join(',');
	const filters = {};
	if ($f.includes('element-')) {
		filters.element = (char) =>
			$f.includes(`element-${char.element.toLowerCase()}`);
	}
	if ($f.includes('lock-')) {
		filters.lock = (char) =>
			$f.includes(`lock-${char.locked ? 'locked' : 'unlocked'}`);
	}
	if ($f.includes('type-')) {
		filters.type = (char) => $f.includes(`type-${char.type.toLowerCase()}`);
	}
	if ($f.includes('grade-')) {
		filters.grade = (char) => $f.includes(`grade-${char.rank}`);
	}

	for (const [i, char] of Object.entries(characters)) {
		const matches = Object.values(filters).every((filterFunc) =>
			filterFunc(char)
		);
		if (!matches) continue;
		sorted.push(char);
	}

	// SORT

	//latest
	if (sortBy === 'latestUp') {
		//;
	}
	if (sortBy === 'latestDown') {
		sorted.reverse();
	}
	//grade
	if (sortBy === 'gradeUp') {
		sorted.sort((a, b) => {
			if (a.rank === b.rank) return b.code.localeCompare(a.code);
			return a.rank - b.rank;
		});
	}
	if (sortBy === 'gradeDown') {
		sorted.sort((a, b) => {
			if (a.rank === b.rank) return a.code.localeCompare(b.code);
			return b.rank - a.rank;
		});
	}
	//level
	if (sortBy === 'levelUp') {
		sorted.sort((a, b) => {
			if (a.level === b.level) return b.code.localeCompare(a.code);
			return a.level - b.level;
		});
	}
	if (sortBy === 'levelDown') {
		sorted.sort((a, b) => {
			if (a.level === b.level) return a.code.localeCompare(b.code);
			return b.level - a.level;
		});
	}
	//mineral
	if (sortBy === 'mineralUp') {
		sorted.sort((a, b) => {
			if (a.mineralCost === b.mineralCost)
				return b.code.localeCompare(a.code);
			return a.mineralCost - b.mineralCost;
		});
	}
	if (sortBy === 'mineralDown') {
		sorted.sort((a, b) => {
			if (a.mineralCost === b.mineralCost)
				return a.code.localeCompare(b.code);
			return b.mineralCost - a.mineralCost;
		});
	}

	const listIsEmpty = EmptyList({
		filter,
		sorted,
		icons,
		allCharactersDiv,
		setUnitsFilterCache,
	});
	if (listIsEmpty) return;

	sorted.forEach((character) => {
		const characterCard = document.createElement('div');
		characterCard.className = 'character-card';

		characterCard.innerHTML = characterDiv(character, getCharImage);
		characterCard.dataset.displayName = character.displayName;
		characterCard.dataset.mineralCost = character.mineralCost;
		characterCard.dataset.stars = character.stars;
		characterCard.dataset.id = character.id;

		const charUsed = typeof isUsed === 'function' && isUsed(character);
		if (charUsed) {
			characterCard.classList.add('used');
		}
		const charIcon = characterCard.querySelector('.icon');
		charUsed && charIcon.classList.add('used');

		if (dragStart && dragEnd) {
			handlePointerEvents({
				element: charIcon,
				onTap: () => {
					const src = `/modals/character/detail.html?id=${character.id}&back=${params?.back || ''}`;
					setCurrentCharCache({
						...character,
						imageUri: getCharImage(character),
					});
					window.parent.postMessage({
						_: 'navigate',
						src,
					});
				},
				onDragStart: dragStart,
				onDragEnd: dragEnd,
			});
		}
		allCharactersDiv.appendChild(characterCard);
	});
};

export const attachControls = () => {
	const state = {
		sameUnit: false,
		filter: getUnitsFilterCache(),
		sortBy: useSavedSort(),
	};

	state.onSortHandler = () => {
		console.log('no onSortHandler set');
	};
	state.onFilterHandler = () => {
		console.log('no onFilterHandler set');
	};
	const allCharactersDiv = document.getElementById('all-characters');
	const controlsDiv = document.querySelector('.container > .controls');
	const filterButton = controlsDiv.querySelector('.filter');
	const sortByButton = controlsDiv.querySelector('.sortBy');

	if (filterButton) {
		attachFilterUpdateListener({ state });
		filterButton.addEventListener('pointerdown', () => {
			window.parent.postMessage({
				_: 'navigate',
				src: '/modals/unitsFilter/index.html',
			});
		});
	}

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
			'Mineral ▲',
			// 'Tower P ▲',
			// 'Potential ▲'
		];
		sortByDiv.innerHTML = `
			<div class="sortByContainer">
				${sortOptions
					.map((x, i) =>
						innerTextToKey(x) === state.sortBy
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
			state.sortBy = key;
			state.onSortHandler(state);
		});
	}

	const sameUnitButton = document.querySelector('.sameUnit');
	if (sameUnitButton) {
		sameUnitButton.addEventListener('pointerdown', (e) => {
			e.target.classList.toggle('selected');
			state.sameUnit = !state.sameUnit;
			state.onSortHandler(state);
		});
	}

	const sellingListAdd = ({ card, sellingList, sellingCountAmount }) => {
		const { id } = card.dataset;
		const matchingEl = sellingList.querySelector(`[data-id='${id}']`);
		if (matchingEl) {
			return;
		}

		sellingCountAmount.innerText = Number(sellingCountAmount.innerText) + 1;

		const level = card.querySelector(
			'.details .level div:last-child'
		).innerText;
		const stars = card.querySelector('.stars').innerText;
		const image = card.querySelector('.info .icon img').src;

		const el = document.createElement('div');
		el.classList.add('sellingListCard');
		el.dataset.id = id;
		el.innerHTML = `
			<div class="sellingListLevel">Lv. ${level}</div>
			<div class="sellingListContainer">
				<div class="sellingListStars">${stars}</div>
				<div class="sellingListThumbnail">
					<img src="${image}"></img>
				</div>
			</div>
		`;
		sellingList.append(el);
	};
	const sellingListRemove = ({ card, sellingList, sellingCountAmount }) => {
		const { id } = card.dataset;
		const matchingEl = sellingList.querySelector(`[data-id='${id}']`);
		if (!matchingEl) {
			return;
		}
		sellingCountAmount.innerText = Number(sellingCountAmount.innerText) - 1;
		matchingEl.remove();
	};
	const sellingListGetIds = () => {
		const selectedToSell = Array.from(
			document.querySelectorAll('.sellingListCard')
		).map((x) => x.dataset.id);
		return selectedToSell;
	};

	const sellButton = document.querySelector('.sell');
	const selectAllButton = document.querySelector('.selectAll');
	const sellingContainer = document.querySelector('.sellingContainer');

	const sellUnits = async ({ clearAllCharsSellMode }) => {
		const sell = sellingListGetIds();
		const unitsString = JSON.stringify(sell);
		const src = `/modals/sellUnits/index.html?units=${unitsString}`;
		window.parent.postMessage({ _: 'navigate', src });

		const saleCompleteHandler = function (event) {
			const saleComplete = 'broadcastSaleComplete' === event?.data?._;
			const saleCanceled = 'broadcastSaleCanceled' === event?.data?._;
			if (!saleCanceled && !saleComplete) return;
			window.removeEventListener('message', saleCompleteHandler);
			if (saleCanceled) return;
			clearAllCharsSellMode && clearAllCharsSellMode();
		};
		window.addEventListener('message', saleCompleteHandler);
	};

	if (sellButton) {
		let clearAllCharsSellMode;
		sellButton.addEventListener('pointerdown', (e) => {
			if (sellButton.classList.contains('selected')) {
				sellUnits({ clearAllCharsSellMode });
				return;
			}
			if (selectAllButton) {
				selectAllButton.classList.remove('hidden');
			}
			sellButton.classList.add('selected');
			sellingContainer.classList.toggle('hidden');
			sellingContainer.innerHTML = `
				<div class="closeButton">X</div>
				<div class="sellingCount">
					<div class="sellingCountLabel">SELECT:</div>
					<div class="sellingCountAmount">0</div>
				</div>
				<div class="sellingList"></div>
			`;
			const sellingList = sellingContainer.querySelector('.sellingList');
			const sellingCountAmount = sellingContainer.querySelector(
				'.sellingCountAmount'
			);
			const selectForSellHandler = (e) => {
				e.preventDefault();
				e.stopPropagation();
				const card = e.target.classList.contains('character-card')
					? e.target
					: e.target.closest('.character-card');
				if (!card) return;
				if (card.classList.contains('used')) {
					return;
				}
				if (card.querySelector('.selectorInfo.locked')) {
					return;
				}
				if (card.classList.contains('selectedForSell')) {
					sellingListRemove({
						card,
						sellingList,
						sellingCountAmount,
					});
				} else {
					sellingListAdd({ card, sellingList, sellingCountAmount });
				}
				card.classList.toggle('selectedForSell');
			};

			if (selectAllButton) {
				selectAllButton.addEventListener('pointerdown', () => {
					const unused = Array.from(
						document.querySelectorAll('.character-card:not(.used)')
					);
					const selectable = unused.filter(
						(x) => !x.querySelector('.selectorInfo.locked')
					);
					for (const card of selectable) {
						card.classList.add('selectedForSell');
						sellingListAdd({
							card,
							sellingList,
							sellingCountAmount,
						});
					}
				});
			}

			clearAllCharsSellMode = () => {
				if (selectAllButton) {
					selectAllButton.classList.add('hidden');
				}
				sellingContainer.innerHTML = '';
				sellButton.classList.remove('selected');
				sellingContainer.classList.add('hidden');

				const allChars = Array.from(
					document.querySelectorAll('.character-card')
				);
				for (const card of allChars) {
					card.classList.remove('selectedForSell');
				}

				allCharactersDiv.classList.remove('sellMode');
				removeTap(allCharactersDiv);
			};

			const closeButton = sellingContainer.querySelector('.closeButton');
			closeButton.addEventListener('pointerdown', () => {
				clearAllCharsSellMode && clearAllCharsSellMode();
			});

			allCharactersDiv.classList.add('sellMode');
			attachTap(allCharactersDiv, selectForSellHandler);
		});
	}
	return {
		state,
		onSort: (fn) => {
			state.onSortHandler = fn;
		},
		onFilter: (fn) => {
			state.onFilterHandler = fn;
		},
	};
};
