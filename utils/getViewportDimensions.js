const domLoaded = async () => {
	return await new Promise((resolve) => {
		function onLoaded() {
			removeEventListener('DOMContentLoaded', onLoaded);
			resolve();
		}
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', onLoaded);
		} else {
			onLoaded();
		}
	});
};

export const getViewportDimensions = async () => {
	await domLoaded();

	document.body.style.height = '100vh';
	document.body.style.width = '100vw';
	const tempHeightElement = document.createElement('div');
	tempHeightElement.style.height = '100vh';
	tempHeightElement.style.width = '100vw';
	tempHeightElement.style.position = 'absolute';
	tempHeightElement.style.top = '0';
	tempHeightElement.style.left = '0';
	tempHeightElement.style.visibility = 'hidden';
	tempHeightElement.style.pointerEvents = 'none';
	document.body.appendChild(tempHeightElement);
	const height = tempHeightElement.clientHeight;
	const width = tempHeightElement.clientWidth;
	document.body.removeChild(tempHeightElement);

	// const height = window.innerHeight;
	// const width = window.innerWidth;

	// document.body.style.height = '100vh';
	// document.body.style.width = '100vw';
	// const height = document.body.clientHeight;
	// const width = document.body.clientWidth;

	return { height, width };
};
