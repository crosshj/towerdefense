import { getCharacters } from '../../user/getCharacters.js';
import { getCollection } from '../../user/getCollection.js';
import { statsElement } from '../../visuals/stats/stats.js';

const buildCollectionList = async (collected) => {
	const listEl = document.querySelector('.collection-list');
	const mapItem = (i) => {
		const className = ['unit', i.collected ? 'collected' : '']
			.filter((x) => !!x)
			.join(' ');
		return `<div class="${className}"></div>`;
	};
	listEl.innerHTML = collected.map(mapItem).join('\n');
};

document.addEventListener('DOMContentLoaded', async () => {
	const collected = await getCollection();

	const statsContainer = document.querySelector('.container .currency');
	statsElement({
		container: statsContainer,
		feathers: false,
		friendPoints: false,
		coins: false
	});

	const chooserEl = document.querySelector('.chooser');
	chooserEl.addEventListener('mousedown', (e) => {
		if (e.target.classList.contains('selected')) return;
		const current = chooserEl.querySelector('.selected');
		current.classList.remove('selected');
		e.target.classList.add('selected');
	});

	const totalEl = document.querySelector('.sub-header .total');
	const totalCollected = collected.filter((x) => x.collected);
	totalEl.innerHTML = `${totalCollected.length} / ${collected.length}`;

	await buildCollectionList(collected);

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
