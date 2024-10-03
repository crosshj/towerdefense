import { getFriends } from '../../user/getFriends.js';
import { SVGIcons } from '../../assets/icons.svg.js';
import { attachHorizontalScroll } from '../my-team/handlePointerEvents.js';

const gearIcon = SVGIcons.gear();

const attachSettings = async () => {
	const settingsButton = document.querySelector('button.settings');
	settingsButton.innerHTML = gearIcon;
};

const messageCardComponent = () => `
	<div class="item friend">
		<div class="card message">
			<span>You can send HELP 50 times per day.</span>
			<div>0/50</div>
		</div>
	</div>
`;
const friendCardComponent = (friend) => `
	<div class="item friend">
		<div class="card">
			<div class="flag grade-${friend.grade}">${friend.grade}</div>
			<div class="icon">
				<img src="${friend.image}" />
			</div>
			<div class="level">
				Lv. ${friend.level}
			</div>
			<div class="name">
				${friend.displayName}
			</div>
			<div class="help">
				<span>HELP</span>
				<div class="marker">F</div>
			</div>
		</div>
		<div class="time">🕓 Within 1 days</div>
	</div>
`;
const attachFriendsList = async () => {
	const friendsList = document.querySelector('.items-list');
	attachHorizontalScroll(friendsList);
	const friends = await getFriends();
	const friendsListSort = document.querySelector(
		'.filter-dropdown custom-select'
	);

	const friendsTotal = document.querySelector('.sub-header .total');
	friendsTotal.innerHTML = `TOTAL: ${friends.length}`;

	const updateFriendsList = () => {
		const sortBy = friendsListSort.value || 'Last Login';
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
};

const domLoaded = async () => {
	window.parent.postMessage({
		_: 'title',
		title: 'FRIENDS',
		visibility: 'visible',
	});
	const args = {
		feathers: false,
		gems: false,
		coins: false,
		friendPoints: true,
	};
	window.parent.postMessage({ _: 'stats', ...args });

	await attachSettings();

	await attachFriendsList();

	const chooserEl = document.querySelector('.chooser');
	chooserEl.addEventListener('mousedown', (e) => {
		if (e.target.classList.contains('selected')) return;
		const current = chooserEl.querySelector('.selected');
		current.classList.remove('selected');
		e.target.classList.add('selected');
	});

	window.parent.postMessage({ _: 'loaded' });
};

document.addEventListener('DOMContentLoaded', domLoaded);
