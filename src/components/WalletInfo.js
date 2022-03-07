import React, { useState } from "react";

const WalletInfo = ({ account, setAccount, web3 }) => {
  const [balance, setBalance] = useState("");
  const [networkName, setNetworkName] = useState("");

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
          break;
        case 4:
          setNetworkName("Rinkeby Testnet");
          break;
        case 18:
          setNetworkName("ThunderCore Testnet");
          break;
        case 56:
          setNetworkName("Smart Chain Mainnet");
          break;
        case 97:
          setNetworkName("Smart Chain Testntet");
          break;
        case 108:
          setNetworkName("ThunderCore Mainnet");
          break;

        default:
          setNetworkName("Unknown");
          break;
      }
    });
  };

  return (
    <div className="walletInfo">
      <h2>Wallet Infomation</h2>
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
