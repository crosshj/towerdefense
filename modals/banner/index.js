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
		console.log('clicked on document body');
		window.parent.postMessage({
			_: 'navigate'
		});
	});
});
