import { getCollection } from '../../user/getCollection.js';

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

	window.parent.postMessage({
		_: 'title',
		title: 'UPGRADE',
		visibility: 'visible'
	});
	const args = {
		feathers: false,
		gems: true,
		coins: false,
		friendPoints: false
	};
	window.parent.postMessage({ _: 'stats', ...args });

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

	window.parent.postMessage({ _: 'loaded' });
});
