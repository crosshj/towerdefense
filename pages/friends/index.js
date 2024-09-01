import { getFriends } from '../../user/getFriends.js';

document.addEventListener('DOMContentLoaded', async () => {
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

	const friendsList = document.querySelector('.items-list');
	const friends = await getFriends();

	const friendsTotal = document.querySelector('.sub-header .total');
	friendsTotal.innerHTML = `TOTAL: ${friends.length}`;

	const messageCard = document.createElement('div');
	friendsList.append(messageCard);
	messageCard.outerHTML = `
		<div class="item friend">
			<div class="card message">
				<span>You can send HELP 50 times per day.</span>
				<div>0/50</div>
			</div>
		</div>
	`;
	for (const friend of friends) {
		const friendCard = document.createElement('div');
		friendsList.append(friendCard);
		friendCard.outerHTML = `
			<div class="item friend">
				<div class="card">
					<div class="flag grade-${friend.grade}">${friend.grade}</div>
					<div class="icon"></div>
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
	}

	const chooserEl = document.querySelector('.chooser');
	chooserEl.addEventListener('mousedown', (e) => {
		if (e.target.classList.contains('selected')) return;
		const current = chooserEl.querySelector('.selected');
		current.classList.remove('selected');
		e.target.classList.add('selected');
	});

	window.parent.postMessage({ _: 'loaded' });
});
