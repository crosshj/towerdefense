import { getLocationMap } from '../../utils/locations.js';

const getRewards = async ({ world, stage }) => {
	return [
		{
			grade: 1,
			image: '/assets/minerals/placeholder.svg',
		},
		{
			grade: 2,
			image: '/assets/minerals/placeholder.svg',
		},
		{
			grade: 1,
			image: '/assets/minerals/placeholder.svg',
		},
		{
			grade: 2,
			image: '/assets/minerals/placeholder.svg',
		},
		{
			grade: 1,
			image: '/assets/minerals/placeholder.svg',
		},
		{
			grade: 2,
			image: '/assets/minerals/placeholder.svg',
		},
	];
};
const getStageData = async ({ locationMap, world, stage }) => {
	const locationLabel = locationMap[world]?.name || world;
	console.log('getStageData', { world, stage });
	return {
		difficulty: '---',
		title: `${locationLabel} ${stage}`,
		retries: '-',
		retriesLeft: '-',
	};
};

const StageDetails = (stageData) => `
	<div class="difficulty">
		<div class="label">Difficulty Level</div>
		<div class="value">${stageData.difficulty}</div>
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

const attachHandlers = ({ params }) => {
	const { world, stage } = params;
	const enterButton = document.querySelector('button.enter');
	enterButton.addEventListener('pointerup', () => {
		const src = `/pages/game/selectTeam/index.html?stage=special&zone=${world}&number=${stage}&back=/pages/specialStage/index.html`;
		window.parent.postMessage({ _: 'navigate', src });
	});
};

const attachRewards = async ({ params }) => {
	const { world, stage } = params;
	const rewardsDefs = await getRewards({ world, stage });
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

const attachDetails = async ({ params }) => {
	const { world, stage } = params;
	const locationMap = await getLocationMap({ stage: 'special' });
	const stageData = await getStageData({ locationMap, world, stage });
	const leftPanel = document.querySelector('.container .left');
	leftPanel.innerHTML = StageDetails(stageData);
};

const domLoaded = async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });

	await attachDetails({ params });
	await attachRewards({ params });

	attachHandlers({ params });
	pageDone({ params });
};

document.addEventListener('DOMContentLoaded', domLoaded);
