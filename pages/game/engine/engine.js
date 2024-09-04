import {
	animationFrameScheduler,
	of,
	takeWhile,
	filter,
	tap,
	repeat,
	finalize,
} from '/vendor/rxjs.bundle.7.8.1.js';

debugger;

const throttle = (MIN_TIME, state) => () => {
	const curr = performance.now();
	if (state.time && curr - state.time < MIN_TIME) return false;
	state.time = curr;
	return true;
};

export default class Engine {
	constructor(args) {
		const { state, highPriority, gameLoop, render, onGameOver } = args;

		const { throttle: throttleAmount = 67 } = state;

		const gameSteps = [
			repeat(),
			tap(highPriority),
			filter(throttle(throttleAmount, state)),
			takeWhile(gameLoop),
			takeWhile(render),
			finalize(onGameOver),
		];

		const loop = of(null, animationFrameScheduler).pipe(...gameSteps);
		this.start = loop.subscribe.bind(loop);
	}
}
