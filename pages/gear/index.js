import { SVGIcons } from '../../assets/icons.svg.js';
import { getGear } from '../../user/gear.js';
import { getCurrentCharCache, setCurrentGearCache } from '../../utils/cache.js';
import { attachTap } from '../../utils/pointerEvents.js';

const pageTitle = 'GEAR';

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
		visibility: 'visible',
	});
	window.parent.postMessage({ _: 'loaded' });
};

const attachListSelector = async ({ params, list }) => {
	const el = document.querySelector('.listSelector');
	let selectedTab = 'weapon';
	if (params?.armor) {
		selectedTab = 'armor';
	}
	if (params?.accessory) {
		selectedTab = 'accessory';
	}
	el.innerHTML = `
		<div class="tabContainer">
			<div data-type="weapon" class="tab weapon">
				${icons.weapon}
			</div>
			<div data-type="armor" class="tab armor" >
				${icons.armor}
			</div>
			<div data-type="accessory"	class="tab accessory">
				${icons.accessory}
			</div>
		</div>
		<div class="selectedText">
			${selectedTab}
		</div>
	`;

	const selectedText = el.querySelector('.selectedText');
	const selectTab = (type) => {
		const newTab = el.querySelector(`.tab.${type}`);
		if (!newTab) {
			console.log(`Error selecting tab: ${type}`);
			return;
		}
		const currentTab = el.querySelector('.tab.selected');
		currentTab && currentTab.classList.remove('selected');

		newTab.classList.add('selected');
		selectedText.textContent = type;
		list.update(type);
	};
	selectTab(selectedTab);

	el.addEventListener('pointerdown', (e) => {
		const { target } = e;
		const { type } = target.dataset;
		if (target.classList.contains('selected')) return;
		selectTab(type);
	});

	return {
		getSelected: () => selectedTab,
		selectTab,
	};
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

const attachUnitDetails = async ({ unit }) => {
	const unitSelected = document.querySelector('.unitSelected');
	const unitEmpty = document.querySelector('.unitEmpty');
	if (!unit) {
		unitSelected.classList.add('hidden');
		unitEmpty.classList.remove('hidden');
		return;
	}
	unitEmpty.classList.add('hidden');
	unitSelected.classList.remove('hidden');
	const el = document.querySelector('.unitInfo');
	const thumbEl = document.querySelector('.unitThumbnail');
	el.innerHTML = `
		${unit?.displayName || ''}
	`;
	thumbEl.innerHTML = `
		<img src="${unit.imageUri}" >
	`;
	return {};
};

const attachSlots = ({ unit, selector }) => {
	const unitGearEl = document.querySelector('.unitGear');
	attachTap(unitGearEl, (e) => {
		const { type } = e.target.dataset;
		selector.selectTab(type);
		showGearDetailModal({ unit, type });
	});
};

const attachUnitSelect = ({} = {}) => {
	const emptyEl = document.querySelector('.unitEmpty');
	attachTap(emptyEl, (e) => {
		window.parent.postMessage({
			_: 'navigate',
			src: `/modals/unit/select/index.html`,
		});
	});
};

const setup = async () => {
	document.title = 'TD: ' + pageTitle;
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });

	const unit = getCurrentCharCache();

	const gear = await getGear();
	const list = await attachList({ gear });
	const selector = await attachListSelector({ params, list });

	const unitDetails = await attachUnitDetails({ unit });

	attachSlots({ unit, unitDetails, selector });
	attachUnitSelect();

	pageDone();
};

document.addEventListener('DOMContentLoaded', setup);
