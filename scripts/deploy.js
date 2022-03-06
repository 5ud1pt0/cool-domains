const main = async() => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("dada");
    await domainContract.deployed();

    console.log("Contract deployed to:", domainContract.address);

    let txn = await domainContract.register("sudipto", { value: hre.ethers.utils.parseEther('0.1') });
    await txn.wait();
    console.log("Minted domain sudipto.dada");

    txn = await domainContract.setRecord("sudipto", "Am I a sudipto or a dada??");
    await txn.wait();
    console.log("Set record for sudipto.dada");

    const address = await domainContract.getAddress("sudipto");
    console.log("Owner of domain sudipto:", address);

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
}

const runMain = async() => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();