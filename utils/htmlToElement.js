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
