import Web3 from "web3";
import ERC721Interface from "../contracts/ERC721.json";
import ERC165Interface from "../contracts/ERC165.json";
import OurSongInterface from "../contracts/OurSong.json";
import { isERC721, isERC1155 } from "../utils/contract.js";

const ERC721InterfaceID = "0x5b5e139f"; // ERC721Metadata
const ERC1155InterfaceID = "0xd9b67a26"; // ERC1155

/**
 * variables
 */
let web3, provider;

/** web3 instance */
export function init(givenProvider) {
  provider = givenProvider;

  if (typeof Web3 !== undefined) {
    web3 = new Web3(provider);
    return true;
  } else {
    throw new Error();
  }
}

export async function connect() {
  try {
    init(Web3.givenProvider);
  } catch (error) {}

  let address = await web3.eth.requestAccounts();
  let balance = await web3.eth.getBalance(address[0]);

  let networkId = await web3.eth.net.getId();

  let networkName;
  switch (networkId) {
    case 1:
      networkName = "Ethereum Mainnet";
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
      networkName = "Smart Chain Testntet";
      break;
    case 108:
      networkName = "ThunderCore Mainnet";
      break;

    default:
      networkName = "Unknown";
      break;
  }

  //store address, balance, networkname in and array
  let wallectinformation = [];
  wallectinformation.push(address[0]);
  wallectinformation.push(balance[0]);
  wallectinformation.push(networkName);

  return wallectinformation;
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
  let contract = new web3.eth.Contract(ERC165Interface, contractAddress);

  let ERC1155 = await isERC1155(contract);
  let ERC721 = await isERC721(contract);

  if (ERC1155) {
    return new web3.eth.Contract(OurSongInterface, contractAddress);
  } else if (ERC721) {
    return new web3.eth.Contract(ERC721Interface, contractAddress);
  } else {
    return new Error();
  }
}

export default web3;
