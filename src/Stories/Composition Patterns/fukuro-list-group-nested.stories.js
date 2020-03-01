import { html } from "lit-element"
import { withKnobs } from "@storybook/addon-knobs"
import { withWebComponentsKnobs } from "storybook-addon-web-components-knobs"
import { withHTML } from "@whitespace/storybook-addon-html/html"
import "../../Components/Composition Pattern Components/fukuro-list-group-nested/list-group/list-group"
import "../../Components/Composition Pattern Components/fukuro-list-group-nested/list-group-item/list-group-item"

export default {
  title: "Composition Patterns|events/fukuro-list-group-parent",
  component: "fukuro-list-group-nested",
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
    <fukuro-list-group-nested></fukuro-list-group-nested>
`}

export const ListGroupWithContent = () => {
  return html`
    <fukuro-list-group-nested>
      <fukuro-list-group-item label="Content 1">Some content</fukuro-list-group-item>
      <fukuro-list-group-item label="Content 2">Some other content</fukuro-list-group-item>
      <fukuro-list-group-item label="Content 3">More content</fukuro-list-group-item>
    </fukuro-list-group-nested>
`}