import React, { useState } from "react";
import Web3 from "web3";
// import ethereum from "web3";

const WalletInfo = () => {
  let [account, setAccount] = useState("");
  let [balance, setBalance] = useState("");
  let [networkName, setNetworkName] = useState("");

  //web3 provider
  const web3 = new Web3(Web3.givenProvider || "http://localhost:3000/");

  //onClick handler
  const connectWallet = () => {
    let address = web3.eth.getAccounts();
    address.then((msg) => {
      setAccount(msg[0]);
      let add = msg[0];
      let balance = web3.eth.getBalance(add);
      balance.then((msg) => setBalance(msg[0]));
    });

    let net = web3.eth.net.getId();
    net.then((id) => {
      switch (id) {
        case 1:
          setNetworkName("Ethereum Mainnet");
        case 4:
          setNetworkName("Rinkeby Testnet");
        case 56:
          setNetworkName("Smart Chain");
        case 108:
          setNetworkName("ThunderCore Mainnet");
          break;
        case 18:
          setNetworkName("ThunderCore Testnet");
          break;
        default:
          setNetworkName("Unknown");
          break;
      }
      console.log(id);
    });
  };

  return (
    <div className="walletInfo">
      <button className="connectButton" onClick={connectWallet}>
        Connect
      </button>
      <div>
        <h3>Currnet network : {networkName}</h3>
        <h3>Your address : {account}</h3>
        <h3>Your balance : {balance}</h3>

        <p></p>
      </div>
    </div>
  );
};

export default WalletInfo;
