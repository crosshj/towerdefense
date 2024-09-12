import { getCurrentGacha } from '../../$data/gacha.js';
import { attachTap } from '../../utils/pointerEvents.js';

const pageTitle = 'GACHA';

const ListItemComponent = (item, i) => `
	<div class="listItem" data-index="${i}" data-type="${item.type}">
		<img src="${item.thumb}" >
	</div>
`;

const Banner = (item) => {
	const background = item.imageBg || 'grey';
	return `
			<img src="${item.image}" style="background: ${background}">
	`;
};

const Actions = ({ item }) => {
	const options = [];
	for (const optionDef of item.options) {
		options.push(`
				<button data-item="${item.id}" data-option="${optionDef.type}" data-cost="${optionDef.cost}">
					<div class="pulls">
						<div>${optionDef.pulls}</div>
						<div>times</div>
					</div>
					<div class="cost">
						<div class="icon ${optionDef.type}"></div>
						<div class="amount"> ${optionDef.cost}</div>
					</div>
				</button>	
		`);
	}
	return options.join('\n');
};

const attachSelectedDetails = async () => {
	const actions = document.querySelector('.selected .actions');
	const banner = document.querySelector('.selected .banner');
	const bannerBg = banner.querySelector('.background');
	const expiresDate = banner.querySelector('.expires .date');
	const expiresTime = banner.querySelector('.expires .time');
	const update = (selected) => {
		actions.innerHTML = Actions({ item: selected });
		bannerBg.innerHTML = Banner(selected);
		bannerBg.style.background = '#62bd62';
		expiresDate.textContent = '2024/06/27';
		expiresTime.textContent = '23:00';
	};
	attachTap(actions, (e) => {
		console.log(
			'TODO: go to gacha!',
			e.target.dataset.item,
			e.target.dataset.option,
			e.target.dataset.cost
		);
	});
	return { update };
};

const attachList = async ({ gachaItems, selectedDetails }) => {
	const el = document.querySelector('.list');
	const update = async (type) => {
		el.innerHTML = gachaItems[type].map(ListItemComponent).join('\n');
		el.scrollTop = 0;

		const selectListItem = (selectedItem) => {
			const prevSelected = document.querySelector('.listItem.selected');
			prevSelected && prevSelected.classList.remove('selected');
			const selectedItemEl = el.querySelector(
				`& > div:nth-child(${selectedItem + 1})`
			);
			selectedItemEl && selectedItemEl.classList.add('selected');
			selectedDetails.update(gachaItems[type][selectedItem]);
		};
		selectListItem(0);

		attachTap(el, (e) => {
			selectListItem(Number(e.target.dataset.index));
		});
	};
	return {
		update,
	};
};

const attachListSelector = async ({ list, params }) => {
	const el = document.querySelector('.tabs');
	const selectTab = (type) => {
		const newTab = el.querySelector(`.tab.${type}`);
		if (!newTab) {
			console.log(`Error selecting tab: ${type}`);
			return;
		}
		const currentTab = el.querySelector('.tab.selected');
		currentTab && currentTab.classList.remove('selected');

		newTab.classList.add('selected');
		list.update(type);
	};
	attachTap(el, (e) => {
		const { target } = e;
		const { type } = target.dataset;
		if (target.classList.contains('selected')) return;
		selectTab(type);
	});
	return {
		selectTab,
	};
};

const setup = async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	document.title = 'TD: ' + pageTitle;

	const gachaItems = await getCurrentGacha();
	const selectedDetails = await attachSelectedDetails();
	const list = await attachList({ gachaItems, selectedDetails });
	const selector = await attachListSelector({ params, list });
	const tabSelected = ['units', 'gear'].includes(params?.tab)
		? params.tab
		: 'units';
	selector.selectTab(tabSelected);

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

document.addEventListener('DOMContentLoaded', setup);
