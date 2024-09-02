import { SVGIcons } from '../../../assets/icons.svg.js';
import { getDefenseTeam } from '../../../user/pvp.js';
import { setOpponentTeamCache } from '/utils/cache.js';
import { getFriends } from '/user/getFriends.js';

const versusGraphic = SVGIcons.versusGraphic();

const messageCardComponent = () => `
<div class="item friend">
	<div class="card message">
		<div class="versusGraphic">
			${versusGraphic}
		</div>
		<span>Select the friend you wish to battle.</span>
	</div>
</div>
`;
const friendCardComponent = (friend) => `
<div class="item friend">
	<div class="card">
		<div class="flag grade-${friend.grade}">${friend.grade}</div>
		<div class="level">
			Lv. ${friend.level}
		</div>
		<div class="icon">
			<img src="${friend.image}" >
		</div>
		<div class="name">
			${friend.displayName}
		</div>
		<div class="radio">
		</div>
	</div>
	<div class="time"></div>
</div>
`;

const attachFriendsList = async ({ friends, nextButton }) => {
	const friendsList = document.querySelector('.items-list');
	const friendsListSort = document.querySelector(
		'.filter-dropdown custom-select'
	);

	const updateFriendsList = () => {
		const sortBy = friendsListSort.value || 'Level';
		friendsList.innerHTML = '';
		const messageCard = document.createElement('div');
		friendsList.append(messageCard);
		messageCard.outerHTML = messageCardComponent();
		const sortedFriends = [...friends].sort((a, b) => {
			if (sortBy === 'Level') {
				return b.level - a.level;
			}
			if (sortBy === 'Last Login') {
				const dateA = new Date(a.last_login);
				const dateB = new Date(b.last_login);
				if (isNaN(dateA)) return 1; // Invalid date in 'a' goes to the end
				if (isNaN(dateB)) return -1; // Invalid date in 'b' goes to the end
				return dateB - dateA;
			}
		});
		for (const friend of sortedFriends) {
			const friendCard = document.createElement('div');
			friendsList.append(friendCard);
			friendCard.outerHTML = friendCardComponent(friend);
		}
	};
	updateFriendsList();
	friendsListSort.addEventListener('change', updateFriendsList);

	const handleFriendSelect = (event) => {
		const { target: card } = event;
		const radioEl = card.querySelector('.radio');
		if (radioEl.classList.contains('selected')) {
			radioEl.classList.remove('selected');
			nextButton.classList.add('disabled');
			return;
		}
		nextButton.classList.remove('disabled');
		const allRadios = Array.from(friendsList.querySelectorAll('.radio'));
		allRadios.forEach((x) => x.classList.remove('selected'));
		radioEl.classList.add('selected');
	};
	friendsList.addEventListener('pointerup', handleFriendSelect);
};

document.addEventListener('DOMContentLoaded', async () => {
	window.parent.postMessage({
		_: 'title',
		title: 'FRIEND BATTLE',
		visibility: 'visible',
		back: '/pages/pvp/',
	});
	const args = {
		feathersSpecial: true,
		feathers: true, // TODO: these should not be shown, but don't have special feathers yet so WTFE
		gems: true,
		coins: true,
		friendPoints: false,
		purpleGems: true,
	};
	window.parent.postMessage({ _: 'stats', ...args });

	const friends = await getFriends();

	const nextButton = document.querySelector('.actions .next-button');
	nextButton.addEventListener('pointerup', async () => {
		const selectedCard = document.querySelector(
			'.card:has(.radio.selected)'
		);
		if (!selectedCard) {
			alert('Select a friendl first');
			return;
		}
		const name = selectedCard.querySelector('.name')?.innerText?.trim();
		//const selectedFriend = friends.find((x) => x.name === name);
		const selectedOpponent = await getDefenseTeam({ player: name });
		console.log(selectedOpponent);
		setOpponentTeamCache(selectedOpponent);
		// TODO; set cache for selected friend's defense team
		const src = `/pages/game/selectTeam/index.html?zone=friendBattle`;
		window.parent.postMessage({ _: 'navigate', src });
	});

	await attachFriendsList({ friends, nextButton });

	window.parent.postMessage({ _: 'loaded' });
});
