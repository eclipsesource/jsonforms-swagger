# jsonforms-swagger

This project integrates [JSONForms](http://github.eclipsesource.com/jsonforms/) with the [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification).
Given a RESTful service defined with the OpenAPI Specification, this project uses JSONForms
for automatically building web forms capable of interacting with that service.

## Prerequisites

This is an Angular 2 application, so it requires Node.js and npm.

## Build process

Clone this repo into new project folder (e.g., `my-proj`).
```bash
git clone  https://github.com/eclipsesource/jsonforms-swagger.git  my-proj
cd my-proj
```

Install the npm packages described in the `package.json` and verify that it works:

```bash
npm install
npm start
```

> If the `typings` folder doesn't show up after `npm install` please install them manually with:

> `npm run typings -- install`

The `npm start` command first compiles the application, 
then simultaneously re-compiles and runs the `lite-server`.
Both the compiler and the server watch for file changes.

Shut it down manually with Ctrl-C.

You're ready to use/extend this application.
