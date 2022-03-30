import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { connect, disconnect, on, removeListener } from "../utils/web3Client";
import { Spinner } from "react-bootstrap";
import { triggerFocus } from "antd/lib/input/Input";
import PropTypes from "prop-types";
import { ContactsOutlined } from "@ant-design/icons";

export const Navbar = (props) => {
  /* States */
  const [isConnect, setIsConnect] = useState(0);
  const [connectText, setConnectText] = useState("Connect");
  const [chainName, setChainName] = useState("");
  const [address, setAddress] = useState("");

  /* Listeners */
  useEffect(() => {
    const handleAccountsChanged = async (accounts) => {
      const result = await connect();
      setAddress(result.address);
      setChainName(result.network);
      props.accountChange(result.address);
    };
    const handleChainChanged = async (chainId) => {
      const result = await connect();
      setAddress(result.address);
      setChainName(result.network);
      props.accountChange(result.address);
    };  

    if (isConnect) {
      on('accountsChanged', handleAccountsChanged);
      on('chainChanged', handleChainChanged);
    }

    // remove the listener when finishing listening
    return () => {
      if (isConnect) {
        removeListener('accountsChanged', handleAccountsChanged);
        removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [isConnect]);

  /* API calls */

  /* Functions */

  let clickAction = async () => {
    if (isConnect) {
      await disconnect();
      setIsConnect(0);
      setConnectText("Connect");
      setChainName("");
      setAddress("");
    } else {
      const result = await connect();
      setAddress(result.address);
      setChainName(result.network);
      setIsConnect(true);
      setConnectText("Disconnect");
      props.accountChange(result.address);
    }
  };

  let clickMenu = async() => {
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
        <span id="addressText">{address}</span>
      </div>
      <div>
        <Button variant="outline-light" onClick={clickAction}>
          {connectText}
        </Button>
      </div>
    </Stack>
  );
};

// Navbar.propTypes = {
//   setConnectState: PropTypes.func.isRequired,
// };
Navbar.propTypes = {
  clickChange: PropTypes.func,
  accountChange: PropTypes.func,
};

export default Navbar;
