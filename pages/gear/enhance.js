import { SVGIcons } from '../../assets/icons.svg.js';
import { getGear } from '../../user/gear.js';
import { getCurrentGearCache, setCurrentGearCache } from '../../utils/cache.js';
import { attachTap } from '../../utils/pointerEvents.js';

const pageTitle = 'ENHANCE GEAR';

const icons = {
	weapon: SVGIcons.sword(),
	armor: SVGIcons.shield(),
	accessory: SVGIcons.ring(),
};

const pageDone = () => {
	window.parent.postMessage({
		_: 'stats',
		feathers: false,
		gems: true,
		coins: false,
		friendPoints: false,
	});
	window.parent.postMessage({
		_: 'title',
		title: pageTitle,
		back: '/pages/gear/index.html',
		visibility: 'visible',
	});
	window.parent.postMessage({ _: 'loaded' });
};

const ListItemComponent = (item) => `
	<div class="listItem" data-code="${item.code}" data-id="${item.id}">
		<div class="icon">
			<img src="${item.image}" />
		</div>
		<div class="details">
			<div class="grade">${'★'.repeat(item.grade)}</div>
			<div class="name">${item.name}</div>
		</div>
	</div>
`;

const showGearDetailModal = ({ unit, type, gear } = {}) => {
	gear && setCurrentGearCache(gear);
	if (unit && !unit?.gear?.[type]) return;
	window.parent.postMessage({
		_: 'navigate',
		src: `/modals/gear/detail/index.html?type=${type}`,
	});
};

const attachList = async ({ gear }) => {
	const el = document.querySelector('.list');
	let currentType;
	const update = async (type) => {
		currentType = type;
		const items = gear.filter((x) => x.type === type);
		el.innerHTML = items.map(ListItemComponent).join('\n');
	};
	attachTap(el, (e) => {
		showGearDetailModal({
			type: currentType,
			gear: gear.find((x) => x.id === e.target.dataset.id),
		});
	});
	return {
		update,
	};
};

const attachGearEnhance = ({ gearToEnhance }) => {
	const gearSelectedEl = document.querySelector('.gearSelected');
	const { image, effects, ...rest } = gearToEnhance;
	gearSelectedEl.innerHTML = `
		<div>GO BACK - THIS IS NOT WORKING YET!!!</div>
		<img src="${image}" />
		<div>${JSON.stringify(rest, null, 2)}</div>
	`;
};

const setup = async () => {
	document.title = 'TD: ' + pageTitle;
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });

	const gearToEnhance = getCurrentGearCache();
	const gear = await getGear();
	attachGearEnhance({ gearToEnhance });
	const list = await attachList({ gear });
	list.update(gearToEnhance.type);

	pageDone();
};

document.addEventListener('DOMContentLoaded', setup);
