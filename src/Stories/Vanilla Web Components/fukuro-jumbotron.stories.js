import { html } from "lit-element"
import { withKnobs, text, boolean, number, date, color, object, array } from "@storybook/addon-knobs"
import { withWebComponentsKnobs } from "storybook-addon-web-components-knobs"
import { withHTML } from "@whitespace/storybook-addon-html/html"
import "../../Components/Vanilla Components/fukuro-jumbotron/jumbotron"

export default {
  title: "Vanilla Web Components|fukuro-jumbotron",
  component: "fukuro-jumbotron",
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

export const DefaultJumbotron = () => {
  return html`
    <fukuro-jumbotron></fukuro-jumbotron>
`}

export const AttributeJumbotron = () => {
  const header = text("Header Text", "Header")
  const subtitle = text("Subtitle Text", "Subtitle")
  return html`
    <fukuro-jumbotron header=${header} subtitle=${subtitle}></fukuro-jumbotron>
`}

export const SlotJumbotron = () => {
  const header = text("Header Text", "Header")
  const subtitle = text("Subtitle Text", "Subtitle")
  return html`
    <fukuro-jumbotron>
      <h1 slot="header">${header}</h1>
      <h3 slot="subtitle">${subtitle}</h3>
    </fukuro-jumbotron>
`}