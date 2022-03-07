import Web3 from "web3";

/**
 * Constants
 */

/** web3 instance */
export class web3Instance {
  constructor(provider) {
    this.provider = provider;
    this.web3 = new Web3(provider);
  }

  connect() {}

  on(eventName, callback) {
    this.provider.on(eventName, callback);
  }

  removeListener(eventName, callback) {
    this.provider.removeListener(eventName, callback);
  }

  makeContract(address) {}
}
