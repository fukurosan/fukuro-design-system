import template from "!!raw-loader!./fukuro-input.html"
import styles from "raw-loader!./fukuro-input.scss"

const templateElement = document.createElement("template")
templateElement.innerHTML = `<style>${styles}</style>${template}`

class FukuroInput extends HTMLElement {

  static get observedAttributes() {
    return ["onchange", "value", "placeholder", "type"]
  }

  constructor() {
    super()
    //For the polyfills to work we need to add this line
    window.ShadyCSS && window.ShadyCSS.prepareTemplate(templateElement, "fukuro-input")

    this.attachShadow({ mode: "open" }).appendChild(templateElement.content.cloneNode(true))

    this._inputElement = this.shadowRoot.querySelector("input")
  }

  connectedCallback() {
    Object.keys(this.attributes).forEach(attributeKey => {
      const attribute = this.attributes[attributeKey]
      this._inputElement[attribute.name] = this.getAttribute(attribute.name)
    })
    this._render()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this._inputElement[name] = this.getAttribute(name)
    this._render()
  }

  _render() {

  }
}

window.customElements.define("fukuro-input", FukuroInput)