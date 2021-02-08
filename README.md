# Web Components Design System

## What is this?
This is a proof of concept for a design system built using web components. It is part of a web components course I created, and aims to show off different web component patterns, concepts and challenges.

The basics of web components are quite simple to grasp, but to construct a rigid, production ready development environment can be quite a daunting task - with everything from bundlers and compilers to frameworks and programming patterns. This project contains all the building blocks needed to get started.

## A few things included

Component | Description
--- | ---
Code Separation | Each component is divided up into four files: HTML, CSS, JS and Test.
SASS | Gives you the power to create everything from extensions to mixins and global design variables.
Typescript | (optional!) if you want to create typed components. Use the watch command to run the compiler in watch mode as you code.
Lit | (optional!) to show how you can build components using this popular library.
Storybook | Storybook allows you to document and display your component library.
Documentation automation | A custom-elements.json file is automatically generated using JSDoc annotation in your project files. This documentation can then be used by consuming systems.
Test automation | Both headless testing using Puppeteer as well as snapshot testing, all held together with Jest.
Linting | Both linting and code formatting using Prettier is included, as well as a number of default rules that can be changed as needed.
Rollup | To bundle the project into production ready bundles, including relevant plugins like terser for code minification.
Babel | To transpile the project for backwards compatibility.
Programming Patterns | Perhaps the best thing of all? This project shows off a number of different patterns and approaches typically used in web component development.

## Rollup & Babel
Rollup and Babel are used to bundle, transpile and polyfill the project code. There are three builds, one "www" which is compatible all the way down to IE11 (not including native extensions!), one modern (esnext) that will compile for all esm compatible browsers, as well as one esm version that will not transpile any code what-so-ever. The last one is typically useful for consuming projects with bundlers.

Apart from babel two other libraries are used to polyfill Shadow DOM, Custom Elements as well as native extensions. ShadyCSS is used for IE11 and old Edge.

## Consuming systems
The project is configured for different types of consumers. The package.json file is set up to inform bundlers that they should use the non-transpiled esm version when bundling, but otherwise the www-umd file. CDN services unkpkg and jsdeliver are also directed to the www-file as default. This can easily be modified by just changing the paths specified in package.json.

## Installation and usage
Each component in the repository usually consists of four files. One HTML file containing the shadow dom markup, one JS (or TS) file containing the web component class itself, one scss file containing the stylesheets for the component, as well as a test file for test automation. I think this gives a really nice developer experience, as well as lets the developer get the full power out of his or her IDE. The scss and html file imports will be handled by the compiler and processed/converted to text-strings automatically at build-time.

All components are documented using JSDOC at the top of each file. This documentation will be compiled when the project is built, and included in the dist folder.

All components are imported into the index.js file, which is the main bundle. To add additional bundles, or build stand-alone components you can edit the rollup.config.js file and add additional entries to the "bundles" array. To add global libraries simply add the library name to the "globals" object in that same file.

When building the project a folder with polyfills will automatically come packaged with it. If running in a legacy environment these may need to be loaded. Check the dist/example/index.html file for an example of what this may look like!


To install:
```bash
npm install
```

To start the rollup development server (this is usually what you want while developing!):
```bash
npm start
```

To start storybook:
```bash
npm start:storybook
```

To start the typescript watcher:
```bash
npm start:tswatch
```

To run the tests:
```bash
npm run test
```

To run the linter and fix any potential issues (this will also execute prettier for the entire project):
```bash
npm run lint:fix
```

You can also execute the linter without automatic fixing:
```bash
npm run lint
```

To build the project:
```bash
npm run build
```

You can also build specific parts using:
```bash
npm run build:documentation
npm run build:storybook
npm run build:www
npm run build:esnext
npm run build:esm
```

## Screenshots
![Screenshot 1](/ss1.PNG?raw=true)
![Screenshot 2](/ss2.PNG?raw=true)
