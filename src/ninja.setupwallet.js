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
				ninja.wallets.setupwallet.setAddress(0, 128, false);
				break;
			case "btctest":
				ninja.wallets.setupwallet.setAddress(0, 128, false);
				break;
			case "ltc":
				ninja.wallets.setupwallet.setAddress(48, 176, false);
				break;
			case "ltctest":
				ninja.wallets.setupwallet.setAddress(111, 239, false);
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