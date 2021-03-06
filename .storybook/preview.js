import { configure, setCustomElements } from "@storybook/web-components";
import customElements from "../src/custom-elements.json";

setCustomElements(customElements);

// force full reload to not reregister web components
const req = require.context("../src/Stories", true, /\.stories\.(js|mdx)$/);
configure(req, module);
if (module.hot) {
  module.hot.accept(req.id, () => {
    const currentLocationHref = window.location.href;
    window.history.pushState(null, null, currentLocationHref);
    window.location.reload();
  })
}