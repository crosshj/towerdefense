export const getViewportDimensions = () => {
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

  return { height, width };
}
