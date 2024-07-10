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

// DEPRECATE: teams  should come from getCharacters

/* prettier-ignore */
const exampleUser = {
    tower: {
        level: 100
    },
    teams: [
        {
            a: [
                { unit: 'blue-1', color: '#1E3FA9', rank: 1, mineralCost: 100, hp: 3000, attack: 20, range: 450 },
                { unit: 'blue-2', color: '#6A5ACD', rank: 2, mineralCost: 150, hp: 20000, attack: 15, range: 350 },
                { unit: 'blue-3', color: '#4682B4', rank: 3, mineralCost: 250, hp: 4000, attack: 40, range: 800 },
                { unit: 'blue-4', color: '#00CED1', rank: 4, mineralCost: 350, hp: 6000, attack: 60, range: 600 },
                { unit: 'blue-5', color: '#4B0082', rank: 5, mineralCost: 450, hp: 7000, attack: 80, range: 1000 }
            ],
            b: [
                { unit: 'blue-6', color: '#6495ED', rank: 4, mineralCost: 600, hp: 6000, attack: 60, range: 600 },
                { unit: 'blue-7', color: '#2E8B57', rank: 4, mineralCost: 700, hp: 6000, attack: 60, range: 600 },
                { unit: 'blue-8', color: '#3B5998', rank: 4, mineralCost: 800, hp: 6000, attack: 60, range: 600 },
                { unit: 'blue-9', color: '#5F9EA0', rank: 5, mineralCost: 1000, hp: 7000, attack: 80, range: 1000 },
                { unit: 'blue-10', color: '#007BA7', rank: 5, mineralCost: 1300, hp: 7000, attack: 80, range: 1000 }
            ]
        }
    ]
};

const getTeamsDetails = async (teams) => {
	const filledTeams = clone(teams);
	for (const team of filledTeams) {
		for (const [index, char] of Object.entries(team.a)) {
			team.a[index] = {
				...basicChar,
				...char
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

/* TODO: this will be a call to backend to get user details */
export const getUser = async () => {
	const tower = await getTowerDetails(exampleUser.tower);
	const teams = await getTeamsDetails(exampleUser.teams);

	//TODO: should really be sending whole team, but something deploys them all at once...
	tower.team = [teams[0].a[0]];
	tower.teams = teams;
	tower.selectedTeam = 'a';

	const thisUser = {
		auto: localStorage.getItem('auto') === 'true',
		tower
	};
	return thisUser;
};
