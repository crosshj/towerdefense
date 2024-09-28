import { getCurrentCharCache, setCurrentCharCache } from '../../utils/cache.js';
import { nodeTree, populateNodeTree } from './detailDom.js';
import { SVGIcons } from '../../assets/icons.svg.js';
import { toggleCharacterLock } from '../../user/characters.js';
import { withCommas } from '../../utils/htmlToElement.js';
import { applyGearModifiers, getGearModifiers } from '../../user/gear.js';

const icons = {
	lockCircle: SVGIcons.lockCircle(),
	mineral: SVGIcons.mineralMulti(),
	sword: SVGIcons.sword(),
	shield: SVGIcons.shield(),
	heart: SVGIcons.heart(),
	//elements
	typeBug: SVGIcons.typeBug(),
	typeDark: SVGIcons.typeDark(),
	typeDragon: SVGIcons.typeDragon(),
	typeElectric: SVGIcons.typeElectric(),
	typeFairy: SVGIcons.typeFairy(),
	typeFighting: SVGIcons.typeFighting(),
	typeFire: SVGIcons.typeFire(),
	typeAir: SVGIcons.typeFlying(),
	typeGhost: SVGIcons.typeGhost(),
	typeGrass: SVGIcons.typeGrass(),
	typeEarth: SVGIcons.typeGround(),
	typeIce: SVGIcons.typeIce(),
	typeNormal: SVGIcons.typeNormal(),
	typePoison: SVGIcons.typePoison(),
	typePsychic: SVGIcons.typePsychic(),
	typeRock: SVGIcons.typeRock(),
	typeSteel: SVGIcons.typeSteel(),
	typeWater: SVGIcons.typeWater(),
};
const getElementColor = (element) => {
	if (element === 'Bug') return '#9cc31f';
	if (element === 'Dark') return '#494949';
	if (element === 'Dragon') return '#6723ee';
	if (element === 'Electric') return '#e7c013';
	if (element === 'Fairy') return '#ec7fb7';
	if (element === 'Fighting') return '#c80000';
	if (element === 'Fire') return '#ff7111';
	if (element === 'Air') return '#a991fe'; //flying
	if (element === 'Ghost') return '#673993';
	if (element === 'Grass') return '#3ccb04';
	if (element === 'Earth') return '#c49103';
	if (element === 'Ice') return '#89dbec';
	if (element === 'Normal') return '#adab8d';
	if (element === 'Poison') return '#ae01cb';
	if (element === 'Psychic') return '#fe509b';
	if (element === 'Rock') return '#e5bc61';
	if (element === 'Steel') return '#a6a9c6';
	if (element === 'Water') return '#717fff';
	const color = '#f0f';
	return color;
};

const updateAdvancedValues = ({ unit }) => {
	const statParams = [
		'regenTime',
		'mineralCost',
		'moveSpeed',
		'attackPerSecond',
		'attack',
		'physicalAttack',
		'magicAttack',
		'attackSpeed',
		'range',
		'splashRadius',
		'critChance',
		'critMult',
		'hitRate',
		'hp',
		'defense',
		'physicalDefense',
		'magicDefense',
		'evadeChance',
		'skillUseRate',
		'skillCooldown',
		'skillEvadeRate',
		'skillHitRate',
		'skillResistance',
	];
	console.log({ unit });
	for (const prop of statParams) {
		let value = unit[prop];
		if (typeof value === 'undefined') continue;
		value = withCommas(value);
		const el = document.querySelector(
			`.advanced .${prop} .value:not(.stat-mod)`
		);
		el.innerHTML = value || '---';
	}
	const modTotals = getGearModifiers(unit);
	for (const [key, value] of Object.entries(modTotals)) {
		const el = document.querySelector(`.advanced .${key} .value.stat-mod`);
		if (!el) continue;
		el.classList.add('applied');
		el.innerHTML = '+' + withCommas(value);
	}
};

const updateValues = async ({ params, character, nodeTree }) => {
	//left
	const { left, right } = nodeTree.container.content;
	left.stars.innerText = '★'.repeat(character.stars);
	left.character.image.append(character.image);

	left.name.first.innerText = character.displayName2 || '';
	left.name.second.innerText = character.displayName;
	left.element.name.innerText = character.element;

	const elementColor = getElementColor(character.element);
	left.element.icon.style.fill = elementColor;
	left.element.icon.innerHTML = icons['type' + character.element] || '';
	left.character.background.style.background = elementColor;

	if (character.potential) {
		left.actions.potentialUp.classList.remove('hidden');
	}
	if (
		character.maxLevel > character.level ||
		character.uncappedLevel < 4 ||
		character.professorPoints < character.professorPointsMax
	) {
		left.actions.levelUp.classList.remove('hidden');
	}
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
	right.rowTwo.mineral.icon.innerHTML = icons.mineral;
	right.rowTwo.mineral.amount.innerText = character.mineralCost + '';

	const moddedUnit = applyGearModifiers(character);
	right.details.basic.metrics.attack.icon.innerHTML = icons.sword;
	right.details.basic.metrics.attack.value.innerHTML = withCommas(
		moddedUnit.attack
	);
	if (moddedUnit.attack !== character.attack) {
		right.details.basic.metrics.attack.value.classList.add('stat-mod');
	}
	right.details.basic.metrics.health.icon.innerHTML = icons.heart;
	right.details.basic.metrics.health.value.innerHTML = withCommas(
		moddedUnit.hp
	);
	if (moddedUnit.hp !== character.hp) {
		right.details.basic.metrics.health.value.classList.add('stat-mod');
	}
	right.details.basic.metrics.defense.icon.innerHTML = icons.shield;
	right.details.basic.metrics.defense.value.innerHTML = withCommas(
		moddedUnit.defense
	);
	if (moddedUnit.defense !== character.defense) {
		right.details.basic.metrics.defense.value.classList.add('stat-mod');
	}

	right.details.basic.speed.attackSpeed.value.innerText =
		character.attackSpeedText;
	right.details.basic.speed.moveSpeed.value.innerText =
		character.moveSpeedText;
	if (character?.evolution?.canEvolve) {
		right.actions.evolve.classList.remove('hidden');
	}
	if (character?.evolution?.canHyper) {
		right.actions.hyperEvolve.classList.remove('hidden');
	}
	if (character?.evolution?.canUltra) {
		right.actions.ultraEvolve.classList.remove('hidden');
	}
	if (character?.evolution?.canSwitch) {
		right.actions.switchEvolve.classList.remove('hidden');
	}

	updateAdvancedValues({ unit: character });

	// finished loading
	left.loading.style.display = 'none';
	right.loading.style.display = 'none';
};

