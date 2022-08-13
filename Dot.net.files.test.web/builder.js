/* eslint-disable no-unused-expressions */
var fs = require("fs");
let jsURL = "/build/js/index.js";
let indexURL = "/build/index.html";

let cssLink = "";
let newHtml = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React App</title>
    <!--  Injecting hashed Css file -->
    <link href="{{replace}}" rel="stylesheet" />
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!-- Added index.js file here -->
    <script src="/js/index.js"></script>
  </body>
</html>
`;

new Promise((resolve) => {
  fs.readFile(__dirname + "/build/index.html", "utf8", (err, html) => {
    let getSlicedScript = (newStr) => {
        return newStr.slice(
          newStr.indexOf("</script>") + 9,
          newStr.lastIndexOf("</script>") + 9
        );
      },
      getScript = (newStr) => {
        return newStr.substring(
          newStr.indexOf("<script src=") + 12,
          newStr.indexOf("></script>")
        );
      },
      script1 = html
        .substring(html.indexOf("<script>") + 8, html.indexOf("</script>"))
        .trim(),
      newStr = getSlicedScript(html),
      scriptSrc1 = getScript(newStr);

    newStr = getSlicedScript(newStr);

    let getCssUrs = (str) => {
      return str.slice(
        str.indexOf('<link href="') + '<link href="'.length,
        str.indexOf(' rel="stylesheet">') - 1
      );
    };

    cssLink = getCssUrs(html);
    newHtml = newHtml.replace("{{replace}}", cssLink);

    let scriptSrc2 = getScript(newStr),
      loadJsScript = `\n var loadJS = function (path) {
        var script = document.createElement('script');
        script.src = path;
        script.type = 'text/javascript';
        document.body.appendChild(script);
    }
    loadJS(${scriptSrc1})
    loadJS(${scriptSrc2})
    if (typeof Object.assign != 'function') {
        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, "assign", {
          value: function assign(target, varArgs) { // .length of function is 2
            'use strict';
            if (target == null) { // TypeError if undefined or null
              throw new TypeError('Cannot convert undefined or null to object');
            }
      
            var to = Object(target);
      
            for (var index = 1; index < arguments.length; index++) {
              var nextSource = arguments[index];
      
              if (nextSource != null) { // Skip over if undefined or null
                for (var nextKey in nextSource) {
                  // Avoid bugs when hasOwnProperty is shadowed
                  if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                    to[nextKey] = nextSource[nextKey];
                  }
                }
              }
            }
            return to;
          },
          writable: true,
          configurable: true
        });
      }`;

    fs.writeFile(__dirname + jsURL, script1 + loadJsScript, () => {
      console.log("INDEX JS UPDATED");
      resolve();
    });
  });
}).then(() => {
  fs.writeFile(__dirname + indexURL, newHtml, () => {
    console.log("HTML CREATED");
    console.log("------------ BUILD CREATED ------------\n");
  });
});
