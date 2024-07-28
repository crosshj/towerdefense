export const slotDiv = (c, getCharImage) => {
	return `
			<div class="icon">
				<img src="${getCharImage(c)}">
			</div>
			<div class="base">
				<div class="cylinder"></div>
				<div class="stars">
					${'★'.repeat(c.stars)}
				</div>
			</div>
			<div class="mineral flex space-between">
				<div class="mineral-icon">▲</div>
				<div>${c.mineralCost}</div>
			</div>
		`;
};

export const characterDiv = (c, getCharImage) => {
	return `
		<div class="stars">
			${'★'.repeat(c.stars)}
		</div>
		<div class="info">
			<div class="icon">
				<img src="${getCharImage(c)}">
			</div>
			<div class="details">
				<div class="name">
					${c.displayName}
				</div>
				<div class="level flex space-between">
					<div>Lv.</div>
					<div>${c.level}</div>
				</div>
				<div class="mineral flex space-between">
					<div class="mineral-icon">▲</div>
					<div>${c.mineralCost}</div>
				</div>
			</div>
		</div>
	`;
};
