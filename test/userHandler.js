import { describe, setAutoRefresh } from '/test/.test.js';
import { feathersModifier } from '../serviceWorker/userHandler.js';
import { sampleUser1, sampleUser2, sampleUser3 } from './user.fixtures.js';

//setAutoRefresh(5000);

const TEN_MINUTES = 10 * 60 * 1000;
const logJSONString = (obj) => console.log(JSON.stringify(obj, null, 2));
const logTest = (user, modified) => {
	const {
		data: { feathersUpdate: modUpdate }
	} = modified;
	const {
		data: { feathersUpdate: currUpdate }
	} = user;
	return logJSONString({
		currDate: new Date().toISOString(),
		currUpda: currUpdate,
		currFeat: user.data.feathers,
		modUpdat: modUpdate,
		modFeath: modified.data.feathers
	});
};

describe('SW: Feathers Modifier', (it) => {
	it.todo('Sample use cases');

	// brings negative feathers to almost update, ie 99
	it('should handle sampleUser1: near future', ({ expect }) => {
		timemachine.config({
			dateString: '2024-08-10T11:30Z'
		});
		const user = sampleUser1;
		const modified = feathersModifier(user);
		//logTest(user, modified);
		timemachine.reset();
		return expect(modified.data.feathers).toBe(99);
	});

	// brings negative feathers to almost update, ie 99
	it('should handle sampleUser1: far future', ({ expect }) => {
		timemachine.config({
			dateString: '2025-01-01T01:00Z'
		});
		const user = sampleUser1;
		const modified = feathersModifier(user);
		//logTest(user, modified);
		timemachine.reset();
		return expect(modified.data.feathers).toBe(100);
	});

	// was maxed previously, now needs accumulate
	it('should handle sampleUser2', ({ expect }) => {
		timemachine.config({
			dateString: '2024-08-09T02:00Z'
		});
		const user = sampleUser2;
		const modified = feathersModifier(user);
		//logTest(user, modified);
		timemachine.reset();
		return (
			expect(modified.data.feathers).toBe(50) &&
			expect(modified.data.feathersUpdate).toBe(
				'2024-08-09T02:10:00.000Z'
			)
		);
	});

	// updateFeathers too far in the future, correct this
	it('should handle sampleUser3', ({ expect }) => {
		timemachine.config({
			dateString: '2024-08-09T22:35:47.789Z'
		});
		const user = sampleUser3;
		const modified = feathersModifier(user);
		logTest(user, modified);
		timemachine.reset();
		return (
			expect(modified.data.feathers).toBe(19) &&
			expect(modified.data.feathersUpdate).toBe(
				'2024-08-09T22:45:42.485Z'
			)
		);
	});

	it.todo('Core logic cases');

	it('should initialize feathersUpdate if not present', ({ expect }) => {
		const initialUser = {
			data: {
				feathers: 40,
				feathersMax: 45,
				feathersUpdate: null
			}
		};
		const user = feathersModifier(initialUser);
		return expect(user.data.feathersUpdate !== null).toBe(true);
	});

	it('should add feathers correctly', ({ expect }) => {
		const user = {
			data: {
				feathers: 40,
				feathersMax: 45,
				feathersUpdate: new Date(
					Date.now() - 30 * 60 * 1000
				).toISOString() // 30 minutes ago
			}
		};
		const modified = feathersModifier(user);
		return expect(modified.data.feathers).toBe(44);
	});

	it('should not exceed feathersMax', ({ expect }) => {
		const initialUser = {
			data: {
				feathers: 44,
				feathersMax: 45,
				feathersUpdate: new Date(
					Date.now() - 30 * 60 * 1000
				).toISOString() // 30 minutes ago
			}
		};
		const user = feathersModifier(initialUser);
		return expect(user.data.feathers).toBe(45);
	});

	it('should not add feathers if over feathersMax', ({ expect }) => {
		const user = {
			data: {
				feathers: 50,
				feathersMax: 45,
				feathersUpdate: new Date(
					Date.now() - 30 * 60 * 1000
				).toISOString() // 30 minutes ago
			}
		};
		const modified = feathersModifier(user);
		return (
			expect(modified.data.feathers).toBe(50) &&
			expect(modified.data.feathersUpdate).toBe(-1)
		);
	});

	it('should handle exactly max feathers', ({ expect }) => {
		const initialUser = {
			data: {
				feathers: 45,
				feathersMax: 45,
				feathersUpdate: new Date(
					Date.now() - 30 * 60 * 1000
				).toISOString() // 30 minutes ago
			}
		};
		const user = feathersModifier(initialUser);
		return expect(user.data.feathers).toBe(45);
	});

	it('should initialize feathersUpdate to DO_NOT_UPDATE if already at max', ({
		expect
	}) => {
		const initialUser = {
			data: {
				feathers: 45,
				feathersMax: 45,
				feathersUpdate: null
			}
		};
		const user = feathersModifier(initialUser);
		return expect(user.data.feathersUpdate).toBe(-1);
	});

	it('should add no feathers if feathersUpdate is in the future', ({
		expect
	}) => {
		const initialUser = {
			data: {
				feathers: 40,
				feathersMax: 45,
				feathersUpdate: new Date(
					Date.now() + 10 * 60 * 1000
				).toISOString() // 10 minutes in the future
			}
		};
		const user = feathersModifier(initialUser);
		return expect(user.data.feathers).toBe(40);
	});

	it('should not change feathersUpdate if feathers are at max and already DO_NOT_UPDATE', ({
		expect
	}) => {
		const initialUser = {
			data: {
				feathers: 45,
				feathersMax: 45,
				feathersUpdate: -1
			}
		};
		const user = feathersModifier(initialUser);
		return expect(user.data.feathersUpdate).toBe(-1);
	});

	it('should add correct number of feathers when multiple intervals have passed', ({
		expect
	}) => {
		const user = {
			data: {
				feathers: 30,
				feathersMax: 45,
				feathersUpdate: new Date(
					Date.now() - 120 * 60 * 1000
				).toISOString() // 120 minutes ago
			}
		};
		const modified = feathersModifier(user);
		return expect(modified.data.feathers).toBe(43); // 12 feathers added, but should not exceed max
	});

	it.todo('Error Handling Use Cases');

	it('should handle cases with invalid feathersUpdate format gracefully', ({
		expect
	}) => {
		const initialUser = {
			data: {
				feathers: 40,
				feathersMax: 45,
				feathersUpdate: 'invalid-date-format'
			}
		};
		const user = feathersModifier(initialUser);
		return expect(user.data.feathersUpdate).not.toBe('invalid-date-format'); // feathersUpdate should be reset
	});

	it('should handle invalid feathers format', ({ expect }) => {
		const initialUser = {
			data: {
				feathers: 'invalid',
				feathersMax: 45,
				feathersUpdate: new Date(
					Date.now() - 30 * 60 * 1000
				).toISOString() // 30 minutes ago
			}
		};
		try {
			feathersModifier(initialUser);
			return expect(false).toBe(true); // Should not reach here
		} catch (e) {
			return expect(e instanceof Error).toBe(true);
		}
	});

	it('should handle invalid feathersMax format', ({ expect }) => {
		const initialUser = {
			data: {
				feathers: 40,
				feathersMax: 'invalid',
				feathersUpdate: new Date(
					Date.now() - 30 * 60 * 1000
				).toISOString() // 30 minutes ago
			}
		};
		try {
			feathersModifier(initialUser);
			return expect(false).toBe(true); // Should not reach here
		} catch (e) {
			return expect(e instanceof Error).toBe(true);
		}
	});

	it('should handle missing feathers property', ({ expect }) => {
		const initialUser = {
			data: {
				feathersMax: 45,
				feathersUpdate: new Date(
					Date.now() - 30 * 60 * 1000
				).toISOString() // 30 minutes ago
			}
		};
		try {
			feathersModifier(initialUser);
			return expect(false).toBe(true); // Should not reach here
		} catch (e) {
			return expect(e instanceof Error).toBe(true);
		}
	});

	it('should handle missing feathersMax property', ({ expect }) => {
		const initialUser = {
			data: {
				feathers: 40,
				feathersUpdate: new Date(
					Date.now() - 30 * 60 * 1000
				).toISOString() // 30 minutes ago
			}
		};
		try {
			feathersModifier(initialUser);
			return expect(false).toBe(true); // Should not reach here
		} catch (e) {
			return expect(e instanceof Error).toBe(true);
		}
	});

	it('should handle missing feathersUpdate property', ({ expect }) => {
		const initialUser = {
			data: {
				feathers: 40,
				feathersMax: 45
			}
		};
		const user = feathersModifier(initialUser);
		return expect(user.data.feathersUpdate !== null).toBe(true);
	});

	it('should handle feathers being exactly zero', ({ expect }) => {
		const NOW = new Date();
		const user = {
			data: {
				feathers: 0,
				feathersMax: 45,
				feathersUpdate: new Date(NOW - 30 * 60 * 1000).toISOString() // 30 minutes ago
			}
		};
		const modified = feathersModifier(user);
		const updateNext =
			new Date(modified.data.feathersUpdate).getTime() - NOW.getTime();

		return (
			expect(modified.data.feathers).toBe(4) &&
			expect(updateNext).toBe(TEN_MINUTES)
		);
	});

	it('should handle feathers being one less than feathersMax', ({
		expect
	}) => {
		const initialUser = {
			data: {
				feathers: 44,
				feathersMax: 45,
				feathersUpdate: new Date(
					Date.now() - 10 * 60 * 1000
				).toISOString() // 10 minutes ago
			}
		};
		const user = feathersModifier(initialUser);
		return expect(user.data.feathers).toBe(45); // 1 feather should be added
	});

	it('should handle null input for feathers', ({ expect }) => {
		const initialUser = {
			data: {
				feathers: null,
				feathersMax: 45,
				feathersUpdate: new Date(
					Date.now() - 30 * 60 * 1000
				).toISOString() // 30 minutes ago
			}
		};
		try {
			feathersModifier(initialUser);
			return expect(false).toBe(true); // Should not reach here
		} catch (e) {
			return expect(e instanceof Error).toBe(true);
		}
	});

	it('should handle undefined input for feathersMax', ({ expect }) => {
		const initialUser = {
			data: {
				feathers: 40,
				feathersMax: undefined,
				feathersUpdate: new Date(
					Date.now() - 30 * 60 * 1000
				).toISOString() // 30 minutes ago
			}
		};
		try {
			feathersModifier(initialUser);
			return expect(false).toBe(true); // Should not reach here
		} catch (e) {
			return expect(e instanceof Error).toBe(true);
		}
	});

	it('should handle extremely large numbers for feathers', ({ expect }) => {
		const user = {
			data: {
				feathers: 1e12,
				feathersMax: 1e12 + 100,
				feathersUpdate: new Date(
					Date.now() - 30 * 60 * 1000
				).toISOString() // 30 minutes ago
			}
		};
		const modified = feathersModifier(user);
		return expect(modified.data.feathers).toBe(1e12 + 4); // 3 feathers should be added
	});
});
