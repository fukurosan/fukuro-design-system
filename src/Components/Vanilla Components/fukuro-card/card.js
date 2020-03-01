import template from "!!raw-loader!./card.html"
import styles from "raw-loader!./card.scss"

const templateElement = document.createElement("template")
templateElement.innerHTML = `<style>${styles}</style>${template}`

/**
 * A card component
 * @element fukuro-card
 * 
 * @slot - This is the slot for the content inside of the card.
*/

class Card extends HTMLElement {
    constructor() {
        super()
        //For the polyfills to work we need to add this line
        window.ShadyCSS && window.ShadyCSS.prepareTemplate(templateElement, "fukuro-card")

        const template = templateElement.content.cloneNode(true)
        this.attachShadow({ mode: "open" }).appendChild(template)
    }
}
window.customElements.define("fukuro-card", Card)
