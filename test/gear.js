import { xit, describe, setAutoRefresh } from '/test/.test.js';
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

	it('unit gear tester', async ({ expect }) => {
		// PURPOSE: pick a unit, assign gear, come here and check if gear is assigned
		const unitId = '0-localid';
		const allUnits = await getCharacters(true);
		const unit = allUnits.find((x) => x.id === unitId);
		console.log(unit.gear);
		return (
			expect(!!unit.gear.weapon).toBe(true) &&
			expect(!!unit.gear.armor).toBe(true) &&
			expect(!!unit.gear.accessory).toBe(true)
		);
	});
});
