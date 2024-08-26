import {
	getCurrentCharCache,
	setCurrentCharCache
} from '../../pages/_utils/cache.js';
import { nodeTree, populateNodeTree } from './detailDom.js';
import { SVGIcons } from '../../assets/icons.svg.js';
import { toggleCharacterLock } from '../../user/characters.js';

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

const updateValues = async ({ params, character, nodeTree }) => {
	//left
	const { left, right } = nodeTree.container.content;
	left.stars.innerText = '★'.repeat(character.stars);
	left.character.image.append(character.image);
	left.name.second.innerText = character.displayName;
	left.element.name.innerText = character.element;
	left.element.icon.style.background = getElementColor(character.element);
	left.character.background.style.background = getElementColor(
		character.element
	);

	//right
	right.rowOne.level.current.innerText = character.level;
	right.rowOne.level.max.innerText = character.maxLevel;

	if (character.uncappedLevel > 0 && character.uncappedLevel < 4) {
		right.rowOne.cap.classList.remove('hidden');
		right.rowOne.cap.innerText = `+${character.uncappedLevel}`;
	}
	if (character.uncappedLevel === 4) {
		right.rowOne.cap.classList.remove('hidden');
		right.rowOne.cap.innerText = `MAX`;
	}
	const levelPercent =
		Math.floor(Number(character.levelNextPercent) / 10) * 10;
	right.rowOne.percent.number.innerText =
		Math.floor(character.levelNextPercent) + '%';
	right.rowOne.percent.bar.classList.remove('fill-0');
	right.rowOne.percent.bar.classList.add('fill-' + levelPercent);
	right.rowOne.professorPoints.amount.innerText =
		character.professorPoints + '';

	if (character.type === 'Intelligence') {
		right.rowTwo.type.icon.style.background = '#a45df6';
		right.rowTwo.type.icon.innerText = '⚲';
	}
	if (character.type === 'Strength') {
		right.rowTwo.type.icon.style.background = '#004cff';
		right.rowTwo.type.icon.innerText = '𝌩';
	}
	if (character.type === 'Agility') {
		right.rowTwo.type.icon.style.background = '#ffbe00';
		right.rowTwo.type.icon.style.color = 'black';
		right.rowTwo.type.icon.innerText = '⍦';
	}
	right.rowTwo.type.name.innerText = character.type;
	right.rowTwo.mineral.amount.innerText = character.mineralCost + '';
	right.details.basic.metrics.attack.value.innerText = character.attack + '';
	right.details.basic.metrics.health.value.innerText = character.hp + '';
	right.details.basic.metrics.defense.value.innerText =
		character.defense + '';

	right.details.basic.speed.attackSpeed.value.innerText =
		character.attackSpeedText;
	right.details.basic.speed.moveSpeed.value.innerText =
		character.moveSpeedText;

	// finished loading
	left.loading.style.display = 'none';
	right.loading.style.display = 'none';
};

const attachHandlers = (nodeTree) => {
	const { container } = nodeTree;
	const {
		content: { left, right },
		closeButton
	} = container;
	// console.log({ nodeTree });

	left.actions.levelUp.addEventListener('pointerup', () => {
		window.parent.postMessage({
			_: 'navigate',
			src: '/pages/unit/levelUp/'
		});
	});
	left.actions.potentialUp.addEventListener('pointerup', () => {
		window.parent.postMessage({
			_: 'navigate',
			src: '/pages/unit/potentialUp/'
		});
	});
	right.actions.hyperEvolve.addEventListener('pointerup', () => {
		window.parent.postMessage({
			_: 'navigate',
			src: '/pages/unit/hyperEvolve/'
		});
	});
	right.actions.ultraEvolve.addEventListener('pointerup', () => {
		window.parent.postMessage({
			_: 'navigate',
			src: '/pages/unit/ultraEvolve/'
		});
	});
	left.gear.weapon.addEventListener('pointerup', () => {
		window.parent.postMessage({
			_: 'navigate',
			src: '/pages/gear/?weapon=true'
		});
	});
	left.gear.accessory.addEventListener('pointerup', () => {
		window.parent.postMessage({
			_: 'navigate',
			src: '/pages/gear/?accessory=true'
		});
	});
	left.gear.armor.addEventListener('pointerup', () => {
		window.parent.postMessage({
			_: 'navigate',
			src: '/pages/gear/?armor=true'
		});
	});
	left.gear.more.addEventListener('pointerup', () => {
		window.parent.postMessage({
			_: 'navigate'
		});
	});
	closeButton.addEventListener('pointerup', () => {
		window.parent.postMessage({
			_: 'navigate'
		});
	});
};

const attachLock = ({ element, character }) => {
	if (character.locked) {
		element.classList.add('locked');
	}
	element.innerHTML = `
		<div class="icon">
			${SVGIcons.lockCircle()}
		</div>
	`;
	element.addEventListener('pointerup', async () => {
		element.classList.toggle('locked');
		character.locked =
			typeof character?.locked !== 'undefined' ? !character.locked : true;
		await toggleCharacterLock({ id: character?.id });
		setCurrentCharCache(character);
		window.parent.postMessage({
			_: 'broadcastCharactersUpdate'
		});
	});
};

document.addEventListener('DOMContentLoaded', async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	const cachedChar = getCurrentCharCache();
	// const character = cachedChar || (await getCharacterFromTeam(params));
	// window.character = character;
	// window.nodeTree = nodeTree;

	const container = document.querySelector('.container ');
	populateNodeTree(nodeTree);
	attachHandlers(nodeTree);
	attachLock({
		character: cachedChar,
		element: nodeTree.container.content.right.actions.lock
	});
	await updateValues({
		character: cachedChar,
		nodeTree,
		params
	});
	container.classList.remove('loading');
});
