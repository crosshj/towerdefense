import API from '../utils/API.js';

const setupPushNotifications = async (subscription) => {
	console.log({ subscription });
	// await updateUserFromAPI({
	// 	pushSubscription: subscription
	// });

	return await sendNotification({ subscription, content: 'test message' });
};

async function sendNotification({ subscription, player, title, content }) {
	let error;
	const result = await API.fetch(
		'https://datamosh.vercel.app/api/teedee/notification/send',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				subscription,
				player,
				title,
				urgency: 'high', // very-low, low, normal, or high
				payload: content,
			}),
		}
	)
		.then((x) => x.json())
		.catch((e) => {
			error = e;
		});
	if (error) return { error };
	return result;
}

function getSelectedValue() {
	const selectedRadio = document.querySelector('input[name="user"]:checked');
	return selectedRadio ? selectedRadio.value : null;
}

const userRow = (user, i) => `
	<label class="nameSelectContainer">
		<input ${!i ? 'checked' : ''} value="${user.name}" type="radio" name="user"  />
		<div class="userName">${user.name}</div>
	</label>
	<div></div>
`;

const attachUsersList = async () => {
	const users = (
		await API.fetch('https://datamosh.vercel.app/api/teedee/players').then(
			(x) => x.json()
		)
	)
		// .filter((x) => typeof x.last_login === 'string')
		.sort((a, b) => a.name.localeCompare(b.name));

	const usersListEl = document.querySelector('.usersList');
	usersListEl.innerHTML = users.map(userRow).join('\n');

	const sendButton = document.querySelector('.sendButton');
	const messageTitleEl = document.querySelector('#messageTitle');
	const messageTextEl = document.querySelector('#messageText');
	const resultsEl = document.querySelector('.results');

	messageTitleEl.value = 'Test Title';
	messageTextEl.value = 'Test Body';

	sendButton.addEventListener('click', async () => {
		//TODO: show loading
		const selected = getSelectedValue();
		const result = await sendNotification({
			player: selected,
			title: messageTitleEl.value,
			content: messageTextEl.value,
		});
		// todo hide loading
		// update results element
		// console.log({ result });
		resultsEl.innerText = JSON.stringify(result, null, 2);
	});
};

const onLoaded = async () => {
	await attachUsersList();

	//await setupPushNotifications(subscription);
};

document.addEventListener('DOMContentLoaded', onLoaded);
