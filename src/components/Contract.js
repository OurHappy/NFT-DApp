import React, { useState } from "react";
import { makeContract } from "../utils/web3Client";
import { totalSupply, name, symbol } from "../utils/contract";

const Contract = () => {
  const [contractAddress, setContractAddress] = useState(null);
  const onClickHandler = () => {
    let contract = makeContract("0x7FA783fFaB81D23b66B4B4c25d2bF853989a34eb");
    console.log("name", name(contract));
  };
  const onChangeHandler = (e) => {
    setContractAddress(e.target.value);
  };
  return (
    <div>
      <h2>contractinfo</h2>
      <input type="text" onChange={onChangeHandler} />
      <button onClick={onClickHandler}>check contract</button>
      <h3>name:</h3>
      <h3>symbol:</h3>
      <h3>owner:</h3>
    </div>
  );
};

export default Contract;
