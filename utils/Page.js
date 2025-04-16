import { debug } from './debug.js';

import { Capacitor as CapacitorCDN } from '/vendor/capacitor.js';
const Capacitor = window.Capacitor ?? CapacitorCDN;

const call = async (method, ...args) => {
	if (!window.parent) {
		return { error: 'Remote Exec: No parent window found' };
	}
	window.parent.postMessage({ _: method });
	const execResult = await new Promise((resolve) => {
		const listener = (event) => {
			if (typeof event?.data !== 'object') {
				return;
			}
			const { _, srcEvent, result } = event.data;
			if (_ === 'callResult' && srcEvent === method) {
				window.removeEventListener('message', listener);
				resolve(result);
			}
		};
		window.addEventListener('message', listener);
	});
	return execResult;
};

/**
 * Represents a Page component that initializes with provided stats and title,
 * and executes a callback when the page is ready.
 *
 * @param {Object} options - Configuration options for the page.
 * @param {Object} [options.stats={}] - An object containing statistical data to be sent to the parent window.
 * @param {string} [options.title] - The title of the page to be sent to the parent window.
 * @param {Function} onReady - A callback function that is executed when the page is ready.
 * @param {Object} onReady.context - The context object passed to the callback.
 * @param {Object} onReady.context.debug - Debugging utilities.
 * @param {Function} onReady.context.call - A function to call methods on the parent window.
 * @param {Object} onReady.context.Capacitor - The Capacitor object for interacting with native functionality.
 */
export const Page = ({ stats = {}, title }, onReady) => {
	const DOMContentLoaded = async () => {
		await onReady({
			debug,
			call,
			Capacitor,
		});

		if (!window.parent) return;

		const statsVisible =
			Object.keys(stats).length > 0 ? 'visible' : 'hidden';
		window.parent.postMessage({
			_: 'stats',
			...stats,
			visibility: statsVisible,
		});

		const titleVisible = !!title ? 'visible' : 'hidden';
		window.parent.postMessage({
			_: 'title',
			title,
			visibility: titleVisible,
		});
		window.parent.postMessage({ _: 'loaded' });

		debug.log(`Page loaded with title: ${title}`);
	};
	document.addEventListener('DOMContentLoaded', DOMContentLoaded);
};
