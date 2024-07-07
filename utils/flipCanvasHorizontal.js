export function flipCanvasHorizontal(canvas) {
	const context = canvas.getContext('2d');
	const width = canvas.width;
	const height = canvas.height;

	// Create a new canvas to hold the flipped image
	const flippedCanvas = document.createElement('canvas');
	flippedCanvas.width = width;
	flippedCanvas.height = height;
	const flippedContext = flippedCanvas.getContext('2d');

	// Draw the original canvas content flipped horizontally
	flippedContext.save();
	flippedContext.scale(-1, 1);
	flippedContext.drawImage(canvas, -width, 0, width, height);
	flippedContext.restore();

	return flippedCanvas;
}
