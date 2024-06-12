export const getViewportDimensions = () => {
	/*
  // Create a temporary element to measure height
  const tempHeightElement = document.createElement('div');
  tempHeightElement.style.height = '100vh';
  tempHeightElement.style.width = '100vw';
  tempHeightElement.style.position = 'absolute';
  tempHeightElement.style.top = '0';
  tempHeightElement.style.left = '0';
  tempHeightElement.style.visibility = 'hidden';
  tempHeightElement.style.pointerEvents = 'none';

  // Append it to the body
  document.body.appendChild(tempHeightElement);

  // Get the dimensions in pixels
  const height = tempHeightElement.clientHeight;
  const width = tempHeightElement.clientWidth;

  // Remove the temporary element
  document.body.removeChild(tempHeightElement);
  */
	document.body.style.height = '100vh';
	document.body.style.width = '100vw';

	// const height = window.innerHeight;
	// const width = window.innerWidth;
	const height = document.body.clientHeight;
	const width = document.body.clientWidth;

	return { height, width };
};
