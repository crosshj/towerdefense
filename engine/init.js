import Engine from './engine.js';
import Render from '../visuals/render.js';
import State from './state.js';
import { loadAssets, loadSounds } from '../visuals/assets.js';
import Controls from '../visuals/controls.js';
import { getActions } from './actions.js';

import { updateGameStatus } from './update/game.js';
import TeamUpdates from './update/team.js';
import PlayerUpdates from './update/player.js';
import MissileUpdates from './update/missile.js';

import { balancedGame1 } from './games/balanced1.js';
import { balancedLongField1 } from './games/balancedLongField1.js';
import { fast1 } from './games/fast1.js';
import { fieldStage1 } from './games/field1.js';
import { ghostStage1 } from './games/ghost1.js';
import { oceanStage1 } from './games/ocean1.js';
import { sakura1 } from './games/sakura1.js';
import { createPauseScreen } from '../visuals/menuPause.js';

const games = [
	balancedGame1,
	balancedLongField1,
	fast1,
	fieldStage1,
	ghostStage1,
	oceanStage1,
	sakura1
	//
];

export const startGame = async ({ menu, which }) => {
	const thisGame = games[which];
	if (typeof thisGame !== 'function') {
		alert('no game selected!');
		return;
	}
	menu.hide();
	const gameInstance = await thisGame();
	const state = new State(gameInstance.state);
	state.assets = await loadAssets();
	state.actions = getActions(state);

	// TODO: this should be recalled from user's last choice
	// for now, it doesn't even work so doesn't matter
	state.auto = true;

	const pauseScreen = createPauseScreen(document.body, state);
	const controls = new Controls({
		state,
		pauseScreen,
		showTicker: false,
		showScreenInfo: false,
		showEffects: true
	});

	let bgMusic = {
		start: () => {},
		stop: () => {}
	};
	if (state?.sounds?.background) {
		const { background: bgMusicName } = state.sounds;
		bgMusic = await loadSounds(bgMusicName);
	}
	bgMusic.start();

	const gameLoop = () => {
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

	const render = new Render({ state, controls });

	const highPriority = () => {
		// this is a non-throttled activity?
	};

	const engine = new Engine({
		state,
		highPriority,
		gameLoop,
		render,
		controls
	});
	engine.start();
};
