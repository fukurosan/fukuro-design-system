import { html } from "lit-element"
import { withKnobs, text, boolean, number, date, color, object, array } from "@storybook/addon-knobs"
import { withWebComponentsKnobs } from "storybook-addon-web-components-knobs"
import { withHTML } from "@whitespace/storybook-addon-html/html"
import "../../Components/Lit Components/fukuro-lit-lifecycle/fukuro-lit-lifecycle"

export default {
  title: "Lit Web Components|fukuro-lit-lifecycle",
  component: "fukuro-lit-lifecycle",
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

export const DefaultLifecycle = () => {
  return html`
    <fukuro-lit-lifecycle></fukuro-lit-lifecycle>
`}

export const LifecycleWithAttributeChange = () => {
  const num = number("Number", 0)
  return html`
    <fukuro-lit-lifecycle number=${num}></fukuro-lit-lifecycle>
`}