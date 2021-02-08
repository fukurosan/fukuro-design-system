import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import babel from "@rollup/plugin-babel"
import json from "@rollup/plugin-json"
import pkg from "./package.json"
import scss from "rollup-plugin-scss"
import { string } from "rollup-plugin-string"
import copy from "rollup-plugin-copy"
import serve from "rollup-plugin-serve"
import livereload from "rollup-plugin-livereload"

const DIST_FOLDER = "dist"
const HTML_TEST_FILE = "index.html"
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

const POST_PROCESSOR_PLUGINS = []

export default {
    input: "./src/Components/index.js",
    output: [
        {
            file: `${DIST_FOLDER}/example/${LIBRARY_NAME}-bundle.js`,
            format: "umd",
            banner: BANNER,
            globals: GLOBALS
        }
    ],
    external: [Object.keys(GLOBALS)],
    plugins: [
        ...PRE_PROCESSOR_PLUGINS,
        babel({
            exclude: /node_modules(?![\\\/](lit-html|lit-element))/, //Dev server uses www build, so lit has to be transpiled
            extensions: [".js", ".ts"],
            babelHelpers: "bundled",
        }),
        ...POST_PROCESSOR_PLUGINS,
        copy({
            targets: [
                {
                    src: `src/${HTML_TEST_FILE}`,
                    dest: `${DIST_FOLDER}/example/`,
                    rename: "index.html",
                    transform: content => content.toString().replace("</body>", `<script src="./${LIBRARY_NAME}-bundle.js"></script></body>`)
                },
                { src: "node_modules/@ungap/custom-elements-builtin/min.js", dest: `${DIST_FOLDER}/polyfills/builtins` },
                { src: "node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js", dest: `${DIST_FOLDER}/polyfills/webcomponents` },
                { src: "node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js", dest: `${DIST_FOLDER}/polyfills/webcomponents` },
                { src: "node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js", dest: `${DIST_FOLDER}/polyfills/webcomponents` },
                { src: "node_modules/@webcomponents/webcomponentsjs/bundles/webcomponents-ce.js", dest: `${DIST_FOLDER}/polyfills/webcomponents/bundles` },
                { src: "node_modules/@webcomponents/webcomponentsjs/bundles/webcomponents-sd-ce-pf.js", dest: `${DIST_FOLDER}/polyfills/webcomponents/bundles` },
                { src: "node_modules/@webcomponents/webcomponentsjs/bundles/webcomponents-sd-ce.js", dest: `${DIST_FOLDER}/polyfills/webcomponents/bundles` },
                { src: "node_modules/@webcomponents/webcomponentsjs/bundles/webcomponents-sd.js", dest: `${DIST_FOLDER}/polyfills/webcomponents/bundles` },
            ],
            copyOnce: true
        }),
        serve({
            open: true,
            openPage: "/index.html",
            contentBase: [`${DIST_FOLDER}`, `${DIST_FOLDER}/example`],
            port: "8080"
        }),
        livereload({
            watch: `${DIST_FOLDER}`
        })
    ]
}