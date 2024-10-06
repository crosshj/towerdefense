import { getActiveStages } from '../../utils/stageInfo.js';
import { attachHorizontalScroll } from '../my-team/handlePointerEvents.js';

const pageTitle = 'SPECIAL STAGE';

const StageContainer = (args) => {
	const { image = '', name = '', id = '', difficulty } = args || {};
	return `
		<div class="world">
			${args.status === 'COMING SOON' ? '<div class="comingSoon">COMING SOON</div>' : ''}
			<div class="central-image" style="background-image: url('${image}');"></div>

			<div class="stage" data-stage="${id}|1" style="top: 65%; left: 10%;">1</div>
			<div class="stage" data-stage="${id}|2" style="top: 40%; left: 0%;">2</div>
			<div class="stage" data-stage="${id}|3" style="top: 15%; left: 20%;">3</div>
			<div class="stage" data-stage="${id}|4" style="top: 15%; right: 20%;">4</div>
			<div class="stage" data-stage="${id}|5" style="top: 40%; right: 0%;">5</div>
			<div class="stage special" data-stage="${id}|6" style="top: 65%; right: 10%; background-color: rgba(255, 50, 50, 0.5);">😈</div>

			<div class="timer"></div>
			<div class="title" style="color:${args.color || 'white'}">${name}</div>
			${difficulty ? `<div class="difficulty ${difficulty.toLowerCase()}">${difficulty}</div>` : ''}
		</div>
	`;
};

const attachWorlds = async () => {
	const scrollDiv = document.querySelector('.scroll');
	const activeWorlds = await getActiveStages({ stage: 'special' });
	scrollDiv.innerHTML = `
		<div class="worldSpacer"></div>
		${activeWorlds.map(StageContainer).join('')}
		<div class="worldSpacer"></div>
	`;
};

const attachHandlers = () => {
	const scrollDiv = document.querySelector('.scroll');
	scrollDiv.addEventListener('pointerup', (e) => {
		const [world, stage] = (e.target?.dataset?.stage || '').split('|');
		if (!world || !stage) {
			console.log('unhandled stage click', e.target);
			return;
		}
		const src = `/pages/specialStage/pregame.html?world=${world}&stage=${stage}`;
		window.parent.postMessage({ _: 'navigate', src });
	});

	const myMaterials = document.querySelector('.myMaterials');
	myMaterials.addEventListener('pointerup', () => {
		window.parent.postMessage({
			_: 'navigate',
			src: 'pages/materials/index.html?back=/pages/specialStage/index.html',
		});
	});

	const stageEntryTime = document.querySelector('.stageEntryTime');
	stageEntryTime.addEventListener('pointerup', () => {
		window.parent.postMessage({
			_: 'navigate',
			src: '/modals/specialStageInfo/index.html',
		});
	});
};

const setup = async () => {
	document.title += `: ${pageTitle}`;

	const container = document.querySelector('.container');
	attachHorizontalScroll(container);

	await attachWorlds();
	attachHandlers();

	window.parent.postMessage({
		_: 'stats',
		feathers: true,
		gems: true,
		coins: true,
		friendPoints: false,
	});
	window.parent.postMessage({
		_: 'title',
		title: pageTitle,
		visibility: 'visible',
	});
	window.parent.postMessage({ _: 'loaded' });
};

document.addEventListener('DOMContentLoaded', setup);
