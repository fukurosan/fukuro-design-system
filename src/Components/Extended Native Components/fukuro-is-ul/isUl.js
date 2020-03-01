/**
 * An extended native ul with custom functionality for nested uls.
 * Any uls placed inside the custom ul will be imploded by default, and explode on click. 
 * @element fukuro-ul
*/

class Ul extends HTMLUListElement {
    connectedCallback() {
        const uls = this.querySelectorAll("ul")
        const lis = this.querySelectorAll("li")

        uls.forEach(ul => {
            ul.style.display = "none"
        })

        lis.forEach(li => {
            li.addEventListener("click", this.toggleVisibility)
        })
    }

    toggleVisibility(e) {
        e.stopPropagation()
        const ul = e.target.querySelector("ul")
        if (ul) {
            ul.style.display = ul.style.display === "block" ? "none" : "block"
        }
    }
}

customElements.define("fukuro-ul", Ul, { extends: "ul" })