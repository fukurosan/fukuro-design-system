import { html } from "lit-element"
import { withKnobs, text, boolean, number, date, color, object, array } from "@storybook/addon-knobs"
import { withWebComponentsKnobs } from "storybook-addon-web-components-knobs"
import { withHTML } from "@whitespace/storybook-addon-html/html"
import "../../Components/Vanilla Components/fukuro-card/fukuro-card"

export default {
  title: "Vanilla Web Components|fukuro-card",
  component: "fukuro-card",
  decorators: [withKnobs, withWebComponentsKnobs, withHTML],
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

export const Defaultcard = () => {
  return html`
    <fukuro-card></fukuro-card>
`}

export const CardWithContentInSlot = () => {
  const content = text("Content", "This is some content inside the card!")
  return html`
    <fukuro-card>
      <h1>${content}</h1>
    </fukuro-card>
`}