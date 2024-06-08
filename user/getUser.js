/*
in the future, this will be where we get information about a given user
for now, this will return an example user's info
*/
const clone = (x) => JSON.parse(JSON.stringify(x));

const towerX = 200;
const towerColor1 = '#00e5e6';

/* TODO: this will eventually move out to a place that calculates CHARACTER details */
const basicChar = {
	type: 'attacker',
	hp: 3000,
	respawn: 40,
	range: 560,
	attack: 20,
	x: towerX + 140,
	move: 50,
	critChance: 0.035,
	critMult: 2,
	rank: 5,
	mineralCost: 100
};

const getTeamsDetails = async (teams) => {
	const filledTeams = clone(teams);
	for (const team of filledTeams) {
		for (const [index, char] of Object.entries(team.a)) {
			team.a[index] = {
				...basicChar,
				...char,
				mineralCost: (1 + Number(index)) * basicChar.mineralCost
			};
		}
		for (const [index, char] of Object.entries(team.a)) {
			team.a[index] = {
				...basicChar,
				...char
			};
		}
	}
	return filledTeams;
};

/* TODO: this will eventually move out to a place that calculates TOWER details */
const basicTower = {
	type: 'attacker',
	dims: [200, 343],
	x: towerX,
	color: towerColor1,
	hp: 30000,
	deployed: [],
	team: []
};
const getTowerDetails = async (tower) => {
	return clone({
		...basicTower,
		...tower
	});
};

const exampleUser = {
	tower: {
		level: 100
	},
	teams: [
		{
			a: [
				{ unit: 1, level: 100 },
				{ unit: 2, level: 100 },
				{ unit: 3, level: 100 },
				{ unit: 4, level: 100 },
				{ unit: 5, level: 100 }
			],
			b: [
				{ unit: 6, level: 100 },
				{ unit: 7, level: 100 },
				{ unit: 8, level: 100 },
				{ unit: 9, level: 100 },
				{ unit: 10, level: 100 }
			]
		}
	]
};

/* TODO: this will be a call to backend to get user details */
export const getUser = async () => {
	const tower = await getTowerDetails(exampleUser.tower);
	const teams = await getTeamsDetails(exampleUser.teams);

	//TODO: should really be sending whole team, but something deploys them all at once...
	tower.team = [teams[0].a[0]];
	tower.teams = teams;
	tower.selectedTeam = 'a';

	const thisUser = {
		tower
	};
	console.log({ thisUser });
	return thisUser;
};
