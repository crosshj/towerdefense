import { getCharacters } from '../../user/characters.js';
import { getTeams, setTeams } from '../../user/teams.js';
import { setCurrentCharCache } from '../../utils/cache.js';
import { characterImageGetter } from '../../visuals/assets/character.js';
import { attachAllCharacters, attachControls } from './allChars.js';
import { slotDiv } from './components.js';

const saveTeam = async ({ teams }) => {
	const teamSlots = Array.from(document.querySelectorAll('.team-slot')).map(
		(x) => ({ ...x.dataset })
	);
	const selected = document.querySelector(
		'.team-dropdown custom-select'
	).value;
	const current = teams[selected];
	const subTeam = document
		.querySelector('.team-switch .selected')
		.innerText.toLowerCase();

	/* prettier-ignore */
	const newTeam = subTeam === 'a'
		? {
			a: teamSlots,
			b: current.b
		}
		: {
			a: current.a,
			b: teamSlots
		};
	await setTeams({
		[selected]: newTeam,
	});
	teams[selected] = newTeam;
};

const teamSwitcher =
	({ slots, teams, characters, getCharImage }) =>
	() => {
		const subTeam = document
			.querySelector('.team-switch .selected')
			.innerText.toLowerCase();
		const selected = document.querySelector(
			'.team-dropdown custom-select'
		).value;
		const current = teams[selected][subTeam];
		slots.forEach((slot, i) => {
			const char = characters.find((x) => x.id === current[i]?.id);
			if (char) {
				slot.innerHTML = slotDiv(char, getCharImage);
				slot.classList.remove('blank');
				slot.dataset.id = char.id;
			} else {
				slot.classList.add('blank');
				slot.dataset.id = undefined;
			}
		});
		const raidIndicator = document.querySelector('.raid-indicator');
		if (selected === 'Team 1') {
			raidIndicator.classList.remove('hidden');
		} else {
			raidIndicator.classList.add('hidden');
		}
	};

const characterUpdater =
	({ teams }) =>
	() => {
		const charDivs = Array.from(
			document.querySelectorAll('#all-characters .character-card')
		);
		const selected = document.querySelector(
			'.team-dropdown custom-select'
		).value;
		const current = [...teams[selected].a, ...teams[selected].b];
		for (const characterCard of charDivs) {
			if (current.map((x) => x.id).includes(characterCard.dataset.id)) {
				characterCard.classList.add('used');
			} else {
				characterCard.classList.remove('used');
			}
		}
	};

document.addEventListener('DOMContentLoaded', async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);

	let switchTeam, updateCharacters;
	let draggingEl;

	window.parent.postMessage({
		_: 'title',
		title: 'TEAM',
		visibility: 'visible',
	});
	const args = {
		feathers: false,
		gems: true,
		coins: true,
		friendPoints: false,
	};
	window.parent.postMessage({ _: 'stats', ...args });

	let characters = await getCharacters();
	const teams = await getTeams();

	const getCharImage = await characterImageGetter();

	// team switch
	const selectedTeamEl = document.querySelector(
		'.team-dropdown custom-select'
	);
	selectedTeamEl.addEventListener('change', () => {
		switchTeam && switchTeam();
		updateCharacters && updateCharacters();
	});

	const current = teams[selectedTeamEl.value]?.a;
	const all = [
		...teams[selectedTeamEl.value].a,
		...teams[selectedTeamEl.value].b,
	];

	//total
	const totalContainer = document.querySelector(
		'.container .total-characters'
	);
	totalContainer.innerHTML = `TOTAL ${characters.length} / 700`;

	// character list
	const controls = attachControls();
	const isUsed = (char) => {
		return all.map((x) => x.id).includes(char.id);
	};
	attachAllCharacters({
		sortBy: controls.sortBy,
		characters,
		isUsed,
		getCharImage,
		dragStart,
		dragEnd,
		params: {
			...params,
			back: '/pages/my-team/index.html',
		},
	});
	controls.onSort((sortBy) => {
		attachAllCharacters({
			sortBy,
			characters,
			isUsed,
			getCharImage,
			dragStart,
			dragEnd,
			params: {
				...params,
				back: '/pages/my-team/index.html',
			},
		});
	});
	// listens for changes to characters and updates raidTeam
	window.addEventListener('message', async function (event) {
		const { _, ...args } = event.data;
		if (_ === 'broadcastCharactersUpdate') {
			characters = await getCharacters();
			attachAllCharacters({
				sortBy: controls.sortBy,
				characters,
				isUsed,
				getCharImage,
				dragStart,
				dragEnd,
				params: {
					...params,
					back: '/pages/my-team/index.html',
				},
			});
			return;
		}
	});

	//subteam switch
	const teamSwitch = document.querySelector('.team-switch');
	teamSwitch.addEventListener('pointerup', () => {
		const children = Array.from(teamSwitch.children);
		for (const child of children) {
			child.classList.toggle('selected');
		}
		switchTeam && switchTeam();
	});

	const slots = document.querySelectorAll('.team-slot');
	slots.forEach((slot, i) => {
		slot.addEventListener('dragover', dragOver);
		slot.addEventListener('drop', drop);
		const char = characters.find((x) => x.id === current[i]?.id);
		if (char) {
			slot.innerHTML = slotDiv(char, getCharImage);
			slot.classList.remove('blank');
			slot.dataset.id = char.id;
		}
		slot.addEventListener('pointerup', () => {
			if (draggingEl) return;
			if (!slot.dataset.id) return;
			const src = `/modals/character/detail.html?id=${slot.dataset.id}&back=/pages/my-team/index.html`;
			const character = characters.find((x) => x.id === slot.dataset.id);
			setCurrentCharCache({
				...character,
				imageUri: getCharImage(character),
			});
			window.parent.postMessage({
				_: 'navigate',
				src,
			});
		});
	});

	function dragStart(e) {
		const parent = e.target.closest('.character-card');
		if (parent.classList.contains('used')) {
			e.preventDefault();
			return false;
		}
		draggingEl = parent;
		draggingEl.classList.add('dragging');
		draggingEl.id = parent.dataset.id;
	}
	function dragEnd(e) {
		if (!draggingEl) {
			return;
		}
		draggingEl.classList.remove('dragging');
		const droppedOn = document.elementFromPoint(e.clientX, e.clientY);
		drop({
			preventDefault: () => {},
			target: droppedOn,
		});
	}
	function dragOver(e) {
		e.preventDefault();
	}
	async function drop(e) {
		e.preventDefault();
		const slot = e.target.closest('.team-slot');
		draggingEl.classList.remove('dragging');
		const { id } = draggingEl;
		draggingEl = undefined;
		if (!slot) return;
		slot.dataset.id = id;
		const char = characters.find((x) => x.id === id);

		slot.innerHTML = slotDiv(char, getCharImage);
		slot.classList.remove('blank');
		await saveTeam({ teams });
		updateCharacters && updateCharacters();
	}

	switchTeam = teamSwitcher({
		slots,
		teams,
		characters,
		getCharImage,
	});

	updateCharacters = characterUpdater({
		teams,
		characters,
	});

	document.body.addEventListener('pointerup', (event) => {
		// console.log(event.target);
		if (event.target.classList.contains('back-button')) {
			// window.fadingNavigate(params.back || '/');
			// window.history.back();
			window.parent.postMessage({
				_: 'navigate',
				src: params.back,
			});
		}
	});
	window.parent.postMessage({ _: 'loaded' });
});
