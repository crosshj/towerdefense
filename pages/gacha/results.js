import { getCurrentGacha } from '../../$data/gacha.js';
import { gearAll } from '../../$data/gearAll.js';
import { getCollection } from '../../user/getCollection.js';

const pageTitle = 'GACHA';
const pageDone = () => {
	document.title = 'TD: ' + pageTitle;
	window.parent.postMessage({
		_: 'stats',
		visibility: 'hidden',
	});
	window.parent.postMessage({
		_: 'title',
		title: '',
		visibility: 'hidden',
	});
	window.parent.postMessage({ _: 'loaded' });
};

function getRandomItem(items) {
	const totalProbability = items.reduce(
		(sum, item) => sum + item.probability,
		0
	);
	let random = Math.random() * totalProbability;

	for (let item of items) {
		if (random < item.probability) {
			return item;
		}
		random -= item.probability;
	}
}

const getGachaDetails = async ({ params }) => {
	const all = await getCurrentGacha();
	const gacha = [...all.gear, ...all.units].find((x) => x.id === params.item);
	const option = gacha.options.find(
		(x) => x.type === params.option && x.cost + '' === params.cost
	);
	const drops = all.drops[gacha.id];
	return {
		drops,
		gacha,
		option,
	};
};

const getRewards = async ({ params, gear, characters }) => {
	const gachaDetails = await getGachaDetails({ params });
	let { pulls } = gachaDetails.option;
	pulls = pulls.includes('+')
		? pulls.split('+').reduce((a, o) => Number(o) + a, 0)
		: Number(pulls);

	const rewardType = gachaDetails.gacha.id.startsWith('gear')
		? 'gear'
		: 'unit';
	const rewards = [];
	for (const _pull of new Array(pulls)) {
		const randomItem = getRandomItem(gachaDetails.drops);
		const hydrated =
			rewardType === 'gear'
				? gear[randomItem.code]
				: characters[randomItem.code];
		hydrated.rewardType = rewardType;
		rewards.push(hydrated);
	}
	return rewards;
};

const showResults = async ({ rewards }) => {
	const resultsEl = document.querySelector('.results');
	resultsEl.classList.remove('hidden');
	const containerEl = document.querySelector('.results .container');
	containerEl.classList.add('items-' + rewards.length);
	const ItemElement = (x) => {
		return `
			<div class="reward ${x.rewardType}">
				<img src="${x.image}" >
			</div>
		`;
	};
	containerEl.innerHTML = rewards.map(ItemElement).join('\n');
};

const showAnimation = async () => {
	const animatedBackground = document.querySelector('.animatedBackground');
	animatedBackground.classList.remove('hidden');
	await new Promise((r) => setTimeout(r, 4000));
};

const setup = async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });
	const gear = gearAll;
	const characters = (await getCollection()).reduce((a, o) => {
		return { ...a, [o.code]: o };
	}, {});
	const rewards = await getRewards({ params, gear, characters });

	if (params?.skip + '' !== 'true') {
		pageDone();
		await showAnimation();
		await showResults({ rewards });
	} else {
		await showResults({ rewards });
		pageDone();
	}
};

document.addEventListener('DOMContentLoaded', setup);
