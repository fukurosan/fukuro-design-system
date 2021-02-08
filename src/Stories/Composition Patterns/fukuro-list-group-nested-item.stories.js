import { html } from "lit-element"
import { withKnobs } from "@storybook/addon-knobs"
import { withWebComponentsKnobs } from "storybook-addon-web-components-knobs"
import { withHTML } from "@whitespace/storybook-addon-html/html"
import "../../Components/Composition Pattern Components/fukuro-list-group-nested/list-group-item/fukuro-list-group-item"

export default {
  title: "Composition Patterns|events/fukuro-list-group-child",
  component: "fukuro-list-group-item",
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

export const DefaultListChild = () => {
  return html`
    <fukuro-list-group-item></fukuro-list-group-item>
`}

export const ListChildWithContent = () => {
  return html`
    <fukuro-list-group-item label="Content 1">Some content</fukuro-list-group-item>
`}