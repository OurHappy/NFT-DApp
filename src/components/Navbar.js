import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { connect, disconnect, on, removeListener } from "../utils/web3Client";
import { useNavigate } from "react-router-dom";
import UserWallet from '../context/userWallet';

export const Navbar = (props) => {
  /**
   * Props and Constants
   */
  const navigate = useNavigate();
  const userWallet = useContext(UserWallet);
  const isConnect = userWallet.isConnected();
  /* States */
  const [connectText, setConnectText] = useState("Connect");
  const [chainName, setChainName] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /* Listeners */
  useEffect(() => {
    // props.setInitUri(params.address);
    const handleAccountsChanged = async (accounts) => {
      const result = await connect();
      setAddress(result.address);
      setChainName(result.network);
      userWallet.setNetwork(result.network);
      userWallet.setAddress(result.address);
    };
    const handleChainChanged = async (chainId) => {
      const result = await connect();
      setAddress(result.address);
      setChainName(result.network);
      userWallet.setNetwork(result.network);
      userWallet.setAddress(result.address);
    };

    if (isConnect) {
      on("accountsChanged", handleAccountsChanged);
      on("chainChanged", handleChainChanged);
    }

    // remove the listener when finishing listening
    return () => {
      if (isConnect) {
        removeListener("accountsChanged", handleAccountsChanged);
        removeListener("chainChanged", handleChainChanged);
      }
    };
  }, [isConnect]);

  /* API calls */

  /* Functions */

  let clickAction = async () => {
    if (isConnect) {
      await disconnect();
      setConnectText("Connect");
      setChainName("");
      setAddress("");
      userWallet.setNetwork(null);
      userWallet.setAddress(null);
    } else {
      setIsLoading(true);
      setConnectText("Connecting...");
      const result = await connect();
      userWallet.setAddress(result.address);
      userWallet.setNetwork(result.network);
      setAddress(result.address);
      setChainName(result.network);
      setIsLoading(false);
      setConnectText("Disconnect");
    }
  };

  let clickMenu = async () => {
    navigate('/');
  };

  /* Render functions */
  return (
    <Stack direction="horizontal" gap={3} className="navClass">
      <div id="titleText" onClick={clickMenu}>
        OurSong NFT Viewer
      </div>
      <div className="ms-auto chainBlock">
        {chainName} <br></br>
        <span>{address}</span>
      </div>
      <div>
        <Button variant="outline-light" onClick={!isLoading? clickAction: null}>
          {connectText}
        </Button>
      </div>
    </Stack>
  );
};
export default Navbar;
