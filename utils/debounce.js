/**
 * Creates a debounced function that delays invoking the provided function until after the specified timeout has elapsed since the last time the debounced function was invoked.
 *
 * @param {Function} func - The function to debounce.
 * @param {number} [timeout=300] - The number of milliseconds to delay. Defaults to 300 milliseconds.
 * @returns {Function} - A new debounced function.
 */
export function debounce(func, timeout = 300) {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
}
