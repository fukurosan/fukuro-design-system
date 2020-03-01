import { html } from "lit-element"
import { withKnobs, text, boolean, number, date, color, object, array } from "@storybook/addon-knobs"
import { withHTML } from "@whitespace/storybook-addon-html/html"
import "../../Components/Extended Native Components/fukuro-is-button/isButton"

export default {
  title: "Extended Native Elements|fukuro-button",
  component: "fukuro-button",
  decorators: [withKnobs, withHTML],
  parameters: {
    knobs: {
      escapeHTML: false
    },
    backgrounds: [
      { name: "default", value: "#FFFFFF", default: true },
      { name: "dark", value: "#000000" }
    ]
  }
}

export const DefaultButton = () => {
  return html`
    <button is="fukuro-button"></button>
`}

export const ButtonWithInnerHTML = () => {
  const caption = text("Button Caption", "Click me!")
  return html`
    <button is="fukuro-button">${caption}</button>
`}