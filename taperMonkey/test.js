﻿// ==UserScript==
// @name         gittest
// @namespace    gittest
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://github.com/msnryng/msnryng.github.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://msnryng.github.io/taperMonkey/hellotest.js";
  var firstScript = document.getElementsByTagName("script")[0];
  firstScript.parentNode.insertBefore(script, firstScript);
//   var test = new GitTest("hello dude");
  // Your code here...
})();
