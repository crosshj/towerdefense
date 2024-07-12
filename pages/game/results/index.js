import { getStageRewards } from '../../../stages/index.js';
import { addStats } from '../../../user/stats.js';

const updateRewards = async (rewards) => {
	const { bonus, exp, coins } = rewards;

	await addStats({
		coins,
		exp: exp.player
	});

	//TODO: update team exp from rewards
	console.log(rewards);

	const userCoinDom = document.querySelector('.userCoin');
	const userEXPDom = document.querySelector('.userEXP');
	const teamEXPDom = document.querySelector('.teamEXP');
	const bonusDom = document.querySelector('.bonus');

	userCoinDom.innerHTML = `<p>COIN: ${coins}</p>`;
	userEXPDom.innerHTML = `<p>User EXP: ${exp.player}</p>`;
	teamEXPDom.innerHTML = `<p>Team EXP: ${exp.unit}</p>`;

	/* prettier-ignore */
	bonusDom.innerHTML = `
		<p>BONUS type: ${bonus.type}</p>
		<p>BONUS name: ${bonus.key}</p>
		${bonus.amount
			? `<p>BONUS amount: ${bonus.amount}</p>`
			: ``
		}
	`;
};

document.addEventListener('DOMContentLoaded', async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });

	const rewards = await getStageRewards(params);
	await updateRewards(rewards);

	window.parent.postMessage({
		_: 'stats',
		feathers: false,
		gems: false,
		coins: false,
		friendPoints: false
	});
	window.parent.postMessage({
		_: 'title',
		title: '',
		visibility: 'hidden'
	});

	document.body.addEventListener('mousedown', () => {
		window.parent.postMessage({
			_: 'navigate',
			src: '/pages/mainStage/index.html'
		});
	});

	window.parent.postMessage({ _: 'loaded' });
});
