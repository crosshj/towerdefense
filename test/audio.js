import { Howler, Howl } from 'https://cdn.jsdelivr.net/npm/howler@2.2.4/+esm';

var sound = new Howl({
	src: ['assets/audio/EtherealTraverse.wav'],
	volume: 0,
	//html5: true,
	preload: true,
	autoplay: true,
	loop: true,
	paused: true,
});
sound.play();
sound.fade(0, 1, 4000);

window.togglePlay = (e) => {
	const { target } = e;
	const isPaused = target.innerText === 'PLAY';
	if (isPaused) {
		target.innerText = 'PAUSE';
		sound.play();
		sound.fade(0, 1, 4000);
	} else {
		target.innerText = 'PLAY';
		sound.fade(sound.volume(), 0, 300, undefined, () => {
			soundId = sound.stop();
		});
	}
};
window.clickSound = () => sound.play('click');

var punches = new Howl({
	src: ['/assets/audio/coreSounds.wav'],
	preload: true,
	sprite: {
		one: [8298, 450, false],
		two: [10087, 350, false],
		three: [16169, 210, false],
		click: [31331, 20, false],
	},
});
window.punch = (which) => punches.play(which);
