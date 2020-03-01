import { LitElement, html, css, unsafeCSS, customElement, property } from "lit-element"
//@ts-ignore
import styles from "raw-loader!./fukuro-tooltip.scss"

/**
 * A tooltip that can target any CSS selector in its document.
 * @element fukuro-tooltip
*/

@customElement("fukuro-tooltip-ts")
class Tooltip extends LitElement {

  @property({ type: Boolean, reflect: false}) _tooltipVisible = false
  @property({ type: Number, reflect: false}) _x = 0
  @property({ type: Number, reflect: false }) _y = 0
  @property({ type: String, attribute: "text", reflect: true }) tooltipText = "You forgot to set a tooltip text!"
  @property({ type: String, attribute: "data-for", reflect: true }) target = "NO TARGET"

  static get styles() {
    return css`
    ${unsafeCSS(styles)}
    `
  }

  connectedCallback() {
    super.connectedCallback()
    const targetElement = document.querySelector(`[name=${this.target}]`)
    if (targetElement) {
      targetElement.addEventListener("mouseenter", () => { this.toggleTooltip() })
      targetElement.addEventListener("mousemove", (e: MouseEvent) => {
        this._x = e.clientX + 10
        this._y = e.clientY + 10
        this.requestUpdate()
      })
      targetElement.addEventListener("mouseleave", () => { this.toggleTooltip() })
    }
  }

  toggleTooltip() {
    this._tooltipVisible = !this._tooltipVisible
    this.requestUpdate()
  }

  render() {
    return html`
      <div style=${`top:${this._y}px; left:${this._x}px;`} class=${`tooltip ${(this._tooltipVisible ? "visible" : "")}`}>
        ${this.tooltipText}
      </div>`
  }
}