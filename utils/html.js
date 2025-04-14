export function minifyHTML(strings, ...values) {
	const rawHTML = strings.reduce(
		(result, str, i) => result + str + (values[i] || ''),
		''
	);
	return rawHTML
		.replace(/\s*\n\s*/g, '')
		.replace(/\s{2,}/g, ' ')
		.trim();
}

export const htmlHelper = (strings, ...values) =>
	minifyHTML(strings, ...values);
