import { getUserLevelInfo } from '../../utils/experience.js';
import { getUser } from '../../user/user.js';

const pageTitle = 'PVP';

const PlayerRow = (player) => {
	player.levelInfo = getUserLevelInfo(
		player.data.exp || 0,
		player.data.rank || 1
	);
	console.log(player);
	const div = document.createElement('div');
	div.classList.add('player');
	div.innerHTML = `
		<div class="rank">${player.i}</div>
		<div class="icon"></div>
		<div class="details">
			<div class="level">
                <div class="gradeIcon ${player.levelInfo.grade}"></div>
                <span>Lv.</span>
                <span>${player.levelInfo.level}</span>
            </div>
			<div class="name">${player.name}</div>
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
	// const players = new Array(30).fill();
	let players = await fetch(
		'https://datamosh.vercel.app/api/teedee/players'
	).then((x) => x.json());
	players = players
		.filter((x) => typeof x.last_login === 'string')
		.sort((a, b) => new Date(b.last_login) - new Date(a.last_login));
	for (const [i, player] of Object.entries(players)) {
		tierPlayers.append(
			PlayerRow({
				i: Number(i) + 1,
				...player
			})
		);
	}
	return players;
};

function getPlayerPosition(players, playerName) {
	for (let i = 0; i < players.length; i++) {
		if (players[i].name === playerName) {
			return i + 1;
		}
	}
	return -1;
}
const updateUserInfo = async ({ players }) => {
	const user = await getUser();
	user.position = getPlayerPosition(players, user.name);
	console.log({ players, user });
	const userNameEl = document.querySelector('.userName');
	userNameEl.innerHTML = user.name || '---';
	const rankingNumberEl = document.querySelector('.rankingNumber');
	rankingNumberEl.innerHTML = user.position;
	const trophiesNumberEl = document.querySelector('.trophiesNumber');
	trophiesNumberEl.innerHTML = '0';
};

const attachFriendBattle = () => {
	const button = document.querySelector('button.friendBattle');
	button.addEventListener('pointerup', () => {
		const src = `/pages/game/friendBattle/index.html`;
		window.parent.postMessage({ _: 'navigate', src });
	});
};

const setup = async () => {
	const players = await updatePlayersList();
	await updateUserInfo({ players });

	attachFriendBattle();

	window.parent.postMessage({
		_: 'stats',
		feathers: true,
		gems: true,
		coins: true,
		friendPoints: false
	});
	window.parent.postMessage({
		_: 'title',
		title: pageTitle,
		visibility: 'visible'
	});
	window.parent.postMessage({ _: 'loaded' });
};

document.addEventListener('DOMContentLoaded', setup);
