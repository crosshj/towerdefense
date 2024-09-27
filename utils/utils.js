/**
 * Creates a deep clone of the provided object.
 * @param {T} x - The object to clone.
 * @returns {T} A deep clone of the provided object.
 * @template T
 */
export const clone = (x) => JSON.parse(JSON.stringify(x));

/**
 * Generates an array of numbers in a range.
 * @param {number} start - Start of the range.
 * @param {number} end - End of the range.
 * @param {number} step - Step increment.
 * @returns {number[]} Array of numbers.
 * @example
 * range(1, 9, 2); // [1, 3, 5, 7, 9]
 */
export const range = (start, end, step) =>
	Array.from(
		{ length: (end - start) / step + 1 },
		(_, i) => start + i * step
	);

/**
 * Returns a promise that resolves after a specified delay.
 * @param {number} [ms=1000] - The number of milliseconds to delay.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
export const delay = (ms = 1000) =>
	new Promise((resolve) => setTimeout(resolve, ms));

export const generateUUID = () => {
	const time = Date.now().toString(16).padStart(12, '0'); // 48 bits of timestamp
	const random = 'xxxxxxxxxxxx'.replace(/[x]/g, () =>
		Math.floor(Math.random() * 16).toString(16)
	); // 48 bits of randomness
	return `${time.slice(0, 8)}-${time.slice(8, 12)}-7${random.slice(
		0,
		3
	)}-${random.slice(3, 6)}-${random.slice(6)}`;
};

export const cleanError = (e) => {
	e.stack = e.stack
		.split('\n')
		.filter((x) => !x.includes('rxjs'))
		.join('\n');
	return e;
};

export const unNest = (root, path, ancestors = {}) => {
	let _path, singular, thisParent;
	const results = [];
	try {
		_path = path.split('/');

		if (_path[0].includes('(')) {
			singular = _path[0].split('(')[0];
			_path[0] = _path[0].replace(/\(|\)/g, '');
		}
		thisParent = root[_path[0]];

		if (_path.length === 1) {
			for (var i = 0, len = thisParent.length; i < len; i++) {
				results.push({
					...ancestors,
					[singular || _path[0]]: thisParent[i],
				});
			}
			return results;
		}

		for (var i = 0, len = thisParent.length; i < len; i++) {
			results.push(
				unNest(thisParent[i], _path.slice(1).join('/'), {
					...ancestors,
					[singular || _path[0]]: thisParent[i],
				})
			);
		}
		return results.flat();
	} catch (e) {
		debugger;
	}
};

// see also https://github.com/PimpTrizkit/PJs/wiki/12.-Shade,-Blend-and-Convert-a-Web-Color-(pSBC.js)
export const colorShade = (col, amt) => {
	col = col.replace(/^#/, '');
	if (col.length === 3)
		col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2];

	let [r, g, b] = col.match(/.{2}/g);
	[r, g, b] = [
		parseInt(r, 16) + amt,
		parseInt(g, 16) + amt,
		parseInt(b, 16) + amt,
	];

	r = Math.max(Math.min(255, r), 0).toString(16);
	g = Math.max(Math.min(255, g), 0).toString(16);
	b = Math.max(Math.min(255, b), 0).toString(16);

	const rr = (r.length < 2 ? '0' : '') + r;
	const gg = (g.length < 2 ? '0' : '') + g;
	const bb = (b.length < 2 ? '0' : '') + b;

	return `#${rr}${gg}${bb}`;
};

export function appendCSSRule(css) {
	const style = document.createElement('style');
	style.appendChild(document.createTextNode(css));
	document.head.appendChild(style);
}

export const domLoaded = async () => {
	return await new Promise((resolve) => {
		function onLoaded() {
			removeEventListener('DOMContentLoaded', onLoaded);
			resolve();
		}
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', onLoaded);
		} else {
			onLoaded();
		}
	});
};

export const generateTableHTML = (data) => {
	if (!data || data.length === 0) return '<table></table>';

	const headers = Array.from(new Set(data.flatMap(Object.keys)));
	let table = '<table><thead><tr>';

	headers.forEach((header) => {
		table += `<th>${header}</th>`;
	});

	table += '</tr></thead><tbody>';

	data.forEach((row) => {
		table += '<tr>';
		headers.forEach((header) => {
			table += `<td>${row[header] !== undefined ? row[header] : ''}</td>`;
		});
		table += '</tr>';
	});

	table += '</tbody></table>';

	return table;
};
