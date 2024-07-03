import { getCharacters } from '../../user/getCharacters.js';
import { getTeams, setTeams } from '../../user/teams.js';

const saveTeam = async ({ teams }) => {
	const teamSlots = Array.from(document.querySelectorAll('.team-slot')).map(
		(x) => ({ ...x.dataset })
	);
	const selected = document.querySelector('.team-dropdown select').value;
	const current = teams[selected];
	await setTeams({
		[selected]: {
			a: teamSlots,
			b: current.b
		}
	});
};

document.addEventListener('DOMContentLoaded', async () => {
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
	console.log({ teams });

	const selected = document.querySelector('.team-dropdown select').value;
	const current = teams[selected]?.a;

	characters.forEach((character) => {
		const characterCard = document.createElement('div');
		characterCard.className = 'character-card';
		if (current.map((x) => x.id).includes(character.id)) {
			characterCard.classList.add('used');
		}
		characterCard.innerHTML = `
			<div class="icon"></div>
			<div class="details">
				${character.displayName}
				<br>
				Lv. ${character.level}
				<br />
				${'★'.repeat(character.stars)}
			</div>
		`;
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

	const slots = document.querySelectorAll('.team-slot');

	slots.forEach((slot, i) => {
		slot.addEventListener('dragover', dragOver);
		slot.addEventListener('drop', drop);
		const char = characters.find((x) => x.id === current[i]?.id);
		if (char) {
			slot.innerHTML = `
				${char.displayName}
				<br>
				Mineral: ${char.mineralCost}
				<br>
				Stars: ${'★'.repeat(char.stars)}
			`;
			slot.classList.remove('blank');
			slot.dataset.id = char.id;
		}
	});

	let draggingEl;
	function dragStart(e) {
		const parent = e.target.parentNode;
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
		const img = new Image();
		img.src = '/assets/teamDragImage.png';
		e.dataTransfer.setDragImage(img, 75 / 2, 40);
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
	function drop(e) {
		e.preventDefault();
		draggingEl.classList.remove('dragging');
		draggingEl.classList.add('used');
		draggingEl = undefined;
		const name = e.dataTransfer.getData('displayName');
		const mineralCost = e.dataTransfer.getData('mineralCost');
		const stars = e.dataTransfer.getData('stars');
		e.target.dataset.id = e.dataTransfer.getData('id');
		e.target.innerHTML = `${name}<br>Mineral: ${mineralCost}<br>Stars: ${'★'.repeat(
			stars
		)}`;
		e.target.classList.remove('blank');
		saveTeam({ teams });
	}

	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);

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
