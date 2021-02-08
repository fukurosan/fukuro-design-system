const Puppet = require("../../../../__tests__/helpers/CustomPuppet")
const Config = require("../../../../__tests__/helpers/Env")

describe("fukuro-card", () => {
	const ELEMENT_TAG = "fukuro-card"

	describe("Snapshot", () => {
		let element

		beforeEach(() => {
			element = document.createElement(ELEMENT_TAG)
			document.body.appendChild(element)
		})

		afterEach(async () => {
			document.body.querySelector(ELEMENT_TAG).remove()
		})

		it("Mounts correctly in the DOM", () => {
			expect(document.body.innerHTML + element.shadowRoot.innerHTML).toMatchSnapshot()
		})
	})

	describe("Headless", () => {
		let puppet

		const setContent = async () => {
			await puppet.loadComponentPage(ELEMENT_TAG)
			await puppet.evaluate(selector => {}, ELEMENT_TAG)
		}

		beforeEach(async () => {
			puppet = await Puppet.CreatePuppet("chrome", Config.isDebugMode)
			await puppet.enableRequestInterceptor()
			await setContent()
			if (Config.isDebugMode) {
				puppet.attachToClientConsole()
			}
		})

		afterEach(async () => {
			await puppet.close()
		})

		it("Default looks Correct on Desktop", async () => {
			const image = await puppet.screenshot()
			expect(image).toMatchImageSnapshot({ customSnapshotIdentifier: `${ELEMENT_TAG}-Desktop` })
		})

		it("Default looks Correct on Mobile", async () => {
			await puppet.setMobileResolution()
			const image = await puppet.screenshot()
			expect(image).toMatchImageSnapshot({ customSnapshotIdentifier: `${ELEMENT_TAG}-Mobile` })
		})
	})
})
