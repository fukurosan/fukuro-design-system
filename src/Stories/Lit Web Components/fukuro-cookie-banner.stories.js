import { html } from "lit-element"
import { withKnobs, text, boolean, number, date, color, object, array } from "@storybook/addon-knobs"
import { withWebComponentsKnobs } from "storybook-addon-web-components-knobs"
import { withHTML } from "@whitespace/storybook-addon-html/html"
import "../../Components/Lit Components/fukuro-cookie-banner/fukuro-cookie-banner"

export default {
  title: "Lit Web Components|fukuro-cookie-banner",
  component: "fukuro-cookie-banner",
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

export const DefaultBanner = () => {
  return html`
    <fukuro-cookie-banner></fukuro-cookie-banner>
`}

export const WithAQuestion = () => {
  const question = text("Question", "Do you accept the terms of agreement?")
  return html`
    <fukuro-cookie-banner question=${question}></fukuro-cookie-banner>
`}