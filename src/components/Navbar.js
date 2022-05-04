import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { connect, disconnect, on, removeListener } from "../utils/web3Client";
import { Spinner } from "react-bootstrap";
import { triggerFocus } from "antd/lib/input/Input";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { ContactsOutlined } from "@ant-design/icons";

export const Navbar = (props) => {
  const { setUserAddress, setIsConnected } = props;
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
      setUserAddress(result.address);
    };
    const handleChainChanged = async (chainId) => {
      const result = await connect();
      setAddress(result.address);
      setChainName(result.network);
      setUserAddress(result.address);
    };

    if (props.isConnect) {
      on("accountsChanged", handleAccountsChanged);
      on("chainChanged", handleChainChanged);
    }

    // remove the listener when finishing listening
    return () => {
      if (props.isConnect) {
        removeListener("accountsChanged", handleAccountsChanged);
        removeListener("chainChanged", handleChainChanged);
      }
    };
  }, [props.isConnect]);

  /* API calls */

  /* Functions */

  let clickAction = async () => {
    if (props.isConnect) {
      await disconnect();
      // setIsConnect(0); // use for Navbar
      setIsConnected(false); // use for App
      setConnectText("Connect");
      setChainName("");
      setAddress("");
    } else {
      const result = await connect();
      setAddress(result.address);
      setChainName(result.network);
      // setIsConnect(true);
      setIsConnected(true);
      setConnectText("Disconnect");
      setUserAddress(result.address);
    }
  };

  let clickMenu = async () => {
    props.clickChange();
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

Navbar.propTypes = {
  clickChange: PropTypes.func,
  setUserAddress: PropTypes.func.isRequired,
  setIsConnected: PropTypes.func.isRequired,
  isConnect: PropTypes.bool,
};

export default Navbar;
