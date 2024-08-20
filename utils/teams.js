const allTeamNames = [
	'Team 1',
	'Team 2',
	'Team 3',
	'Team 4',
	'Team 5',
	'Defense'
];

export const flattenTeams = (teams) => {
	const members = [];
	for (const teamName of allTeamNames) {
		for (const subteam of ['a', 'b']) {
			for (const index of [0, 1, 2, 3, 4]) {
				const thisChar = teams[teamName][subteam][index];
				members.push(thisChar);
			}
		}
	}
	return members;
};