const attachHandlers = (nodeTree, params) => {
	const { container } = nodeTree;
	const {
		content: { left, right },
		closeButton,
	} = container;
	// console.log({ nodeTree });

	left.actions.levelUp.addEventListener('pointerup', () => {
		window.parent.postMessage({
			_: 'navigate',
			src: `/pages/unit/levelUp/index.html?back=${params.back || ''}`,
		});
	});
	left.actions.potentialUp.addEventListener('pointerup', () => {
		window.parent.postMessage({
			_: 'navigate',
			src: `/pages/unit/potentialUp/?back=${params.back || ''}`,
		});
	});
	right.actions.hyperEvolve.addEventListener('pointerup', () => {
		window.parent.postMessage({
			_: 'navigate',
			src: `/pages/unit/hyperEvolve/?back=${params.back || ''}`,
		});
	});
	right.actions.ultraEvolve.addEventListener('pointerup', () => {
		window.parent.postMessage({
			_: 'navigate',
			src: `/pages/unit/ultraEvolve/?back=${params.back || ''}`,
		});
	});
	left.gear.weapon.addEventListener('pointerup', () => {
		window.parent.postMessage({
			_: 'navigate',
			src: `/pages/gear/?weapon=true&back=${params.back || ''}`,
		});
	});
	left.gear.accessory.addEventListener('pointerup', () => {
		window.parent.postMessage({
			_: 'navigate',
			src: `/pages/gear/?accessory=true&back=${params.back || ''}`,
		});
	});
	left.gear.armor.addEventListener('pointerup', () => {
		window.parent.postMessage({
			_: 'navigate',
			src: `/pages/gear/?armor=true&back=${params.back || ''}`,
		});
	});
	left.gear.more.addEventListener('pointerup', () => {
		window.parent.postMessage({
			_: 'navigate',
			src: `/pages/gear/?back=${params.back || ''}`,
		});
	});
	right.rowTwo.details.addEventListener('pointerup', () => {
		const basic = document.querySelector('.details .basic');
		const advanced = document.querySelector('.details .advanced');
		if (right.rowTwo.details.classList.contains('open')) {
			right.rowTwo.details.classList.remove('open');
			right.rowTwo.details.classList.add('closed');
			basic.classList.remove('hidden');
			advanced.classList.add('hidden');
			return;
		}
		if (right.rowTwo.details.classList.contains('closed')) {
			right.rowTwo.details.classList.remove('closed');
			right.rowTwo.details.classList.add('open');
			basic.classList.add('hidden');
			advanced.classList.remove('hidden');
			return;
		}
	});
	closeButton.addEventListener('pointerup', () => {
		window.parent.postMessage({
			_: 'navigate',
		});
	});
};

const attachLock = ({ element, character }) => {
	if (character.locked) {
		element.classList.add('locked');
	}
	element.innerHTML = `
		<div class="icon">
			${icons.lockCircle}
		</div>
	`;
	element.addEventListener('pointerup', async () => {
		element.classList.toggle('locked');
		character.locked =
			typeof character?.locked !== 'undefined' ? !character.locked : true;
		await toggleCharacterLock({ id: character?.id });
		setCurrentCharCache(character);
		window.parent.postMessage({
			_: 'broadcastCharactersUpdate',
		});
	});
};

const attachGear = ({ character, nodeTree }) => {
	const { gear: gearEl } = nodeTree.container.content.left;
	const { gear: unitGear } = character;

	for (const [eqType, eq] of Object.entries(unitGear)) {
		if (!eq) continue;
		gearEl[eqType].classList.add('filled');
		gearEl[eqType].innerHTML = `
			<img src="${eq.image}" />
		`;
	}
};

document.addEventListener('DOMContentLoaded', async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });
	const cachedChar = getCurrentCharCache();

	// window.nodeTree = nodeTree;

	const container = document.querySelector('.container ');
	populateNodeTree(nodeTree);
	attachHandlers(nodeTree, params);
	attachLock({
		character: cachedChar,
		element: nodeTree.container.content.right.actions.lock,
	});
	attachGear({ character: cachedChar, nodeTree });
	await updateValues({
		character: cachedChar,
		nodeTree,
		params,
	});
	container.classList.remove('loading');
});
