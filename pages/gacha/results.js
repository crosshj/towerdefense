import { getCurrentGacha } from '../../$data/gacha.js';
import { gearAll } from '../../$data/gearAll.js';
import { addNewCharacter } from '../../user/characters.js';
import { addNewGear } from '../../user/gear.js';
import { getCollection } from '../../user/getCollection.js';
import { addStats } from '../../user/stats.js';
import { forceUpdate } from '../../user/user.js';
import { clone } from '../../utils/utils.js';
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

const getRandomInRange = (min, max) => {
	if (Number.isInteger(min) && Number.isInteger(max))
		return Math.floor(Math.random() * (max - min + 1)) + min;
	const precision = Math.max(
		(min.toString().split('.')[1] || '').length,
		(max.toString().split('.')[1] || '').length
	);
	return (Math.random() * (max - min) + min).toFixed(precision);
};

const processEffects = (effects) => {
	const result = {};
	for (const key in effects) {
		const value = effects[key];
		const isPercentage = value.includes('%');
		const range = value.replace('%', '').split(' - ').map(Number);
		result[key] = isPercentage
			? getRandomInRange(range[0], range[1]) + '%'
			: getRandomInRange(range[0], range[1]);
	}
	return result;
};

const GearInstance = (gearDefintion) => {
	const gearInstance = clone(gearDefintion);
	gearInstance.effects = processEffects(gearInstance.effects);
	return gearInstance;
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
	const getPull = () => {
		try {
			const randomItem = getRandomItem(gachaDetails.drops);
			const hydrated =
				rewardType === 'gear'
					? GearInstance({
							...gear[randomItem.code],
							code: randomItem.code,
						})
					: characters[randomItem.code];
			if (!hydrated) {
				throw new Error(
					`${randomItem?.code} has a problem!`,
					randomItem
				);
			}
			hydrated.rewardType = rewardType;
			return hydrated;
		} catch (e) {
			console.log(e);
			return getPull();
		}
	};
	for (const _pull of new Array(pulls)) {
		const result = getPull();
		rewards.push(result);
	}

	//update data store
	for (const reward of rewards) {
		if (reward.rewardType === 'unit') {
			await addNewCharacter(reward);
		}
		if (reward.rewardType === 'gear') {
			await addNewGear(reward);
		}
	}

	const { option } = gachaDetails;
	if (option.type === 'ruby') {
		await addStats({ gems: -1 * Number(option.cost) });
	}
	if (option.type === 'ticket') {
		await addStats({ gachaTickets: -1 * Number(option.cost) });
	}

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
