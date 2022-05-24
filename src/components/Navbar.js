import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import {
  connect,
  disconnect,
  getChainName,
  on,
  removeListener,
} from "../utils/web3Client";
import { useNavigate } from "react-router-dom";
import UserWallet from "../context/userWallet";
import AppState from "../context/appState";

export const Navbar = (props) => {
  /**
   * Props and Constants
   */
  const navigate = useNavigate();
  const userWallet = useContext(UserWallet);
  const chainName = userWallet.network;
  const address = userWallet.address;
  const isConnect = userWallet.isConnected();
  const appState = useContext(AppState);
  /* States */
  const [connectText, setConnectText] = useState("Connect");
  const [isLoading, setIsLoading] = useState(false);

  /* Listeners */
  useEffect(() => {
    if (appState === "ready") {
      const handleAccountsChanged = async (accounts) => {
        userWallet.setAddress(accounts[0]);
      };

      const handleChainChanged = (chainId) => {
        const result = getChainName(chainId);
        userWallet.setNetwork(result);
      };

      on("accountsChanged", handleAccountsChanged);
      on("chainChanged", handleChainChanged);
    }

    // remove the listener when finishing listening
    return () => {
      if (appState === "ready") {
        removeListener("accountsChanged", handleAccountsChanged);
        removeListener("chainChanged", handleChainChanged);
      }
    };
  }, [appState]);

  /* API calls */

  /* Functions */

  let clickAction = async () => {
    if (isConnect) {
      await disconnect();
      setConnectText("Connect");
      userWallet.setAddress(null);
    } else {
      setIsLoading(true);
      setConnectText("Connecting...");
      const result = await connect();
      userWallet.setAddress(result.address);
      setIsLoading(false);
      setConnectText("Disconnect");
    }
  };

  let clickMenu = async () => {
    navigate("/");
  };

  function copyAddress() {
    navigator.clipboard.writeText(address);
  }

  /* Render functions */
  const renderShortenAddress = () => {
    if (!address) return null;
    if (address.length < 16) return address;
    const end = address.length - 7;
    return `${address.substring(0, 7)}...${address.substring(end)}`;
  };

  return (
    <Stack direction="horizontal" gap={3} className="navClass">
      <div id="titleText" onClick={clickMenu}>
        OurSong NFT Viewer
      </div>
      {/* <div className="ms-auto chainBlock"> */}
      <div className="ms-auto">
        <div>{chainName}</div>
        <div>
          {address ? (
            <Button variant="link" onClick={copyAddress} className="addressBtn">
              {renderShortenAddress()}
            </Button>
          ) : null}
        </div>
      </div>
      {appState === "ready" ? (
        <div>
          <Button
            variant="outline-light"
            onClick={!isLoading ? clickAction : null}
          >
            {connectText}
          </Button>
        </div>
      ) : null}
    </Stack>
  );
};
export default Navbar;
