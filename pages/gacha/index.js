const pageTitle = 'GACHA';

const attachSelectedDetails = async (selected) => {
	const actions = document.querySelector('.selected .actions');
	const banner = document.querySelector('.selected .banner');
	const bannerBg = banner.querySelector('.background');
	const expiresDate = banner.querySelector('.expires .date');
	const expiresTime = banner.querySelector('.expires .time');
	const update = (selected) => {
		actions.innerHTML = `
			<button>tickets</button>
			<button>rubies</button>
		`;
		bannerBg.innerHTML = selected?.name || '---';
		bannerBg.style.background = '#62bd62';
		expiresDate.textContent = '2024/06/27';
		expiresTime.textContent = '23:00';
	};
	return { update };
};

const ListItemComponent = (item, i) => `
	<div class="listItem" data-index="${i}">
		${item.type} - ${i}
	</div>
`;

const attachList = async ({ selectedDetails }) => {
	const el = document.querySelector('.list');
	const update = async (type) => {
		const items = new Array(10).fill().map((x) => {
			return { type };
		});
		el.innerHTML = items.map(ListItemComponent).join('\n');
		el.scrollTop = 0;

		const selectListItem = (selectedItem) => {
			const prevSelected = document.querySelector('.listItem.selected');
			prevSelected && prevSelected.classList.remove('selected');
			const selectedItemEl = el.querySelector(
				`& > div:nth-child(${selectedItem + 1})`
			);
			selectedItemEl && selectedItemEl.classList.add('selected');
			selectedDetails.update({
				name: `${type}-${selectedItem}`,
			});
		};
		selectListItem(0);

		el.addEventListener('pointerdown', (e) => {
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
	el.addEventListener('pointerdown', (e) => {
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

	const selectedDetails = await attachSelectedDetails();
	const list = await attachList({ selectedDetails });
	const selector = await attachListSelector({ params, list });
	selector.selectTab('units');

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
