document.addEventListener('DOMContentLoaded', async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });

	const rightPane = document.querySelector('.container .content > .right');
	rightPane.innerHTML = `WIP/TODO:<br/> load Team ${params.sub}, Slot ${params.slot}`;

	const closeButton = document.querySelector('.close-button');
	closeButton.addEventListener('pointerdown', () => {
		window.parent.postMessage({
			_: 'navigate'
		});
	});
});
