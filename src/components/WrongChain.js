import React from "react";
import { changeNetwork } from "../utils/web3Client";
import userWallet from "../context/userWallet";
import { useParams } from "react-router";
import { useState } from "react";
import { Button } from "react-bootstrap";

const WrongChain = () => {
  //variables
  const params = useParams();

  //states
  const [reset, setReset] = useState(0);

  //functions
  const clickHandler = () => {
    let pname = params.chain;
    let networkId;
    switch (pname) {
      case "Ethereum":
        networkId = 1;
        break;
      case "Rinkeby":
        networkId = 4;
        break;

      case "ThunderCore_test":
        networkId = 18;
        break;
      case "SmartChain":
        networkId = 56;
        break;
      case "SmartChain_test":
        networkId = 97;
        break;
      case "ThunderCore":
        networkId = 108;
        break;
      case "Polygon":
        networkId = 137;
        break;
      case "Polygon":
        networkId = 80001;
        break;
    }
    let result = changeNetwork(networkId);
    result.catch((msg) => {
      if (msg.code === 4902) {
        addNetwork(networkId);
      } else {
        console.log("uncaught error", msg.code);
      }
    });
    result.then((msg) => {
      setReset(1);
    });
  };

  const resetClick = () => {
    window.location.reload();
  };

  return (
    <div className="defaultPage">
      <div className="errorTitle">
        Your current chain is not {params.chain}
        <br />
        <Button variant="secondary" onClick={clickHandler}>
          Change to {params.chain}
        </Button>
        <br />
        {reset === 1 && (
          <Button variant="secondary" onClick={resetClick}>
            Click to refresh
          </Button>
        )}
      </div>
      <div className="errorText">
        <br />
      </div>
    </div>
  );
};

export default WrongChain;
