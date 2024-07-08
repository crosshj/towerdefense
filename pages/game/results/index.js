document.addEventListener('DOMContentLoaded', async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });

	window.parent.postMessage({
		_: 'stats',
		feathers: false,
		gems: false,
		coins: false,
		friendPoints: false
	});
	window.parent.postMessage({
		_: 'title',
		title: '',
		visibility: 'hidden'
	});

	document.body.addEventListener('mousedown', () => {
		window.parent.postMessage({
			_: 'navigate',
			src: '/pages/mainStage/index.html'
		});
	});

	window.parent.postMessage({ _: 'loaded' });
});
