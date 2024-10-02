const pageDone = ({ params }) => {
	window.parent.postMessage({
		_: 'title',
		title: 'MATERIALS',
		visibility: 'visible',
		back: params.back,
	});
	const args = {
		feathers: false,
		gems: true,
		coins: false,
		friendPoints: false,
	};
	window.parent.postMessage({ _: 'stats', ...args });
	window.parent.postMessage({ _: 'loaded' });
};

const domLoaded = async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });

	pageDone({ params });
};

document.addEventListener('DOMContentLoaded', domLoaded);
