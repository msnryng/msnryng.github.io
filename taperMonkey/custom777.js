function initTaperScript(loginMail,loginPass) {
	(function () {
		const classes = classGene();
		const JugData = classes.JugData;
		const Binom = classes.Binom;
		var tgtAta, dayIs, days, daysRank;
		var defCss =
			'font-family:"ms gothic"!important;background-color: #f44336!important;border: none;color: white!important;text-align: center!important;text-decoration: none!important;display: inline-block!important;font-size: 10px!important;margin: 2px 2px!important;cursor: pointer;padding: 4px 4px!important;';
		var disableCss =
			'font-family:"ms gothic"!important;background-color: grey!important;border: none;color: white!important;text-align: center!important;text-decoration: none!important;display: inline-block!important;font-size: 10px!important;margin: 2px 2px!important;cursor: pointer;padding: 4px 4px!important;';
		var title = document.querySelector("title");
		if (title.textContent == "アクセス拒否") {
			location.href =
				"https://site777.tv/yahoo/redirect/autoMode/1?type=ispLogin&next_uri=https%3A%2F%2Fsite777.tv%2Fyahoo%2Fredirect%2FdataRobo";
			return;
		}
		var errorExist = document.querySelector("div.list-head_Z");
		if (errorExist) {
			if (
				errorExist.innerHTML.indexOf(
					"現在システムが混み合っております。"
				) != -1
			) {
				title.textContent = "ERROR! 現在システムが混み合っております。";
			}
		}

		if (
			location.href.indexOf("/HallDedamaLogin.do") != -1 ||
			location.href.indexOf("kakin/GraphList.do") != -1
		) {
			//一覧
			ichiranOrGraphs();
		} else if (location.href.indexOf("/kakin/Top.do") != -1) {
			kakinTopdo();
		} else if (location.href.indexOf("/MypageLoginTop.do") != -1) {
			myPageLoginTop();
		} else if (location.href.indexOf("/HallSelectLink.do") != -1) {
			HallSelectLink();
		} else if (
			location.href.indexOf("/MypageLogin.do") != -1 ||
			location.href.indexOf("/MypageTop.do") != -1
		) {
			MypageLoginOrTop();
		} else if (location.href.indexOf("HallSearchByArea.do") != -1) {
			autoLogin();
		} else if (location.href.indexOf("kakin/TableHistory.do") != -1) {
			var trs = document.querySelectorAll("#dedama_past_table tr");
			var type = "",
				start = 0;
			var datas = [];
			var hamari = [];
			var toggle = [];
			toggle["BB"] = "RB";
			toggle["RB"] = "BB";
			hamari["BB"] = { val: 0, list: [] };
			hamari["RB"] = { val: 0, list: [] };
			var preType = "";
			for (let i = trs.length - 1; i > 0; i--) {
				var o = trs[i];
				var tds = o.querySelectorAll("td");
				if (i == 1) {
					type = preType;
				} else {
					type = tds[1].querySelector("span").textContent;
				}
				start = Number(tds[3].textContent);
				if (preType != "" && type != preType) {
					hamari[type].list.push(hamari[type].val);
					hamari[preType].val = 0;
				}
				hamari[toggle[type]].val += start;
				preType = type;
				// datas.push('{type:"' + type + '",start:' + start + '}')
			}
			console.log(trs.length);
			var result = "";
			if (trs.length > 1) {
				hamari[toggle[type]].list.push(hamari[toggle[type]].val);
				var bb = hamari["BB"].list.join(",");
				var rb = hamari["RB"].list.join(",");
				result = "{BB:[" + bb + "],RB:[" + rb + "]}";
				console.log(result);
			}
			var day = getDayNo();
			autoSave(result, "rireki" + day + ".txt");
			// console.log(day, result);
		}

		//https://nt.site777.tv/data/a1dsaXltNnZkejlxcjU4MjZvN1hMbkdEYXhLZ09qNCtDRlJIKzdISEdWWmNtWlZ0Q25IWlpJUVBFSGRSZWxUenQxYkcveU8yTWd4cjV6dzU1eDVtMkE9PQ==/kakin/Top.do
		if (title.textContent.indexOf("設置機種&出玉情報") != -1) {
			var hall_contents = document.querySelectorAll("div#hall_contents");
			hall_contents[1].parentNode.removeChild(hall_contents[1]);
			var hallpage_hds = document.querySelectorAll("h3.hallpage_hd");
			remover(hallpage_hds);
			var li_pachis = document.querySelectorAll("li.pachi");
			remover(li_pachis);
			var pachi = document.querySelector("table.pachi");
			pachi.parentNode.removeChild(pachi);
			var slot = document.querySelector("table.slot");
			var trs = slot.querySelectorAll("tr");
			var detect = false;
			var delTgts = [];
			for (let index = 0; index < trs.length; index++) {
				const element = trs[index];
				var th = element.querySelector("th");
				if (index > 0 && th != null) {
					detect = true;
				}
				if (detect) {
					delTgts.push(element);
				}
			}
			remover(delTgts);
			var slots = document.querySelector("table.slot");
			var tds = slots.querySelectorAll("td.clear");
			var tgtBefore = document.querySelector("#global_container");
			for (const key in tds) {
				const element = tds[key];
				if (typeof element == "object") {
					var name = textTrim(
						element.querySelector("span").textContent
					).split("（")[0];
					console.log(name);
					var inputs = element.querySelectorAll("input");
					for (let index = 0; index < inputs.length; index++) {
						const element = inputs[index];
						if (element.name == "select") {
							makeBtnOnClick(name, tgtBefore, element);
						}
					}
				}
			}
		}
		function autoLogin() {
			var a = document.querySelector("p.log >a");
			a.click();
		}
		function kakinTopdo() {
			autoLogin();
		}
		function ichiranOrGraphs() {
			removeElementByTex("#header");
			removeElementByTex("h1.h_text");
			// removeElementByTex(".hallpage_hd");
			removeElementByTex("#hall_contents");
			var tgtBefore = document.querySelector("#hall_contents");
			var graph_list = document.querySelector("#graph_list");
			var ata0 = document.querySelector("#ata0");
			var ooatari = document.querySelector("#ooatari");
			if (ooatari) {
				var a = ooatari.querySelector("a");
				if (a) {
					makeBtnOnClick(
						"graph",
						document.querySelector("#g-nav"),
						a
					);
				} else {
					makeBtn("nograph", document.querySelector("#g-nav"), "");
				}
			}
			var jug = new JugData();
			var name = document
				.querySelector("#machine_name")
				.querySelector("a").textContent;
			var jugCk = jug.setMachine(name);
			var daySum = [];
			daysRank = [];
			if (ata0) {
				days = addCopyBtnIchiran();
				for (let i = 0; i < days.length; i++) {
					const element = days[i];
					var sum = 0;
					var tmp = [];
					for (let j = 0; j < element.length; j++) {
						const o = element[j];
						var result = jug.suisoku(o["BB"], o["RB"], o["trials"]);
						var aboutCoin = Math.round(
							jug.samaiAbout(
								o["BB"],
								o["RB"],
								o["trials"],
								result.settei - 1
							)
						);
						o["result"] = result;
						o["aboutCoin"] = aboutCoin;
						sum += aboutCoin;
						tmp[o["no"]] = o;
					}
					daySum.push(sum);
					var ranked = element.concat();
					ranked.sort((a, b) => b.aboutCoin - a.aboutCoin);
					daysRank.push(ranked);
					for (let j = 0; j < ranked.length; j++) {
						const o = ranked[j];
						tmp[o["no"]].rank = j;
					}
				}

				// var settei = jug.suisoku(o["BB"], o["RB"], o["trials"]);
				// console.log(settei);
				tgtAta = ata0;
				dayIs = 0;
				var p = document.querySelector("div.past_days_right");
				var tds = p.querySelectorAll("td");
				tds.forEach((element, i) => {
					element.onclick = function () {
						tgtAta = document.querySelector("#ata" + i);
						dayIs = i;
						addSuisoku(jug);
					};
				});
				var ichiranCk = false;

				if (jugCk) {
					addSuisoku(jug);
					function resizeWindow() {
						addSuisoku(jug);
					}
					window.addEventListener("resize", resizeWindow);
				}
			}
			if (graph_list) {
				var machine_name = document
					.querySelector("#machine_name")
					.querySelector("a").textContent;
				var dls = graph_list.querySelectorAll("dl");
				var graphData = "";
				var k = "";
				var kk = "";
				var imgDiv = document.createElement("div");
				var imgs = [];
				var nos = "";
				for (let index = 0; index < dls.length; index++) {
					const element = dls[index];
					var a = element.querySelector("a");
					var img = element.querySelector("img");
					imgs.push(img);
					// img.addEventListener('load', getAddEventListnerFnc(ctx, img, x, y, w, h), false);
					var onclk = a.onclick;
					var name = textTrim(a.textContent, " ");
					graphData += k + name + ":" + img.src;
					k = ",";
					var no = name.split(":")[1];
					nos += kk + no;
					kk = "_";
				}
				imgDiv.onclick = function () {
					for (let index = 0; index < imgs.length; index++) {
						const element = imgs[index];
						var reader = new FileReader();
						reader.readAsDataURL(element.src);
						reader.onload = function () {
							var dataURL = reader.result;
							console.log(dataURL);
						};

						// var a = document.createElement("a")
						// a.href = "data:text/plain;charset=utf-8,"+element.src
						// a.download = index + ".png";
						// a.click()
					}
				};
				makeCopyBtn("copy", tgtBefore, graphData);
				var day = getDayNo();
				autoSave(
					graphData,
					machine_name + "_graph_" + "day" + day + ".txt"
				);
				var rev_next_days = document.querySelector("#rev_next_days");
				var a = rev_next_days.querySelectorAll("a");
				for (let index = 0; index < a.length; index++) {
					const element = a[index];
					var name = element.querySelector("img").alt;
					makeBtnOnClick(name, tgtBefore, element);
				}
			}
			daySelectAddDate(daySum);
		}
		function daySelectAddDate(daySum) {
			console.log(daySum);
			const dlist = ["日", "月", "火", "水", "木", "金", "土"];
			const colors = [
				"#FF0000",
				"#FFFFFF",
				"#FFFFFF",
				"#FFFFFF",
				"#FF6F00",
				"#F2FF41",
				"#9000FF",
			];
			var dates = document
				.querySelector(".past_days_right")
				.querySelectorAll("td");

			var fnc = function (o, before = 0) {
				if (o.getHours() > 0 && o.getHours() < 10) {
					before += 1;
				}
				o.setDate(o.getDate() - before);
				return {
					tex:
						o.getMonth() +
						1 +
						"/" +
						o.getDate() +
						"(" +
						dlist[o.getDay()] +
						")",
					color: colors[o.getDay()],
					fontColor: getContrastYIQ(
						colors[o.getDay()].split("#").join("")
					),
				};
			};
			// ;
			for (let i = 0; i < dates.length; i++) {
				const element = dates[i];
				var div = document.createElement("div");
				var o = fnc(new Date(), i);
				var samai =
					daySum[i] == undefined
						? "--"
						: "差枚" +
						  kanma(daySum[i]);
				div.innerHTML =
					o.tex +
					"\n" +
					samai;
				div.setAttribute(
					"style",
					'font-family:"ms gothic"!important;background-color:' +
						o.color +
						"!important;border: none;color:" +
						o.fontColor +
						"!important;text-align: center!important;text-decoration: none!important;display: inline-block!important;font-size: 10px!important;margin: 0px 0px!important;padding: 0px 0px!important;line-height:1.5!important;"
				);
				element.appendChild(div);
			}
		}
		function kanma(n) {
			return (n + "").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
		}
		function getDayNo() {
			var a = document.querySelector("div.past_days >span.this >a");
			var day = a.href.match(/.*day=(.*?)&.*/)[1];
			return day;
		}

		function myPageLoginTop() {
			var mail = document.querySelector("#mypage_email");
			mail.value = loginMail;
			var pass = document.querySelector("#mypage_pass");
			pass.value = loginPass;
			cmdButton_push(document.MypageLoginActionForm);
		}
		function HallSelectLink() {
			var logo = document.querySelector("#logo");
			logo.parentNode.removeChild(logo);
			var tgtBefore = document.querySelector("#header-content");
			var div = document.createElement("div");
			var div2 = document.createElement("div");
			div.setAttribute("style", "float: left;");
			div.appendChild(div2);
			tgtBefore.parentNode.insertBefore(div, tgtBefore);
			var slot46 = document.querySelector("table.slot");
			var machines = slot46.querySelectorAll("tr");
			var thNum = 0;
			for (const key in machines) {
				const element = machines[key];
				var span = element.querySelector("span");
				var name = span ? span.textContent : "";
				if (name.indexOf("ジャグラー") != -1) {
					name = name.split("（")[0];
					name = name.match(/.*\t(.*)/)[1];
					var ock = element.querySelector("input");
					console.log(ock);
					makeBtnOnClick(name, div2, ock);
				}
				var th = element.querySelector("th");
				if (th) {
					thNum++;
					if (thNum > 1) {
						break;
					}
				}
			}
			div.removeChild(div2);
		}
		function MypageLoginOrTop() {
			title.textContent += "_loaded";
			// hall select
			var myhallList = document.querySelector("#myhallList");
			var a = myhallList.querySelectorAll("a");
			var tgtBefore = document.querySelector("#header-content");
			for (const key in a) {
				const element = a[key];
				if (element.textContent) {
					var hallName = textTrim(element.textContent);
					console.log(hallName, element.href);
					makeBtn(hallName, tgtBefore, element.href);
				}
			}
		}
		function getContrastYIQ(hexcolor) {
			var r = parseInt(hexcolor.substr(0, 2), 16);
			var g = parseInt(hexcolor.substr(2, 2), 16);
			var b = parseInt(hexcolor.substr(4, 2), 16);
			var yiq = (r * 299 + g * 587 + b * 114) / 1000;
			return yiq >= 128 ? "black" : "white";
		}
		function autoSave(tex, filename) {
			var hallname = document
				.querySelectorAll("meta")[0]
				.content.split(",")[0];
			var a = document.createElement("a");
			a.href = "data:text/plain;charset=utf-8," + tex; //content
			a.download = hallname + "_" + filename; //file name
			a.click();
		}
		function addCopyBtnIchiran() {
			var machine_name = document
				.querySelector("#machine_name")
				.querySelector("a").textContent;
			var ids = ["trials", "BB", "RB"];
			var dedama_table = document.querySelector("#dedama_table");
			var divs = dedama_table.querySelectorAll("[id^='ata']");
			var days = [];
			var result = [];
			var sep = "";
			for (let index = 0; index < divs.length; index++) {
				const element = divs[index];
				var trs = element.querySelectorAll("tr");
				trs = Array.prototype.slice.call(trs);
				trs.shift();
				trs.pop();
				var machines = [];
				var m = [];
				for (let j = 0; j < trs.length; j++) {
					var o = {};
					const element = trs[j];
					var no = element.querySelector("span.num").textContent;
					o.no = no;
					var tds = element.querySelectorAll("td");
					tds = Array.prototype.slice.call(tds);
					var tgt = tds.shift();
					for (let k = 0; k < 3; k++) {
						const v = tds[k].textContent;
						o[ids[k]] = v == "--" ? 0 : parseInt(v);
					}
					m.push(
						"{no:" +
							no +
							",start:" +
							o["trials"] +
							",BB:" +
							o["BB"] +
							",RB:" +
							o["RB"] +
							"}"
					);
					machines.push(o);
				}
				result.push("[" + m.join(",") + "]");

				days.push(machines);
			}
			result = "[" + result.join(",") + "]";
			makeCopyBtn("copy", document.querySelector("#g-nav"), result);
			autoSave(result, machine_name + "_ichiran.txt");
			return days;
		}
		function addSuisoku(jugnk) {
			var data = days[dayIs];
			var colorSet = [
				"#1d002e",
				"#4a0099",
				"#0fe7ff",
				"#00eb0c",
				"#ff1f1f",
				"#ff14eb",
			];
			var rankCol = ["#FF3597", "#FF4242", "#7DF884"];
			var rankColBebe = ["#000000", "#2B0059", "#00636E"];
			var hall_contents = document.querySelector("#hall_contents");
			var ck = false;
			var intid;
			var documentElement;
			if (navigator.userAgent.toLowerCase().match(/webkit|msie 5/)) {
				// Webkit系（Safari, Chrome, iOS）、IE5はbody要素
				documentElement = document.body;
			} else {
				// IE（6以上）、Firefox、Operaはhtml要素
				documentElement = document.documentElement;
			}
			var fnc = function () {
				var trs = tgtAta.querySelectorAll("tr");
				trs = Array.prototype.slice.call(trs);
				trs.shift();
				trs.pop();
				var sum = 0;
				for (let index = 0; index < data.length; index++) {
					var o = data[index];
					var clientRect = trs[index].getBoundingClientRect();
					if (clientRect.top == 0 && clientRect.left == 0) {
						continue;
					} else {
						ck = true;
					}
					var id = "calcBox" + index;
					var rankTagId = "calcBoxRank" + index;
					var preId = document.querySelector("#" + id);
					var preIdRank = document.querySelector("#" + rankTagId);
					if (preId) {
						preId.parentNode.removeChild(preId);
						preIdRank.parentNode.removeChild(preIdRank);
					}
					var result = o.result;
					var aboutCoin = o.aboutCoin;
					sum += aboutCoin;
					var tag = document.createElement("div");
					var rankTag = document.createElement("div");
					var color = colorSet[result.settei - 1];

					var fColor = getContrastYIQ(color.split("#").join(""));
					var infoW = 200;
					var leftIs = clientRect.left - (infoW + 10);
					var topIs = clientRect.top + window.scrollY;
					var totalMachine = data.length;
					tag.id = id;
					rankTag.id = rankTagId;
					tag.setAttribute(
						"style",
						"line-height:15px;position: absolute;top: " +
							topIs +
							"px;left: " +
							leftIs +
							'px; font-family:"monospace";background-color:' +
							color +
							"!important;border: none;color: " +
							fColor +
							"!important;text-align: right!important;text-decoration: none!important;display: inline-block!important;font-size: 12px;margin: 0px 0px!important;cursor: pointer;padding: 4px 4px!important;width:" +
							infoW +
							"px;height:" +
							clientRect.height * 0.8 +
							"px;pointer-events: none;"
					);
					var rankW = 100;
					var rankBgCol =
						o.rank < 3
							? rankCol[o.rank]
							: totalMachine - o.rank - 1 < 3
							? rankColBebe[totalMachine - o.rank - 1]
							: "#FFFFFF";
					var rankfColor = getContrastYIQ(
						rankBgCol.split("#").join("")
					);
					rankTag.setAttribute(
						"style",
						"line-height:15px;position: absolute;top: " +
							topIs +
							"px;left: " +
							(leftIs - rankW - 10) +
							'px; font-family:"monospace";background-color:' +
							rankBgCol +
							"!important;border: none;color: " +
							rankfColor +
							"!important;text-align: right!important;text-decoration: none!important;display: inline-block!important;font-size: 12px;margin: 0px 0px!important;cursor: pointer;padding: 4px 4px!important;width:" +
							rankW +
							"px;height:" +
							clientRect.height * 0.8 +
							"px;pointer-events: none;"
					);
					rankTag.textContent = o.rank + 1 + "/" + totalMachine;
					var starTex = "";
					if (result.settei > 3 && result.ruiseki <= 0.1) {
						var rstarNum = Math.round(
							(1 - result.ruiseki / 0.1) * 5
						);
						for (let index = 0; index < rstarNum; index++) {
							starTex += "★";
						}
						// starTex =
						//   // '<span style="display:inline-block !important;font-size: 10px !important;transform:scale(0.8);">' +
						//   '<span style="display:inline-block !important;font-size: 10px !;">' +
						//   starTex +
						//   "</span>";
					}
					var table = document.createElement("table");
					var tr = document.createElement("tr");
					table.setAttribute(
						"style",
						"width:" +
							infoW +
							"px!important;height:" +
							clientRect.height +
							"px!important;"
					);
					table.appendChild(tr);
					var tdW = Math.floor(infoW / 3) + "px";

					var td = document.createElement("td");
					tr.appendChild(td);
					td.textContent =
						"設定" +
						result.settei +
						" (" +
						(result.p * 100).toFixed(2) +
						"%)";
					td.setAttribute(
						"style",
						"text-align: left;margin-left: 0;width:" +
							tdW +
							"!important;white-space: nowrap;"
					);

					var td = document.createElement("td");
					tr.appendChild(td);
					td.textContent = starTex;
					td.setAttribute(
						"style",
						"text-align: left;margin-left: 0;width:" +
							tdW +
							"!important;white-space: nowrap;"
					);

					// var td = document.createElement("td");
					// tr.appendChild(td);
					// td.textContent = o.rank + "/" + totalMachine;
					// td.setAttribute(
					//   "style",
					//   "text-align: left;margin-left: 0;width:" +
					//     tdW +
					//     "!important;white-space: nowrap;"
					// );
					var td = document.createElement("td");
					tr.appendChild(td);
					td.textContent = kanma(aboutCoin) + "枚";
					td.setAttribute(
						"style",
						"text-align: right;margin-left: 0;width:" +
							tdW +
							"!important;white-space: nowrap;"
					);

					var tr = document.createElement("tr");
					table.appendChild(tr);
					var td = document.createElement("td");
					tr.appendChild(td);
					td.innerHTML =
						'<span style="font-size: 11px !important;margin-left: 5px;white-space: nowrap;">S1検定:' +
						(result.ruiseki * 100).toFixed(2) +
						"%" +
						"</span>";
					td.setAttribute(
						"style",
						"text-align: left;margin-left: 0;width:" +
							tdW +
							"!important;white-space: nowrap;"
					);
					tag.appendChild(table);
					// tag.innerHTML = "設定" +
					//   result.settei +
					//   "[" +
					//   (result.p * 100).toFixed(2) +
					//   "%] "
					//   starTex +
					//   '<span style="font-size: 12px !important;">' +
					//   "設定" +
					//   result.settei +
					//   "[" +
					//   (result.p * 100).toFixed(2) +
					//   "%] " +
					//   aboutCoin +
					//   '枚<BR><span style="font-size: 11px !important;">S1検定:' +
					//   (result.ruiseki * 100).toFixed(2) +
					//   "%" +
					//   "</span></span>";
					hall_contents.appendChild(rankTag);
					hall_contents.appendChild(tag);
				}
			};
			fnc();
			intid = setInterval(() => {
				fnc();
				if (ck) {
					clearInterval(intid);
					ichiranCk = true;
				}
			}, 1);
		}
		function getAddEventListnerFnc(ctx, img, x, y, w, h) {
			return function () {
				ctx.drawImage(img, x, y, w, h);
			};
		}
		function textTrim(tex, option) {
			return tex
				.split("\t")
				.join("")
				.split("\n")
				.join("")
				.split(option)
				.join("");
		}
		function removeElementByTex(tgt) {
			var ele = document.querySelector(tgt);
			try {
				ele.parentNode.removeChild(ele);
			} catch (error) {}
		}
		function remover(arr) {
			var i = arr.length;
			while (i--) {
				var o = arr[i];
				o.parentNode.removeChild(o);
			}
		}
		function makeCopyBtn(name, tgtBefore, tex) {
			var bt = document.createElement("button");
			bt.innerText = name;
			bt.setAttribute("style", defCss);
			tgtBefore.parentNode.insertBefore(bt, tgtBefore);
			var ta = makeInputs(tex, tgtBefore);
			bt.onclick = function () {
				ta.select();
				document.execCommand("copy");
			};
		}
		function makeBtnOnClick(name, tgtBefore, onclkDom) {
			var bt = document.createElement("button");
			bt.innerText = "< " + name + " >";
			bt.setAttribute("style", defCss);
			bt.onclick = function () {
				this.setAttribute("style", disableCss);
				onclkDom.click();
			};
			tgtBefore.parentNode.insertBefore(bt, tgtBefore);
		}
		function makeBtn(name, tgtBefore, link) {
			var bt = document.createElement("button");
			bt.innerText = "< " + name + " >";
			if (link == "") {
				bt.setAttribute("style", defCss + "pointer-events: none;");
			} else {
				bt.setAttribute("style", defCss);
			}
			makeClick(bt, link);
			tgtBefore.parentNode.insertBefore(bt, tgtBefore);
		}
		function makeClick(p, links) {
			if (links != "") {
				p.onclick = function () {
					this.setAttribute("style", disableCss);
					// this.select();
					// document.execCommand(links);
					location.href = links;
				};
			} else {
				p.disabled = true;
			}
		}
		function makeInputs(links, tgt) {
			var table = document.createElement("table");
			// table.align="right"
			var rows = 1;
			var div = document.createElement("div");
			tgt.parentNode.insertBefore(div, tgt);
			div.appendChild(table);
			//wrapcolleftPare.insertBefore(table, p.nextSibling);
			table.setAttribute("style", "padding:0px;");
			var tr = document.createElement("tr");

			table.appendChild(tr);
			var wSize = 150,
				sz = 6,
				col = "#AAAAAA",
				bg = "#BBBBBB",
				sp = (sz + 10) * rows;
			div.setAttribute(
				"style",
				"position: relative;top:0px;right:0px;z-index: 10;"
			);
			var p = document.createElement("textarea");
			var td = document.createElement("td");
			td.setAttribute("style", "padding:0px");
			tr.appendChild(td);
			td.appendChild(p);
			//p.setAttribute("type", "text");
			p.setAttribute(
				"style",
				"resize: none;overflow:hidden;width:" +
					wSize +
					"px;height:" +
					sp +
					"px;color:0x0;font-size:" +
					sz +
					"px;  padding:1px; border:solid 0.5px " +
					col +
					";background-color : " +
					bg +
					";"
			);
			p.value = links;
			p.readOnly = true;
			//p.setAttribute("value", links);
			return p;
		}
		function classGene() {
			class JugData {
				constructor() {
					this.jug = {};
					/*
			SアイムジャグラーＥＸ（30）
			マイジャグラーV（18）
			ファンキージャグラー２ＫＴ（12）
			*/
					this.jug["マイジャグラーV"] = [
						[5.893525, 35.234409, 273.066667, 409.6],
						[5.851429, 35.196563, 270.809917, 385.505882],
						[5.809929, 34.06237, 266.406504, 336.082051],
						[5.789399, 32.932663, 254.015504, 289.982301],
						[5.774097, 32.702595, 240.058608, 268.590164],
						[5.664304, 32.475719, 229.146853, 229.146853],
					];
					this.jug["ファンキージャグラー２ＫＴ"] = [
						[5.933545, 33.2839, 266.406504, 439.838926],
						[5.909468, 33.182785, 259.035573, 407.055901],
						[5.885586, 33.06559, 256.0, 366.122905],
						[5.835797, 32.932663, 249.186312, 322.837438],
						[5.769014, 32.784392, 240.058608, 299.251142],
						[5.686421, 32.588762, 219.919463, 262.144],
					];
					this.machine_shanabi = [
						[0, 0, 277.7, 356.2],
						[0, 0, 268.6, 331.0],
						[0, 0, 256.0, 306.2],
						[0, 0, 248.2, 280.1],
					];
					this.machine_versusX = [
						[0, 0, 292.6, 374.5],
						[0, 0, 284.9, 341.3],
						[0, 0, 275.4, 319.7],
						[0, 0, 264.3, 292.6],
					];
					this.jug["SアイムジャグラーＥＸ"] = [
						[6.034622, 33.69460154, 273.066667, 439.838926],
						[6.034622, 33.59097899, 269.695473, 399.609756],
						[6.034622, 33.47088866, 269.695473, 330.989899],
						[6.034622, 33.40265036, 259.035573, 315.076923],
						[6.034622, 33.14921598, 259.035573, 255.003891],
						[5.786843, 33.14921598, 255.003891, 255.003891],
					];
					this.SEBONUS = {};
					this.SEBONUS["SアイムジャグラーＥＸ"] = [
						{
							SB: 431.157895,
							EB: 744.727273,
							SR: 642.509804,
							ER: 1394.382979,
						},
						{
							SB: 422.812903,
							EB: 744.727273,
							SR: 590.414414,
							ER: 1236.528302,
						},
						{
							SB: 422.812903,
							EB: 744.727273,
							SR: 474.898551,
							ER: 1092.266667,
						},
						{
							SB: 417.426752,
							EB: 682.666667,
							SR: 448.876712,
							ER: 1057.032258,
						},
						{
							SB: 417.426752,
							EB: 682.666667,
							SR: 364.088889,
							ER: 851.116883,
						},
						{
							SB: 407.055901,
							EB: 682.666667,
							SR: 364.088889,
							ER: 851.116883,
						},
					];
					this.SEBONUS["マイジャグラーV"] = [
						{ SB: 409.6, EB: 819.2, SR: 655.36, ER: 1092.266667 },
						{
							SB: 407.055901,
							EB: 809.08642,
							SR: 601.247706,
							ER: 1074.360656,
						},
						{
							SB: 399.609756,
							EB: 799.219512,
							SR: 492.75188,
							ER: 1057.032258,
						},
						{
							SB: 378.820809,
							EB: 771.011765,
							SR: 407.055901,
							ER: 1008.246154,
						},
						{
							SB: 354.248649,
							EB: 744.727273,
							SR: 390.095238,
							ER: 862.315789,
						},
						{
							SB: 337.814433,
							EB: 712.347826,
							SR: 327.68,
							ER: 762.046512,
						},
					];
					this.SEBONUS["ファンキージャグラー２ＫＴ"] = [
						{
							SB: 402.06135,
							EB: 789.590361,
							SR: 636.271845,
							ER: 1424.695652,
						},
						{
							SB: 397.187879,
							EB: 744.727273,
							SR: 574.877193,
							ER: 1394.382979,
						},
						{
							SB: 397.187879,
							EB: 720.175824,
							SR: 512.0,
							ER: 1285.019608,
						},
						{
							SB: 385.505882,
							EB: 704.688172,
							SR: 448.876712,
							ER: 1149.754386,
						},
						{
							SB: 378.820809,
							EB: 655.36,
							SR: 409.6,
							ER: 1110.779661,
						},
						{
							SB: 339.564767,
							EB: 624.152381,
							SR: 356.173913,
							ER: 992.969697,
						},
					];
					this.Coin = { Budou: {}, BB: {}, RB: {} };
					this.Coin.Budou["マイジャグラーV"] =
						this.Coin.Budou["SアイムジャグラーＥＸ"] =
						this.Coin.Budou["ファンキージャグラー２ＫＴ"] =
							8;
					this.Coin.BB["SアイムジャグラーＥＸ"] = 251;
					this.Coin.BB["マイジャグラーV"] = this.Coin.BB[
						"ファンキージャグラー２ＫＴ"
					] = 239;
					this.Coin.RB["マイジャグラーV"] =
						this.Coin.RB["SアイムジャグラーＥＸ"] =
						this.Coin.RB["ファンキージャグラー２ＫＴ"] =
							95;
					this.binom = new Binom();
				}
				setMachine(name) {
					this.machineName = name;
					this.machine = this.jug[name];
					this.SE = this.SEBONUS[name];
					this.bbCoin = this.Coin.BB[this.machineName];
					this.rbCoin = this.Coin.RB[this.machineName];
					this.budouCoin = this.Coin.Budou[this.machineName];
					return this.machine != undefined;
				}
				samaiAbout(BB, RB, n, settei) {
					var cherryGetRatio = 0.6827;
					var budouP = this.machine[settei][0];
					var cherryP = this.machine[settei][1];
					var rep = (n / 7.3) * 3;
					var budou = (n / budouP) * this.budouCoin;
					var cherry = (n / cherryP) * 2 * cherryGetRatio;
					var coinIn = n * 3;
					var coinOut =
						BB * this.bbCoin +
						RB * this.rbCoin +
						budou +
						cherry +
						rep;
					return coinOut - coinIn;
				}
				suisoku(BB, RB, n) {
					var result = [];
					var sum = 0;
					for (let settei = 0; settei < 6; settei++) {
						var p1 = 1 / this.machine[settei][2];
						var p2 = 1 / this.machine[settei][3];
						p2 = p2 / (1 - p1);
						var ans =
							this.binom.BinomTerm(BB, n, p1) *
							this.binom.BinomTerm(RB, n - BB, p2);
						sum += ans;
						result.push({ settei: settei + 1, val: ans });
					}
					for (let settei = 0; settei < 6; settei++) {
						result[settei].val = result[settei].val / sum;
					}
					result.sort(function (a, b) {
						return b.val - a.val;
					});
					var ruiseki = this.binom.compute(
						RB,
						n,
						1 / this.machine[0][3]
					);
					return {
						settei: result[0].settei,
						p: result[0].val,
						ruiseki: ruiseki,
					};
				}
			}
			//-----------------------------------------------------------------------
			// console.log(binom.compute(60, 100, 1 / 2, true));
			// ; 累積ではないやつ
			// ; excelだと
			// ; =BINOMDIST(60, 100, 1 / 2, 0) 0.01084
			// ; =BINOMDIST(60, 100, 1 / 2, 1) 0.9824
			// ; BinomTerm(60, 100, 1 / 2) 0.01084
			// ; this.compute(60, 100, 1 / 2) 0.9824
			//-------------------------------------------------------------------------------------------------------------
			class Binom {
				constructor() {
					this.minVal = -1e38;
					this.z_order = {
						68: 1.0,
						50: 0.674489999998558,
						70: 1.0364340000049208,
						75: 1.1503489999955494,
						80: 1.2815509999847559,
						85: 1.4395309999717594,
						90: 1.6448529999548682,
						95: 1.9599619999289453,
						98: 2.3263409999712668,
						99: 2.575817000006138,
					};
				}
				BinomTerm(k, n, p) {
					return Math.exp(
						this.LnComb(n, k) +
							k * Math.log(p) +
							(n - k) * Math.log(1 - p)
					);
				}

				LogGamma(Z) {
					var S =
						1 +
						76.18009173 / Z -
						86.50532033 / (Z + 1) +
						24.01409822 / (Z + 2) -
						1.231739516 / (Z + 3) +
						0.00120858003 / (Z + 4) -
						0.00000536382 / (Z + 5);
					return (
						(Z - 0.5) * Math.log(Z + 4.5) -
						(Z + 4.5) +
						Math.log(S * 2.50662827465)
					);
				}

				LnComb(n, k) {
					return k == 0 || k == n
						? 0
						: k > n || k < 0
						? this.minVal
						: this.LnFact(n) - this.LnFact(k) - this.LnFact(n - k);
				}

				LnFact(x) {
					x = x <= 1 ? 1 : x;
					return x < 12
						? Math.log(this.Fact(Math.round(x)))
						: this.LnFactSub(x);
				}

				Fact(x) {
					var t = 1;
					while (x > 1) {
						t *= x--;
					}
					return t;
				}

				LnFactSub(x) {
					var invx = 1 / x;
					var invx2 = invx * invx;
					var invx3 = invx2 * invx;
					var invx5 = invx3 * invx2;
					var invx7 = invx5 * invx2;
					var sum = (x + 0.5) * Math.log(x) - x;
					sum += Math.log(2 * Math.PI) / 2;
					sum += invx / 12 - invx3 / 360;
					sum += invx5 / 1260 - invx7 / 1680;
					return sum;
				}

				Betinc(X, A, B) {
					var A0 = 0,
						B0 = 1,
						A1 = 1,
						B1 = 1,
						M9 = 0,
						A2 = 0,
						C9;
					do {
						A2 = A1;
						C9 =
							(-(A + M9) * (A + B + M9) * X) /
							(A + 2 * M9) /
							(A + 2 * M9 + 1);
						A0 = A1 + C9 * A0;
						B0 = B1 + C9 * B0;
						M9 = M9 + 1;
						C9 =
							(M9 * (B - M9) * X) /
							(A + 2 * M9 - 1) /
							(A + 2 * M9);
						A1 = A0 + C9 * A1;
						B1 = B0 + C9 * B1;
						A0 = A0 / B1;
						B0 = B0 / B1;
						A1 = A1 / B1;
						B1 = 1;
					} while (Math.abs((A1 - A2) / A1) > 0);
					return A1 / A;
				}

				compute(X, N, P, sw) {
					var bincdf = 0,
						Z,
						BT,
						Betacdf;
					var A, B, S;
					if (N <= 0) {
						return 0;
					} else if (P < 0 || P > 1) {
					} else if (X < 0) {
						bincdf = 0;
					} else if (X >= N) {
						bincdf = 1;
					} else {
						// X = X.floor().tovar();
						Z = P;
						A = X + 1;
						B = N - X;
						S = A + B;
						BT = Math.exp(
							this.LogGamma(S) -
								this.LogGamma(B) -
								this.LogGamma(A) +
								A * Math.log(Z) +
								B * Math.log(1 - Z)
						);
						Betacdf =
							Z < (A + 1) / (S + 2)
								? BT * this.Betinc(Z, A, B)
								: 1 - BT * this.Betinc(1 - Z, B, A);
						bincdf = 1 - Betacdf;
						// bincdf = (bincdf * 100000).round() * 0.00001;
					}
					if (!sw && X / N >= P) {
						bincdf =
							1 - this.compute(X != 0 ? X - 1 : X, N, P, true);
					}
					return bincdf;
				}

				cdf(x) {
					return (1 + erf(x / Math.sqrt(2))) / 2;
				}

				erf(x) {
					var p = 0.3275911;
					var a1 = 0.254829592;
					var a2 = -0.284496736;
					var a3 = 1.421413741;
					var a4 = -1.453152027;
					var a5 = 1.061405429;
					var t = 1 / (1 + p * Math.abs(x));
					var y =
						1 -
						((((a5 * t + a4) * t + a3) * t + a2) * t + a1) *
							t *
							Math.exp(-x * x);
					return x > 0 ? y : -y;
				}

				normalP(x) {
					// Abramowitz & Stegun 26.2.19
					var d1 = 0.049867347,
						d2 = 0.0211410061,
						d3 = 0.0032776263,
						d4 = 0.0000380036,
						d5 = 0.0000488906,
						d6 = 0.000005383,
						a = Math.abs(x),
						t;

					t =
						1.0 +
						a *
							(d1 +
								a *
									(d2 +
										a *
											(d3 +
												a * (d4 + a * (d5 + a * d6)))));
					// to 16th power
					t *= t;
					t *= t;
					t *= t;
					t *= t;
					t = 1.0 / (t + t); // the MINUS 16th

					if (x >= 0) t = 1 - t;
					return t;
				}

				normalcdf(z) {
					var a = 0 > z ? -z : z,
						b = 0;
					if (37 >= a) {
						b = Math.exp(-a * a * 0.5);
						b =
							7.07106781186547 > a
								? (b *
										((((((0.0352624965998911 * a +
											0.700383064443688) *
											a +
											6.37396220353165) *
											a +
											33.912866078383) *
											a +
											112.079291497871) *
											a +
											221.213596169931) *
											a +
											220.206867912376)) /
								  (((((((0.0883883476483184 * a +
										1.75566716318264) *
										a +
										16.064177579207) *
										a +
										86.7807322029461) *
										a +
										296.564248779674) *
										a +
										637.333633378831) *
										a +
										793.826512519948) *
										a +
										440.413735824752)
								: b /
								  (2.5066282746310007 *
										(a +
											1 /
												(a +
													2 /
														(a +
															3 /
																(a +
																	4 /
																		(a +
																			0.65))))));
					}
					return 0 > z ? b : 1 - b;
				}

				studentsCdf(x, df) {
					var A = df * 0.5;
					var S = A + 0.5;
					var Z = df / (df + x * x);
					var BT = Math.exp(
						this.LogGamma(S) -
							this.LogGamma(0.5) -
							this.LogGamma(A) +
							A * Math.log(Z) +
							0.5 * Math.log(1.0 - Z)
					);
					var betacdf =
						Z < (A + 1.0) / (S + 2.0)
							? BT * this.Betinc(Z, A, 0.5)
							: 1 - BT * this.Betinc(1.0 - Z, 0.5, A);
					return x < 0 ? betacdf * 0.5 : 1.0 - betacdf * 0.5;
				}

				deg(x) {
					return (x * 180) / Math.PI;
				}
				arcSinZTest(k, n, p) {
					if (n == 0 || n == null) {
						return 0;
					}
					var ans = this.normalcdf(
						(Math.deg(Math.asin(Math.sqrt(k / n))) -
							Math.deg(Math.asin(Math.sqrt(p)))) /
							Math.sqrt(821 / n)
					);
					return 1 - ans;
				}

				ttest(k, n, p) {
					if (n == 0 || n == null) {
						return 0;
					}
					var nn = n - 1;
					var meanA = k / n;
					var sumA = k * (1 - meanA);
					var T = (meanA - p) / Math.sqrt(sumA / nn / n);
					var P = this.studentsCdf(T, nn);
					return 1 - P;
				}

				sampleSize(tgtP, k, MoE) {
					var z = this.z_order[tgtP];
					var N = (z * z * (k - 1)) / (MoE * MoE);
					return Math.round(N + 0.5);
				}

				getMoE(tgtP, k, N) {
					if (N == 0) {
						return "";
					}
					var z = this.z_order[tgtP];
					var MoE = 100 * Math.sqrt((z * z * (k - 1)) / N);
					var p = MoE;
					return p;
				}

				BinomialPF(k, n, p) {
					// by Normal approximation }
					// Peizer & Pratt 1968, JASA 63: 1416-1456
					var inv2 = 1 / 2,
						inv3 = 1 / 3,
						inv6 = 1 / 6;
					var z;
					if (k >= n) {
						z = 1;
					} else {
						var q = 1 - p;
						var s = k + inv2;
						var t = n - k - inv2;
						var d1 = s + inv6 - (n + inv3) * p;
						var d2 =
							q / (s + inv2) -
							p / (t + inv2) +
							(q - inv2) / (n + 1);
						d2 = d1 + 0.02 * d2;
						var num = 1 + q * g(s / (n * p)) + p * g(t / (n * q));
						var den = (n + inv6) * p * q;
						var z = num / den;
						z = d2 * Math.sqrt(z);
						z = this.normalcdf(z);
					}

					return z;
				}

				g(x) {
					var switchlev = 0.1,
						z;
					if (x == 0) {
						z = 1;
					} else if (x == 1) {
						z = 0;
					} else {
						var d = 1 - x;
						if (Math.abs(d) > switchlev) {
							z = (1 - x * x + 2 * x * Math.log(x)) / (d * d);
						} else {
							z = d / 3; // first term
							var di = d; // d**1
							for (var i = 2; i <= 7; i++) {
								di *= d; // d**i
								z += (2 * di) / ((i + 1) * (i + 2));
							}
						}
					}
					return z;
				}

				BinomialP(k, n, p) {
					//=BINOM.DIST(0,100,1/134,1)
					if (n >= 1000) {
						return this.BinomialPF(p, n, k);
					} else {
						// term-by-term
						if (k > n || p >= 1) {
							return 1;
						} else {
							var q = 1 - p;
							var n1p = (n + 1) * p;
							var t = n * Math.log(q); // k = 0
							var r = Math.exp(t);
							var j = 1;
							while (j <= k) {
								t += Math.log(1 + (n1p - j) / (j * q));
								r += Math.exp(t);
								j++;
							}
							return r;
						}
					}
				}
			}
			return { JugData: JugData, Binom: Binom };
		}
	})();
}
window.TaperScriptLoaded=true