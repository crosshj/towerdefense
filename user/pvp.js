import {
	compressChars,
	decompressChars,
	deCompressGear,
	decompressTeams,
} from '../utils/compress.js';
import { defaultCharacters } from '../$data/defaultCharacters.js';
import API from '../utils/API.js';

export async function getDefenseTeam({ player }) {
	let error;
	const result = await API.fetch(
		'https://datamosh.vercel.app/api/teedee/players/getPVP',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				player,
			}),
		}
	)
		.then((x) => x.json())
		.catch((e) => {
			error = e;
		});
	if (error) return { error };

	// if (!result.characters) {
	// 	result.characters = compressChars(defaultCharacters());
	// }

	if (!result.teams) {
		return {
			name: result.name,
			exp: result.exp,
			rank: result.rank,
			defense: undefined,
			result,
			error: 'error getting defense team from DB',
		};
	}

	const characters = decompressChars(result.characters);
	const teams = decompressTeams(result.teams, characters);
	const allGear = deCompressGear(result.gear);
	const { Defense } = teams;

	for (const subTeam of ['a', 'b']) {
		for (const i of Object.keys(Defense[subTeam])) {
			const unit = {
				...characters.find((x) => x.id === Defense[subTeam][i]?.id),
				id: `defense-${subTeam}-${i}`,
			};
			unit.gear = {
				weapon: allGear.find((x) => x.id === unit.gearWeapon),
				armor: allGear.find((x) => x.id === unit.gearArmor),
				accessory: allGear.find((x) => x.id === unit.gearAccessory),
			};
			Defense[subTeam][i] = unit;
		}
	}

	return {
		name: result.name,
		exp: result.exp,
		rank: result.rank,
		defense: Defense,
	};
}
