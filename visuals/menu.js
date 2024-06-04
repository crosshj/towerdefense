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
            <div class="nes-select is-dark">
                <select required id="demo-choice" value="">
                    <option value="" disabled selected hidden>Select Stage...</option>
                    <option value="-1" disabled>---</option>
                    <option value="6">Sakura</option>
                    <option value="1">Tropical Graveyard</option>
                    <option value="3">Sunny Field</option>
                    <option value="2">Fast: Blue is OP</option>
                    <option value="4">Ghost Stage 1</option>
                    <option value="5">Ocean Stage 1</option>
                    <option value="0">Mostly Balanced: Blue wins often</option>
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

	bgMusic.start();

	menu.hide = () => {
		menu.style.display = 'none';
		bgMusic.stop();
	};

	menu.show = () => {
		menu.style.display = 'flex';
		bgMusic.start();
	};

	demoChoiceSelect.addEventListener('mousedown', () => {
		coreSounds.play('click', 1);
	});
	demoChoiceSelect.addEventListener('change', () => {
		coreSounds.play('click', 1);
	});

	demoPlayButton.addEventListener('mousedown', () => {
		coreSounds.play('click', 1);
		startGame({
			which: demoChoiceSelect.value,
			menu
		});
	});
};
createMenu();
