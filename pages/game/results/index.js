import { getStageRewards } from '../../../stages/index.js';

const updateRewards = async (rewards) => {
	//TODO: update user records for rewards
	console.log(rewards);

	const userCoinDom = document.querySelector('.userCoin');
	const userEXPDom = document.querySelector('.userEXP');
	const teamEXPDom = document.querySelector('.teamEXP');
	const bonusDom = document.querySelector('.bonus');

	userCoinDom.innerHTML = `<p>COIN: ${rewards.coin}</p>`;
	userEXPDom.innerHTML = `<p>User EXP: ${rewards.exp.player}</p>`;
	teamEXPDom.innerHTML = `<p>Team EXP: ${rewards.exp.unit}</p>`;

	/* prettier-ignore */
	bonusDom.innerHTML = `
		<p>BONUS type: ${rewards.bonus.type}</p>
		<p>BONUS name: ${rewards.bonus.key}</p>
		${rewards.bonus.amount
			? `<p>BONUS amount: ${rewards.bonus.amount}</p>`
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
