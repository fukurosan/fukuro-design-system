import template from "./fukuro-accordion.html"
import styles from "./fukuro-accordion.scss"

const templateElement = document.createElement("template")
templateElement.innerHTML = `<style>${styles}</style>${template}`

/**
 * A accordion component
 * @element fukuro-accordion
 *
 * @attr {string} title - The text printed on the accordion button row. This attribute will never update.
 *
 * @slot - This is the slot for the content inside of the accordion.
 */

class Accordion extends HTMLElement {
	constructor() {
		super()
		//For the polyfills to work we need to add this line
		window.ShadyCSS && window.ShadyCSS.prepareTemplate(templateElement, "fukuro-accordion")
		const template = templateElement.content.cloneNode(true)
		this.attachShadow({ mode: "open" }).appendChild(template)
		this._content = this.shadowRoot.querySelector("#content")
		this._button = this.shadowRoot.querySelector("#button")
		this._button.addEventListener("click", () => this.toggleContent())
	}

	connectedCallback() {
		this.render()
	}

	attributeChangedCallback() {
		this.render()
	}

	toggleContent() {
		if (this._content.style.maxHeight) {
			this._content.style.maxHeight = null
		} else {
			this._content.style.maxHeight = `${this._content.scrollHeight}px`
		}
	}

	render() {
		if (this.hasAttribute("title")) {
			const text = document.createTextNode(this.getAttribute("title"))
			this._button.innerHTML = ""
			this._button.appendChild(text)
		} else {
			this._button.innerHTML = "No title provided. Use the 'title' attribute to set the title of the element."
		}
	}
}

window.customElements.define("fukuro-accordion", Accordion)
