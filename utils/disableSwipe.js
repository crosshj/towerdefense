// this forcefully disables navigate with swipe
// not sure why oversroll-behavior: none isn't working
document.querySelector('body > .container').addEventListener(
	'mousewheel',
	function (e) {
		e.stopPropagation();
		var maxWidth = this.scrollWidth - this.offsetWidth; // this might change if you have dynamic content, perhaps some mutation observer will be useful here

		if (
			this.scrollLeft + e.deltaX < 0 ||
			this.scrollLeft + e.deltaX > maxWidth
		) {
			e.preventDefault();
			this.scrollLeft = Math.max(
				0,
				Math.min(maxWidth, this.scrollLeft + e.deltaX)
			);
		}
	},
	false
);
