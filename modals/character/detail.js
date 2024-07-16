import { getTeamFromNumber } from '../../pages/_utils/getTeam.js';
import { nodeTree, populateNodeTree } from './detailDom.js';

const getElementColor = (element) => {
	if (element === 'Fighting') return 'red';
	if (element === 'Rock') return 'grey';
	if (element === 'Fairy') return 'pink';
	if (element === 'Air') return '#82cceb';
	if (element === 'Dragon') return '#6320ff';
	if (element === 'Fire') return 'orange';
	if (element === 'Electric') return 'yellow';
	if (element === 'Earth') return '#9c6943';
	if (element === 'Dark') return '#6e62c8';
	if (element === 'Bug') return '#a3b721';
	const color = 'grey';
	return color;
};

const updateValues = async ({ params, nodeTree }) => {
	const { sub, slot, team = 1 } = params;
	const currentTeam = await getTeamFromNumber(team);
	const character = currentTeam[sub][Number(slot) - 1];

	window.character = character;
	window.nodeTree = nodeTree;

	const { left, right } = nodeTree.container.content;
	left.stars.innerText = '★'.repeat(character.stars);
	left.character.image.append(character.image);
	left.name.second.innerText = character.displayName;
	left.element.name.innerText = character.element;
	left.element.icon.style.background = getElementColor(character.element);
	left.character.background.style.background = getElementColor(
		character.element
	);
	left.loading.style.display = 'none';

	right.rowOne.level.current.innerText = character.level;
	const levelPercent =
		Math.floor(Number(character.levelNextPercent) / 10) * 10;
	right.rowOne.percent.number.innerText =
		Math.floor(character.levelNextPercent) + '%';
	right.rowOne.percent.bar.classList.remove('fill-0');
	right.rowOne.percent.bar.classList.add('fill-' + levelPercent);
	right.loading.style.display = 'none';
	right.rowTwo.mineral.amount.innerText = character.mineralCost + '';
	right.details.basic.metrics.attack.value.innerText = character.attack + '';
	right.details.basic.metrics.health.value.innerText = character.hp + '';
	right.details.basic.metrics.defense.value.innerText =
		character.defense || 0 + '';
};

const attachHandlers = (nodeTree) => {
	nodeTree.container.closeButton.addEventListener('pointerdown', () => {
		window.parent.postMessage({
			_: 'navigate'
		});
	});
};

document.addEventListener('DOMContentLoaded', async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	populateNodeTree(nodeTree);
	attachHandlers(nodeTree);
	await updateValues({ nodeTree, params });
});
