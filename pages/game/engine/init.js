import { getStage } from '/stages/index.js';
import { characterAnimationGetter } from '/visuals/assets/character.js';
import { getTeamFromNumber } from '/utils/getTeam.js';
import { getTower } from '/user/tower.js';
import Render from '/visuals/render.js';
import { loadAssets, loadSounds } from '/visuals/assets/assets.js';

import Engine from './engine.js';
import State from './state.js';
import { getActions } from './actions.js';
import { updateGameStatus } from './update/game.js';
import TeamUpdates from './update/team.js';
import PlayerUpdates from './update/player.js';
import MissileUpdates from './update/missile.js';

const adjustGame = async (game, params) => {
	const attackerTower = await getTower();

	attackerTower.teams = [await getTeamFromNumber(params.team)];
	attackerTower.selectedTeam = attackerTower.selectedTeam || 'a';

	attackerTower.type = 'attacker';
	attackerTower.deployed = [];
	attackerTower.team = []; //TODO: really need this? yes, unfortunately for now

	game.state.towers[0] = attackerTower;
};

export const startGame = async ({ menu, params, gameOver }) => {
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
