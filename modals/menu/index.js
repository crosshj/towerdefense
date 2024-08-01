/*

mainStage
gacha
home
specialStage
upgrade
mission
pvp
gear
my-team
tower
guild
lab

*/

const getNavigateTo = (el) => {
	const permitted = [
		'mainStage',
		// 'gacha',
		'home',
		'specialStage',
		'upgrade',
		// 'mission',
		'pvp',
		// 'gear',
		'my-team',
		'tower',
		'guild',
		'lab'
	];
	return permitted.find((x) => el.classList.contains(x));
};

document.addEventListener('DOMContentLoaded', async () => {
	document.body.addEventListener('pointerup', (e) => {
		const navigateTo = getNavigateTo(e.target);
		const src = navigateTo ? `/pages/${navigateTo}/index.html` : undefined;
		window.parent.postMessage({
			_: 'navigate',
			src
		});
	});
});
