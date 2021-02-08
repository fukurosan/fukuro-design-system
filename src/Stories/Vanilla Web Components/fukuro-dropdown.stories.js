import { html } from "lit-element"
import { withKnobs, text, boolean, number, date, color, object, array } from "@storybook/addon-knobs"
import { withWebComponentsKnobs } from "storybook-addon-web-components-knobs"
import { withHTML } from "@whitespace/storybook-addon-html/html"
import "../../Components/Vanilla Components/fukuro-dropdown/fukuro-dropdown"

export default {
  title: "Vanilla Web Components|fukuro-dropdown",
  component: "fukuro-dropdown",
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

export const Defaultdropdown = () => {
  return html`
    <fukuro-dropdown></fukuro-dropdown>
`}

export const DropdownWithValueset = () => {
  const options = array("Options", ["panda", "panama", "pandemic", "party", "praise", "prayer"])
  return html`
    <fukuro-dropdown>
      ${options.map(option => html`<option>${option}</option>`)}
    </fukuro-dropdown>
`}