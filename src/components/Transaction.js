import React, { useState } from "react";
import { transfer } from "../utils/contract";

const Transaction = ({ address }) => {
  const [amount, setAmount] = useState(null);
  const [targetAddress, setTargetAddress] = useState(null);

  const targetOnChangeHandler = (e) => {
    setTargetAddress(e.target.value);
  };

  const amountOnChangeHandler = (e) => {
    setAmount(e.target.value);
  };

  const onClickHandler = () => {
    transfer(address, targetAddress, amount);
  };
  return (
    <div>
      <h4>amount to send</h4>
      <input type="text" onChange={amountOnChangeHandler} />
      <h4>address to send</h4>
      <input type="text" onChange={targetOnChangeHandler} />
      <button onClick={onClickHandler}>Send</button>
    </div>
  );
};

export default Transaction;
