import React, { useState } from "react";

const Transaction = ({ account, web3 }) => {
  const [targetAddress, setTargetAddress] = useState(null);
  const [amount, setAmount] = useState(null);

  const sendOnChangeHandler = (e) => {
    setTargetAddress(e.target.value);
  };

  const amountOnChangeHandler = (e) => {
    setAmount(e.target.value);
  };

  const onClickHandler = () => {
    let fromAddress = account;
    let toAddress = targetAddress;
    let amountToTransfer = amount+"000000000000000000";
    web3.eth.sendTransaction({
      from: fromAddress,
      to: toAddress,
      value: amountToTransfer,
    });
  };

  return (
    <div>
      <h2>Transaction</h2>
      <h3>Send to</h3>
      <input type="text" onChange={sendOnChangeHandler} />
      <h3>Amount </h3>
      <input type="number" min="0" onChange={amountOnChangeHandler} />
      <br />
      <br />

      <button className="connectButton" onClick={onClickHandler}>
        Send
      </button>
    </div>
  );
};

export default Transaction;
