const HDWalletProvider = require("@truffle/hdwallet-provider");
const path = require("path");

const mnemonic =
    "place pistol roof spy gift supreme benefit captain crash vessel exhaust erosion";

module.exports = {
    contracts_build_directory: path.join(__dirname, "src/contracts"),
    networks: {
        ropsten: {
            provider: function () {
                return new HDWalletProvider(
                    "7e1cef9859dd7cc0607b4a5885d7b0d1caa6f4640d40a104fa386d8f4816f833",
                    "https://eth-ropsten.alchemyapi.io/v2/ckns8ncj5ENbwf3WLFl33oOuhlm4i_2W"
                );
            },
            network_id: "*",
        },
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*",
        },
    },
    compilers: {
        solc: {
            version: "^0.6.0",
            parser: "solcjs",
        },
    },
};
