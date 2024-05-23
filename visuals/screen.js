const ScreenInfo = (root) => {
	const screenInfo = document.createElement('div');
	root.append(screenInfo);
	const updateScreenInfo = () => {
		screenInfo.classList.add('screen-info');
		screenInfo.innerHTML = `${screen.width} x ${screen.height}`;
	};
	updateScreenInfo();
	window.addEventListener('resize', updateScreenInfo);
};

export default ScreenInfo;
