export const EmptyList = (args) => {
	const {
		filter,
		sorted,
		allCharactersDiv,
		icons,
		setUnitsFilterCache, //
	} = args;

	const noFilter = filter?.length < 1;

	if (sorted.length >= 1) return false;

	allCharactersDiv.innerHTML = noFilter
		? `
        <div class="emptyList">
          <div>${icons.notEqual}</div>
        </div>
      `
		: `
        <div class="emptyList">
          <div>The filter did not find any units!</div>
          <button>
            ${icons.refresh}
            <span>RESET</span>
          </button>
        </div>
      `;

	const resetButton = allCharactersDiv.querySelector('.emptyList button');
	resetButton &&
		resetButton.addEventListener('pointerup', () => {
			setUnitsFilterCache(false);
			window.parent.postMessage({
				_: 'broadcastUnitFilterUpdate',
			});
		});
	return true;
};
