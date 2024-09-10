import { SVGIcons } from '../../assets/icons.svg.js';

const icons = {};

const getElements = () => ({});

const domLoaded = async () => {
	const elements = getElements();
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
};
document.addEventListener('DOMContentLoaded', domLoaded);
