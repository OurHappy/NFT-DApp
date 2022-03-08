import Web3 from "web3";

/**
 * variables
 */
let web3, provider;

/** web3 instance */
export function init(givenProvider) {
  provider = givenProvider;
  web3 = new Web3(givenProvider);
}

export async function connect() {}

export function on(eventName, callback) {
  provider.on(eventName, callback);
}

export function removeListener(eventName, callback) {
  provider.removeListener(eventName, callback);
}

export function makeContract(address) {}

export default web3;
