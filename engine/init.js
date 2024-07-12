import Engine from './engine.js';
import Render from '../visuals/render.js';
import State from './state.js';
import { loadAssets, loadSounds } from '../visuals/assets/assets.js';
import { getActions } from './actions.js';

import { updateGameStatus } from './update/game.js';
import TeamUpdates from './update/team.js';
import PlayerUpdates from './update/player.js';
import MissileUpdates from './update/missile.js';

import { getStage } from '../stages/index.js';

import { characterAnimationGetter } from '../visuals/assets/character.js';
import { getTeam } from '../pages/_utils/getTeam.js';

const attributes = [
	'image',
	'rank',
	'displayName',
	'element',
	'level',
	'stars',
	'rank',
	'mineralCost',
	'hp',
	'attack',
	'range'
];
//TODO: eventually just rely on attributes from team, not from tower state
const adjustGame = async (game, params) => {
	const attackerTower = game?.state?.towers?.[0];
	// set team
	if ('54321'.split('').includes(params.team)) {
		const currentTeamName = 'Team ' + params.team;
		const flipBTeam = false;
		const currentTeam = await getTeam(currentTeamName, flipBTeam);
		const allTowerChars = [
			...attackerTower.teams[0].a,
			...attackerTower.teams[0].b
		];
		const allCurrentChars = [...currentTeam.a, ...currentTeam.b];
		for (const [i, char] of Object.entries(allTowerChars)) {
			for (const attr of attributes) {
				char[attr] = allCurrentChars[i][attr];
			}
		}
	}

	// set effects
	// set auto
	//console.log({ attackerTower, params });
};

export const startGame = async ({ menu, which, params, gameOver }) => {
	document.querySelector('body > .container').scrollLeft = 0;

	const thisGame = await getStage(params);

	if (typeof thisGame !== 'function') {
		alert('no game selected!');
		return;
	}
	menu.hide();
	const gameInstance = await thisGame();
	await adjustGame(gameInstance, params);
	const state = new State(gameInstance.state);

	state.assets = await loadAssets(); //
	state.assets.animations = {};
	const animations = {};
	state.assets.initChar = (charInstance) => {
		const animation = characterAnimationGetter(charInstance);
		animations[charInstance.id] = 'pending';
		animation.then((x) => {
			animations[charInstance.id] = x;
		});
		state.assets.animations[charInstance.id] = () =>
			animations[charInstance.id];
	};

	state.actions = getActions(state);

	if (typeof state.auto === 'undefined') {
		state.auto = true;
	}

	let bgMusic = {
		start: () => {},
		stop: () => {}
	};
	if (state?.sounds?.background) {
		const { background: bgMusicName } = state.sounds;
		bgMusic = await loadSounds(bgMusicName);
	}
	bgMusic.start();

	const gameLoop = async () => {
		try {
			if (state.paused) {
				return true;
			}
			PlayerUpdates.chargeMissile(state);
			PlayerUpdates.chargeMineral(state);
			PlayerUpdates.updateMineral(state);
			MissileUpdates.updateMissiles(state);

			TeamUpdates.spawnTeam(state);
			MissileUpdates.updateMissileDamage(state);
			TeamUpdates.targetOpponents(state);
			TeamUpdates.attackOpponents(state);

			TeamUpdates.moveDeployed(state);
			TeamUpdates.updateDeployedTicks(state);

			const continueGame = updateGameStatus(state);
			if (!continueGame) {
				bgMusic.stop();
				menu.show();
			}
			return continueGame;
		} catch (e) {
			console.error(e);
			return false;
		}
	};

	const render = new Render({ state });

	const highPriority = () => {
		// this is a non-throttled activity?
	};

	const onGameOver = async () => {
		bgMusic.stop();
		menu.show();
		await gameOver({ state });
	};

	const engine = new Engine({
		state,
		highPriority,
		gameLoop,
		render,
		onGameOver
	});
	engine.start();
};
