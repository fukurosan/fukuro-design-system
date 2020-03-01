import template from "!!raw-loader!./dropdown.html"
import styles from "raw-loader!./dropdown.scss"

const templateElement = document.createElement("template")
templateElement.innerHTML = `<style>${styles}</style>${template}`

/**
 * A searchable dropdown component. Works similar to a <select> with <option> elements that populate it.
 * @element fukuro-dropdown
 * 
 * @slot - This is a slot for the HTMLOptionElement children.
*/

class Dropdown extends HTMLElement {

    constructor() {
        super()
        //For the polyfills to work we need to add this line
        window.ShadyCSS && window.ShadyCSS.prepareTemplate(templateElement, "fukuro-dropdown")

        const template = templateElement.content.cloneNode(true)
        this.attachShadow({ mode: "open" }).appendChild(template)

        this._input = this.shadowRoot.querySelector("#input")
        this._ul = this.shadowRoot.querySelector("#list")

        this._input.addEventListener("focus", (e) => this.handleFocus(e))
        this._input.addEventListener("blur", (e) => {
            if (!this.noBlur) {
                this.handleBlur(e)
            }
        })
        this._input.addEventListener("keyup", (e) => this.handleChange(e.target.value))

        this._value = ""
    }

    connectedCallback() {
        this._options = Array.from(this.querySelectorAll("option")).map(opt => opt.innerText)
        this._li = []
        this._options.forEach(opt => {
            const li = document.createElement("li")
            const text = document.createTextNode(opt)
            li.appendChild(text)
            li.addEventListener("click", (e) => {
                this._value = opt
                this.handleChange(opt)
                this.handleBlur({})
            })
            li.addEventListener("mouseenter", () => this.noBlur = true)
            li.addEventListener("mouseleave", () => this.noBlur = false)
            this._li.push(li)
            this._ul.appendChild(li)
        })
    }

    handleFocus(e) {
        this.setAttribute("open", "")
    }

    handleBlur(e) {
        this.removeAttribute("open")
        this.render()
    }

    handleChange(value) {
        this._li.forEach(li => {
            if (!li.innerText.toUpperCase().startsWith(value.toUpperCase())) {
                li.style.display = "none"
            }
            else {
                li.style.display = "block";
            }
        })
    }

    render() {
        this._input.value = this._value
    }

}

window.customElements.define("fukuro-dropdown", Dropdown)