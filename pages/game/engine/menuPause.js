let pauseScreen;

export const createPauseScreen = (parent, state) => {
	if (pauseScreen) {
		return pauseScreen;
	}
	pauseScreen = document.createElement('div');
	pauseScreen.classList.add('controls-pause-screen', 'hidden');
	pauseScreen.innerHTML = `
		<div class="pause-alert font-rubik">
			pause!
		</div>
		<button
			id="pause-continue"
			type="button"
			class="nes-btn is-success font-rubik"
		>
			CONTINUE
		</button>
		<button
			id="pause-restart"
			type="button"
			class="nes-btn is-primary font-rubik"
		>
			RESTART
		</button>
		<button
			id="pause-main"
			type="button"
			class="nes-btn is-primary font-rubik"
		>
			MAIN
		</button>
	`;
	pauseScreen
		.querySelector('#pause-continue')
		.addEventListener('mousedown', () => {
			pauseScreen.hide();
			state.actions.pauseToggle();
		});
	pauseScreen
		.querySelector('#pause-restart')
		.addEventListener('mousedown', () => {
			state.actions.restartGame();
		});
	pauseScreen
		.querySelector('#pause-main')
		.addEventListener('mousedown', () => {
			pauseScreen.hide();
			state.actions.mainMenu();
		});
	parent.insertAdjacentElement('afterbegin', pauseScreen);
	pauseScreen.hide = () => {
		pauseScreen.classList.add('hidden');
	};
	pauseScreen.show = () => {
		pauseScreen.classList.remove('hidden');
	};
	return pauseScreen;
};
