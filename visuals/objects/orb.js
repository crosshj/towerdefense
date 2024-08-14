function createOrb() {
	const orb = document.createElement('div');
	orb.style.position = 'absolute';
	orb.style.width = '30px';
	orb.style.height = '20px';
	orb.style.backgroundColor = '#ffffd3';
	orb.style.borderRadius = '50%';
	orb.style.boxShadow = '0 0 30px 10px yellow';
	orb.style.pointerEvents = 'none';
	orb.style.opacity = '0';
	orb.id = 'orb';
	document.body.appendChild(orb);
	return orb;
}

export async function animateOrb(fromX, fromY, toX, toY) {
	const orb = document.getElementById('orb') || createOrb();
	//console.log({ fromX, fromX, toX, toY });

	// Set the initial position of the orb
	orb.style.left = `${fromX}px`;
	orb.style.top = `${fromY}px`;
	orb.style.opacity = '1';

	// Trigger reflow to restart the animation
	orb.getBoundingClientRect();

	// Calculate translation distances
	const translateX = toX - fromX;
	const translateY = toY - fromY;

	// Define the keyframes for a sinusoidal path
	/* prettier-ignore */
	const keyframes = [
        { transform: 'translate(0, 0)', opacity: 1 },
        { transform: `translate(${translateX-100}px, ${translateY * 0.3}px)`, opacity: 1 },
        { transform: `translate(${translateX-200}px, ${translateY * 0.2}px)`, opacity: 0.5 },
        { transform: `translate(${translateX-200}px, ${translateY * 0.2}px)`, opacity: 0.5 },
        { transform: `translate(${translateX-100}px, ${translateY * 0.5}px)`, opacity: 0.5 },
        { transform: `translate(0px, ${translateY * 0.65}px)`, opacity: 0.9 },
        { transform: `translate(${translateX+220}px, ${translateY * 0.5}px)`, opacity: 0.4 },
        { transform: `translate(${translateX+220}px, ${translateY * 0.5}px)`, opacity: 0.4 },
        { transform: `translate(${translateX+170}px, ${translateY * 0.75}px)`, opacity: 0.6 },
        { transform: `translate(${translateX}px, ${translateY}px)`, opacity: 1 },
        { transform: `translate(${translateX}px, ${translateY}px)`, opacity: 0 }
    ];

	const timing = {
		duration: 800,
		easing: 'linear',
		fill: 'forwards'
	};

	// Animate the orb
	orb.animate(keyframes, timing);
	return new Promise((resolve) => setTimeout(resolve, timing.duration));
}
