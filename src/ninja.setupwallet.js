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
		Bitcoin.Address.networkVersion = networkVersion;
		Bitcoin.ECKey.privateKeyPrefix = privateKeyPrefix;
		ninja.tabSwitch(document.getElementById("singlewallet"));
		ninja.wallets.singlewallet.generateNewAddressAndKey();
		document.getElementById("paperkeyarea").innerHTML = "";
		document.getElementById("bulktextarea").value = "";
		ninja.wallets.brainwallet.clear();
		document.getElementById("detailprivkey").value = "";
		ninja.wallets.detailwallet.clear();
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

	setAddress: function (privkey, pubkey, enable) {
		var networkVersion = document.getElementById("setupnetworkVersion");
		var privateKeyPrefix = document.getElementById("setupprivateKeyPrefix");
		var autoPrivateKeyPrefix = document.getElementById("setupautoPrivateKeyPrefix");
		networkVersion.value = privkey;
		privateKeyPrefix.value = pubkey;
		networkVersion.disabled = !enable;
		privateKeyPrefix.disabled = true;
		autoPrivateKeyPrefix.disabled = !enable;
		autoPrivateKeyPrefix.checked = true;
		privateKeyPrefix.value = parseInt(networkVersion.value) + 128;
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
			case "aur":
				ninja.wallets.setupwallet.setAddress(23, 239, false);
				break;
			case "bbq":
				ninja.wallets.setupwallet.setAddress(85, 213, false);
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
			case "moon":
				ninja.wallets.setupwallet.setAddress(3, 131, false);
				break;
			case "nmc":
				ninja.wallets.setupwallet.setAddress(52, 128, false);
				break;
			case "ppc":
				ninja.wallets.setupwallet.setAddress(55, 183, false);
				break;
			case "rdd":
				ninja.wallets.setupwallet.setAddress(61, 189, false);
				break;
			case "rpc":
				ninja.wallets.setupwallet.setAddress(60, 188, false);
				break;
			case "tips":
				ninja.wallets.setupwallet.setAddress(33, 161, false);
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