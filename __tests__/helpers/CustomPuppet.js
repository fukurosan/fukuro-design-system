const puppeteer = require("puppeteer")
const fs = require("fs")
const Config = require("./Env")

class CustomPuppet {
	static async CreatePuppet(product = "chrome", isDebugMode = false) {
		const browser = await puppeteer.launch({
			product,
			headless: isDebugMode ? false : true,
			slowMo: isDebugMode ? 100 : 0,
			args: ["--window-size=1920,1080"]
		})
		const page = await browser.newPage()
		await page.setViewport({
			width: 1920,
			height: 1080,
			deviceScaleFactor: 1,
			isMobile: false,
			hasTouch: false,
			isLandscape: false
		})
		const puppet = new CustomPuppet(browser, page)
		return new Proxy(puppet, {
			get: (target, property) => {
				return puppet[property] || browser[property] || page[property] || puppeteer[property]
			}
		})
	}

	constructor(browser, page) {
		this.browser = browser
		this.page = page
	}

	attachToClientConsole() {
		this.page.on("console", message => console.log("BROWSER LOG:", message.text()))
	}

	async loadComponentPage(componentName, customCode) {
		const bundle = fs.readFileSync(Config.bundlePath, "utf8")
		const content = `${customCode ? customCode : ""}<script>${bundle}</script><${componentName}></${componentName}>`
		await this.page.setContent(content)
		await this.page.waitForSelector(componentName)
	}

	async getInnerHTML(selector) {
		return this.page.$eval(selector, el => el.innerHTML)
	}

	async getSelectionLength(selector) {
		return this.page.$$eval(selector, el => el.length)
	}

	async emulate(device) {
		//https://github.com/puppeteer/puppeteer/blob/master/lib/DeviceDescriptors.js
		return this.page.emulate(puppeteer.devices[device])
	}

	async setResolution(width, height) {
		await this.page.setViewport({
			width,
			height
		})
	}

	async setMobileResolution() {
		//Equal to iPhone X
		await this.setResolution(1125, 2436)
	}

	async setDesktopResolution() {
		await this.setResolution(1920, 1080)
	}

	async enableRequestInterceptor() {
		await this.page.setRequestInterception(true)
		this.page.on("request", request => {
			const url = request.url()
			//Patterns that should be aborted
			if (url.startsWith("https://www.abort.com")) {
				request.abort()
			}
			//Patterns that should result in failure
			else if (url.startsWith("https://www.failure.com")) {
				request.failure({
					errorText: "Error"
				})
			}
			//Patterns that should be mocked
			else if (url.startsWith("https://www.inorigo.com")) {
				request.respond({
					status: 200,
					contentType: "application/json; charset=utf-8",
					headers: {
						"Access-Control-Allow-Origin": "*"
					},
					body: JSON.stringify({
						title: "Your request was intercepted"
					})
				})
			} else {
				request.continue()
			}
		})
	}
}

module.exports = CustomPuppet
