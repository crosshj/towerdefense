const pageTitle = 'SWAP SHOP';
const pageDone = ({ params }) => {
	document.title = `TD: ${pageTitle}`;
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
		back: params.back,
	});
	window.parent.postMessage({ _: 'loaded' });
};

const ListItem = (type) => (item, i) => `
    <div class="list-item ${type}">
        <div class="box">
            <div class="icon"></div>
            <div class="amount">
                ${item?.amount || '---'}
            </div>
        </div>
        <div class="name">
            ${type}-${i + 1}
        </div>
        <div class="cost">
            ${item?.cost || '---'}
        </div>
        <div class="limit">
            <div class="dark">
                ${item?.limit || '---'}
            </div>
            <div class="light">
                ${item?.limit || '---'}
            </div>
        </div>
    </div>
`;

const attachList = async () => {
	const el = document.querySelector(`.container .list`);
	const select = async (type) => {
		const items = new Array(12).fill();
		el.innerHTML = items.map(ListItem(type)).join('\n');
	};
	return { select };
};

const attachTabs = async ({ params, list }) => {
	const loadedTab = params?.selectedTab || 'guild';
	const selectorEl = document.querySelector('.selector');

	const selectTab = (selectedTab) => {
		const currentTab = document.querySelector('.tab.selected');
		currentTab && currentTab.classList.remove('selected');
		const selectedTabEl = document.querySelector(`.tab.${selectedTab}`);
		selectedTabEl.classList.add('selected');
		selectedTab = selectedTabEl.dataset.type;
		list.select(selectedTab);
	};
	selectTab(loadedTab);

	selectorEl.addEventListener('pointerdown', (e) => {
		const tab = e.target.dataset.type || 'guild';
		selectTab(tab);
	});

	return {
		selectTab,
	};
};

const setup = async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });

	const list = await attachList();
	await attachTabs({ params, list });
	pageDone({ params });
};

document.addEventListener('DOMContentLoaded', setup);
