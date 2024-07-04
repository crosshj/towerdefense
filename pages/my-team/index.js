import { getCharacters } from '../../user/getCharacters.js';
import { getTeams, setTeams } from '../../user/teams.js';
import { characterImageGetter } from '../../visuals/assets.character.js';

const characterDiv = (c, getCharImage) => {
	return `
		<div class="stars">
			${'★'.repeat(c.stars)}
		</div>
		<div class="info">
			<div class="icon">
				<img src="${getCharImage(c)}">
			</div>
			<div class="details">
				<div class="name">
					${c.displayName}
				</div>
				<div class="level flex space-between">
					<div>Lv.</div>
					<div>${c.level}</div>
				</div>
				<div class="mineral flex space-between">
					<div class="mineral-icon">▲</div>
					<div>${c.mineralCost}</div>
				</div>
			</div>
		</div>
	`;
};
const slotDiv = (c, getCharImage) => {
	return `
			<div class="icon">
				<img src="${getCharImage(c)}">
			</div>
			<div class="base">
				<div class="cylinder"></div>
				<div class="stars">
					${'★'.repeat(c.stars)}
				</div>
			</div>
			<div class="mineral flex space-between">
				<div class="mineral-icon">▲</div>
				<div>${c.mineralCost}</div>
			</div>
		`;
};

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
	console.log({ newTeam, oldTeam: teams[selected] });
	await setTeams({
		[selected]: newTeam
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
	let switchTeam, updateCharacters;
	window.parent.postMessage({
		_: 'title',
		title: 'TEAM',
		visibility: 'visible'
	});
	const args = {
		feathers: false,
		gems: true,
		coins: true,
		friendPoints: false
	};
	window.parent.postMessage({ _: 'stats', ...args });

	const characters = await getCharacters();
	const allCharactersDiv = document.getElementById('all-characters');
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
		...teams[selectedTeamEl.value].b
	];

	characters.forEach((character) => {
		const characterCard = document.createElement('div');
		characterCard.className = 'character-card';
		if (all.map((x) => x.id).includes(character.id)) {
			characterCard.classList.add('used');
		}
		characterCard.innerHTML = characterDiv(character, getCharImage);
		characterCard.dataset.displayName = character.displayName;
		characterCard.dataset.mineralCost = character.mineralCost;
		characterCard.dataset.stars = character.stars;
		characterCard.dataset.id = character.id;

		const charIcon = characterCard.querySelector('.icon');
		charIcon.draggable = true;
		charIcon.addEventListener('dragstart', dragStart);
		charIcon.addEventListener('dragend', dragEnd);
		allCharactersDiv.appendChild(characterCard);
	});

	//total
	const totalContainer = document.querySelector(
		'.container .total-characters'
	);
	totalContainer.innerHTML = `TOTAL ${characters.length} / 700`;

	//subteam switch
	const teamSwitch = document.querySelector('.team-switch');
	teamSwitch.addEventListener('mousedown', () => {
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
	});

	let draggingEl;
	function dragStart(e) {
		const parent = e.target.closest('.character-card ');
		if (parent.classList.contains('used')) {
			e.preventDefault();
			return false;
		}
		draggingEl = parent;
		draggingEl.classList.add('dragging');
		e.dataTransfer.setData('displayName', parent.dataset.displayName);
		e.dataTransfer.setData('mineralCost', parent.dataset.mineralCost);
		e.dataTransfer.setData('stars', parent.dataset.stars);
		e.dataTransfer.setData('id', parent.dataset.id);
		const dragImage = parent.querySelector('.icon img').cloneNode(true);
		dragImage.style.zoom = 1;
		// const img = new Image();
		// img.src = '/assets/teamDragImage.png';
		e.dataTransfer.setDragImage(dragImage, 75 / 2, 40);
	}
	function dragEnd() {
		if (!draggingEl) {
			return;
		}
		draggingEl.classList.remove('dragging');
	}
	function dragOver(e) {
		e.preventDefault();
	}
	async function drop(e) {
		e.preventDefault();
		const slot = e.target.closest('.team-slot');
		draggingEl.classList.remove('dragging');
		// draggingEl.classList.add('used');
		draggingEl = undefined;
		const name = e.dataTransfer.getData('displayName');
		const mineralCost = e.dataTransfer.getData('mineralCost');
		const stars = e.dataTransfer.getData('stars');
		slot.dataset.id = e.dataTransfer.getData('id');
		const char = {
			displayName: name,
			stars,
			mineralCost
		};
		slot.innerHTML = slotDiv(char, getCharImage);
		slot.classList.remove('blank');
		await saveTeam({ teams });
		updateCharacters && updateCharacters();
	}

	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);

	switchTeam = teamSwitcher({
		slots,
		teams,
		characters,
		getCharImage
	});

	updateCharacters = characterUpdater({
		teams,
		characters
	});

	document.body.addEventListener('mousedown', (event) => {
		// console.log(event.target);
		if (event.target.classList.contains('back-button')) {
			// window.fadingNavigate(params.back || '/');
			// window.history.back();
			window.parent.postMessage({
				_: 'navigate',
				src: params.back
			});
		}
	});
	window.parent.postMessage({ _: 'loaded' });
});
