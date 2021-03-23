const FreshAFPunks = artifacts.require("FreshAFPunks");

module.exports = function (deployer, network, accounts) {
    console.log("Profits will be sent to: ", accounts[0]);
    console.log(accounts);
    deployer.deploy(FreshAFPunks, "0x01700217a72b2Bb86E3634EdFf35A3308dA3fFf5");
};
