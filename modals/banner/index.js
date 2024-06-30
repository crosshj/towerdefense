document.addEventListener('DOMContentLoaded', async () => {
	const closeButton = document.querySelector('.close-button');
	closeButton.addEventListener('mousedown', (e) => {
		e.preventDefault();
		e.stopPropagation();
		window.parent.postMessage({
			_: 'navigate'
		});
	});
	document.body.addEventListener('mousedown', () => {
		window.parent.postMessage({
			_: 'navigate'
		});
	});
});
