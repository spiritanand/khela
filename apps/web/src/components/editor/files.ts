const someJSCodeExample = `console.log("Hello, World!");`;

const someCSSCodeExample = `h1 {
color:red;
}

body {
    background-color: blue;
}
`;

const someHTMLCodeExample = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <title>iframe</title>
    </head>
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root"><h1>HI</h1></div>
    </body>
  </html>
`;

const files = {
  "script.js": {
    name: "script.js",
    language: "javascript",
    value: someJSCodeExample,
  },
  "style.css": {
    name: "style.css",
    language: "css",
    value: someCSSCodeExample,
  },
  "index.html": {
    name: "index.html",
    language: "html",
    value: someHTMLCodeExample,
  },
};

export default files;
