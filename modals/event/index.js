document.addEventListener('DOMContentLoaded', async () => {
	const chooserEl = document.querySelector('.chooser');
	const itemsListEl = document.querySelector('.items-list');
	chooserEl.addEventListener('mousedown', (e) => {
		if (e.target.classList.contains('selected')) return;
		const current = chooserEl.querySelector('.selected');
		current.classList.remove('selected');
		e.target.classList.add('selected');

		const currentPane = itemsListEl.querySelector('.selected');
		currentPane.classList.remove('selected');
		const newPane = itemsListEl.querySelector(
			`.tab-pane.${e.target.dataset.tab}`
		);
		newPane.classList.add('selected');
	});

	const closeButton = document.querySelector('.close-button');
	closeButton.addEventListener('mousedown', () => {
		window.parent.postMessage({
			_: 'navigate'
		});
	});
});