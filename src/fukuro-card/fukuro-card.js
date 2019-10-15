import template from "!!raw-loader!./fukuro-card.html"
import styles from "raw-loader!./fukuro-card.scss"

const templateElement = document.createElement("template")
templateElement.innerHTML = `<style>${styles}</style>${template}`

class FukuroCard extends HTMLElement {

  constructor() {
    super()
    //For the polyfills to work we need to add this line
    window.ShadyCSS && window.ShadyCSS.prepareTemplate(templateElement, "fukuro-card")

    this.attachShadow({ mode: "open" }).appendChild(templateElement.content.cloneNode(true))
  }

}

window.customElements.define("fukuro-card", FukuroCard)