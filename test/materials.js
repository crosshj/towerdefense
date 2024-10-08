import { MaterialsStore } from '../user/material.js';
import { describe, setAutoRefresh } from '/test/.test.js';

describe('Materials', (it, { xit }) => {
	it.todo('Sample use cases');

	// tool-only, keep disabled when not in use
	xit('should remove materials from LS', ({ expect }) => {
		timemachine.reset(); //use real time
		MaterialsStore.lsRemove('3');
		return expect(true).toBe(true);
	});

	// tool-only, keep disabled when not in use
	xit('should add materials to LS', ({ expect }) => {
		timemachine.reset(); //use real time
		MaterialsStore.lsAdd('1');
		return expect(true).toBe(true);
	});

	it('should get current materials from LS', ({ expect }) => {
		timemachine.reset(); //use real time
		const materials = MaterialsStore.lsGet();
		console.log({ materials }); // see current stage tracking
		return expect(true).toBe(true);
	});

	it('should add/remove materials to/from LS', ({ expect }) => {
		timemachine.reset(); //use real time
		const fakeMatKey = 'fake_material';
		const fakeAmount = 999;
		const original = MaterialsStore.lsGet();

		MaterialsStore.lsAdd(fakeMatKey, fakeAmount);
		const withAdded = MaterialsStore.lsGet();

		MaterialsStore.lsRemove(fakeMatKey, fakeAmount);
		const withRemoved = MaterialsStore.lsGet();

		console.log({ original, withAdded, withRemoved });
		return (
			expect(original[fakeMatKey]).toBe(undefined) &&
			expect(withAdded[fakeMatKey]).toBe(fakeAmount) &&
			expect(withRemoved[fakeMatKey]).toBe(undefined)
		);
	});
});
