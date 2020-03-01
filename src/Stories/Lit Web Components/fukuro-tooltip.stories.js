import { html } from "lit-element"
import { withKnobs, text, boolean, number, date, color, object, array } from "@storybook/addon-knobs"
import { withWebComponentsKnobs } from "storybook-addon-web-components-knobs"
import { withHTML } from "@whitespace/storybook-addon-html/html"
import "../../Components/Lit Components/fukuro-tooltip/fukuro-tooltip.ts"

export default {
  title: "Lit Web Components|fukuro-tooltip-ts",
  component: "fukuro-tooltip-ts",
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

export const DefaultTooltip = () => {
  return html`
    <fukuro-tooltip-ts></fukuro-tooltip-ts>
`}

export const TooltipWithTargetSet = () => {
  return html`
    <fukuro-tooltip-ts data-for="tooltip-target" text="This is the tooltip!"></fukuro-tooltip-ts>
      <h1 name="tooltip-target">
        This is some text with a tooltip
      </h1>
`}