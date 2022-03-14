import React from "react";
import { connect } from "../utils/web3Client";

const WalletInfo = ({
  address,
  setAddress,
  network,
  setNetwork,
  balance,
  setBalance,
}) => {
  const onClickHandler = () => {
    let wallectinformation = connect();
    wallectinformation.then((msg) => {
      setAddress(msg[0]);
      setBalance(msg[1]);
      setNetwork(msg[2]);
    });
  };

  return (
    <div>
      <button onClick={onClickHandler}>Connect to Metamask</button>
      <h3>network:{network}</h3>
      <h3>address:{address}</h3>
      <h3>balance:{balance}</h3>
    </div>
  );
};

export default WalletInfo;
