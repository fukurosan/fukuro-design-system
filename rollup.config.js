import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import babel from "@rollup/plugin-babel"
import json from "@rollup/plugin-json"
import pkg from "./package.json"
import { terser } from "rollup-plugin-terser"
import scss from "rollup-plugin-scss"
import { string } from "rollup-plugin-string"
import copy from "rollup-plugin-copy"
import bundleSize from "rollup-plugin-bundle-size"

const DIST_FOLDER = "dist"
const TEST_FOLDER = "__tests__"
const LIBRARY_NAME = "fukurowc"
const VERSION = pkg.version
const AUTHOR = pkg.author
const DESCRIPTION = pkg.description
const BANNER = `/** @preserve @license @cc_on
 * ----------------------------------------------------------
 * ${LIBRARY_NAME} version ${VERSION}
 * ${DESCRIPTION}
 * Copyright (c) ${new Date().getFullYear()} ${AUTHOR}
 * All Rights Reserved. MIT License
 * https://mit-license.org/
 * ----------------------------------------------------------
 */\n`

const GLOBALS = {

}

const bundles = {
	"bundle": "./src/Components/index.js",
	"fukuro-card": "./src/Components/Vanilla Components/fukuro-card/fukuro-card.js"
}

const PRE_PROCESSOR_PLUGINS = [
	json(),
	resolve(),
	commonjs(),
	scss({
		output: false,
		outputStyle: "compressed"
	}),
	string({
		include: ["**/*.html"],
	}),
]

const POST_PROCESSOR_PLUGINS = [
	terser({
		format: {
			comments(node, comment) {
				const text = comment.value
				const type = comment.type
				if (type == "comment2") {
					return /@preserve|@license|@cc_on/i.test(text)
				}
			}
		}
	}),
	bundleSize()
]

const testBuilds = []
if (process.env.TEST) {
	testBuilds.push({
		input: bundles.bundle,
		output: [
			{
				file: `${TEST_FOLDER}/bundle/${LIBRARY_NAME}-bundle.mjs`,
				format: "esm",
				banner: BANNER
			}
		],
		external: [Object.keys(GLOBALS)],
		plugins: [
			...PRE_PROCESSOR_PLUGINS,
			babel({
				exclude: "node_modules/**",
				extensions: [".ts"],
				babelHelpers: "bundled",
				babelrc: false,
				presets: [
					"@babel/preset-typescript"
				],
				plugins: [
					["@babel/plugin-proposal-decorators", { legacy: true }],
					"@babel/plugin-proposal-class-properties"
				]
			}),
			...POST_PROCESSOR_PLUGINS
		]
	})
}

let esmBuilds = []
if (process.env.ESM) {
	esmBuilds = Object.keys(bundles).map(bundle => {
		return {
			input: bundles[bundle],
			output: [
				{
					file: `${DIST_FOLDER}/esm/${LIBRARY_NAME}-${bundle}.mjs`,
					format: "esm",
					banner: BANNER
				}
			],
			external: [Object.keys(GLOBALS)],
			plugins: [
				...PRE_PROCESSOR_PLUGINS,
				babel({
					exclude: "node_modules/**",
					extensions: [".ts"],
					babelHelpers: "bundled",
					babelrc: false,
					presets: [
						"@babel/preset-typescript"
					],
					plugins: [
						["@babel/plugin-proposal-decorators", { legacy: true }],
						"@babel/plugin-proposal-class-properties"
					]
				}),
				...POST_PROCESSOR_PLUGINS
			]
		}
	})
}

let wwwBuilds = []
if (process.env.WWW) {
	wwwBuilds = Object.keys(bundles).map(bundle => {
		return {
			input: bundles[bundle],
			output: [
				{
					file: `${DIST_FOLDER}/www/${LIBRARY_NAME}-${bundle}.js`,
					format: "umd",
					globals: GLOBALS,
					banner: BANNER
				}
			],
			external: [Object.keys(GLOBALS)],
			plugins: [
				...PRE_PROCESSOR_PLUGINS,
				babel({
					//This one uses an external file in order to sync with Storybook
					exclude: /node_modules(?![\\\/](lit-html|lit-element))/, //We need to transpile lit as well for es5 support
					extensions: [".js", ".ts"],
					babelHelpers: "bundled",
				}),
				...POST_PROCESSOR_PLUGINS
			]
		}
	})
}

let esnextBuilds = []
if (process.env.ESNEXT) {
	esnextBuilds = Object.keys(bundles).map(bundle => {
		return {
			input: bundles[bundle],
			output: [
				{
					file: `${DIST_FOLDER}/esnext/${LIBRARY_NAME}-${bundle}.js`,
					format: "umd",
					globals: GLOBALS,
					banner: BANNER
				}
			],
			external: [Object.keys(GLOBALS)],
			plugins: [
				...PRE_PROCESSOR_PLUGINS,
				babel({
					exclude: "node_modules/**",
					extensions: [".js", ".ts"],
					babelHelpers: "bundled",
					babelrc: false,
					presets: [
						"@babel/preset-typescript",
						["@babel/preset-env", {
							targets: { esmodules: true },
							useBuiltIns: "usage",
							corejs: 3
						}]
					],
					plugins: [
						["@babel/plugin-proposal-decorators", { legacy: true }],
						"@babel/plugin-proposal-class-properties"
					]
				}),
				...POST_PROCESSOR_PLUGINS
			]
		}
	})
}

const finalizationConfig = []
if (process.env.POLYFILL) {
	finalizationConfig.push({
		input: "./.storybook/main.js", //Any random file will do. We are just leveraging rollup to run the plugins
		plugins: [
			copy({
				targets: [
					{ src: "node_modules/@ungap/custom-elements-builtin/min.js", dest: `${DIST_FOLDER}/polyfills/builtins` },
					{ src: "node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js", dest: `${DIST_FOLDER}/polyfills/webcomponents` },
					{ src: "node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js", dest: `${DIST_FOLDER}/polyfills/webcomponents` },
					{ src: "node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js", dest: `${DIST_FOLDER}/polyfills/webcomponents` },
					{ src: "node_modules/@webcomponents/webcomponentsjs/bundles/webcomponents-ce.js", dest: `${DIST_FOLDER}/polyfills/webcomponents/bundles` },
					{ src: "node_modules/@webcomponents/webcomponentsjs/bundles/webcomponents-sd-ce-pf.js", dest: `${DIST_FOLDER}/polyfills/webcomponents/bundles` },
					{ src: "node_modules/@webcomponents/webcomponentsjs/bundles/webcomponents-sd-ce.js", dest: `${DIST_FOLDER}/polyfills/webcomponents/bundles` },
					{ src: "node_modules/@webcomponents/webcomponentsjs/bundles/webcomponents-sd.js", dest: `${DIST_FOLDER}/polyfills/webcomponents/bundles` },
					{ src: "src/custom-elements.json", dest: `${DIST_FOLDER}/documentation` }
				]
			})
		]
	})
}

export default [...esmBuilds, ...wwwBuilds, ...esnextBuilds, ...testBuilds, ...finalizationConfig]