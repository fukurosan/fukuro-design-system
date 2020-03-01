import template from "!!raw-loader!./list-group.html"
import styles from "raw-loader!./list-group.scss"

const templateElement = document.createElement("template")
templateElement.innerHTML = `<style>${styles}</style>${template}`

/**
 * A showcase of how to use the data-for (or sometimes data-name) pattern for component composition.
 * @element fukuro-list-group
 * 
 * @slot The default slot is used for buttons and paragraphs where the data-for attribute on the paragraph elements should match the name attribute on the buttons.
*/

class ListGroup extends HTMLElement {
    constructor() {
        super()
        //For the polyfills to work we need to add this line
        window.ShadyCSS && window.ShadyCSS.prepareTemplate(templateElement, "fukuro-list-group")
        const template = templateElement.content.cloneNode(true)
        this.attachShadow({ mode: "open" }).appendChild(template)
    }

    connectedCallback() {
        const buttonUl = this.shadowRoot.querySelector("#button-list")
        const rightContainer = this.shadowRoot.querySelector("#right")
        const buttons = this.querySelectorAll("button")
        const paragraphs = [...this.querySelectorAll("p")]

        buttons.forEach(buttonEl => {
            buttonEl.addEventListener("click", () => {
                const p = paragraphs.find(p => {
                    return p.getAttribute("data-for") === buttonEl.getAttribute("name")
                })
                if (p) {
                    rightContainer.innerHTML = p.innerHTML
                }
            })

            const li = document.createElement("li")
            li.appendChild(buttonEl)
            buttonUl.appendChild(li)
        })
    }
}

window.customElements.define("fukuro-list-group", ListGroup)
