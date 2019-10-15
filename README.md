# Application Design System using Web Components

## What is this?
This is a technical proof of concept for a design system built using web components.

I wanted to create a way to build resuable, atomic, graphical components - think "button", "jumbotron", "textfield", and so on - that could be reused across projects irregardless of the web technologies in the stack. That way I would no longer have to copy-paste stylesheets, deal with deprecated look-and-feels, nor rewrite all my components in every new project. Instead, they could simply be imported as needed. Using web components this is has proven to now be possible!

## Sticking to the Standards
In this project I have chosen to only use vanilla javascript to build my web components. That means not using something like stencil or lit, and also staying away from Typescript. I wanted to stay away from these libraries and instead just stick to the standards. While these frameworks can be handy I felt that the whole point of this is to lose the need for specific frameworks and libraries in my stack. And besides, most of these components are super simple anyways. I just don't see the need.

## SASS
This project incorporates SASS stylesheets meaning that the entire design system can be easily changed in the future as things progresses. What's even cooler is that if you import the "latest" version of your design system from a CDN then all new changes published in the future will immediately be visible across all your applications. This makes it incredibly powerful.

## Installation and usage
To install:
```bash
npm install
```

To start the development server:
```bash
npm start
```

To build the component bundle:
```bash
npm run build
```