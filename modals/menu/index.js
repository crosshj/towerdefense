import { SVGIcons } from '../../assets/icons.svg.js';
import { setCurrentCharCache } from '../../utils/cache.js';

const getNavigateTo = (el) => {
	const permitted = [
		'advent',
		'mainStage',
		'gacha',
		'home',
		'specialStage',
		'upgrade',
		'pass',
		'pvp',
		'gear',
		'my-team',
		'tower',
		'guild',
		'lab',
	];
	return permitted.find((x) => el.classList.contains(x));
};

const icons = {
	PVP: SVGIcons.swordCrossed,
	'MAIN STAGE': SVGIcons.mainStage,
	'MY TEAM': SVGIcons.stars6,
	HOME: SVGIcons.returnHome,
	'SPECIAL STAGE': SVGIcons.specialStage,
	UPGRADE: SVGIcons.upgrade,
	MISSION: SVGIcons.ticket,
	ADVENT: SVGIcons.advent,
	GEAR: SVGIcons.swordShield,
	GACHA: SVGIcons.gacha,
	TOWER: SVGIcons.tower,
	GUILD: SVGIcons.guild,
	LAB: SVGIcons.lab,
};

const setupMenuGrid = () => {
	const menuItems = Array.from(document.querySelectorAll('.menuGrid > div'));
	for (const item of menuItems) {
		const label = (item.innerText || '').trim();
		if (!label) continue;
		const icon = icons[label];
		// if (!icon) continue;
		item.innerHTML = `
			<div class="menuItemContainer">
				<div class="menuIcon">
					${icon ? icon() : ''}
				</div>
				<div class="menuLabel">
					${label}
				</div>
			</div>
		`;
	}
};

document.addEventListener('DOMContentLoaded', (event) => {
	const container = document.querySelector('.container');
	setupMenuGrid();
	container.classList.remove('hidden');
	document.body.addEventListener('pointerdown', (e) => {
		const navigateTo = getNavigateTo(e.target);
		const src = navigateTo ? `/pages/${navigateTo}/index.html` : undefined;
		if (src) {
			event.stopPropagation();
			setCurrentCharCache(false);
		}
		window.parent.postMessage({
			_: 'navigate',
			src,
		});
	});
});
