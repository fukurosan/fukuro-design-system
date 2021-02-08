import { LitElement, html, css, unsafeCSS, customElement, property } from "lit-element"
//@ts-ignore
import styles from "./fukuro-tooltip.scss"

/**
 * A tooltip that can target any CSS selector in its document.
 * @element fukuro-tooltip
 */

@customElement("fukuro-tooltip-ts")
class Tooltip extends LitElement {
	constructor() {
		super()
	}

	@property({ type: Boolean, reflect: false }) _tooltipVisible = false
	@property({ type: Number, reflect: false }) _x = 0
	@property({ type: Number, reflect: false }) _y = 0
	@property({ type: String, attribute: "text", reflect: true }) tooltipText = "You forgot to set a tooltip text!"
	@property({ type: String, attribute: "data-for", reflect: true }) target = "NO TARGET"
	@property({ type: Element }) targetElement: Element | null = null
	@property({ type: Function }) toggleTooltipRef = () => this.toggleTooltip()
	@property({ type: Function }) MoveTooltipRef = (e: MouseEvent) => this.MoveTooltip(e)

	static get styles() {
		return css`
			${unsafeCSS(styles)}
		`
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		this.clearListeners()
	}

	addListeners() {
		const targetElement = document.querySelector(`[name='${this.target}']`)
		if (targetElement) {
			this.clearListeners()
			this.targetElement = targetElement
			targetElement.addEventListener("mouseenter", this.toggleTooltipRef)
			targetElement.addEventListener("mousemove", this.MoveTooltipRef)
			targetElement.addEventListener("mouseleave", this.toggleTooltipRef)
		}
	}

	clearListeners() {
		if (this.targetElement) {
			this.targetElement.removeEventListener("mouseenter", this.toggleTooltipRef)
			this.targetElement.removeEventListener("mousemove", this.MoveTooltipRef)
			this.targetElement.removeEventListener("mouseleave", this.toggleTooltipRef)
		}
	}

	toggleTooltip() {
		this._tooltipVisible = !this._tooltipVisible
		this.requestUpdate()
	}

	MoveTooltip(e: MouseEvent) {
		this._x = e.clientX + 10
		this._y = e.clientY + 10
		this.requestUpdate()
	}

	render() {
    this.clearListeners()
    this.addListeners()
		return html`<div style=${`top:${this._y}px; left:${this._x}px;`} class=${`tooltip ${this._tooltipVisible ? "visible" : ""}`}>${this.tooltipText}</div>`
	}
}
