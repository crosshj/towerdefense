const FADE_MS = 250;

function fadeIn() {
	document.body.classList.remove('fade-out');
	void document.body.offsetWidth;
	document.body.classList.add('fade-in');
}
document.addEventListener('DOMContentLoaded', fadeIn);
window.addEventListener('pageshow', function (event) {
	if (event.persisted) fadeIn();
});

const navigate = (url) => {
	document.body.classList.add('fade-out');
	setTimeout(() => {
		document.location.href = url;
	}, FADE_MS);
};

window.fadingNavigate = navigate;
