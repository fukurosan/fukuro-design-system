import template from "./fukuro-dropdown.html"
import styles from "./fukuro-dropdown.scss"

const templateElement = document.createElement("template")
templateElement.innerHTML = `<style>${styles}</style>${template}`

/**
 * A searchable dropdown component. Works similar to a <select> with <option> elements that populate it.
 * @element fukuro-dropdown
 *
 * @slot - This is a slot for the HTMLOptionElement children.
 */

class Dropdown extends HTMLElement {
	constructor() {
		super()
		//For the polyfills to work we need to add this line
		window.ShadyCSS && window.ShadyCSS.prepareTemplate(templateElement, "fukuro-dropdown")
		const template = templateElement.content.cloneNode(true)
		this.attachShadow({ mode: "open" }).appendChild(template)
		this._input = this.shadowRoot.querySelector("#input")
		this._ul = this.shadowRoot.querySelector("#list")
		this._noBlur = false
		this._input.addEventListener("focus", () => this.handleFocus())
		this._input.addEventListener("blur", () => this.handleBlur())
		this._input.addEventListener("keyup", e => this.handleChange(e.target.value))
		this._value = ""
		this._observer = new MutationObserver(() => this.handleUpdate())
	}

	connectedCallback() {
		this.handleUpdate()
		this._observer.observe(this, { childList: true, subtree: true })
	}

	disconnectedCallback() {
		this._observer.disconnect()
	}

	handleFocus() {
		this.setAttribute("open", "")
	}

	handleBlur() {
		if (!this._noBlur) {
			this.removeAttribute("open")
			this._input.value = this._value
		}
	}

	handleChange(value) {
		this._li.forEach(li => {
			if (!li.innerText.toUpperCase().startsWith(value.toUpperCase())) {
				li.style.display = "none"
			} else {
				li.style.display = "block"
			}
		})
	}

	handleUpdate() {
		this._options = Array.from(this.querySelectorAll("option")).map(opt => opt.innerText)
		this._li = []
		this._ul.innerHTML = ""
		this._options.forEach(opt => {
			const li = document.createElement("li")
			const text = document.createTextNode(opt)
			li.appendChild(text)
			li.addEventListener("click", e => {
				this._noBlur = false
				this._value = opt
				this.handleChange(opt)
				this.handleBlur()
			})
			li.addEventListener("mouseenter", () => (this._noBlur = true))
			li.addEventListener("mouseleave", () => (this._noBlur = false))
			this._li.push(li)
			this._ul.appendChild(li)
		})
	}
}

window.customElements.define("fukuro-dropdown", Dropdown)
