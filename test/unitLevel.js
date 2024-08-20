import { describe, setAutoRefresh } from '/test/.test.js';
import { parseUpgradeChangeScenario1, sampleUnit1 } from './unit.fixtures.js';
import { withLevelInfo } from '../characters/index.js';
import { parseUpgradeChange } from '../user/characters.js';
import { flattenTeams } from '../utils/teams.js';

//setAutoRefresh(5000);

//http://127.0.0.1:8000/pages/game/standard.html?zone=friendBattle&team=1&fxMeteor=true&fxIce=true&fxTornado=true&fxInvincible=true
//http://127.0.0.1:8000/pages/unit/levelUp/

describe('Unit Level', (it) => {
	it.todo('Sample use cases');

	it('levelExp: experience capped to max level', ({ expect }) => {
		const modified = withLevelInfo(sampleUnit1, sampleUnit1.experience);
		//console.log(sampleUnit1, modified);
		return expect(modified.levelExp < sampleUnit1.experience).toBe(true);
	});

	it('uncapping level should not boost unit level', ({ expect }) => {
		const capped = withLevelInfo(sampleUnit1, sampleUnit1.experience);
		const level30Exp = capped.levelExp;
		const uncapped = withLevelInfo(
			{ ...sampleUnit1, uncappedLevel: 1 },
			level30Exp
		);
		return expect(uncapped.level).toBe(capped.level);
	});

	it('parseUpgradeChange: scenario1 (has error)', ({ expect }) => {
		const result = parseUpgradeChange(parseUpgradeChangeScenario1);
		return expect(result.error).toBe('cannot use team units for upgrade!');
	});

	it('parseUpgradeChange: scenario1 (fixed)', ({ expect }) => {
		const fixedScenario1 = JSON.parse(
			JSON.stringify(parseUpgradeChangeScenario1)
		);
		fixedScenario1.prevTeams['Team 3'].a[1].id = '16-localid';

		const result = parseUpgradeChange(fixedScenario1);
		const { newTeams, prevTeams, prevChars, newChars } = {
			...result,
			...fixedScenario1
		};
		const arrToObj = (a, o) => ({ ...a, [o.id]: o });
		const newCharsMap = newChars.reduce(arrToObj, {});
		const prevCharsMap = prevChars.reduce(arrToObj, {});
		const flatMappedNewTeams = flattenTeams(newTeams).map(
			(x) => newCharsMap[x.id]
		);
		const flatMappedPrevTeams = flattenTeams(prevTeams).map(
			(x) => prevCharsMap[x.id]
		);

		const misses = [];
		for (const i of Object.keys(flatMappedNewTeams)) {
			if (
				JSON.stringify(flatMappedPrevTeams[i]) ===
				JSON.stringify(flatMappedNewTeams[i])
			)
				continue;
			misses.push({
				i,
				prev: flatMappedPrevTeams[i],
				new: flatMappedNewTeams[i]
			});
		}
		misses.length && console.log({ misses });

		return expect(misses.length).toBe(0);
	});
});
