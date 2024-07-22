const pageTitle = 'PVP';

const PlayerRow = (player) => {
	const div = document.createElement('div');
	div.classList.add('player');
	div.innerHTML = `
		<div class="rank">${player.i}</div>
		<div class="icon"></div>
		<div class="details">
			<div class="level">U Lv. 24</div>
			<div class="name">username</div>
		</div>
		<div class="trophies">
			<div class="trophyIcon">🏆</div>
			<div class="trophyAmount">199</div>
		</div>
	`;
	return div;
};

const updatePlayersList = async () => {
	const tierPlayers = document.querySelector('.tierPlayers');
	const players = new Array(30).fill();
	for (const [i, player] of Object.entries(players)) {
		tierPlayers.append(
			PlayerRow({
				i: Number(i) + 1,
				...player
			})
		);
	}
};

const setup = async () => {
	await updatePlayersList();
	window.parent.postMessage({
		_: 'stats',
		feathers: true,
		gems: true,
		coins: true,
		friendPoints: false
	});
	window.parent.postMessage({
		_: 'title',
		title: 'PVP',
		visibility: 'visible'
	});
	window.parent.postMessage({ _: 'loaded' });
};

document.addEventListener('DOMContentLoaded', setup);
