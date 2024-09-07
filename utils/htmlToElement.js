export const htmlToElement = (html) => {
	var template = document.createElement('template');
	html = html.trim(); // Never return a text node of whitespace as the result
	template.innerHTML = html;
	//also would be cool to remove indentation from all lines
	return template.content.firstChild;
};

export const append = (html) => {
	const el = htmlToElement(html);
	document.body.append(el);
	return el;
};

export const withCommas = (x) => {
	return x
		.toLocaleString('en', { useGrouping: true })
		.replaceAll(/,/g, '<span class="comma-span">,</span>');
};

export async function getSVGDocument(id, retryCount = 10) {
	const doc = await new Promise((resolve, reject) => {
		const backgroundSVG = document.getElementById(id);
		if (!backgroundSVG) reject(`Element with id '${id}' not found`);

		const loadHandler = () => resolve(backgroundSVG.contentDocument);
		backgroundSVG.addEventListener('load', loadHandler);

		if (backgroundSVG.contentDocument) {
			backgroundSVG.removeEventListener('load', loadHandler);
			resolve(backgroundSVG.contentDocument);
		}
	});

	if (!doc && retryCount > 0) {
		await new Promise((resolve) => setTimeout(resolve, 100)); // delay for retries
		console.log({ retryCount });
		return getSVGDocument(id, retryCount - 1); // retry
	} else if (!doc) {
		throw new Error(`SVG document not loaded after multiple attempts.`);
	}

	return doc;
}

export async function waitForElementById(
	getParentDoc,
	id,
	retryCount = 10,
	delay = 100
) {
	return new Promise((resolve, reject) => {
		const attempt = (retriesLeft) => {
			const parentDoc = getParentDoc();
			const element = parentDoc && parentDoc.getElementById(id);
			if (element) {
				resolve(element);
			} else if (retriesLeft > 0) {
				console.log({ RETRY: retriesLeft });
				setTimeout(() => attempt(retriesLeft - 1), delay);
			} else {
				reject(
					new Error(
						`Element with id '${id}' not found after ${retryCount} retries.`
					)
				);
			}
		};
		attempt(retryCount);
	});
}
