import { getStageTracking, updateStageTracking } from '../user/stageTrack.js';
import { describe, setAutoRefresh } from '/test/.test.js';

describe('Unit Level', (it) => {
	it.todo('Sample use cases');

	it('should get current stage track from LS', ({ expect }) => {
		timemachine.reset(); //use real time
		const stageTracking = getStageTracking();
		console.log(stageTracking); // see current stage tracking
		return expect(Object.keys(stageTracking)).toBe(['date', 'count']);
	});

	it('should write/read current stage track from LS', ({ expect }) => {
		timemachine.reset(); //use real time
		updateStageTracking('special_evolution_5');
		const stageTracking = getStageTracking();
		console.log(stageTracking); // see current stage tracking
		return expect(Object.keys(stageTracking)).toBe(['date', 'count']);
	});
});
