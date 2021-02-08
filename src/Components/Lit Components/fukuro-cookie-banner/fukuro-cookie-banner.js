import { LitElement, css, unsafeCSS, html } from "lit-element"
import { until } from "lit-html/directives/until.js"
import styles from "./fukuro-cookie-banner.scss"

/**
 * A banner at the bottom of the screen with an accept and reject button! Ask whatever question you want and capture the event on accept/reject.
 * @element fukuro-cookie-banner
 *
 * @fires accept - This event is fired when the accept button is clicked.
 * @fires reject - This event is fired when the reject button is clicked.
 */

class CookieBanner extends LitElement {
	constructor() {
		super()
		this.text = "N/A"
	}

	static get properties() {
		return {
			text: {
				type: String,
				attribute: "question",
				reflect: true,
				converter: {
					fromAttribute(value) {
						if (!value) {
							return "Please don't take my attribute from me!"
						}
						const somePromiseWebCall = new Promise(resolve => {
							setTimeout(() => {
								resolve(value)
							}, 1000)
						})
						return html`${until(somePromiseWebCall, html`<span>Loading message...</span>`)}`
					}
				}
			}
		}
	}

	static get styles() {
		return css`
			${unsafeCSS(styles)}
		`
	}

	handleClick(eventType) {
		const ce = new CustomEvent(eventType)
		this.dispatchEvent(ce)
		this.parentElement.removeChild(this)
	}

	render() {
		return html`
			<div id="container">
				<div>${this.text}</div>
				<br />
				<button @click=${() => this.handleClick("reject")}>Reject</button>
				<button @click=${() => this.handleClick("accept")}>Accept</button>
			</div>
		`
	}
}

customElements.define("fukuro-cookie-banner", CookieBanner)
