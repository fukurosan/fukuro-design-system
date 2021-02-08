import template from "./fukuro-list-group-nested.html"
import styles from "./fukuro-list-group-nested.scss"

const templateElement = document.createElement("template")
templateElement.innerHTML = `<style>${styles}</style>${template}`

/**
 * A showcase of how to use an event pattern for component composition.
 * @element fukuro-list-group-nested
 *
 * @slot The default slot is used for fukuro-list-group-item elements.
 */

class ListGroupNested extends HTMLElement {
	constructor() {
		super()
		//For the polyfills to work we need to add this line
		window.ShadyCSS && window.ShadyCSS.prepareTemplate(templateElement, "fukuro-list-group-nested")
		const template = templateElement.content.cloneNode(true)
		this.attachShadow({ mode: "open" }).appendChild(template)
		this._observer = new MutationObserver(() => this.handleInput())
	}

	connectedCallback() {
		this.handleInput()
		this._observer.observe(this, { childList: true, subtree: true })
	}

	disconnectedCalback() {
		this._observer.disconnect()
	}

	handleInput() {
		const buttonUl = this.shadowRoot.querySelector("#button-list")
		const rightContainer = this.shadowRoot.querySelector("#right")
		buttonUl.innerHTML = ""
		rightContainer.innerHTML = ""
		const buttons = this.querySelectorAll("fukuro-list-group-item")

		buttons.forEach(buttonEl => {
			buttonEl.addEventListener("list_group_item_clicked", e => {
				e.stopPropagation()
				rightContainer.innerHTML = e.detail
			})
			const li = document.createElement("li")
			li.appendChild(buttonEl)
			buttonUl.appendChild(li)
		})
	}
}

window.customElements.define("fukuro-list-group-nested", ListGroupNested)
