import { assignGearToUnit } from '../../../user/gear.js';
import {
	getCurrentCharCache,
	getCurrentGearCache,
} from '../../../utils/cache.js';
import { attachTap } from '../../../utils/pointerEvents.js';

const icons = {};

const friendlyEffectName = (name) => {
	const friendlyMap = {
		physicalAttack: 'Physical ATK',
		hp: 'HP',
	};
	return friendlyMap[name] || name;
};

const GearDetail = (gear, { sell, equip } = {}) => {
	const sellClasses = ['sell-button'];
	!sell && sellClasses.push('hidden');
	const equipClasses = ['equip-button'];
	!equip && equipClasses.push('hidden');

	const effectsDom = Object.entries(gear.effects).map(
		([k, v]) => `
		<div class="item-effect">
			<div class="effect-label">${friendlyEffectName(k)}</div>
			<div class="effect-value">${v}</div>
		</div>
	`
	);

	return `
	<div class="closeButton">x</div>
	<div class="item-name">
		<img src="${gear.image}" />
		<div>
			<div class="stars">
				${'★'.repeat(gear.grade)}
			</div>
			<div>${gear.name}</div>
		</div>
		<div class="lock"></div>
	</div>
	<div class="item-stats">
		<div class="level">+0</div>
		<div class="progress-bar">
			<span class="progress-text">0%</span>
		</div>
		<button class="enhance-button">Enhance</button>
	</div>
	<div class="effects">
		${effectsDom.join('\n')}
	</div>
	<div class="action-buttons">
		<button class="${sellClasses.join(' ')}">Sell</button>
		<button class="${equipClasses.join(' ')}">Equip</button>
	</div>
`;
};
const attachButtons = ({ equipGear }) => {
	const closeButtons = document.querySelectorAll('.closeButton');
	for (const button of closeButtons) {
		attachTap(button, () => {
			window.parent.postMessage({
				_: 'navigate',
			});
		});
	}
	const equipOverlay = document.querySelector('.equipOverlay');
	const equipOkay = document.querySelector('.equipOverlay .okay');
	attachTap(equipOkay, equipGear);
	const equipCancel = document.querySelector('.equipOverlay .cancel');
	attachTap(equipCancel, () => {
		equipOverlay.classList.add('hidden');
	});
	const rightEquipButton = document.querySelector('.right .equip-button');
	attachTap(rightEquipButton, () => {
		equipOverlay.classList.remove('hidden');
	});
	const rightSellButton = document.querySelector('.right .sell-button');
	attachTap(rightSellButton, () => {
		console.log('TODO: sell this equipment');
		window.parent.postMessage({
			_: 'navigate',
		});
	});
	const rightEnhancelButton = document.querySelector(
		'.right .enhance-button'
	);
	attachTap(rightEnhancelButton, () => {
		window.parent.postMessage({
			_: 'navigate',
			src: '/pages/gear/enhance.html',
		});
	});
};

const attachLeft = ({ params, unit, gear }) => {
	const unitGear = unit?.gear?.[params.type];
	if (!unitGear) return;
	const leftPane = document.querySelector('.container .left');
	leftPane.classList.remove('hidden');
	leftPane.innerHTML = GearDetail(unitGear);
};

const attachRight = ({ params, unit, gear }) => {
	if (!gear) return;
	const rightPane = document.querySelector('.container .right');
	rightPane.classList.remove('hidden');
	const sell = false;
	const equip = true;
	rightPane.innerHTML = GearDetail(gear, { sell, equip });
};

const domLoaded = async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });

	const unit = getCurrentCharCache();
	const gear = getCurrentGearCache();

	const equipGear = async () => {
		const { error } = await assignGearToUnit(gear.id, unit.id);
		if (error) {
			console.log({ error });
			return;
		}
		window.parent.postMessage({
			_: 'broadcastGearChanged',
		});
		window.parent.postMessage({
			_: 'navigate',
		});
	};

	attachLeft({ params, unit, gear });
	attachRight({ params, unit, gear });
	attachButtons({ equipGear });
};
document.addEventListener('DOMContentLoaded', domLoaded);
