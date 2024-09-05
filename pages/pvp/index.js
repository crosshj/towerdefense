import { getUserLevelInfo } from '../../utils/experience.js';
import { getUser } from '../../user/user.js';
import { SVGIcons } from '../../assets/icons.svg.js';
import { getDefenseTeam } from '../../user/pvp.js';
import { setOpponentTeamCache } from '/utils/cache.js';
import { userIconsMap } from '../../assets/userIcons/$map.js';

const pageTitle = 'PVP';

const PlayerRow = (player) => {
	player.levelInfo = getUserLevelInfo(
		player.data.exp || 0,
		player.data.rank || 1
	);
	const div = document.createElement('div');
	div.classList.add('player');
	div.dataset.index = player.i;
	div.innerHTML = `
		<div class="rank">${player.i}</div>
		<div class="icon">
			<img src="${player.image}" >
		</div>
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
	//NOTE: click handler is in "attachActions: tierPlayers"
	const tierPlayers = document.querySelector('.tierPlayers');
	// const players = new Array(30).fill();
	let players = await fetch(
		'https://datamosh.vercel.app/api/teedee/players'
	).then((x) => x.json());
	players = players
		.filter((x) => typeof x.last_login === 'string')
		.sort((a, b) => new Date(b.last_login) - new Date(a.last_login));
	const imageMap = userIconsMap();
	for (const [i, player] of Object.entries(players)) {
		tierPlayers.append(
			PlayerRow({
				i: Number(i) + 1,
				image: imageMap[player?.data?.image || 0],
				...player,
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
	//console.log({ players, user });
	const userNameEl = document.querySelector('.userName');
	userNameEl.innerHTML = user.name || '---';

	const rankingIconEl = document.querySelector('.rankingIcon');
	rankingIconEl.innerHTML = SVGIcons.ranking();
	const rankingNumberEl = document.querySelector('.rankingNumber');
	rankingNumberEl.innerHTML = user.position;

	const trophiesIconEl = document.querySelector('.trophiesIcon');
	trophiesIconEl.innerHTML = SVGIcons.trophy();
	const trophiesNumberEl = document.querySelector('.trophiesNumber');
	trophiesNumberEl.innerHTML = '0';
};

const attachActions = ({ players }) => {
	const back = '/pages/pvp/';
	const friendBattle = document.querySelector('button.friendBattle');
	friendBattle.addEventListener('pointerup', () => {
		const src = `/pages/game/friendBattle/`;
		window.parent.postMessage({ _: 'navigate', src });
	});
	const record = document.querySelector('button.record');
	record.addEventListener('pointerup', () => {
		const src = `/pages/_wip/index.html?which=pvpRecord&back=${back}`;
		window.parent.postMessage({ _: 'navigate', src });
	});
	const defenders = document.querySelector('button.defenders');
	defenders.addEventListener('pointerup', () => {
		const src = `/pages/_wip/index.html?which=defenders&back=${back}`;
		window.parent.postMessage({ _: 'navigate', src });
	});
	const swapShop = document.querySelector('button.swapShop');
	swapShop.addEventListener('pointerup', () => {
		const src = `/pages/swapShop/index.html?selectedTab=gem&back=${back}`;
		window.parent.postMessage({ _: 'navigate', src });
	});
	const battle = document.querySelector('button.battle');
	battle.addEventListener('pointerup', () => {
		const src = `/pages/_wip/index.html?which=battle&back=${back}`;
		window.parent.postMessage({ _: 'navigate', src });
	});

	const tierPlayers = document.querySelector('.tierPlayers');
	tierPlayers.addEventListener('pointerup', async (e) => {
		const { index } = e.target.dataset;
		const player = players[index - 1];
		const selectedOpponent = await getDefenseTeam({ player: player.name });
		setOpponentTeamCache(selectedOpponent);
		const src = `/pages/defenseTeam/?back=${back}`;
		window.parent.postMessage({ _: 'navigate', src });
	});
};

const setup = async () => {
	const players = await updatePlayersList();
	await updateUserInfo({ players });

	attachActions({ players });

	window.parent.postMessage({
		_: 'stats',
		feathers: true,
		gems: true,
		coins: true,
		friendPoints: false,
	});
	window.parent.postMessage({
		_: 'title',
		title: pageTitle,
		visibility: 'visible',
	});
	window.parent.postMessage({ _: 'loaded' });
};

document.addEventListener('DOMContentLoaded', setup);
