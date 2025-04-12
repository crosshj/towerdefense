import { SVGIcons } from '../../assets/icons.svg.js';
import { getCharacters } from '../../user/characters.js';
import { getGear } from '../../user/gear.js';
import {
	getCurrentCharCache,
	setCurrentCharCache,
	setCurrentGearCache,
} from '../../utils/cache.js';
import { attachTap } from '../../utils/pointerEvents.js';
import { debug } from '../../utils/debug.js';

const pageTitle = 'GEAR';

const icons = {
	weapon: SVGIcons.sword(),
	armor: SVGIcons.shield(),
	accessory: SVGIcons.ring(),
};

const pageDone = () => {
	debug.log('pageDone');
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
	debug.log('attachListSelector');
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
		list.setType(type);
		list.render();
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

const ListItemComponent = (allUnits) => {
	const allUnitsGear = [];
	for (const { gear } of allUnits) {
		if (gear.weapon) allUnitsGear.push(gear.weapon.id);
		if (gear.armor) allUnitsGear.push(gear.armor.id);
		if (gear.accessory) allUnitsGear.push(gear.accessory.id);
	}
	return (item) => {
		const itemClasses = ['listItem'];
		if (allUnitsGear.includes(item.id)) {
			itemClasses.push('used');
		}
		return `
			<div class="${itemClasses.join(' ')}" data-code="${item.code}" data-id="${item.id}">
				<div class="icon">
					<img src="${item.image}" />
				</div>
				<div class="details">
					<div class="grade">${'★'.repeat(item.grade)}</div>
					<div class="name">${item.name}</div>
				</div>
			</div>
		`;
	};
};

const showGearDetailModal = ({ unit, type, gear, isUsed } = {}) => {
	setCurrentGearCache(gear);
	if (unit && !unit?.gear?.[type]) return;
	window.parent.postMessage({
		_: 'navigate',
		src: `/modals/gear/detail/index.html?type=${type}&isUsed=${isUsed}`,
	});
};

const attachList = async ({ gear }) => {
	debug.log('attachList');
	const el = document.querySelector('.list');
	let currentType;
	let currentAllUnits;
	const render = () => {
		const items = gear.filter((x) => x.type === currentType);
		const listRender = ListItemComponent(currentAllUnits);
		el.innerHTML = items.map(listRender).join('\n');
	};
	attachTap(el, (e) => {
		console.log(e.target);
		showGearDetailModal({
			type: currentType,
			gear: gear.find((x) => x.id === e.target.dataset.id),
			isUsed: e.target.classList.contains('used'),
		});
	});
	return {
		render,
		setType: (type) => (currentType = type),
		setAllUnits: (allUnits) => (currentAllUnits = allUnits),
	};
};

const attachUnitDetails = async ({ unit }) => {
	debug.log('attachUnitDetails');
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

const attachSlots = ({ gear, selector }) => {
	debug.log('attachSlots');
	let thisUnit;
	const unitGearEl = document.querySelector('.unitGear');
	const slots = {
		weapon: unitGearEl.querySelector('.weapon'),
		armor: unitGearEl.querySelector('.armor'),
		accessory: unitGearEl.querySelector('.accessory'),
	};
	attachTap(unitGearEl, (e) => {
		const { type } = e.target.dataset;
		selector.selectTab(type);
		showGearDetailModal({
			unit: thisUnit,
			type,
		});
	});
	const updateSlots = ({ unit }) => {
		thisUnit = unit;
		const allSlots = Object.entries(slots);
		for (const [slotType, slot] of allSlots) {
			const image = unit?.gear?.[slotType]?.image;
			if (!image) {
				slot.innerHTML = '';
				continue;
			}
			slot.innerHTML = `<img src='${image}' />`;
		}
	};
	return { updateSlots };
};

const attachUnitSelect = ({} = {}) => {
	debug.log('attachUnitSelect');
	const emptyEl = document.querySelector('.unitEmpty');
	attachTap(emptyEl, (e) => {
		window.parent.postMessage({
			_: 'navigate',
			src: `/modals/unit/select/index.html`,
		});
	});
};

const refreshUnit = async ({ allUnits }) => {
	debug.log('refreshUnit');
	const cache = getCurrentCharCache();
	const unit = cache?.id && allUnits.find((x) => x.id === cache?.id);
	if (!unit) return cache;
	unit.imageUri = unit.imageUri || cache.imageUri;
	setCurrentCharCache(unit);
	return unit;
};

const setup = async () => {
	try {
		document.title = 'TD: ' + pageTitle;
		const params = Object.fromEntries(
			new URLSearchParams(window.location.search)
		);
		debug.log({ params });

		debug.log('getCharacters');
		let allUnits = await getCharacters(true);

		debug.log('getGear');
		const gear = await getGear();

		let unit = await refreshUnit({ allUnits, gear });

		const list = await attachList({ gear });
		list.setAllUnits(allUnits);

		const selector = await attachListSelector({ params, list });

		await attachUnitDetails({ unit });

		const slots = attachSlots({ gear, selector });
		attachUnitSelect();

		slots.updateSlots({ unit, gear });

		window.addEventListener('message', async (event) => {
			const { _, ...args } = event.data;
			if (_ === 'broadcastGearChanged') {
				allUnits = await getCharacters(true);
				unit = await refreshUnit({ allUnits });
				list.setAllUnits(allUnits);
				list.render();
				slots.updateSlots({ unit });
				return;
			}
		});

		pageDone();
	} catch (e) {
		debug.log({ error: e.message });
	}
};

document.addEventListener('DOMContentLoaded', setup);
