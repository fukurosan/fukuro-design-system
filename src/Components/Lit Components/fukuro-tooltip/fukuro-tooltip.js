import { LitElement, html, css, unsafeCSS } from "lit-element"
import styles from "raw-loader!./fukuro-tooltip.scss"

class Tooltip extends LitElement {

  constructor() {
    super()
    this.tooltipVisible = false;
    this.tooltipText = "You forgot to set a tooltip text!";
    this.target = "NO TARGET"
    this.x = 0
    this.y = 0
  }

  static get properties() {
    return {
      tooltipVisible: { type: Boolean },
      x: { type: Number },
      y: { type: Number },
      tooltipText: { type: String, attribute: "text", reflect: true },
      target: { type: String, attribute: "data-for", reflect: true },
    }
  }

  static get styles() {
    return css`${unsafeCSS(styles)}`
  }

  connectedCallback() {
    super.connectedCallback()
    const targetElement = document.querySelector(`[name=${this.target}]`)
    if (targetElement) {
      targetElement.addEventListener("mouseenter", () => { this.toggleTooltip() })
      targetElement.addEventListener("mousemove", (e) => {
        this.x = e.clientX
        this.y = e.clientY
      })
      targetElement.addEventListener("mouseleave", () => { this.toggleTooltip() })
    }
  }

  toggleTooltip() {
    this.tooltipVisible = !this.tooltipVisible;
  }

  render() {
    return html`
      <div style=${`top:${this.y}px; left:${this.x}px;`} class=${`tooltip ${(this.tooltipVisible ? "visible" : "")}`}>
        ${this.tooltipText}
      </div>`
  }
}

customElements.define("fukuro-tooltip", Tooltip)