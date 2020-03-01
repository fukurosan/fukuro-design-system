import styles from "raw-loader!./isButton.scss"

const plainStyle = styles.substring(styles.indexOf("{") + 1, styles.indexOf("}")) + ";"
const hoverStyle = plainStyle + " " + styles.substring(styles.lastIndexOf("{") + 1, styles.lastIndexOf("}"))

/**
 * An extended native button with custom styles.
 * @element fukuro-button
*/

class Button extends HTMLButtonElement {
    connectedCallback() {
        this.style = plainStyle
        this.addEventListener("mouseenter", () => { this.mouseEnter() })
        this.addEventListener("mouseleave", () => { this.mouseLeave() })
    }

    mouseEnter() {
        this.style = hoverStyle
    }
    mouseLeave() {
        this.style = plainStyle
    }
}

window.customElements.define("fukuro-button", Button, { extends: "button" })