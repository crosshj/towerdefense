export const handlePointerEvents = (args) => {
	const { element, onTap, onDragStart, onDragEnd } = args;
	let startX,
		startY,
		isDragging = false,
		scrollThreshold = 5;
	let dragImage;

	//element.style.touchAction = 'none';

	element.addEventListener('pointerdown', (e) => {
		const isUsed = e.target.closest('.used');

		startX = e.clientX;
		startY = e.clientY;
		isDragging = false;

		// Prevent default drag behavior
		e.preventDefault();

		// Capture pointer events
		element.setPointerCapture(e.pointerId);

		const onPointerMove = (e) => {
			if (isUsed) return;
			const grandparent = element.closest('.all-characters');
			if (!grandparent) return;

			const grandparentRect = grandparent.getBoundingClientRect();
			const pointerWithinGrandparent =
				e.clientX >= grandparentRect.left &&
				e.clientX <= grandparentRect.right &&
				e.clientY >= grandparentRect.top &&
				e.clientY <= grandparentRect.bottom;

			if (!dragImage && pointerWithinGrandparent) return;

			const parent = e.target.closest('.character-card');
			if (!parent) return;

			e.preventDefault();
			if (!dragImage) {
				dragImage = parent.querySelector('.icon img').cloneNode(true);
				dragImage.style.zoom = 1;
				dragImage.style.position = 'absolute';
				dragImage.style.pointerEvents = 'none';
				dragImage.style.top = '-9999px';
				document.body.appendChild(dragImage);
			}

			if (
				!isDragging &&
				(Math.abs(e.clientX - startX) > scrollThreshold ||
					Math.abs(e.clientY - startY) > scrollThreshold)
			) {
				isDragging = true;
				if (typeof onDragStart === 'function') {
					onDragStart(e);
				}
				if (dragImage) {
					dragImage.style.top = `${e.clientY}px`;
					dragImage.style.left = `${e.clientX}px`;
					dragImage.style.transform = 'translate(-50%, -50%)';
					dragImage.style.visibility = 'visible';
				}
			} else if (isDragging && dragImage) {
				dragImage.style.top = `${e.clientY}px`;
				dragImage.style.left = `${e.clientX}px`;
			}
		};

		const onPointerUp = (e) => {
			if (!isDragging) {
				const outsideThreshold =
					Math.abs(e.clientX - startX) > scrollThreshold ||
					Math.abs(e.clientY - startY) > scrollThreshold;
				if (!outsideThreshold && typeof onTap === 'function') {
					onTap(e);
				}
			} else {
				if (typeof onDragEnd === 'function') {
					onDragEnd(e);
				}
			}
			if (dragImage) {
				document.body.removeChild(dragImage);
				dragImage = undefined;
			}

			// Release pointer capture and remove the listeners
			element.releasePointerCapture(e.pointerId);
			document.body.removeEventListener('pointermove', onPointerMove);
			document.body.removeEventListener('pointerup', onPointerUp);
		};

		document.body.addEventListener('pointermove', onPointerMove);
		document.body.addEventListener('pointerup', onPointerUp);
	});

	element.addEventListener('pointerup', (e) => {
		if (isDragging) return;
		onTap && onTap(e);
	});

	element.addEventListener('dragstart', (e) => {
		// Prevent default drag behavior
		e.preventDefault();
	});

	element.parentElement.addEventListener('scroll', () => {
		isDragging = false;
	});
};

const TAP_THRESHOLD = 10;

export const attachTap = (target, handler) => {
	let startX, startY;
	const onPointerDown = (event) => {
		startX = event.clientX;
		startY = event.clientY;
		console.log('pointer down', startX, startY);
	};
	const onPointerUp = (event) => {
		const endX = event.clientX;
		const endY = event.clientY;
		const distanceX = Math.abs(endX - startX);
		const distanceY = Math.abs(endY - startY);
		const dragThreshold = TAP_THRESHOLD;
		console.log('pointer down', startX, startY);

		if (distanceX < dragThreshold && distanceY < dragThreshold) {
			handler(event);
		}
	};
	target.addEventListener('pointerdown', onPointerDown);
	target.addEventListener('pointerup', onPointerUp);
	target._onPointerDown = onPointerDown;
	target._onPointerUp = onPointerUp;
};

export const removeTap = (target) => {
	if (target._onPointerDown && target._onPointerUp) {
		target.removeEventListener('pointerdown', target._onPointerDown);
		target.removeEventListener('pointerup', target._onPointerUp);
		delete target._onPointerDown;
		delete target._onPointerUp;
	}
};

