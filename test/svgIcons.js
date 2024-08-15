import { SVGIcons } from '../assets/icons.svg.js';

const IconGridItem = ({ name, getIcon }) => `
	<div class="gridItem">
		<div class="icon">${getIcon()}</div>
		<div class="name">${name}</div>
	</div>
`;

const onLoaded = async () => {
	const container = document.querySelector('.container');
	const icons = Object.entries(SVGIcons).map(([name, getIcon]) => ({
		name,
		getIcon
	}));
	container.innerHTML = icons.map(IconGridItem).join('\n');
};

document.addEventListener('DOMContentLoaded', onLoaded);
