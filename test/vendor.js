import { describe, setAutoRefresh } from '/test/.test.js';
import * as rxjs from '/vendor/rxjs.bundle.7.8.1.js';

describe('Vendor', (it) => {
	it('should be able to use rxjs as ES6 in browser', ({ expect }) => {
		console.log(Object.keys(rxjs));
		return expect(Object.keys(rxjs).join(' ')).toBe(
			[
				'animationFrameScheduler',
				'default',
				'filter',
				'finalize',
				'of',
				'repeat',
				'rxjs',
				'takeWhile',
				'tap',
			].join(' ')
		);
	});
});
