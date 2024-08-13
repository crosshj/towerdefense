import { decompressChars, decompressTeams } from '../utils/compress.js';

async function getDefenseTeam({ player }) {
	let error;
	const result = await fetch(
		'https://datamosh.vercel.app/api/teedee/players/getPVP',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				player
			})
		}
	)
		.then((x) => x.json())
		.catch((e) => {
			error = e;
		});
	if (error) return { error };

	if (!result.characters || !result.teams) {
		return {
			name: result.name,
			exp: result.exp,
			rank: result.rank,
			defense: undefined,
			error: 'error getting defense team from DB'
		};
	}

	const characters = decompressChars(result.characters);
	const teams = decompressTeams(result.teams, characters);
	const { Defense } = teams;

	for (const subTeam of ['a', 'b']) {
		for (const i of Object.keys(Defense[subTeam])) {
			Defense[subTeam][i] = {
				...characters.find((x) => x.id === Defense[subTeam][i]?.id),
				id: `defense-${subTeam}-${i}`
			};
		}
	}

	return {
		name: result.name,
		exp: result.exp,
		rank: result.rank,
		defense: Defense
	};
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
		await fetch('https://datamosh.vercel.app/api/teedee/players').then(
			(x) => x.json()
		)
	)
		.filter((x) => typeof x.last_login === 'string')
		.sort((a, b) => a.name.localeCompare(b.name));

	const usersListEl = document.querySelector('.usersList');
	usersListEl.innerHTML = users.map(userRow).join('\n');

	const sendButton = document.querySelector('.sendButton');
	const resultsEl = document.querySelector('.results');

	sendButton.addEventListener('click', async () => {
		//TODO: show loading
		const selected = getSelectedValue();
		const result = await getDefenseTeam({
			player: selected
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
