ninja.wallets.setupwallet.init();
// run unit tests
if (ninja.getQueryString()["unittests"] == "true" || ninja.getQueryString()["unittests"] == "1") {
	ninja.unitTests.runSynchronousTests(true);
	ninja.translator.showEnglishJson();
}
// run async unit tests
if (ninja.getQueryString()["asyncunittests"] == "true" || ninja.getQueryString()["asyncunittests"] == "1") {
	ninja.unitTests.runAsynchronousTests(true);
}
// change language
ninja.translator.extractEnglishFromDomAndUpdateDictionary();
if (ninja.getQueryString()["culture"] != undefined) {
	ninja.translator.translate(ninja.getQueryString()["culture"]);
} else {
	ninja.translator.autoDetectTranslation();
}
if (ninja.getQueryString()["showseedpool"] == "true" || ninja.getQueryString()["showseedpool"] == "1") {
	document.getElementById("seedpoolarea").style.display = "block";
}