import Web3 from "web3";
import ERC721Interface from "../contracts/ERC721.json";
import ERC165Interface from "../contracts/ERC165.json";
import OurSong1155Interface from "../contracts/OurSong1155.json";
import OurSong721Interface from "../contracts/OurSong721.json";
import { isERC721, isERC1155 } from "../utils/contract.js";
import { chains } from "../constants";

const ERC721InterfaceID = "0x5b5e139f"; // ERC721Metadata
const ERC1155InterfaceID = "0xd9b67a26"; // ERC1155

/**
 * variables
 */
let web3, provider;

/* new function */
export async function addNetwork(network) {
  const Ethereum = {
    chainId: "0x1",
    chainName: "Ethereum Mainnet",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://api.mycryptoapi.com/eth"],
    blockExplorerUrls: ["https://etherscan.io"],
  };
  const Rinkeby = {
    chainId: "0x4",
    chainName: "Rinkeby",
    nativeCurrency: {
      name: "Rinkeby Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://rinkeby.infura.io/v3/"],
    blockExplorerUrls: ["https://etherscan.io"],
  };
  const BSC = {
    chainId: "0x38",
    chainName: "Smart Chain Mainnet",
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://bsc-dataseed1.binance.org"],
    blockExplorerUrls: ["https://bscscan.com/"],
  };

  const BSCtest = {
    chainId: "0x61",
    chainName: "Smart Chain Testnet",
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
    blockExplorerUrls: ["https://testnet.bscscan.com"],
  };

  const Thundermain = {
    chainId: "0x6c",
    chainName: "Thundercore Mainnet",
    nativeCurrency: {
      name: "TST Token",
      symbol: "TT",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet-rpc.thundercore.com"],
    blockExplorerUrls: ["https://viewblock.io/thundercore"],
  };
  const Thundertest = {
    chainId: "0x12",
    chainName: "Thundercore Testnet",
    nativeCurrency: {
      name: "TST token",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://testnet-rpc.thundercore.com"],
    blockExplorerUrls: ["https://explorer-testnet.thundercore.com/"],
  };

  const Polymain = {
    chainId: "0x89",
    chainName: "Polygun Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-rpc.com"],
    blockExplorerUrls: ["https://polygonscan.com/"],
  };

  const Polytest = {
    chainId: "0x13881",
    chainName: "Mumbai Testnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://matic-mumbai.chainstacklabs.com/"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  };

  switch (network) {
    case 1:
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [Ethereum],
      });
      break;

    case 4:
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [Rinkeby],
      });
      break;

    case 18:
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [Thundertest],
      });
      break;

    case 56:
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [BSC],
      });
      break;

    case 97:
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [BSCtest],
      });
      break;

    case 108:
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [Thundermain],
      });
      break;

    case 137:
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [Polymain],
      });
      break;

    case 80001:
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [Polytest],
      });
      break;

    default:
      console.log("not found!");
  }
}
export async function changeNetwork(id) {
  switch (id) {
    case 1:
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x1" }],
      });
      break;
    case 4:
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x4" }],
      });
      break;
    case 18:
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x12" }],
      });
      break;
    case 108:
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x6c" }],
      });
      break;
    case 56:
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x38" }],
      });
      break;
    case 97:
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x61" }],
      });
      break;
    case 137:
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x89" }],
      });
      break;
    case 80001:
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13811" }],
      });
      break;
  }
}

/** web3 instance */
export function init(givenProvider) {
  provider = givenProvider;

  if (typeof Web3 !== undefined) {
    web3 = new Web3(provider);

    return { result: true, instance: web3 };
  } else {
    console.log("error");
  }
}

export function getChainName(chainId) {
  const networkId = parseInt(chainId, 16);

  const name = chains.getChainNameById(networkId) ?? "Unknown";
  return name;
}

export async function getChain() {
  // get chain ID without connect, and return chain name
  let networkId = await provider.request({
    method: "eth_chainId",
  });
  return getChainName(networkId);
}

export async function disconnect() {
  // TODO: implement disconnect function
  await provider.request({
    method: "eth_requestAccounts",
    params: [{ eth_accounts: {} }],
  });
  return true;
}

export async function connect() {
  let address = await web3.eth.requestAccounts();
  let balance = await web3.eth.getBalance(address[0]);

  let networkId = await web3.eth.net.getId();

  let networkName;
  switch (networkId) {
    case 1:
      networkName = "Ethereum Mainnet";
      break;
    case 3:
      networkName = "Ropsten Testnet";
      break;
    case 4:
      networkName = "Rinkeby Testnet";
      break;
    case 18:
      networkName = "ThunderCore Testnet";
      break;
    case 56:
      networkName = "Smart Chain Mainnet";
      break;
    case 97:
      networkName = "Smart Chain Testnet";
      break;
    case 108:
      networkName = "ThunderCore Mainnet";
      break;
    case 137:
      networkName = "Polygon";
      break;
    case 80001:
      networkName = "Polygon Testnet";
      break;

    default:
      networkName = "Unknown";
      break;
  }

  return {
    address: address[0],
    network: networkName,
  };
}

export function on(eventName, callback) {
  provider.on(eventName, callback);
}

export function removeListener(eventName, callback) {
  provider.removeListener(eventName, callback);
}

export function isContractAddress(address) {
  return web3.utils.isAddress(address);
}

export async function makeContract(contractAddress) {
  if (contractAddress !== "") {
    let contract = new web3.eth.Contract(ERC165Interface, contractAddress);
    let ERC1155 = await isERC1155(contract);
    let ERC721 = await isERC721(contract);

    if (ERC1155 === null || ERC721 === null) {
      // error in makeContract
      return {
        contractInterface: null,
        contract: null,
      };
    } else {
      if (ERC1155) {
        return {
          contractInterface: "ERC1155",
          contract: new web3.eth.Contract(
            OurSong1155Interface,
            contractAddress
          ),
        };
      } else if (ERC721) {
        return {
          contractInterface: "ERC721",
          contract: new web3.eth.Contract(OurSong721Interface, contractAddress),
        };
      } else {
        return {
          contractInterface: "unsupport_contract",
          contract: null,
        };
        // throw new Error('unsupport contract type');
        console.log("not supported");
      }
    }
  }
}

export default web3;
