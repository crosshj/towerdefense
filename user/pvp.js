import { decompressChars, decompressTeams } from '../utils/compress.js';

export async function getDefenseTeam({ player }) {
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
