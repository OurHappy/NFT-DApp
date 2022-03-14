import Web3 from "web3";
import ERC1155Interface from "../contracts/ERC1155.json";
import ERC721Interface from "../contracts/ERC721.json";
import OurSongInterface from "../contracts/OurSong.json";

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
    throw new console.error("failed to initiate a web3 instance!");
  }
}

export async function connect() {
  init(Web3.givenProvider);
  let wallectinformation = [];
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

export function makeContract(contractaddress) {
  //by default using OurSong's interface to initiate a contract instance
  //have to check whether given address is oursong's NFT address
  return new web3.eth.Contract(OurSongInterface, contractaddress);
}

export default web3;
