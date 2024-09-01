document.addEventListener('DOMContentLoaded', async () => {
	const closeButton = document.querySelector('.close-button');
	closeButton.addEventListener('mousedown', () => {
		window.parent.postMessage({
			_: 'navigate',
		});
	});
});