export const slotDragAndDrop = (args) => {
	const {
		slot,
		onTap = () => {},
		onDragStart = () => {},
		onDragEnd = () => {},
	} = args;

	let startX;
	let startY;
	let isDragging = false;
	let dragImage;
	let dragThreshold = 5;

	const pointerMove = (e) => {
		e.preventDefault();
		const outsideThreshold =
			isDragging ||
			Math.abs(e.clientX - startX) > dragThreshold ||
			Math.abs(e.clientY - startY) > dragThreshold;
		if (!isDragging && outsideThreshold) {
			onDragStart(e);
			isDragging = true;
		}
		if (isDragging && !dragImage) {
			dragImage = slot.querySelector('.icon img').cloneNode(true);
			dragImage.style.zoom = 1;
			dragImage.style.position = 'absolute';
			dragImage.style.pointerEvents = 'none';
			dragImage.style.top = '-9999px';
			document.body.appendChild(dragImage);
		}
		if (isDragging && dragImage) {
			dragImage.style.top = `${e.clientY}px`;
			dragImage.style.left = `${e.clientX}px`;
			dragImage.style.transform = 'translate(-50%, -50%)';
			dragImage.style.visibility = 'visible';
		}
	};
	const pointerUp = (e) => {
		if (isDragging) {
			isDragging = false;
			onDragEnd(e);
		} else {
			onTap(e);
		}
		if (dragImage) {
			document.body.removeChild(dragImage);
			dragImage = undefined;
		}
		slot.releasePointerCapture(e.pointerId);
		slot.removeEventListener('pointermove', pointerMove);
		slot.removeEventListener('pointerup', pointerUp);
	};
	slot.addEventListener('pointerdown', (e) => {
		e.preventDefault();
		slot.setPointerCapture(e.pointerId);
		startX = e.clientX;
		startY = e.clientY;
		isDragging = false;
		slot.addEventListener('pointermove', pointerMove);
		slot.addEventListener('pointerup', pointerUp);
	});
};

export const attachHorizontalScroll = (scrollable) => {
	// this function is only necessary on windows machines
	const isWindows = /Win/.test(navigator.platform);
	if (!isWindows) return;

	// mouse wheel
	scrollable.addEventListener('wheel', (e) => {
		if (e.deltaY === 0) return;
		// Only prevent default if trying to scroll vertically
		e.preventDefault();
		scrollable.scrollLeft += e.deltaY;
	});

	//dragging
	let pointerFrom;
	let elementFrom;
	const onDrag = (event) => {
		scrollable.scrollLeft = elementFrom - event.clientX + pointerFrom;
	};
	scrollable.addEventListener('pointerdown', (event) => {
		if (
			event.target.classList.contains('icon') &&
			!event.target.classList.contains('used')
		)
			return;
		if (event.pointerType !== 'mouse') return;
		pointerFrom = event.clientX;
		elementFrom = scrollable.scrollLeft;
		scrollable.addEventListener('pointermove', onDrag);
	});
	document.addEventListener('pointerup', (event) => {
		scrollable.removeEventListener('pointermove', onDrag);
	});
};

//---- DELETE BELOW?

export const handlePointerEventsOLD = (args) => {
	const { element, onTap, onDragStart, onDragEnd } = args;
	let startX,
		startY,
		isDragging = false,
		scrollThreshold = 5;

	// // ???
	// element.draggable = false;
	//let dragEvent;
	let dragImage;
	element.addEventListener('dragstart', (e) => {
		e.preventDefault();
	});

	element.style.touchAction = 'none';
	element.addEventListener('pointerdown', (e) => {
		e.preventDefault();
		element.setPointerCapture(e.pointerId);

		const parent = e.target.closest('.character-card');

		dragImage = parent.querySelector('.icon img').cloneNode(true);
		dragImage.style.zoom = 1;
		dragImage.style.position = 'absolute';
		dragImage.style.pointerEvents = 'none';
		dragImage.style.top = '-9999px';
		document.body.appendChild(dragImage);

		startX = e.clientX;
		startY = e.clientY;
		isDragging = false;

		// Add pointermove and pointerup listeners to document.body
		const onPointerMove = (e) => {
			if (
				!isDragging &&
				(Math.abs(e.clientX - startX) > scrollThreshold ||
					Math.abs(e.clientY - startY) > scrollThreshold)
			) {
				isDragging = true;
				if (typeof onDragStart === 'function') {
					onDragStart(e);
				}
				if (dragImage) {
					dragImage.style.top = `${e.clientY}px`;
					dragImage.style.left = `${e.clientX}px`;
					dragImage.style.transform = 'translate(-50%, -50%)';
					dragImage.style.visibility = 'visible';
				}
			} else if (isDragging && dragImage) {
				dragImage.style.top = `${e.clientY}px`;
				dragImage.style.left = `${e.clientX}px`;
			}
		};

		const onPointerUp = (e) => {
			console.log('pointerup');
			if (!isDragging) {
				if (typeof onTap === 'function') {
					onTap(e);
				}
			} else {
				if (typeof onDragEnd === 'function') {
					onDragEnd(e);
				}
			}
			if (dragImage) {
				document.body.removeChild(dragImage);
				dragImage = null;
			}
			element.releasePointerCapture(e.pointerId);
			// Remove the listeners
			document.body.removeEventListener('pointermove', onPointerMove);
			document.body.removeEventListener('pointerup', onPointerUp);
		};

		document.body.addEventListener('pointermove', onPointerMove);
		document.body.addEventListener('pointerup', onPointerUp);
	});
};
