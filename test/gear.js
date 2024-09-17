import { describe, setAutoRefresh } from '/test/.test.js';
import { assignGearToUnit } from '../user/gear.js';
import { getCharacters } from '../user/characters.js';
import { forceUpdate } from '../user/user.js';

describe('Gear', (it) => {
	it.todo('Mocked cases');

	it.todo('Live cases');
	it('should assign gear to unit', async ({ expect }) => {
		const gearId = '7-localid';
		const unitId = '65-localid';
		const result = await assignGearToUnit(gearId, unitId);
		//console.log(result);
		const allUnits = await getCharacters(true);
		const unit = allUnits.find((x) => x.id === unitId);
		return expect(unit.gearWeapon).toBe(gearId);
	});
});
