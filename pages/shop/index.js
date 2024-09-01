import { getCollection } from '../../user/getCollection.js';

document.addEventListener('DOMContentLoaded', async () => {
	window.parent.postMessage({
		_: 'title',
		title: 'SHOP',
		visibility: 'visible',
	});
	const args = {
		feathers: true,
		gems: true,
		coins: true,
		friendPoints: true,
	};
	window.parent.postMessage({ _: 'stats', ...args });

	const chooserEl = document.querySelector('.chooser');
	chooserEl.addEventListener('mousedown', (e) => {
		if (e.target.classList.contains('selected')) return;
		const current = chooserEl.querySelector('.selected');
		current.classList.remove('selected');
		e.target.classList.add('selected');
	});

	window.parent.postMessage({ _: 'loaded' });
});
