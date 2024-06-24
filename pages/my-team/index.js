import { getCharacters } from '../../user/getCharacters.js';
import { statsElement } from '../../visuals/stats/stats.js';

document.addEventListener('DOMContentLoaded', async () => {
	const characters = await getCharacters();
	const allCharactersDiv = document.getElementById('all-characters');

	const statsContainer = document.querySelector('.container .currency');
	statsElement({
		container: statsContainer,
		feathers: false,
		friendPoints: false
	});

	characters.forEach((character) => {
		const characterCard = document.createElement('div');
		characterCard.className = 'character-card';
		characterCard.draggable = true;
		characterCard.innerHTML = `${character.displayName}<br>Lv. ${
			character.level
		}<br />${'★'.repeat(character.stars)}`;
		characterCard.dataset.displayName = character.displayName;
		characterCard.dataset.mineralCost = character.mineralCost;
		characterCard.dataset.stars = character.stars;
		characterCard.addEventListener('dragstart', dragStart);
		characterCard.addEventListener('touchstart', touchStart, {
			passive: true
		});
		allCharactersDiv.appendChild(characterCard);
	});

	//total
	const totalContainer = document.querySelector(
		'.container .total-characters'
	);
	totalContainer.innerHTML = `TOTAL ${characters.length} / 700`;

	const slots = document.querySelectorAll('.team-slot');

	slots.forEach((slot) => {
		slot.addEventListener('dragover', dragOver);
		slot.addEventListener('drop', drop);
		slot.addEventListener('touchmove', touchMove, { passive: false });
		slot.addEventListener('touchend', touchEnd, { passive: true });
	});

	function dragStart(e) {
		console.log('drag started');
		e.dataTransfer.setData('text/plain', e.target.innerHTML);
		e.dataTransfer.setData('mineralCost', e.target.dataset.mineralCost);
		e.dataTransfer.setData('stars', e.target.dataset.stars);
	}

	function dragOver(e) {
		e.preventDefault();
	}

	function drop(e) {
		e.preventDefault();
		const data = e.dataTransfer.getData('text');
		const mineralCost = e.dataTransfer.getData('mineralCost');
		const stars = e.dataTransfer.getData('stars');
		e.target.innerHTML = `${data}<br>Mineral Cost: ${mineralCost}<br>Stars: ${'★'.repeat(
			stars
		)}`;
	}

	let touchCharacterCard = null;

	function touchStart(e) {
		console.log('touch started');
		touchCharacterCard = e.target;
	}

	function touchMove(e) {
		e.preventDefault();
	}

	function touchEnd(e) {
		if (!touchCharacterCard) return;
		const displayName = touchCharacterCard.dataset.displayName;
		const mineralCost = touchCharacterCard.dataset.mineralCost;
		const stars = touchCharacterCard.dataset.stars;
		e.target.innerHTML = `${displayName}<br />${'★'.repeat(
			stars
		)}<br />${mineralCost}`;
		e.target.classList.remove('blank');
		touchCharacterCard = null;
	}

	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);

	document.body.addEventListener('mousedown', (event) => {
		// console.log(event.target);
		if (event.target.classList.contains('back-button')) {
			window.fadingNavigate(params.back || '/');
		}
	});
});
