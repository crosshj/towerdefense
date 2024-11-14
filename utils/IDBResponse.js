/**
 * Converts a fetch Response to a storable format for IndexedDB.
 * @param {Response} response - The fetch Response object.
 * @returns {Promise<Array>} - An array representing the response data, ready for IndexedDB.
 */
export async function fromResponse(response) {
	const headersObj = {};
	response.headers.forEach((value, key) => {
		headersObj[key] = value;
	});

	const body = await response.text(); // Or .json(), .blob() depending on the expected data type

	return [
		body,
		{
			status: response.status,
			statusText: response.statusText,
			headers: headersObj,
		},
	];
}

/**
 * Converts stored response data back into a fetch Response.
 * @param {Array} storedResponse - The stored response data from IndexedDB.
 * @returns {Response} - The reconstructed Response object.
 */
export function toResponse(storedResponse) {
	const [body, init] = storedResponse;
	init.headers = new Headers(init.headers);
	return new Response(body, init);
}

/**
 * MOdifies the body of a stored response.
 * @param {Array} storedResponse - The stored response data from IndexedDB.
 * @returns {Array} moodified storedResponse - The reconstructed Response object.
 */
export function modifyBody(storedResponse, modifiers) {
	let toModify = JSON.parse(storedResponse[0]);
	for (const modifier of modifiers) {
		toModify = modifier(toModify);
	}
	return [JSON.stringify(toModify), storedResponse[1]];
}

export default { fromResponse, toResponse, modifyBody };
