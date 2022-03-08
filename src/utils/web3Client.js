import Web3 from "web3";

/**
 * variables
 */
let web3, provider;

/** web3 instance */
function init(givenProvider) {
  provider = givenProvider;
  web3 = new Web3(givenProvider);
}

function connect() {}

function on(eventName, callback) {
  provider.on(eventName, callback);
}

function removeListener(eventName, callback) {
  provider.removeListener(eventName, callback);
}

function makeContract(address) {}

export default web3;
