const html = String.raw; // dev-only helper for formatting

class FieldInput extends HTMLElement {
	constructor() {
		super();

		const shadow = this.attachShadow({ mode: 'open' });
		const label = this.getAttribute('label') || '';

		shadow.innerHTML = html`
			<style>
				:host {
					display: block;
					width: 100%;
				}
				.wrapper {
					position: relative;
					font-size: 19px;
				}
				.wrapper,
				.wrapper input {
					font-family: 'Passion One', sans-serif;
				}
				input {
					font-size: 22px;
					line-height: 1.4;
					width: 100%;
					height: 58px;
					padding: 0 0.5em;
					padding-top: 10px;
					border-radius: 0.5em;
					background: #c0a782;
					border: 1.5px solid black;
					color: #47370f;
					box-sizing: border-box;
				}
				.placeholder {
					position: absolute;
					left: 1em;
					top: 50%;
					transform: translateY(-50%);
					font-size: 19px;
					color: #7a5f32;
					opacity: 0.6;
					pointer-events: none;
					transition: all 0.2s ease;
				}
				input:focus + .placeholder,
				input:not(:placeholder-shown) + .placeholder {
					top: 4px;
					font-size: 13px;
					transform: translateY(0);
					opacity: 0.9;
				}
			</style>
			<div class="wrapper">
				<input type="text" placeholder=" " />
				<span class="placeholder">${label}</span>
			</div>
		`;

		this._input = shadow.querySelector('input');

		// Proxy native events so host listeners work
		this._input.addEventListener('input', (e) => {
			e.stopPropagation();
			this.dispatchEvent(
				new Event('input', { bubbles: true, composed: true })
			);
		});
		this._input.addEventListener('change', (e) => {
			e.stopPropagation();
			this.dispatchEvent(
				new Event('change', { bubbles: true, composed: true })
			);
		});
	}

	get value() {
		return this._input.value;
	}

	set value(val) {
		this._input.value = val;
	}
}

customElements.define('field-input', FieldInput);
