const getNavigateTo = (el) => {
	const permitted = [
		'advent',
		'mainStage',
		'gacha',
		'home',
		'specialStage',
		'upgrade',
		'pass',
		'pvp',
		'gear',
		'my-team',
		'tower',
		'guild',
		'lab'
	];
	return permitted.find((x) => el.classList.contains(x));
};

document.addEventListener('DOMContentLoaded', (event) => {
	document.body.addEventListener('pointerdown', (e) => {
		const navigateTo = getNavigateTo(e.target);
		const src = navigateTo ? `/pages/${navigateTo}/index.html` : undefined;
		if (src) {
			event.stopPropagation();
		}
		window.parent.postMessage({
			_: 'navigate',
			src
		});
	});
});
