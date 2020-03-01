import template from "!!raw-loader!./accordion.html"
import styles from "raw-loader!./accordion.scss"

const templateElement = document.createElement("template")
templateElement.innerHTML = `<style>${styles}</style>${template}`

/**
 * A accordion component
 * @element fukuro-accordion
 * 
 * @attr {string} title - The text printed on the accordion button row. This attribute will never update.
 *
 * @slot - This is the slot for the content inside of the accordion.
*/

class Accordion extends HTMLElement {

  constructor() {
    super()
    //For the polyfills to work we need to add this line
    window.ShadyCSS && window.ShadyCSS.prepareTemplate(templateElement, "fukuro-accordion")

    const template = templateElement.content.cloneNode(true)
    this.attachShadow({ mode: "open" }).appendChild(template)

    this._content = this.shadowRoot.querySelector("#content")
    this._button = this.shadowRoot.querySelector("#button")
    this._button.addEventListener("click", () => this.toggleContent())

    if (this.hasAttribute("title")) {
      const text = document.createTextNode(this.getAttribute("title"))
      this._button.appendChild(text)
    }
    else {
      this._button.innerHTML = "No title provided"
    }
  }

  toggleContent() {
    if (this._content.style.maxHeight) {
      this._content.style.maxHeight = null
    }
    else {
      this._content.style.maxHeight = this._content.scrollHeight + "px"
    }
  }

}

window.customElements.define("fukuro-accordion", Accordion)