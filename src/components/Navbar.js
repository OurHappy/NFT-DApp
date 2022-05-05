import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { connect, disconnect, on, removeListener } from "../utils/web3Client";
import { Spinner } from "react-bootstrap";
import { triggerFocus } from "antd/lib/input/Input";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { ContactsOutlined } from "@ant-design/icons";
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

  /* Listeners */
  useEffect(() => {
    // props.setInitUri(params.address);
    const handleAccountsChanged = async (accounts) => {
      const result = await connect();
      setAddress(result.address);
      setChainName(result.network);
      userWallet.setAddress(result.address);
    };
    const handleChainChanged = async (chainId) => {
      const result = await connect();
      setAddress(result.address);
      setChainName(result.network);
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
      userWallet.setAddress(null);
    } else {
      const result = await connect();
      userWallet.setAddress(result.address);
      userWallet.setNetwork(result.network);
      setAddress(result.address);
      setChainName(result.network);
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
        <Button variant="outline-light" onClick={clickAction}>
          {connectText}
        </Button>
      </div>
    </Stack>
  );
};
export default Navbar;
