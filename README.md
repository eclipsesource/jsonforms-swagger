# jsonforms-swagger

This project integrates [JSONForms](http://github.eclipsesource.com/jsonforms/) with the [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification).
Given a RESTful service defined with the OpenAPI Specification, this project uses JSONForms
for automatically building web forms capable of interacting with that service.

## Demo

Watch jsonforms-swagger in action on the [demo page](https://jsonforms-swagger.firebaseapp.com/).

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

The `npm start` command compiles the application and runs the `weppack-dev-server`.
Both the compiler and the server watch for file changes.
Results are served from localhost:8080.

Shut it down manually with Ctrl-C.

You're ready to use/extend this application.
