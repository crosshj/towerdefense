// custom-select.js
class CustomSelect extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.render();
	}

	connectedCallback() {
		this.addEventListeners();
	}

	render() {
		const options = Array.from(this.querySelectorAll('option'));
		const selectedOption =
			options.find((option) => option.selected) || options[0];

		this.shadowRoot.innerHTML = `
            <style>
                .custom-select {
                    position: relative;
                    font-size: 16px;
                    width: var(--select-width, 200px);
                }
                .select-selected {
                    background-color: var(--select-bg-color, #e4c19e);
                    border: 1px solid var(--select-border-color, #b1a392);
                    border-radius: var(--select-border-radius, 0px);
                    color: var(--select-text-color, #333);
                    padding: 10px;
                    cursor: pointer;
                }
                .select-selected:after {
                    content: "";
                    position: absolute;
                    top: 14px;
                    right: 10px;
                    border: 6px solid transparent;
                    border-color: #555 transparent transparent transparent;
                }
                .select-items div, .select-selected {
                    padding-block: var(--select-items-py, 8px);
					padding-inline: 16px;
					/* border: 1px solid transparent; */
                    cursor: pointer;
                }
                .select-items {
                    position: absolute;
                    z-index: 99;
                    top: 100%;
                    width: 100%;
                    border-radius: var(--select-border-radius, 0px);
                    margin-top: 3px;
                    background-color: var(--select-bg-color, #e4c19e);
                    border: 1px solid var(--select-border-color, #b1a392);
                    overflow: hidden;
                }
                .select-items div:hover {
                    background-color: var(--select-hover-bg-color, #f1f1f1);
                }
                .select-hide {
                    display: none;
                }
                .select-arrow-active {
                    background-color: var(--select-active-bg-color, red);
                    color: var(--select-active-color, white);
                }
                .select-arrow-active:after {
                    border-color: transparent transparent currentColor transparent;
                    top: 7px;
                }
                .select-items div[disabled] {
                    color: var(--select-disabled-color, #ccc);
                    pointer-events: none;
                }
                .same-as-selected {
                    background-color: var(--select-hover-bg-color, #f1f1f1);
                }
            </style>

            <div class="custom-select">
                <div class="select-selected">${selectedOption.innerHTML}</div>
                <div class="select-items select-hide">
                    ${options
						.map((option) => {
							const classes = [];
							if (option.selected) {
								classes.push('same-as-selected');
							}
							const disabled = option.disabled ? ' disabled' : '';
							return `
                            <div
                                ${disabled}
                                data-value="${option.value}"
                                class="${classes.join(' ')}"
                            >
                                ${option.innerHTML}
                            </div>
                            `;
						})
						.join('')}
                </div>
            </div>
        `;

		this.selectedValue = selectedOption.value;
	}

	addEventListeners() {
		const selectedElement =
			this.shadowRoot.querySelector('.select-selected');
		const itemsContainer = this.shadowRoot.querySelector('.select-items');
		const items = this.shadowRoot.querySelectorAll('.select-items div');

		selectedElement.addEventListener('click', (e) => {
			e.stopPropagation();
			// this.closeAllSelect(selectedElement);
			itemsContainer.classList.toggle('select-hide');
			selectedElement.classList.toggle('select-arrow-active');
		});

		items.forEach((item) => {
			item.addEventListener('click', (e) => {
				if (item.hasAttribute('disabled')) return;
				const previousSelected =
					this.shadowRoot.querySelector('.same-as-selected');
				if (previousSelected) {
					previousSelected.classList.remove('same-as-selected');
				}
				selectedElement.innerHTML = item.innerHTML;
				this.selectedValue = item.getAttribute('data-value');
				item.classList.add('same-as-selected');
				itemsContainer.classList.add('select-hide');
				selectedElement.classList.remove('select-arrow-active');
				this.dispatchEvent(new Event('change'));
			});
		});

		document.addEventListener('click', () => this.closeAllSelect());
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

	// Getter and setter for value
	get value() {
		return this.selectedValue;
	}

	set value(newValue) {
		const items = this.shadowRoot.querySelectorAll('.select-items div');
		items.forEach((item) => {
			if (item.getAttribute('data-value') === newValue) {
				const previousSelected =
					this.shadowRoot.querySelector('.same-as-selected');
				if (previousSelected) {
					previousSelected.classList.remove('same-as-selected');
				}
				item.classList.add('same-as-selected');
				this.shadowRoot.querySelector('.select-selected').innerHTML =
					item.innerHTML;
				this.selectedValue = newValue;
			}
		});
	}
}

customElements.define('custom-select', CustomSelect);
