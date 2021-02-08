import template from "./fukuro-jumbotron.html"
import styles from "./fukuro-jumbotron.scss"

const templateElement = document.createElement("template")
templateElement.innerHTML = `<style>${styles}</style>${template}`

/**
 * A jumbotron component
 * @element fukuro-jumbotron
 *
 * @attr {string} header - The header text of the element.
 * @attr {string} subtitle - The subtitle text of the element.
 *
 * @prop {string} _header - This is the prop representation of the attribute header.
 * @prop {string} _subtitle - This is the prop representation of the attribute subtitle.
 *
 * @slot header - This is a slot for the header content.
 * @slot subtitle - This is a slot for the subtitle content.
 */

class Jumbotron extends HTMLElement {
	constructor() {
		super()
		//For the polyfills to work we need to add this line
		window.ShadyCSS && window.ShadyCSS.prepareTemplate(templateElement, "fukuro-jumbotron")
		const template = templateElement.content.cloneNode(true)
		this.attachShadow({ mode: "open" }).appendChild(template)
		this._headerElement = this.shadowRoot.querySelector("#header")
		this._subtitleElement = this.shadowRoot.querySelector("#subtitle")
	}

	static get observedAttributes() {
		return ["header", "subtitle"]
	}

	attributeChangedCallback(name, oldValue, newValue) {
		switch (name) {
			case "header":
				this._header = newValue
				this._headerElement.innerHTML = newValue
				break
			case "subtitle":
				this._subtitle = newValue
				this._subtitleElement.innerHTML = newValue
				break
		}
	}
}

window.customElements.define("fukuro-jumbotron", Jumbotron)
