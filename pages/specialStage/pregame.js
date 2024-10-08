import { getStageInfo } from '../../utils/stageInfo.js';

const pageDone = ({ params }) => {
	window.parent.postMessage({
		_: 'title',
		title: 'SPECIAL STAGE',
		visibility: 'visible',
		back: '/pages/specialStage/index.html',
	});
	const args = {
		feathers: true,
		gems: true,
		coins: true,
		friendPoints: false,
	};
	window.parent.postMessage({ _: 'stats', ...args });
	window.parent.postMessage({ _: 'loaded' });
};

const StageDetails = (stageData) => `
	<div class="difficulty ${(stageData?.difficulty || '').toLowerCase() || ''}">
		<div class="label">Difficulty Level</div>
		<div class="value">${stageData.difficulty}</div>
		<div class="bar">
			${'<div class="filled"></div>'.repeat(Number(stageData.difficultyLevel))}
			${'<div class="empty"></div>'.repeat(6 - Number(stageData.difficultyLevel))}
		</div>
	</div>
	<div class="title">
		${stageData.title}
	</div>
	<div>
		<div class="retries">
			<span># of retries left</span>
			<span class="remaining">${stageData.retriesLeft}</span>
			<span>/ ${stageData.retries}</span>
			<div class="addRetries">+</div>
		</div>
	</div>
`;

const RewardBox = (rewardDef) => `
		<img src="${rewardDef.image}" />
		<div class="stars">${'★'.repeat(rewardDef.grade)}</div>
`;

const attachHandlers = ({ params }) => {
	const { world, stage } = params;
	const enterButton = document.querySelector('button.enter');
	enterButton.addEventListener('pointerup', () => {
		const src = `/pages/game/selectTeam/index.html?zone=special&stage=special&world=${world}&number=${stage}&back=/pages/specialStage/index.html`;
		window.parent.postMessage({ _: 'navigate', src });
	});
};

const attachRewards = ({ stageData }) => {
	const rewardsDefs = stageData.rewards;
	const rewardsDom = document.querySelectorAll('.potentialRewards .reward');
	for (const [i, dom] of Object.entries(rewardsDom)) {
		if (!rewardsDefs[i]) {
			dom.classList.remove('used');
			continue;
		}
		dom.classList.add('used');
		dom.innerHTML = RewardBox(rewardsDefs[i]);
	}
};

const attachDetails = ({ stageData }) => {
	const leftPanel = document.querySelector('.container .left');
	leftPanel.innerHTML = StageDetails(stageData);
};

const attachSelector = ({ params, stageData }) => {
	const rightArrow = document.querySelector('.rightArrow');
	rightArrow.addEventListener('pointerup', () => {
		const src = `/pages/specialStage/pregame.html?world=${params.world}&stage=${parseInt(params.stage) + 1}`;
		window.parent.postMessage({ _: 'navigate', src });
	});
	if (params.stage === '6') {
		rightArrow.style.visibility = 'hidden';
	}

	const leftArrow = document.querySelector('.leftArrow');
	leftArrow.addEventListener('pointerup', () => {
		const src = `/pages/specialStage/pregame.html?world=${params.world}&stage=${parseInt(params.stage) - 1}`;
		window.parent.postMessage({ _: 'navigate', src });
	});
	if (params.stage === '1') {
		leftArrow.style.visibility = 'hidden';
	}

	//TODO: attach indicator using stageData
};

const domLoaded = async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });

	const { world, stage } = params;
	const stageData = await getStageInfo({
		stage: 'special',
		zone: world,
		number: stage,
	});
	console.log({ stageData });

	attachDetails({ stageData });
	attachRewards({ stageData });
	attachSelector({ params, stageData });

	attachHandlers({ params });
	pageDone({ params });
};

document.addEventListener('DOMContentLoaded', domLoaded);
