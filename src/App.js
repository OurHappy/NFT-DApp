import React, { useState, useEffect } from "react";
import Transaction from "./components/Transaction";
import WalletInfo from "./components/WalletInfo";
import Web3 from "web3";

//parent component of WallectInfo and Transaction
function App() {
  //state lifting from WalletInfo
  const [account, setAccount] = useState("");
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    const w3 = new Web3(Web3.givenProvider || "http://localhost:3000/");
    setWeb3(w3);
  }, []);

  return (
    <div>
      <h1>NFT-DApp</h1>
      <WalletInfo account={account} setAccount={setAccount} web3={web3} />
      <Transaction account={account} web3={web3} />
    </div>
  );
}

export default App;
