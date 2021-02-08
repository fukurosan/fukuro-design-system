/**
 * An extended native ul with custom functionality for nested uls.
 * Any uls placed inside the custom ul will be imploded by default, and explode on click.
 * @element fukuro-ul
 */

class Ul extends HTMLUListElement {
	constructor(...args) {
		super(...args)
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
		const uls = this.querySelectorAll("ul")
		const lis = this.querySelectorAll("li")

		uls.forEach(ul => {
			ul.style.display = "none"
		})

		lis.forEach(li => {
			li.removeEventListener("click", this.toggleVisibility)
			li.addEventListener("click", this.toggleVisibility)
		})
	}

	toggleVisibility(e) {
		e.stopPropagation()
		const ul = e.target.querySelector("ul")
		if (ul) {
			ul.style.display = ul.style.display === "block" ? "none" : "block"
		}
	}
}

customElements.define("fukuro-ul", Ul, { extends: "ul" })
