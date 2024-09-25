import { describe, setAutoRefresh } from '/test/.test.js';
import * as rxjs from '/vendor/rxjs.bundle.7.8.1.js';
import GIF from '/vendor/gif-js/gifjs.0.2.0.js';

describe('Vendor', (it) => {
	it('should rxjs', ({ expect }) => {
		// console.log(Object.keys(rxjs));
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
	it('should gifjs', ({ expect }) => {
		let instance, error;
		try {
			instance = new GIF();
		} catch (e) {
			error = e;
		}
		// console.log(Object.keys(GIF), { instance, error, t: typeof instance });
		return (
			expect(typeof error).toBe('undefined') &&
			expect(typeof instance).toBe('object') &&
			expect(Object.keys(GIF).join(' ')).toBe(
				[
					'EventEmitter',
					'defaultMaxListeners',
					'listenerCount',
					'__super__',
				].join(' ')
			)
		);
	});
});

describe('Other Dependencies', (it) => {
	it('should have a depends file', async ({ expect }) => {
		const { default: getDepends, getDependsMeta } = await import(
			'/$data/__depends.js'
		);
		const depends = getDepends();
		const meta = getDependsMeta();
		console.log(meta, depends);
		return expect(true).toBe(true);
	});
});
