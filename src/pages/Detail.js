import React, {useState, useEffect, useContext} from 'react';
import { useNavigate, useParams } from "react-router";
import PropTypes from "prop-types";
import Initializing from '../components/Initializing';
import Token from '../components/Token';
import ContractPanel from '../components/ContractPanel';
import AppState from '../context/appState';
import {isContractAddress} from '../utils/web3Client';

export const Detail = props => {
  /**
   * Props and Constants
   */
  const appState = useContext(AppState);

  const params = useParams();

  /**
   * States
   */
  const [isChecking, setIsChecking] = useState(true);
  const [isValidAddress, setIsValidAddress] = useState(null);
  const [address] = useState(params.address);
  const [tokenId] = useState(params.tokenId);

  useEffect(() => {
    if (appState === 'ready') {
      const validAddresss = address && isContractAddress(address);
      setIsValidAddress(validAddresss);
      setIsChecking(false);
    }
  }, [appState, address]);

  /**
   * Functions
   */

  /**
   * Render functions
   */

  if (appState !== 'ready') {
    return <Initializing appState/>;
  }
  else if (isChecking) {
    return (
      <div>Checking contract address...</div>
    );
  }
  else if (!isValidAddress) {
    return (
      <div>No data found for this contract address, please check your address and the current chain.</div>
    );
  }
  else {
    return (
      <>
        <Token  contractAddress={address} tokenId={tokenId} />
        <ContractPanel contractAddress={address}/>
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