//https://msnryng.github.io/taperMonkey/util.user.js
function openErSite(word) {
	const erUrls = []
	erUrls.push("https://supjav.com/?s=" + word)
	erUrls.push("https://javfan.one/?s=" + word)
	erUrls.push("https://www.youav.com/search/videos/" + word)
	erUrls.push("https://www.google.com/search?num=100&q=" + word + "+site%3Athatav.net")
	erUrls.push("https://www.google.com/search?num=100&q=" + word + "+site%3Ajapanhub.net")
	erUrls.push("https://sukebei.nyaa.si/?f=0&c=0_0&q=" + word)
	erUrls.push("https://javonly.net/index.php?do=search" + word)
	erUrls.push("https://www.buzzav.com/search/videos/" + word)
	erUrls.push("https://javgiga.com/?s=" + word)
	erUrls.push("https://www2.javhdporn.net/search/" + word + "/")
	erUrls.push("http://xjavporn.com/?s=" + word)
	erUrls.push("https://www.google.com/search?num=100&q=" + word + "+site%3Ajp.spankbang.com")
	for (const key in erUrls) {
		window.open(erUrls[key], "_blank")
	}
}