import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import PropTypes from "prop-types";
import Initializing from "../components/Initializing";
import Token from "../components/Token";
import ContractPanel from "../components/ContractPanel";
import AppState from "../context/appState";
import UserWallet from "../context/userWallet";
import { isContractAddress } from "../utils/web3Client";

export const Detail = (props) => {
  /**
   * Props and Constants
   */
  const appState = useContext(AppState);
  const userWallet = useContext(UserWallet);

  const params = useParams();

  /**
   * States
   */
  const [initialNetwork, setInitialNetwork] = useState(userWallet.network);
  const [isChecking, setIsChecking] = useState(true);
  const [isValidAddress, setIsValidAddress] = useState(null);
  const [address] = useState(params.address);
  const [tokenId, setTokenId] = useState(params.tokenId);
  const [isDisable, setIsDisable] = useState(false);
  const [tokenImg, setTokenImg] = useState(null);

  useEffect(() => {
    if (appState === "ready") {
      const validAddresss = address && isContractAddress(address);
      setIsValidAddress(validAddresss);
      setIsChecking(false);
    }
  }, [appState, address]);

  useEffect(() => {
    if (initialNetwork === null) {
      setInitialNetwork(userWallet.network);
    } else {
      const disabled = initialNetwork !== userWallet.network;
      setIsDisable(disabled);
    }
  }, [userWallet.network]);

  /**
   * Functions
   */
  function passImage(img) {
    setTokenImg(img);
  }

  /**
   * Render functions
   */

  if (appState !== "ready") {
    return <Initializing appState />;
  } else if (isChecking) {
    return <div>Checking contract address...</div>;
  } else if (!isValidAddress) {
    return (
      <div>
        No data found for this contract address, please check your address and
        the current chain.
      </div>
    );
  } else {
    return (
      <>
        <Token
          contractAddress={address}
          tokenId={tokenId}
          isDisable={isDisable}
          passImage={passImage}
          setTokenId={setTokenId}
        />
        <ContractPanel
          contractAddress={address}
          isDisable={isDisable}
          tokenImg={tokenImg}
        />
      </>
    );
    // return (
    //   <>
    //     <Token
    //       contractAddress={address}
    //       accountAddress={userAddress}
    //       isConnect={isConnect}
    //       contractInstance={contractInstance}
    //       setContractInstance={setContractInstance}
    //       web3Instance={web3Instance}
    //       setWeb3Instance={setWeb3Instance}
    //       currentNetwork={currentNetwork}
    //     />
    //     <ContractPanel
    //       contractAddress={address}
    //       setContractAddress={setAddress}
    //       userAddress={userAddress}
    //       initAtAppjs={initAtAppjs}
    //       contractInstance={contractInstance}
    //       setContractInstance={setContractInstance}
    //       appState={appState}
    //       web3Instance={web3Instance}
    //       setWeb3Instance={setWeb3Instance}
    //       isConnected={isConnected}
    //     />
    //   </>
    // );
  }
};

export default Detail;
