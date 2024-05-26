import { startGame } from '../engine/init.js';
import { loadSounds } from './assets.js';

const template = () => `
<div
    id="main-menu"
    style="
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(0deg, #290a3f, #15001a);
        font-size: 11px;
        z-index: 2;
    "
>
    <div
        class="nes-container with-title is-centered is-dark press-start-2p-regular"
        style="width: 35rem;"
    >
        <p class="title">Tower Defense</p>
        <div style="background-color:#212529; padding: 1rem 1.2rem 1rem 1rem;width:calc(100% + 8px)">
            <label for="dark_select" style="color:#fff">Choose a Demo</label>
            <div class="nes-select is-dark">
                <select required id="demo-choice" value="0">
                    <!-- option value="" disabled selected hidden>Select...</option -->
                    <option value="0">Mostly Balanced: Blue wins often</option>
                    <option value="1">Mostly Balanced: Long Field</option>
                    <option value="2">Fast: Blue is OP</option>
                    <option value="3">Field Stage 1</option>
                    <option value="4">Ghost Stage 1</option>
                    <option value="5">Ocean Stage 1</option>
                    <option value="6">Japanese Stage 1</option>
                </select>
            </div>
        </div>
        <button
            id="demo-play"
            type="button"
            class="nes-btn"
        >
            PLAY
        </button>
    </div>
</div>
`;

const createMenu = async () => {
	document.body.insertAdjacentHTML('afterbegin', template());
	const menu = document.getElementById('main-menu');
	const demoChoiceSelect = menu.querySelector('select#demo-choice');
	const demoPlayButton = menu.querySelector('button#demo-play');

	const bgMusic = await loadSounds('menuBackground');
	const coreSounds = await loadSounds('coreSounds');

	bgMusic.play();
	bgMusic.fade(0, 1, 4000);

	menu.hide = () => {
		menu.style.display = 'none';
		bgMusic.fade(bgMusic.volume(), 0, 500, undefined, () => {
			bgMusic.stop();
		});
	};

	menu.show = () => {
		menu.style.display = 'flex';
		bgMusic.play();
		bgMusic.fade(0, 0.5, 1000);
	};

	demoChoiceSelect.addEventListener('mousedown', () => {
		coreSounds.play('click');
	});
	demoChoiceSelect.addEventListener('change', () => {
		coreSounds.play('click');
	});

	demoPlayButton.addEventListener('mousedown', () => {
		coreSounds.play('click');
		startGame({
			which: demoChoiceSelect.value,
			menu
		});
	});
};
createMenu();
