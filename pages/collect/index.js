import { getCollection } from '../../user/getCollection.js';

const pageTitle = 'COLLECTION';

const buildCollectionList = async (collected) => {
	const listEl = document.querySelector('.collection-list');
	const mapItem = (i) => {
		const className = ['unit', i.collected ? 'collected' : '']
			.filter((x) => !!x)
			.join(' ');
		return `
			<div class="${className}">
				<img src="${i.image}" />	
			</div>
		`;
	};
	listEl.innerHTML = collected.reverse().map(mapItem).join('\n');
};

const domLoaded = async () => {
	const collected = await getCollection();
	console.log(collected);

	window.parent.postMessage({
		_: 'title',
		title: pageTitle,
		visibility: 'visible',
	});
	const args = {
		feathers: false,
		gems: true,
		coins: false,
		friendPoints: false,
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
};

document.addEventListener('DOMContentLoaded', domLoaded);
