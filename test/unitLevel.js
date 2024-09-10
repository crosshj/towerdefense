import { describe, setAutoRefresh } from '/test/.test.js';
import {
	parseUpgradeChangeScenario1,
	sampleUnit1,
	testExpAmounts,
} from './unitLevel.fixtures.js';

import { parseUpgradeChange } from '../user/characters.js';
import { flattenTeams } from '../utils/teams.js';
import { withLevelInfo } from '../utils/units.js';
import { unitsAll } from '../$data/unitsAll.js';

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

	it('should not give negative stats', ({ expect }) => {
		// const brokenUnit = {
		// 	rank: 4,
		// 	attack: '148 - 1,079 - 2,626',
		// 	hp: '6,275 - 44,740 - 108,792',
		// 	defense: '391 - 2,841 - 6,914',
		// 	uncappedLevel: 4,
		// };
		const progress = [];
		for (const [code, anyUnit] of Object.entries(unitsAll)) {
			for (const exp of Object.values(testExpAmounts)) {
				const hydrated = withLevelInfo(
					{
						...anyUnit,
						uncappedLevel: 4,
					},
					Math.floor(exp)
				);
				progress.push({
					unit: code.replaceAll(/-/g, '_'),
					exp: Math.floor(exp),
					level: hydrated.level,
					attack: hydrated.attack,
					hp: hydrated.hp,
					defense: hydrated.defense,
				});
			}
		}
		// console.table(progress);
		return expect(JSON.stringify(progress).indexOf('-')).toBe(-1);
	});

	it('parseUpgradeChange: scenario1 (has error)', ({ expect }) => {
		const result = parseUpgradeChange(parseUpgradeChangeScenario1);
		return expect(result.error).toBe('cannot consume team units!');
	});

	it('parseUpgradeChange: scenario1 (fixed)', ({ expect }) => {
		const fixedScenario1 = JSON.parse(
			JSON.stringify(parseUpgradeChangeScenario1)
		);
		fixedScenario1.prevTeams['Team 3'].a[1].id = '16-localid';
		const { currentChar } = fixedScenario1;

		const result = parseUpgradeChange(fixedScenario1);
		const { newTeams, prevTeams, prevChars, newChars } = {
			...result,
			...fixedScenario1,
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
				new: flatMappedNewTeams[i],
			});
		}
		misses.length && console.log({ misses });

		const currentCharIdUpdated = result.updatedChar.id !== currentChar.id;
		return (
			expect(misses.length).toBe(0) &&
			expect(currentCharIdUpdated).toBe(true)
		);
	});
});
