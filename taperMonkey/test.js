// ==UserScript==
// @name         gittest
// @namespace    gittest
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://nt.site777.tv/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src =
    "https://msnryng.github.io/taperMonkey/hellotest.js?query=" +
    new Date().getTime();
  var firstScript = document.getElementsByTagName("script")[0];
  firstScript.parentNode.insertBefore(script, firstScript);
	var setIntervalID=setInterval(() => {
		if (window.classLoaded) {
			clearInterval(setIntervalID);
			var t = window.getClass()
			var test=new t("fuck!!!!")
		} else {
			console.log("wait");
		}
	}, 10);

})();
