ninja.wallets.setupwallet = {
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
		switch (document.getElementById("setupaddresspresets").value) {
			case "btc":
			case "btcs":
				ninja.wallets.setupwallet.setAddress(0, 128, false);
				break;
			case "btctest":
				ninja.wallets.setupwallet.setAddress(111, 239, false);
				break;
			case "ltc":
				ninja.wallets.setupwallet.setAddress(48, 176, false);
				break;
			case "ltctest":
				ninja.wallets.setupwallet.setAddress(111, 239, false);
				break;
			case "66":
				ninja.wallets.setupwallet.setAddress(0, 128, false);
				break;
			case "aur":
				ninja.wallets.setupwallet.setAddress(23, 239, false);
				break;
			case "bbq":
				ninja.wallets.setupwallet.setAddress(85, 213, false);
				break;
			case "cesc": // CryptoEscudo
				ninja.wallets.setupwallet.setAddress(28, 156, false);
				break;
			case "doge":
				ninja.wallets.setupwallet.setAddress(30, 158, false);
				break;
			case "dogetest":
				ninja.wallets.setupwallet.setAddress(113, 241, false);
				break;
			case "ftc":
				ninja.wallets.setupwallet.setAddress(14, 142, false);
				break;
			case "gpuc": // GPUCoin
				ninja.wallets.setupwallet.setAddress(38, 166, false);
				break;
			case "grp": // Graphene
				ninja.wallets.setupwallet.setAddress(98, 226, false);
				break;
			case "jny": // JennyCoin
				ninja.wallets.setupwallet.setAddress(43, 171, false);
				break;
			case "kdc":
				ninja.wallets.setupwallet.setAddress(47, 175, false);
				break;
			case "kgc": // Krugercoin
				ninja.wallets.setupwallet.setAddress(79, 207, false);
				break;
			case "moon":
				ninja.wallets.setupwallet.setAddress(3, 131, false);
				break;
			case "nmc":
				ninja.wallets.setupwallet.setAddress(52, 128, false);
				break;
			case "plnc": // PLNcoin
				ninja.wallets.setupwallet.setAddress(22, 150, false);
				break;
			case "pop": // PopularCoin
				ninja.wallets.setupwallet.setAddress(58, 186, false);
				break;
			case "ppc":
				ninja.wallets.setupwallet.setAddress(55, 183, false);
				break;
			case "rby":
				ninja.wallets.setupwallet.setAddress(61, 189, false);
				break;
			case "rdd":
				ninja.wallets.setupwallet.setAddress(61, 189, false);
				break;
			case "rpc":
				ninja.wallets.setupwallet.setAddress(60, 188, false);
				break;
			case "soc": // SocialCoin
				ninja.wallets.setupwallet.setAddress(63, 128, false);
				break;
			case "tips":
				ninja.wallets.setupwallet.setAddress(33, 161, false);
				break;
			case "tes":
				ninja.wallets.setupwallet.setAddress(11, 139, false);
				break;
			case "vgc": // Vegascoin
				ninja.wallets.setupwallet.setAddress(58, 186, false);
				break;
			case "vtc":
				ninja.wallets.setupwallet.setAddress(71, 199, false);
				break;
			case "wdc":
				ninja.wallets.setupwallet.setAddress(73, 201, false);
				break;
			default:
				ninja.wallets.setupwallet.setAddress(0, 128, true);
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