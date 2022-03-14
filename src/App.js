import "./App.css";
import React, { useState  } from "react";

import Navbar from "./components/Navbar";
import WalletInfo from "./components/WalletInfo";
import Contract from "./components/Contract";
import Transaction from "./components/Transaction";


function App() {
  // useEffect(() => {
  //   init(Web3.givenProvider);
  // }, []);

  const [network, setNetwork] = useState(null);
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(null);

  return (
    <div className="App">
      <Navbar />
      <WalletInfo
        address={address}
        setAddress={setAddress}
        network={network}
        setNetwork={setNetwork}
        balance={balance}
        setBalance={setBalance}
      />
      <Transaction address={address} />
      <Contract />

      {/* Remove the sample React code */}
      {/* Install bootstrap for styling */}
      {/* Add a default empty page when there is no ethereum provider */}
      {/* Add a navbar contain the wallet connect status */}
      {/* Add a search bar to enter contract address */}
      {/* Show the contract interaction panel if a valid contract is provided */}
      {/* Show token metadata if a valid token is provided */}
    </div>
  );
}

export default App;
