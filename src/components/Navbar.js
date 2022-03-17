import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import './styleNavbar.css';
import { connect, disconnect } from "../utils/web3Client";

export const Navbar = (props) => {
  /* States */
  const [isConnect, setIsConnect] = useState(0);
  const [connectText, setConnectText] = useState("Connect");
  const [chainName, setChainName] = useState("");
  const [address, setAddress] = useState("");
  
  /* Listeners */

  /* API calls */

  /* Functions */
  let clickAction = async () => {
    if (isConnect) {
      await disconnect();
      setIsConnect(0);
      setConnectText("Connect");
      setChainName("");
      setAddress("");
    }
    else {
      const result = await connect();
      setAddress(result.address);
      setChainName(result.network);
      setIsConnect(true);
      setConnectText("Disconnect");
    }
  };

  /* Render functions */
  return (
    <Stack direction="horizontal" gap={3} className="navClass">
      <div id="titleText">OurSong NFT Viewer</div>
      <div className="ms-auto chainBlock">
        {chainName} <br></br>
        <span id="addressText">{address}</span>
      </div>
      <div>
        <Button variant="outline-light" onClick={clickAction}>{connectText}</Button>
      </div>
    </Stack>
  );
};

export default Navbar;