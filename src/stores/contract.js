import { get, readable, writable } from "svelte/store";
import { web3 as _web3, selectedAccount, web3 } from "./wallet";
import BN from "bn.js";
import FreshAFPunksContract from "../contracts/FreshAFPunks.json";

export const contractAddress = ""; //mainnet
export const devContractAddress = ""; //Ganache

export let currentContractAddress = "";
let abi = [
    {
        inputs: [
            {
                internalType: "address payable",
                name: "_newWallet",
                type: "address",
            },
        ],
        stateMutability: "payable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "approved",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "ApprovalForAll",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address payable",
                name: "_newWallet",
                type: "address",
            },
        ],
        name: "changeWallet",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenID",
                type: "uint256",
            },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "_data",
                type: "bytes",
            },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "baseURI",
                type: "string",
            },
        ],
        name: "setBaseURI",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "balanceOf",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "baseURI",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "contractURI",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "getApproved",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getCurrentPrice",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "hardLimit",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "isApprovedForAll",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "ownerOf",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4",
            },
        ],
        name: "supportsInterface",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "index",
                type: "uint256",
            },
        ],
        name: "tokenByIndex",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "index",
                type: "uint256",
            },
        ],
        name: "tokenOfOwnerByIndex",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "tokenURI",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalSupply",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];

let baseMetadataURI = "https://freshafpunks-metadata-api.herokuapp.com/";

export let state = writable("initial");
export let userNumOwnedPunks = writable(0);
export let userPunks;
export let totalSupply = writable(0);

// export let mintablePunksData = writable([]);
export let soldURLs = writable([]);

let contract;
let networkId = null;

function clean_address(address) {
    return String(address).toLowerCase();
}

export let my_tokens = [];

export async function getMintablePunks(offset, limit) {
    if (!contract) await connectContract();

    if (contract && get(selectedAccount)) {
        let mintablePunksData = [];
        console.log("hhhh");
        totalSupply.set(await contract.methods.totalSupply().call());

        let soldIDs = [];

        for (let i = 0; i < parseInt(get(totalSupply)); i++) {
            soldIDs.push(
                parseInt(await contract.methods.tokenByIndex(i).call())
            );
        }
        console.log(soldIDs);
        // let mintedTokenIDs = await contract.methods.mintedTokenIDs(0).call();
        // console.log(mintedTokenIDs);

        // if (totalSupply) {
        // } else {
        //     for (let i = offset; i < limit + offset; i++) {
        //         let data = await fetch(
        //             `${baseMetadataURI}api/token/${i}`
        //         ).then((res) => res.json());

        //         console.log(data);
        //         mintablePunksData.push(data);
        //     }
        //     return mintablePunksData;
        // }
        for (let i = offset; i < limit + offset; i++) {
            if (soldIDs.includes(i)) {
                limit++;
                continue;
            }
            let data = await fetch(
                `${baseMetadataURI}api/token/${i}`
            ).then((res) => res.json());

            console.log(data);
            mintablePunksData.push(data);
        }
        return mintablePunksData;
    }
}

async function getDataForID(tokenID) {
    return await fetch(`${baseMetadataURI}api/token/${tokenID}`).then((res) =>
        res.json()
    );
}

export async function getSoldPunks(offset, limit) {
    if (!contract) await connectContract();

    if (contract && get(selectedAccount)) {
        let soldPunksData = [];

        totalSupply.set(await contract.methods.totalSupply().call());
        console.log(get(totalSupply));

        if (get(totalSupply) && parseInt(get(totalSupply)) > 0) {
            let soldIDs = [];

            for (let i = 0; i < parseInt(get(totalSupply)); i++) {
                soldIDs.push(await contract.methods.tokenByIndex(i).call());
            }

            soldIDs.sort((a, b) => {
                return a - b;
            });

            if (soldIDs.length > limit + offset) {
                soldIDs = soldIDs.slice(offset, offset + limit);
            }

            console.log("AASAS");

            for (let i = offset; i < soldIDs.length; i++) {
                let data = await fetch(
                    `${baseMetadataURI}api/token/${soldIDs[i]}`
                ).then((res) => res.json());

                console.log(data);
                soldPunksData.push(data);
            }
            console.log(soldIDs);

            return soldPunksData;
        }
    }
}

export async function getUserInventory() {
    if (!contract) await connectContract();

    if (contract && get(selectedAccount)) {
        userNumOwnedPunks.set(
            await contract.methods.balanceOf(get(selectedAccount)).call()
        );

        if (userNumOwnedPunks > 0) {
            let punksArr = [];
            for (let i = 0; i < userNumOwnedPunks; i++) {
                let tokenID = await contract.methods
                    .tokenOfOwnerByIndex(get(selectedAccount), i)
                    .call();
                console.log(tokenID);
            }
        }
        console.log(userNumOwnedPunks);
    } else {
        // retryInterval = setInterval(async () => {
        //     return await getUserInventory();
        // }, 500);
        // await connect();
        // await getUserInventory();
        console.log("no contract");
    }
}

