import { animateOrb } from '/visuals/objects/orb.js';

const button = document.getElementById('button');
const element1 = document.getElementById('element1');

button.addEventListener('click', async () => {
	const element1Rect = element1.getBoundingClientRect();
	const buttonRect = button.getBoundingClientRect();

	const element1CenterX = element1Rect.left + element1Rect.width / 2;
	const element1CenterY = element1Rect.top + element1Rect.height / 2;
	const buttonCenterX = buttonRect.left + buttonRect.width / 2;
	const buttonCenterY = buttonRect.top + buttonRect.height / 2;

	await animateOrb(
		element1CenterX,
		element1CenterY,
		buttonCenterX,
		buttonCenterY
	);
	alert('done');
});
