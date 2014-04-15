ninja.wallets.setupwallet = {
	init: function () {
		var addresspresets = document.getElementById("setupaddresspresets");
		var custom = addresspresets.firstElementChild;
		var presets = ninja.wallets.setupwallet.addresspresets;
		var optgroup = null;
		for(var p in presets) {
			var pdata = presets[p];
			var el = document.createElement("option");
			el.textContent = pdata[1];
			el.value = p;
			if (p > 1) {
				if (optgroup == null || optgroup.label[0] != pdata[1][0]) {
					optgroup = document.createElement("optgroup");
					optgroup.label = pdata[1][0];
					addresspresets.insertBefore(optgroup, custom);
				}
				optgroup.appendChild(el);
			} else {
				addresspresets.insertBefore(el, custom);
			}
		}
		addresspresets.selectedIndex = 0;
	},

	open: function () {
		ninja.wallets.setupwallet.setupPresets();
		document.getElementById("setuparea").style.display = "block";
	},

	close: function () {
		document.getElementById("setuparea").style.display = "none";
		document.getElementById("setupinfoarea").style.display = "none";
		document.getElementById("setupinfoicon").setAttribute("class", "more");
	},

	toggleAutoPrivateKeyPrefix: function (element) {
		// enable/disable privateKeyPrefix selectbox
		document.getElementById("setupprivateKeyPrefix").disabled = element.checked;
	},

	setParameters: function (element) {
		var networkVersion = parseInt(document.getElementById("setupnetworkVersion").value);
		var privateKeyPrefix = parseInt(document.getElementById("setupprivateKeyPrefix").value);
		var addresspresets = document.getElementById("setupaddresspresets");
		Bitcoin.Address.networkVersion = networkVersion;
		Bitcoin.ECKey.privateKeyPrefix = privateKeyPrefix;
		ninja.tabSwitch(document.getElementById("singlewallet"));
		ninja.wallets.singlewallet.generateNewAddressAndKey();
		document.getElementById("paperkeyarea").innerHTML = "";
		document.getElementById("bulktextarea").value = "";
		ninja.wallets.brainwallet.clear();
		document.getElementById("detailprivkey").value = "";
		ninja.wallets.detailwallet.clear();
		document.getElementById("detailcompwifprefix").innerHTML = ninja.wallets.setupwallet.getPrivKeyCompressedStart(privateKeyPrefix);
		document.getElementById("detailwifprefix").innerHTML = ninja.wallets.setupwallet.getPrivKeyStart(privateKeyPrefix);
		document.getElementById("setupinfoAddresspresets").innerHTML = addresspresets.options[addresspresets.selectedIndex].text;
		if (addresspresets.value == "custom") {
			document.getElementById("setupinfoNetworkVersion").innerHTML = networkVersion;
			document.getElementById("setupinfoPrivateKeyPrefix").innerHTML = privateKeyPrefix;
			document.getElementById("setupinfoDetails").style.display = "block";
		} else {
			document.getElementById("setupinfoDetails").style.display = "none";
		}
	},

	setPrivateKeyPrefix: function(element) {
		var autoPrivateKeyPrefix = document.getElementById("setupautoPrivateKeyPrefix");
		if (autoPrivateKeyPrefix.checked) {
			var networkVersion = parseInt(document.getElementById("setupnetworkVersion").value);
			var privateKeyPrefix = document.getElementById("setupprivateKeyPrefix");
			if (networkVersion < 128) {
				privateKeyPrefix.value = networkVersion + 128;
			}
		}
	},

	setAddress: function (pubkey, privkey, enable) {
		var networkVersion = document.getElementById("setupnetworkVersion");
		var privateKeyPrefix = document.getElementById("setupprivateKeyPrefix");
		var autoPrivateKeyPrefix = document.getElementById("setupautoPrivateKeyPrefix");
		networkVersion.value = pubkey;
		privateKeyPrefix.value = privkey;
		networkVersion.disabled = !enable;
		privateKeyPrefix.disabled = true;
		autoPrivateKeyPrefix.disabled = !enable;
		autoPrivateKeyPrefix.checked = true;
	},

	getPrivKeyStart: function (key) {
		if (key <= 0) return "'1'";
		if (key == 1) return "'2' - '4'";
		if (key == 2) return "'4' - '6'";
		if (key == 3) return "'6' - '8'";
		if (key == 4) return "'8' - 'A'";
		if (key == 5) return "'A' - 'C'";
		if (key == 6) return "'C' - 'E'";
		if (key == 7) return "'E' - 'G'";
		if (key == 8) return "'G' - 'J'";
		if (key == 9) return "'J' - 'L'";
		if (key == 10) return "'L' - 'N'";
		if (key == 11) return "'N' - 'Q'";
		if (key == 12) return "'Q' - 'S'";
		if (key == 13) return "'S' - 'U'";
		if (key == 14) return "'U' - 'W'";
		if (key == 15) return "'W' - 'Y'";
		if (key == 16) return "'Y' - 'a'";
		if (key == 17) return "'a' - 'b'";
		if (key == 18) return "'b' - 'd'";
		if (key == 19) return "'d' - 'f'";
		if (key == 20) return "'f' - 'h'";
		if (key == 21) return "'h' - 'j'";
		if (key == 22) return "'j' - 'm'";
		if (key == 23) return "'m' - 'o'";
		if (key == 24) return "'o' - 'q'";
		if (key == 25) return "'q' - 's'";
		if (key == 26) return "'s' - 'u'";
		if (key == 27) return "'u' - 'w'";
		if (key == 28) return "'w' - 'y'";
		if (key == 29) return "'y' - '2'";
		if (key <= 58) return "'2'";
		if (key == 59) return "'2' - '3'";
		if (key <= 88) return "'3'";
		if (key == 89) return "'3' - '4'";
		if (key <= 118) return "'4'";
		if (key == 119) return "'4' - '5'";
		if (key <= 148) return "'5'";
		if (key == 149) return "'5' - '6'";
		if (key <= 178) return "'6'";
		if (key == 179) return "'6' - '7'";
		if (key <= 207) return "'7'";
		if (key == 208) return "'7' - '8'";
		if (key <= 237) return "'8'";
		if (key == 238) return "'8' - '9'";
		return "'9'";
	},

	getPrivKeyCompressedStart: function (key) {
		if (key <= 0) return "'1'";
		if (key == 1) return "'9' - 'J'";
		if (key == 2) return "'J' - 'S'";
		if (key == 3) return "'S' - 'b'";
		if (key == 4) return "'b' - 'j'";
		if (key == 5) return "'j' - 't'";
		if (key == 6) return "'t' - '2'";
		if (key <= 12) return "'2'";
		if (key == 13) return "'2' - '3'";
		if (key <= 19) return "'3'";
		if (key == 20) return "'3' - '4'";
		if (key <= 26) return "'4'";
		if (key == 27) return "'4' - '5'";
		if (key <= 32) return "'5'";
		if (key == 33) return "'5' - '6'";
		if (key <= 39) return "'6'";
		if (key == 40) return "'6' - '7'";
		if (key <= 46) return "'7'";
		if (key == 47) return "'7' - '8'";
		if (key <= 53) return "'8'";
		if (key == 54) return "'8' - '9'";
		if (key <= 59) return "'9'";
		if (key == 60) return "'9' - 'A'";
		if (key <= 66) return "'A'";
		if (key == 67) return "'A' - 'B'";
		if (key <= 73) return "'B'";
		if (key == 74) return "'B' - 'C'";
		if (key <= 80) return "'C'";
		if (key == 81) return "'C' - 'D'";
		if (key <= 86) return "'D'";
		if (key == 87) return "'D' - 'E'";
		if (key <= 93) return "'E'";
		if (key == 94) return "'E' - 'F'";
		if (key <= 100) return "'F'";
		if (key == 101) return "'F' - 'G'";
		if (key <= 107) return "'G'";
		if (key == 108) return "'G' - 'H'";
		if (key <= 113) return "'H'";
		if (key == 114) return "'H' - 'J'";
		if (key <= 120) return "'J'";
		if (key == 121) return "'J' - 'K'";
		if (key <= 127) return "'K'";
		if (key == 128) return "'K' - 'L'";
		if (key <= 134) return "'L'";
		if (key == 135) return "'L' - 'M'";
		if (key <= 140) return "'M'";
		if (key == 141) return "'M' - 'N'";
		if (key <= 147) return "'N'";
		if (key == 148) return "'N' - 'P'";
		if (key <= 154) return "'P'";
		if (key == 155) return "'P' - 'Q'";
		if (key <= 161) return "'Q'";
		if (key == 162) return "'Q' - 'R'";
		if (key <= 168) return "'R'";
		if (key == 169) return "'R' - 'S'";
		if (key <= 174) return "'S'";
		if (key == 175) return "'S' - 'T'";
		if (key <= 181) return "'T'";
		if (key == 182) return "'T' - 'U'";
		if (key <= 188) return "'U'";
		if (key == 189) return "'U' - 'V'";
		if (key <= 195) return "'V'";
		if (key == 196) return "'V' - 'W'";
		if (key <= 201) return "'W'";
		if (key == 202) return "'W' - 'X'";
		if (key <= 208) return "'X'";
		if (key == 209) return "'X' - 'Y'";
		if (key <= 215) return "'Y'";
		if (key == 216) return "'Y' - 'Z'";
		if (key <= 222) return "'Z'";
		if (key == 223) return "'Z' - 'a'";
		if (key <= 228) return "'a'";
		if (key == 229) return "'a' - 'b'";
		if (key <= 235) return "'b'";
		if (key == 236) return "'b' - 'c'";
		if (key <= 242) return "'c'";
		if (key == 243) return "'c' - 'd'";
		if (key <= 249) return "'d'";
		if (key == 250) return "'d' - 'e'";
		return "'e'";
	},

	setupPresets: function (element) {
		var addresspresets = document.getElementById("setupaddresspresets").value;
		if (addresspresets == "custom") {
			ninja.wallets.setupwallet.setAddress(0, 128, true);
		} else {
			var presets = ninja.wallets.setupwallet.addresspresets[addresspresets];
			ninja.wallets.setupwallet.setAddress(presets[2], presets[3], false);
		}
	},

	openCloseHelp: function () {
		// do close
		if (document.getElementById("setupinfoarea").style.display == "block") {
			document.getElementById("setupinfoarea").style.display = "none";
			document.getElementById("setupinfoicon").setAttribute("class", "more");
		}
		// do open
		else {
			document.getElementById("setupinfoarea").style.display = "block";
			document.getElementById("setupinfoicon").setAttribute("class", "less");
		}
	}
};