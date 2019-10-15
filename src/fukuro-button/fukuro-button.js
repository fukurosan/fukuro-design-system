import template from "!!raw-loader!./fukuro-button.html"
import styles from "raw-loader!./fukuro-button.scss"

const templateElement = document.createElement("template")
templateElement.innerHTML = `<style>${styles}</style>${template}`

class FukuroButton extends HTMLElement {

  static get observedAttributes() {
    return ["onclick"]
  }

  constructor() {
    super()
    //For the polyfills to work we need to add this line
    window.ShadyCSS && window.ShadyCSS.prepareTemplate(templateElement, "fukuro-button")

    this.attachShadow({ mode: "open" }).appendChild(templateElement.content.cloneNode(true))

    this._buttonElement = this.shadowRoot.querySelector("button")
  }

  connectedCallback() {
    Object.keys(this.attributes).forEach(attributeKey => {
      const attribute = this.attributes[attributeKey]
      this._buttonElement[attribute.name] = this.getAttribute(attribute.name)
    })
    this._render()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this._buttonElement[name] = this.getAttribute(name)
    this._render()
  }

  _render() {

  }
}

window.customElements.define("fukuro-button", FukuroButton)