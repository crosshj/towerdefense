import { SVGIcons } from '../../../assets/icons.svg.js';
import { getStageInfo } from '../../../stages/index.js';
import { getLocationMap } from '../../../utils/locations.js';
import { getFriends } from '/user/getFriends.js';
import { animateOrb } from '/visuals/objects/orb.js';

const versusGraphic = SVGIcons.stars6();

const effectsIcons = {
	fxMeteor: SVGIcons.meteor(),
	fxIce: SVGIcons.iceStorm(),
	fxTornado: SVGIcons.tornado(),
	fxInvincible: SVGIcons.invincibility(),
};

const updateOptions = async (params) => {
	for (const [k, v] of Object.entries(effectsIcons)) {
		const container = document.querySelector(`.options .${k}`);
		const icon = document.querySelector(`.options .${k} .icon`);
		icon.innerHTML = v;
		if (params[k] + '' === 'true') {
			container.classList.remove('disabled');
		}
	}
};

const messageCardComponent = () => `
<div class="item friend">
	<div class="card message">
		<div class="versusGraphic">
			${versusGraphic}
		</div>
		<span>Select a friend to help you. (1 friend)</span>
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

const attachFriendsList = async ({ friends, params }) => {
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
		const friendOption = document.querySelector('.options .help .icon div');
		const radioEl = card.querySelector('.radio');
		if (radioEl.classList.contains('selected')) {
			radioEl.classList.remove('selected');
			friendOption.innerHTML = '';
			params.friend = undefined;
			return;
		}
		const allRadios = Array.from(friendsList.querySelectorAll('.radio'));
		allRadios.forEach((x) => x.classList.remove('selected'));
		radioEl.classList.add('selected');

		const friendName = (
			card.querySelector('.name')?.innerText || ''
		).trim();
		friendOption.innerHTML = friendName[0];
		params.friend = friendName;
	};
	friendsList.addEventListener('pointerup', handleFriendSelect);
};

const attachNextButton = async ({ location, params }) => {
	const stage = await getStageInfo(params);
	const nextButton = document.querySelector('button.next-button');

	const featherCost = stage.featherCost || 1;

	nextButton.innerHTML = `
		<div class="featherIcon"></div>
		<span class="featherAmount">X${featherCost}</span>
		<span>START</span>
	`;
	nextButton.addEventListener('pointerup', async () => {
		if (nextButton.classList.contains('clicked')) return;

		// selected friend
		const selectedCard = document.querySelector(
			'.card:has(.radio.selected)'
		);
		const friendName = selectedCard
			? selectedCard.querySelector('.name')?.innerText?.trim()
			: undefined;
		console.log({ _: 'TODO: add friend to game', friendName });

		nextButton.classList.add('clicked');
		window.parent.postMessage({
			_: 'action',
			minusFeathers: featherCost,
		});
		await animateOrb(
			window.innerWidth / 2 + 60,
			10,
			window.innerWidth / 2,
			window.innerHeight - 50
		);

		const newParams = {
			...params,
			//TODO: friend
		};
		const queryString = new URLSearchParams(newParams).toString();
		const src = `/pages/game/standard.html?${queryString}`;
		window.parent.postMessage({ _: 'navigate', src });

		//TODO: not sure if this is entirely necessary, was seeing issues with stats flashin, though
		window.parent.postMessage({
			_: 'stats',
			visibility: 'hidden',
		});
	});
};

document.addEventListener('DOMContentLoaded', async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });

	updateOptions(params);

	const locationMap = await getLocationMap(params);
	const location = locationMap[params.zone];
	if (params?.number) {
		location.title = 'STAGE ' + params.number;
	}

	await attachNextButton({ location, params });

	const friends = await getFriends();
	await attachFriendsList({ params, friends });

	window.parent.postMessage({
		_: 'stats',
		feathers: true,
		gems: true,
		coins: true,
		friendPoints: false,
	});
	window.parent.postMessage({
		_: 'title',
		title: location.title,
		visibility: 'visible',
		back: `/pages/game/selectTeam/index.html?${new URLSearchParams(
			params
		).toString()}`,
	});

	window.parent.postMessage({ _: 'loaded' });
});
