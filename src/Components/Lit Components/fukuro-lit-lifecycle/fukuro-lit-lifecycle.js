import { LitElement, html } from "lit-element"

/**
 * This component shows off the lit lifecycle.
 * @element fukuro-lit-lifecycle
 * 
 * @attr {number} number - The numeric value that is used to trigger the lifecycle.
 *
 * @prop {number} value - The prop representing the number attribute internally.
 * 
*/

class Lifecycle extends LitElement {

  static get properties() {
    return {
      value: { type: Number, attribute: "number", reflect: true }
    }
  }

  constructor() {
    super()
    this.value = 0
    console.log("Native Lifecycle: Constructor")
  }

  connectedCallback() {
    console.log("Native Lifecycle: Connected callback")
    super.connectedCallback()
  }

  attributeChangedCallback(...args) {
    console.log("Native Lifecycle: Attribute changed callback")
    super.attributeChangedCallback(...args)
  }
  
  requestUpdate(...args) {
    console.log("Lit Lifecycle: Request update")
    return super.requestUpdate(...args)
  }

  performUpdate(...args) {
    console.log("Lit Lifecycle: Perform update")
    return super.performUpdate(...args)
  }

  shouldUpdate(...args) {
    console.log("Lit Lifecycle: Should update")
    return super.shouldUpdate(...args)
  }

  requestUpdate(...args) {
    console.log("Lit Lifecycle: Request update")
    return super.requestUpdate(...args)
  }

  update(...args) {
    console.log("Lit Lifecycle: Update")
    return super.update(...args)
  }

  firstUpdated(...args) {
    console.log("Lit Lifecycle: First updated")
    return super.firstUpdated(...args)
  }

  updateComplete(...args) {
    console.log("Lit Lifecycle: Update complete")
    return super.updateComplete(...args)
  }

  triggerLifecycle() {
    console.log("Button was clicked!")
    console.log("this.value: " + this.value)
    this.value += 1
    console.log("this.value: " + this.value)
  }

  render() {
    console.log("Lit Lifecycle: Render")
    return html`
      <button @click=${() => this.triggerLifecycle()}>Trigger prop update</button>
    `
  }
}

customElements.define("fukuro-lit-lifecycle", Lifecycle);