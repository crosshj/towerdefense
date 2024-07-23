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
	players = players.sort(
		(a, b) => new Date(b.last_login) - new Date(a.last_login)
	);
	for (const [i, player] of Object.entries(players)) {
		tierPlayers.append(
			PlayerRow({
				i: Number(i) + 1,
				...player
			})
		);
	}
};

const updateUserInfo = async () => {
	const user = await getUser();
	console.log({ user });
	const userNameEl = document.querySelector('.userName');
	userNameEl.innerHTML = user.apiUser.name || '---';
	const rankingNumberEl = document.querySelector('.rankingNumber');
	rankingNumberEl.innerHTML = '22';
	const trophiesNumberEl = document.querySelector('.trophiesNumber');
	trophiesNumberEl.innerHTML = '0';
};

const setup = async () => {
	await updateUserInfo();
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
