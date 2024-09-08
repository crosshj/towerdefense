import { SVGIcons } from '../../assets/icons.svg.js';

const mineralIcon = SVGIcons.mineral();
const circleInfoIcon = SVGIcons.infoCircle();
const circleLockedIcon = SVGIcons.lockCircle();

export const slotDiv = (c, getCharImage) => {
	return `
			<div class="icon">
				<img src="${getCharImage(c)}">
			</div>
			<div class="base">
				<div class="cylinder"></div>
				<div class="stars">
					${'★'.repeat(c.stars)}
				</div>
			</div>
			<div class="mineral flex space-between">
				<div class="mineral-icon">${mineralIcon}</div>
				<div>${c.mineralCost}</div>
			</div>
		`;
};

export const blankSlot = () => {
	return `
		<div class="icon"></div>
		<div class="base">
			<div class="cylinder"></div>
			<div class="stars"></div>
		</div>
		<div class="mineral flex space-between">
			<div class="mineral-icon"></div>
			<div></div>
		</div>
	`;
};

export const characterDiv = (c, getCharImage) => {
	let selectorInfoContents = circleInfoIcon;
	const circleInfoClass = ['selectorInfo'];
	if (c.locked) {
		selectorInfoContents = circleLockedIcon;
		circleInfoClass.push('locked');
	}
	if (circleInfoClass.length === 1) {
		circleInfoClass.push('info');
	}
	return `
		<div class="${circleInfoClass.join(' ')}">
			${selectorInfoContents}
		</div>
		<div class="stars">
			${'★'.repeat(c.stars)}
		</div>
		<div class="info">
			<div class="icon">
				<img src="${getCharImage(c)}">
			</div>
			<div class="details">
				<div class="name">
					${c.displayName}
				</div>
				<div class="level flex space-between">
					<div>Lv.</div>
					<div>${c.level}</div>
				</div>
				<div class="mineral flex space-between">
					<div class="mineral-icon">${mineralIcon}</div>
					<div>${c.mineralCost}</div>
				</div>
			</div>
		</div>
	`;
};
