/**
 * Composes a series of functions into a single function that processes an initial value.
 * Each function in the series is applied to the result of the previous function.
 * If any function returns a Promise, the pipeline will await its resolution before continuing.
 *
 * @param {...Function} fns - A series of functions to be composed.
 * @returns {Function} A function that takes an initial value and returns the result of the composed functions.
 */
export const pipe =
	(...fns) =>
	async (initialValue) => {
		let result = initialValue;
		for (const fn of fns) {
			result = fn(result);
			if (result instanceof Promise) {
				result = await result;
			}
		}
		return result;
	};
