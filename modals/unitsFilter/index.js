import { getUnitsFilterCache, setUnitsFilterCache } from '../../utils/cache.js';

const $ = window.$ || ((selector) => document.querySelector(selector));

const attachOptions = async () => {
	const filterOptionsIn = getUnitsFilterCache() || [];
	for (const option of filterOptionsIn) {
		const el = document.querySelector(`.option[data-id="${option}"]`);
		if (!el) continue;
		el.classList.add('selected');
	}

	$('.dialog').addEventListener('pointerup', (e) => {
		const target = e?.target;
		if (target.classList.contains('option')) {
			target.classList.toggle('selected');
		}
	});

	$('.actions .reset').addEventListener('pointerup', (e) => {
		const allSelected = document.querySelectorAll('.option.selected');
		allSelected.forEach((x) => x.classList.remove('selected'));
		setUnitsFilterCache(false);
		window.parent.postMessage({
			_: 'broadcastUnitFilterUpdate',
		});
		window.parent.postMessage({
			_: 'navigate',
		});
	});

	$('.actions .okay').addEventListener('pointerup', (e) => {
		const allSelected = document.querySelectorAll('.option.selected');
		const filterOptions = Array.from(allSelected).map((x) => x.dataset.id);
		setUnitsFilterCache(filterOptions);
		window.parent.postMessage({
			_: 'broadcastUnitFilterUpdate',
		});
		window.parent.postMessage({
			_: 'navigate',
		});
	});
};

const domLoaded = async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });

	await attachOptions();
};
document.addEventListener('DOMContentLoaded', domLoaded);
