import { SVGIcons } from '../../assets/icons.svg.js';
import { sellCharacters } from '../../user/characters.js';
import { calculateSellValue } from '../../utils/units.js';

const icons = {
	loading: SVGIcons.animatedSpinner(),
};

const sellUnits = async ({ units, elements }) => {
	elements.confirmContainer.classList.add('hidden');
	elements.loading.classList.remove('hidden');

	await sellCharacters(units);
	window.parent.postMessage({
		_: 'broadcastCharactersUpdate',
	});
	window.parent.postMessage({
		_: 'statsRefresh',
	});
	window.parent.postMessage({
		_: 'broadcastSaleComplete',
	});

	elements.loading.classList.add('hidden');
	elements.success.classList.remove('hidden');
};

const getElements = () => ({
	loading: document.querySelector('.loading'),
	unitsAmount: document.querySelector('.unitsAmount'),
	confirmAmount: document.querySelector('.confirmAmount'),
	confirmSellButton: document.querySelector('button.confirmSell'),
	cancelSellButton: document.querySelector('button.cancelSell'),
	confirmContainer: document.querySelector('.confirmContainer'),
	success: document.querySelector('.success'),
	successButton: document.querySelector('.success button'),
});

const domLoaded = async () => {
	const elements = getElements();
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);

	elements.loading.innerHTML = icons.loading;

	const units = JSON.parse(params.units);
	const amount = await calculateSellValue(units);

	elements.unitsAmount.innerHTML = units.length;
	elements.confirmAmount.innerHTML = amount;
	elements.cancelSellButton.addEventListener('pointerup', () => {
		window.parent.postMessage({
			_: 'broadcastSaleCanceled',
		});
		window.parent.postMessage({
			_: 'navigate',
		});
	});
	elements.confirmSellButton.addEventListener('pointerup', () => {
		sellUnits({ units, elements });
	});
	elements.successButton.addEventListener('pointerup', () => {
		window.parent.postMessage({
			_: 'navigate',
		});
	});

	elements.loading.classList.add('hidden');
	elements.confirmContainer.classList.remove('hidden');
};
document.addEventListener('DOMContentLoaded', domLoaded);
