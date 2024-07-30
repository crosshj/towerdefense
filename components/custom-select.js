const $style = {
	selectedColor: 'CanvasText',
	selectedBg: 'Canvas',
	borderRadius: '0px',
	hoverBgColor: 'ButtonFace',
	disabledColor: '#ccc'
};

const style = `
option {
    display: none;
}
.custom-select {
    position: relative;
    font-size: 16px;
    width: var(--select-width, auto);
}
.select-selected {
    color: var(--select-text-color, ${$style.selectedColor});
    background-color: var(--select-closed-bg-color, var(--select-bg-color, ${$style.selectedBg}));
    border-radius: var(--select-border-radius, ${$style.borderRadius});
    border: 1px solid var(--select-border-color, currentColor);
	padding-block: var(--select-items-py, 8px);
    cursor: pointer;
	padding-left: 10px;
	padding-right: 32px;
}
.select-selected:after {
    content: "";
    position: absolute;
    top: calc(50% - 3px);
    right: 10px;
    border: 6px solid transparent;
    border-color: currentColor transparent transparent transparent;
}
.select-items div {
    padding-block: var(--select-items-py, 8px);
    padding-inline: 16px;
    cursor: pointer;
}
.select-items {
    color: var(--select-items-color, inherit);
    border-radius: var(--select-border-radius, ${$style.borderRadius});
    background-color: var(--select-bg-color, Canvas);
    border: 1px solid var(--select-border-color, currentColor);
    position: absolute;
    z-index: 99;
    top: 100%;
    width: 100%;
    margin-top: 3px;
    overflow: hidden;
    box-sizing: border-box;
	max-height: var(--select-items-max-height, 300px);
    overflow-y: auto;
}
.select-items div:hover {
    background-color: var(--select-hover-bg-color, ${$style.hoverBgColor});
}
.select-hide {
    display: none;
}
.select-arrow-active {
    background-color: var(--select-active-bg-color, ${$style.hoverBgColor});
    color: var(--select-active-color, currentColor);
}
.select-arrow-active:after {
    content: '';
    border-color: transparent transparent currentColor transparent;
    top: calc(50% - 10px);
}
.select-items div[disabled] {
    color: var(--select-disabled-color, ${$style.disabledColor});
    pointer-events: none;
}
.active {
    position: relative;
}
.active:before {
    content: '';
    position: absolute;
    left:0; right:0; top:0; bottom:0;
    background-color: var(--select-hover-bg-color, ${$style.hoverBgColor});
    opacity: 0.6;
	z-index: -1;
}
`;

class CustomSelect extends HTMLElement {
	listeners = [];
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.style.display = 'none';
		this.render();
		this.observeMutations();
	}

	connectedCallback() {
		this.addEventListeners();
	}

	render() {
		const options = Array.from(this.querySelectorAll('option'));
		const selectedOption =
			options.find((option) => option.selected) || options[0];

		this.shadowRoot.innerHTML = `
            <style>${style}</style>

            <div class="custom-select">
                <div class="select-selected">${
					selectedOption ? selectedOption.innerHTML : ''
				}</div>
                <div class="select-items select-hide">
                    ${options
						.map((option) => {
							const classes = [];
							if (option.selected) {
								classes.push('active');
							}
							const disabled = option.disabled ? ' disabled' : '';
							return `
                            <div
                                ${disabled}
                                data-value="${option.value}"
                                class="${classes.join(' ')}"
                            >
                                <span>${option.innerHTML}</span>
                            </div>
                        `;
						})
						.join('')}
                </div>
            </div>
        `;

		this.selectedValue = selectedOption ? selectedOption.value : '';
		this.addEventListeners(); // Re-add event listeners after rendering
		this.style.display = '';
	}

	addEventListeners() {
		for (const [el, event, listener] of this.listeners) {
			el.removeEventListener(event, listener);
		}
		this.listeners = [];
		const selectedElement =
			this.shadowRoot.querySelector('.select-selected');
		const itemsContainer = this.shadowRoot.querySelector('.select-items');
		const items = this.shadowRoot.querySelectorAll('.select-items div');

		const selectListener = (e) => {
			e.stopPropagation();
			itemsContainer.classList.toggle('select-hide');
			selectedElement.classList.toggle('select-arrow-active');
		};
		selectedElement.addEventListener('pointerup', selectListener);
		this.listeners.push([selectedElement, 'pointerup', selectListener]);

		items.forEach((item) => {
			const listener = (e) => {
				if (item.hasAttribute('disabled')) return;
				const previousSelected =
					this.shadowRoot.querySelector('.active');
				if (previousSelected) {
					previousSelected.classList.remove('active');
				}
				selectedElement.innerHTML = item.innerHTML;
				this.selectedValue = item.getAttribute('data-value');
				item.classList.add('active');
				itemsContainer.classList.add('select-hide');
				selectedElement.classList.remove('select-arrow-active');
				this.dispatchEvent(new Event('change'));
			};
			item.addEventListener('pointerup', listener);
			this.listeners.push([item, 'pointerup', listener]);
		});

		document.addEventListener('pointerup', () => this.closeAllSelect());
	}

	closeAllSelect(element) {
		const items = this.shadowRoot.querySelectorAll('.select-items');
		const selected = this.shadowRoot.querySelectorAll('.select-selected');
		items.forEach((item) => {
			if (item !== element) {
				item.classList.add('select-hide');
			}
		});
		selected.forEach((sel) => {
			if (sel !== element) {
				sel.classList.remove('select-arrow-active');
			}
		});
	}

	observeMutations() {
		const observer = new MutationObserver(() => this.render());
		observer.observe(this, { childList: true, subtree: true });
	}

	get value() {
		return this.selectedValue;
	}

	set value(newValue) {
		const items = this.shadowRoot.querySelectorAll('.select-items div');
		items.forEach((item) => {
			if (item.getAttribute('data-value') === newValue) {
				const previousSelected =
					this.shadowRoot.querySelector('.active');
				if (previousSelected) {
					previousSelected.classList.remove('active');
				}
				item.classList.add('active');
				this.shadowRoot.querySelector('.select-selected').innerHTML =
					item.innerHTML;
				this.selectedValue = newValue;
			}
		});
	}
}

customElements.define('custom-select', CustomSelect);
