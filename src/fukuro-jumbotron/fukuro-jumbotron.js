import template from "!!raw-loader!./fukuro-jumbotron.html"
import styles from "raw-loader!./fukuro-jumbotron.scss"

const templateElement = document.createElement("template")
templateElement.innerHTML = `<style>${styles}</style>${template}`

class FukuroJumbotron extends HTMLElement {

  static get observedAttributes() {
    return ["header", "subtitle"]
  }

  constructor() {
    super()
    //For the polyfills to work we need to add this line
    window.ShadyCSS && window.ShadyCSS.prepareTemplate(templateElement, "fukuro-jumbotron")

    this.attachShadow({ mode: "open" }).appendChild(templateElement.content.cloneNode(true))

    this._header = null
    this._subtitle = null
    this._headerElement = this.shadowRoot.querySelector("#header")
    this._subtitleElement = this.shadowRoot.querySelector("#subtitle")
  }

  connectedCallback() {
    if (this.hasAttribute("header")) {
      this._header = this.getAttribute("header")
    }
    if (this.hasAttribute("subtitle")) {
      this._subtitle = this.getAttribute("subtitle")
    }
    this._render()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "header":
        this._header = newValue;
        this._render()
        break;
      case "subtitle":
        this._subtitle = newValue
        this._render()
        break;
    }
  }

  _render() {
    if (this._header) {
      this._headerElement.textContent = this._header
    }
    if (this._subtitle) {
      this._subtitleElement.textContent = this._subtitle
    }
  }
}

window.customElements.define("fukuro-jumbotron", FukuroJumbotron)