import { getCurrentGacha } from '../../$data/gacha.js';
import { SVGIcons } from '../../assets/icons.svg.js';

const icons = {
	loading: SVGIcons.animatedSpinner(),
};

const getElements = () => ({
	loading: document.querySelector('.loading'),
	confirmContainer: document.querySelector('.confirmContainer'),
	actionsCancel: document.querySelector('.actions .cancel'),
	actionsOkay: document.querySelector('.actions .okay'),
	pullsCount: document.querySelector('.pullsCount'),
	confirmCostIcon: document.querySelector('.confirmCost .icon'),
	confirmCostAmount: document.querySelector('.confirmCost .amount'),
});

const getGachaDetails = async ({ params }) => {
	const all = await getCurrentGacha();
	const gacha = [...all.gear, ...all.units].find((x) => x.id === params.item);
	const option = gacha.options.find(
		(x) => x.type === params.option && x.cost + '' === params.cost
	);
	return {
		gacha,
		option,
	};
};

const attachActions = ({ params, elements }) => {
	elements.actionsCancel.addEventListener('pointerup', () => {
		window.parent.postMessage({
			_: 'navigate',
		});
	});
	elements.actionsOkay.addEventListener('pointerup', () => {
		window.parent.postMessage({
			_: 'navigate',
			src: `/pages/gacha/results.html?item=${params.item}&option=${params.option}&cost=${params.cost}`,
		});
	});
};

const attachDialog = ({ gacha, elements }) => {
	const { option } = gacha;
	elements.pullsCount.innerText = option.pulls;
	elements.confirmCostIcon.classList.add(option.type);
	elements.confirmCostAmount.textContent = option.cost;
};

const domLoaded = async () => {
	const elements = getElements();
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	elements.loading.innerHTML = icons.loading;

	const gacha = await getGachaDetails({ params });
	attachDialog({ gacha, elements });
	attachActions({ params, elements });

	elements.loading.classList.add('hidden');
	elements.confirmContainer.classList.remove('hidden');
};
document.addEventListener('DOMContentLoaded', domLoaded);
