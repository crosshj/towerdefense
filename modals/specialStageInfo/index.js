const domLoaded = async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });

	const closeButton = document.querySelector('#closeButton');
	closeButton.addEventListener('pointerdown', () => {
		window.parent.postMessage({
			_: 'navigate',
		});
	});
};

document.addEventListener('DOMContentLoaded', domLoaded);
