import { describe, setAutoRefresh } from '/test/.test.js';
import { sampleUnit1 } from './unit.fixtures.js';
import { withLevelInfo } from '../characters/index.js';

//setAutoRefresh(5000);

//http://127.0.0.1:8000/pages/game/standard.html?zone=friendBattle&team=1&fxMeteor=true&fxIce=true&fxTornado=true&fxInvincible=true
//http://127.0.0.1:8000/pages/unit/levelUp/

describe('Unit Level', (it) => {
	it.todo('Sample use cases');

	it('levelExp: experience capped to max level', ({ expect }) => {
		const modified = withLevelInfo(sampleUnit1, sampleUnit1.experience);
		console.log(sampleUnit1, modified);
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
});
