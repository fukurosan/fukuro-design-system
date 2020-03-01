# Application Design System using Web Components

## What is this?
This is a proof of concept for a design system built using web components. It is part of a web components course I created, and aims to show off different web component patterns, concepts and challenges.

The basics of web components are quite simple to grasp, but to construct a rigid, production ready environment can be quite a daunting task - with everything from bundlers and compilers to frameworks and programming patterns. This project contains all the basic building blocks needed to get started. It uses Webpack as a bundler, and is therefore highly customizable to specific needs.

## A few things included
- SASS -> This project incorporates SASS, which means that you can create everything from extensions to mixins and variables in your project.
- Typescript -> Typescript (optional!) comes preconfigured in the babel config, as well as includes a typescript watch command, where the TS compiler will watch your project files for changes
- Lit -> Lit also comes preconfigured, to show how you can build components using this library
- Storybook -> Storybook allows you to document and display your component library
- Automated Documentation -> A custom-elements.json file is automatically generated using JSDoc annotation in your project files.

## Webpack & Babel
Webpack and Babel are used to bundle, transpile and polyfill the project code. There are two builds, one "www" which is compatible all the way down to IE11 (not including native extensions!), and one modern one (esnext) that will compile for all esm compatible browsers.

Apart from babel two other libraries are used to polyfill Shadow DOM, Custom Elements as well as native extensions. ShadyCSS is used for IE11 and Edge.

## Installation and usage
To install:
```bash
npm install
```

To start the webpack development server:
```bash
npm start:webpack
```

To start storybook:
```bash
npm start:storybook
```

To start the typescript watcher:
```bash
npm start:tswatch
```

To build the component bundle:
```bash
npm run build
```

You can also build specific parts using:
```bash
npm run build:documentation
npm run build:storybook
npm run build:www
npm run build:esnext
```

## Screenshots
![Screenshot 1](/ss1.PNG?raw=true)
![Screenshot 2](/ss.PNG?raw=true)