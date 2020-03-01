import { html } from "lit-element"
import { withKnobs, text, boolean, number, date, color, object, array } from "@storybook/addon-knobs"
import { withWebComponentsKnobs } from "storybook-addon-web-components-knobs"
import { withHTML } from "@whitespace/storybook-addon-html/html"
import "../../Components/Vanilla Components/fukuro-accordion/accordion"

export default {
  title: "Vanilla Web Components|fukuro-accordion",
  component: "fukuro-accordion",
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

export const DefaultAccordion = () => {
  return html`
    <fukuro-Accordion></fukuro-Accordion>
`}

export const ContentAccordion = () => {
  const child = text("Content Slot", "This is some content inside of the accordion")
  return html`
    <fukuro-Accordion title="This title attribute will not update!">
      <p>
        ${child}
      </p>
    </fukuro-Accordion>
`}