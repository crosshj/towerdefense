import { getCurrentGacha } from '../../$data/gacha.js';
import { gearAll } from '../../$data/gearAll.js';
import { addNewCharacter } from '../../user/characters.js';
import { addNewGear } from '../../user/gear.js';
import { getCollection } from '../../user/getCollection.js';
import { forceUpdate } from '../../user/user.js';
import { attachTap } from '/utils/pointerEvents.js';

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
	// Shuffle the items array
	const shuffledItems = items
		.map((value) => ({ value, sort: Math.random() })) // Add a random sort key
		.sort((a, b) => a.sort - b.sort) // Sort using the random key
		.map(({ value }) => value); // Return the original item objects

	// Calculate total probability
	const totalProbability = shuffledItems.reduce(
		(sum, item) => sum + item.probability,
		0
	);

	let random = Math.random() * totalProbability;

	// Select an item based on probability
	for (let item of shuffledItems) {
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

const getRewards = async ({ gachaDetails, gear, characters }) => {
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

	//update data store
	for (const reward of rewards) {
		if (reward.rewardType === 'unit') {
			await addNewCharacter({
				code: reward.code,
			});
		}
		if (reward.rewardType === 'gear') {
			await addNewGear({
				code: reward.code,
			});
		}
	}
	//TODO: charge the cost to the user
	await forceUpdate();

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

const showAnimation = async ({ duration }) => {
	const animatedBackground = document.querySelector('.animatedBackground');
	animatedBackground.classList.remove('hidden');
	await new Promise((r) => setTimeout(r, duration));
};

const attachButtons = async ({ params }) => {
	const okayButton = document.querySelector('.actions .okay');
	attachTap(okayButton, () => {
		window.parent.postMessage({
			_: 'navigate',
			src: '/pages/gacha/',
		});
	});
	const onceMoreButton = document.querySelector('.actions .onceMore');
	attachTap(onceMoreButton, () => {
		const { item, option, cost } = params;
		const src = `/modals/gachaConfirm/index.html?item=${item}&option=${option}&cost=${cost}`;
		window.parent.postMessage({
			_: 'navigate',
			src,
		});
	});
};

const setup = async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });

	attachButtons({ params });

	const gachaDetails = await getGachaDetails({ params });
	const characters = (await getCollection()).reduce((a, o) => {
		return { ...a, [o.code]: o };
	}, {});
	const rewards = await getRewards({
		gachaDetails,
		gear: gearAll,
		characters,
	});

	if (params?.skip + '' !== 'true') {
		pageDone();
		await showAnimation({ duration: 3000 });
		await showResults({ rewards });
	} else {
		await showResults({ rewards });
		pageDone();
	}
};

document.addEventListener('DOMContentLoaded', setup);
