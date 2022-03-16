import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack'
import './styleNavbar.css'

export const Navbar = (props) => {
  /* States */
  const [isConnect, setIsConnect] = useState(0);
  const [connectText, setConnectText] = useState("Connect");
  const [chainName, setChainName] = useState("");
  const [address, setAddress] = useState("");
  
  /* Listeners */

  /* API calls */

  /* Functions */
  let clickAction = () => {
    if(isConnect === 0) {
      setIsConnect(isConnect => 1);
      setConnectText(connectText => "Disconnect");
      setChainName(chainName => "TestChain");  // 之後會換成串API
      setAddress(address => "TestAddress0xwer322fwfr");  // 之後會換成串API
    } else {
      setIsConnect(isConnect => 0);
      setConnectText(connectText => "Connect");
      setChainName(chainName => "");
      setAddress(address => "");
    }
  }

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