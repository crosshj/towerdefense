const TAP_THRESHOLD = 10;

export const attachTap = (target, handler) => {
	if (!target) return;
	let startX, startY;
	const onPointerDown = (event) => {
		startX = event.clientX;
		startY = event.clientY;
		// console.log('pointer down', startX, startY);
	};
	const onPointerUp = (event) => {
		const endX = event.clientX;
		const endY = event.clientY;
		const distanceX = Math.abs(endX - startX);
		const distanceY = Math.abs(endY - startY);
		const dragThreshold = TAP_THRESHOLD;
		// console.log('pointer down', startX, startY);

		if (distanceX < dragThreshold && distanceY < dragThreshold) {
			handler(event);
		}
	};
	target.addEventListener('pointerdown', onPointerDown);
	target.addEventListener('pointerup', onPointerUp);
	target._onPointerDown = onPointerDown;
	target._onPointerUp = onPointerUp;
};