export async function connectContract() {
    console.log(get(selectedAccount));
    if (!get(selectedAccount)) {
        state.set("no-login");
        console.log("No account connected");
        return;
    }

    console.log("Connecting to contract...");
    state.set("loading");
    let web3 = get(_web3);
    if (web3) {
        networkId = await web3.eth.net.getId();
        const deployedNetwork = FreshAFPunksContract.networks[networkId];

        contract = new web3.eth.Contract(
            abi,
            "0x0e33af3b87065072cfda44649c5bdb5be3908817"
        );

        startContractListeners();
    } else {
        state.set("no-web3");
    }
}

function startContractListeners() {
    contract.events.Transfer(async () => {
        console.log("Transfer occured");
    });
}

export async function fetchSinglePunk(tokenID) {
    if (!contract) await connectContract();

    let data = await fetch(
        `${baseMetadataURI}api/token/${tokenID}`
    ).then((res) => res.json());

    totalSupply.set(await contract.methods.totalSupply().call());
    let soldIDs = [];

    for (let i = 0; i < parseInt(get(totalSupply)); i++) {
        soldIDs.push(await contract.methods.tokenByIndex(i).call());
    }

    console.log(soldIDs);

    if (soldIDs.includes(tokenID)) {
        data.owner = await contract.methods.ownerOf(tokenID).call();
    } else {
        data.owner = null;
    }

    console.log(data.owner);
    data.price = await getCurrentPrice();

    let transactions = await contract.getPastEvents("Transfer", {
        fromBlock: 0,
        toBlock: "latest",
    });

    transactions = transactions.filter((transaction) => {
        return transaction.returnValues.tokenId === tokenID;
    });

    // data.transactions = transactions;

    let web3 = get(_web3);

    data.transactions = await Promise.all(
        transactions.map(async (transaction, i) => {
            let txData = await web3.eth.getTransaction(
                transaction.transactionHash
            );
            let blockData = await web3.eth.getBlock(txData.blockNumber);
            txData.timestamp = blockData.timestamp;

            console.log(txData);
            return txData;
        })
    );

    return data;
}

async function getCurrentPrice() {
    let price = 0.01;
    totalSupply.set(await contract.methods.totalSupply().call());

    let _totalSupply = parseInt(get(totalSupply));
    console.log(_totalSupply);

    if (_totalSupply <= 30 || !_totalSupply) {
        price = 0.0;
    } else if (_totalSupply > 30 && _totalSupply <= 299) {
        price = 0.01;
    } else if (_totalSupply > 299 && _totalSupply <= 799) {
        price = 0.02;
    } else if (_totalSupply > 799 && _totalSupply <= 1499) {
        price = 0.03;
    } else if (_totalSupply > 1499 && _totalSupply <= 2299) {
        price = 0.04;
    } else if (_totalSupply > 2299 && _totalSupply <= 2999) {
        price = 0.05;
    } else if (_totalSupply > 2999 && _totalSupply <= 3699) {
        price = 0.1;
    } else if (_totalSupply > 3699 && _totalSupply <= 4399) {
        price = 0.11;
    } else if (_totalSupply > 4399 && _totalSupply <= 5099) {
        price = 0.12;
    } else if (_totalSupply > 5099 && _totalSupply <= 5799) {
        price = 0.13;
    } else if (_totalSupply > 5799 && _totalSupply <= 6499) {
        price = 0.14;
    } else if (_totalSupply > 6499 && _totalSupply <= 7199) {
        price = 0.28;
    } else if (_totalSupply > 7199 && _totalSupply <= 7899) {
        price = 0.29;
    } else if (_totalSupply > 7899 && _totalSupply <= 8599) {
        price = 0.3;
    } else if (_totalSupply > 8599 && _totalSupply <= 9299) {
        price = 0.31;
    } else if (_totalSupply > 9299 && _totalSupply <= 9999) {
        price = 0.32;
    } else if (_totalSupply > 9999 && _totalSupply <= 10699) {
        price = 0.64;
    } else if (_totalSupply > 10699 && _totalSupply <= 11399) {
        price = 0.65;
    } else if (_totalSupply > 11399 && _totalSupply <= 12099) {
        price = 0.66;
    } else if (_totalSupply > 12099 && _totalSupply <= 12500) {
        price = 0.83;
    }

    return price;
}

export async function attemptMint(tokenID) {
    if (!contract) await connectContract();

    let web3 = get(_web3);
    const overrides = {
        from: clean_address(get(selectedAccount)),
        value: web3.utils.toWei(
            (await getCurrentPrice(tokenID)).toString(),
            "ether"
        ),
    };

    console.log(overrides);
    let ret;
    try {
        ret = await contract.methods.mint(tokenID).send(overrides);
    } catch (e) {
        ret = false;
    }

    console.log(ret);
    return ret;
}
