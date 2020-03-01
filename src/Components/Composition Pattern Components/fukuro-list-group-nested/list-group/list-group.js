import template from "!!raw-loader!./list-group.html"
import styles from "raw-loader!./list-group.scss"

const templateElement = document.createElement("template")
templateElement.innerHTML = `<style>${styles}</style>${template}`

/**
 * A showcase of how to use an event pattern for component composition.
 * @element fukuro-list-group-nested
 * 
 * @slot The default slot is used for fukuro-list-group-item elements.
*/

class ListGroupNested extends HTMLElement {
    constructor() {
        super()
        //For the polyfills to work we need to add this line
        window.ShadyCSS && window.ShadyCSS.prepareTemplate(templateElement, "fukuro-list-group-nested")
        const template = templateElement.content.cloneNode(true)
        this.attachShadow({ mode: "open" }).appendChild(template)
    }

    connectedCallback() {
        const buttonUl = this.shadowRoot.querySelector("#button-list")
        const rightContainer = this.shadowRoot.querySelector("#right")
        const buttons = this.querySelectorAll("fukuro-list-group-item")

        buttons.forEach(buttonEl => {
            buttonEl.addEventListener("list_group_item_clicked", (e) => {
                e.stopPropagation()
                rightContainer.innerHTML = e.detail
            })
            const li = document.createElement("li")
            li.appendChild(buttonEl)
            buttonUl.appendChild(li)
        })
    }
}

window.customElements.define("fukuro-list-group-nested", ListGroupNested)
