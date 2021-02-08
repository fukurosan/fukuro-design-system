import { html } from "lit-element"
import { withHTML } from "@whitespace/storybook-addon-html/html"
import "../../Components/Extended Native Components/fukuro-is-ul/fukuro-ul"

export default {
  title: "Extended Native Elements|fukuro-expandable-ul",
  component: "fukuro-ul",
  decorators: [withHTML],
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

export const DefaultListWithUlChild = () => {
  return html`
      <ul is="fukuro-ul">
        <li>
          First 1
          <ul>
            <li>
              Second 1
              <ul>
                <li>Third 1</li>
                <li>Third 2</li>
                <li>Third 3</li>
              </ul>
            </li>
            <li>Second 2</li>
            <li>Second 3</li>
          </ul>
        </li>
        <li>
          First 2
        </li>
      </ul>
`}