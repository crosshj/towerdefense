document.addEventListener('DOMContentLoaded', async () => {
	document.body.addEventListener('pointerup', () => {
		window.parent.postMessage({
			_: 'navigate'
		});
	});
});
