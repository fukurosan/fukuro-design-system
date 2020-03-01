import { html } from "lit-element"
import { withKnobs, text, boolean, number, date, color, object, array } from "@storybook/addon-knobs"
import { withWebComponentsKnobs } from "storybook-addon-web-components-knobs"
import { withHTML } from "@whitespace/storybook-addon-html/html"
import "../../Components/Composition Pattern Components/fukuro-list-group-datafor/list-group"

export default {
  title: "Composition Patterns|data-for/fukuro-list-group",
  component: "fukuro-list-group",
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

export const DefaultListGroup = () => {
  return html`
    <fukuro-list-group></fukuro-list-group>
`}

export const ListGroupWithContent = () => {
  return html`
    <fukuro-list-group>
      <button name="button1">Content 1</button>
      <button name="button2">Content 2</button>
      <button name="button3">Content 3</button>
      <p data-for="button1">Some content</p>
      <p data-for="button2">Some other content</p>
      <p data-for="button3">More content</p>
    </fukuro-list-group>
`}