import template from "!!raw-loader!./list-group-item.html"
import styles from "raw-loader!./list-group-item.scss"

const templateElement = document.createElement("template")
templateElement.innerHTML = `<style>${styles}</style>${template}`

/**
 * A showcase of how to use an event pattern for component composition.
 * @element fukuro-list-group-item
 * 
 * @fires list_group_item_clicked - This event is fired when the element is clicked.
*/

class ListGroupItem extends HTMLElement {
    constructor() {
        super()
        //For the polyfills to work we need to add this line
        window.ShadyCSS && window.ShadyCSS.prepareTemplate(templateElement, "fukuro-list-group-item")
        const template = templateElement.content.cloneNode(true)
        this.attachShadow({ mode: "open" }).appendChild(template)

        this._button = this.shadowRoot.querySelector("button")
        this._button.innerText = this.hasAttribute("label") ? this.getAttribute("label") : "LABEL NOT SET"
        this._button.addEventListener("click", () => {
            //If an event is fired inside the shadow root then the composed attribute will determine if it is allowed to bubble into the light DOM.
            const event = new CustomEvent("list_group_item_clicked", { detail: this.innerHTML, composed: true, bubbles: true })
            this._button.dispatchEvent(event)
            //Any event fired by "this" is fired in the context of the light DOM.
            //const event = new CustomEvent("list-group-item-click", { detail: this.innerHTML })
            //this.dispatchEvent(event)
        })
    }

}
window.customElements.define("fukuro-list-group-item", ListGroupItem)
