import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import {
  connect,
  disconnect,
  getChainName,
  getChainAbb,
  on,
  removeListener,
  addNetwork,
  changeNetwork,
} from "../utils/web3Client";
import { useNavigate, useParams } from "react-router-dom";
import UserWallet from "../context/userWallet";
import AppState from "../context/appState";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { chains } from "../constants";

export const Navbar = (props) => {
  /**
   * Props and Constants
   */
  const navigate = useNavigate();
  const param = useParams();
  const userWallet = useContext(UserWallet);
  const chainName = userWallet.network;
  const address = userWallet.address;
  const isConnect = userWallet.isConnected();
  const appState = useContext(AppState);
  /* States */
  const [connectText, setConnectText] = useState("Connect");
  const [isLoading, setIsLoading] = useState(false);
  const chainList = {};

  /* Listeners */
  useEffect(() => {
    if (appState === "ready") {
      const handleAccountsChanged = async (accounts) => {
        userWallet.setAddress(accounts[0]);
      };

      const handleChainChanged = (chainId) => {
        // const result = getChainName(chainId);
        // userWallet.setNetwork(result);
        console.log("id=", chainId);
        const abb = getChainAbb(chainId);
        console.log(abb);
        userWallet.setNetwork(abb);
        console.log("userwallet network",abb);
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

  // useEffect(() => {
  //   if (param.chain === undefined) {
  //     navigate(`${userWallet.network}`);
  //     console.log("done");
  //   } else {
  //     console.log("already have uri chain!");
  //   }
  // }, [userWallet.network]);

  /* API calls */

  /* Functions */

  let dropdownHandler = async (netowrkId) => {
    let result = changeNetwork(netowrkId);
    result.catch((msg) => {
      if (msg.code === 4902) {
        addNetwork(netowrkId);
      } else {
        console.log("uncaught error with code ", msg.code);
      }
    });
  };

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
      <DropdownButton
        variant="outline-light"
        id="dropdown-basic-button"
        title="network"
      >
        <Dropdown.Item onClick={() => dropdownHandler(1)}>
          Ethereum Mainnet
        </Dropdown.Item>
        <Dropdown.Item onClick={() => dropdownHandler(4)}>
          Rinkeby Testnet
        </Dropdown.Item>
        <Dropdown.Item onClick={() => dropdownHandler(108)}>
          ThunderCore Mainnet{" "}
        </Dropdown.Item>{" "}
        <Dropdown.Item onClick={() => dropdownHandler(18)}>
          ThunderCore Testnet{" "}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => dropdownHandler(56)}>
          Smart Chain Mainnet{" "}
        </Dropdown.Item>{" "}
        <Dropdown.Item onClick={() => dropdownHandler(97)}>
          Smart Chain Testnet{" "}
        </Dropdown.Item>{" "}
        <Dropdown.Item onClick={() => dropdownHandler(137)}>
          Polygon Mainnet{" "}
        </Dropdown.Item>{" "}
        <Dropdown.Item onClick={() => dropdownHandler(80001)}>
          Polygon Testnet{" "}
        </Dropdown.Item>
      </DropdownButton>
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
