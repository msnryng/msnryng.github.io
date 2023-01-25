//https://msnryng.github.io/taperMonkey/util.user.js
function openErSite(word) {
	const erUrls = []
	erUrls.push("https://supjav.com/?s=" + word)
	erUrls.push("https://www.google.com/search?num=100&q=" + word + "+site%3Athatav.net")
	erUrls.push("https://www.google.com/search?num=100&q=" + word + "+site%3Ajapanhub.net")
	erUrls.push("https://sukebei.nyaa.si/?f=0&c=0_0&q=" + word)
	erUrls.Push("https://missav.com/ja/search/"+ word)
	erUrls.push("https://www.google.com/search?num=100&q=" + word + "+site%3Ajp.spankbang.com")
	for (const key in erUrls) {
		window.open(erUrls[key], "_blank")
	}
}
