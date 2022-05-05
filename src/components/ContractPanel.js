import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { makeContract } from "../utils/web3Client";
import { getContractOwner, name, symbol } from "../utils/contract";
import { getContractMeta } from "../utils/contract";
import CopyOutlined from "@ant-design/icons/CopyOutlined";
import Panel_ERC1155 from "./Panel_ERC1155";
import Panel_ERC721 from "./Panel_ERC721";
import UserWallet from '../context/userWallet';

const ContractPanel = ({
  contractAddress,
}) => {
  /* Variables */
  let contractMeta = null;
  const userWallet = useContext(UserWallet);
  const isConnected = !!userWallet.address;

  /* States */
  /* The followings are the states which need to call API */
  const [contractInstance, setContractInstance] = useState(null);
  const [contractName, setContractName] = useState("test Name");
  const [contractSymbol, setContractSymbol] = useState("test symbol");
  const [contractOwner, setContractOwner] = useState("test Owner");
  const [exteralName, setExternalName] = useState("No External Name");
  const [externalDescipt, setExternalDescript] = useState(
    "No External Description"
  );
  const [externalLink, setExternalLink] = useState("No External Link");
  const [contractType, setContractType] = useState(null);
  const [hasContractMeta, setHasContractMeta] = useState(false);
  const [loading, setLoading] = useState("false");

  useEffect(() => {
    if (contractAddress) {
      getContractData();
    }
  }, [contractAddress]);

  /* Functions */

  const getContractData = async () => {
    let { contractInterface, contract } = await makeContract(contractAddress);
    setContractInstance(contract);

    if (contractInterface === "ERC1155") {
      const [parsedName, parsedSymbol, parsedOwner] = await Promise.all([
        name(contract),
        symbol(contract),
        getContractOwner(contract),
      ]);
      setContractName(parsedName);
      setContractSymbol(parsedSymbol);
      setContractOwner(parsedOwner);
      setContractType("ERC1155");
    } else if (contractInterface === "ERC721") {
      const [parsedName, parsedSymbol, parsedOwner] = await Promise.all([
        name(contract),
        symbol(contract),
        getContractOwner(contract),
      ]);
      setContractName(parsedName);
      setContractSymbol(parsedSymbol);
      setContractOwner(parsedOwner);
      setContractType("ERC721");
    } else {
    }

    contractMeta = await getContractMeta(contract);
    if (contractMeta != null) {
      setExternalName(contractMeta["data"].name);
      setExternalDescript(contractMeta["data"].description);
      setExternalLink(contractMeta["data"].external_url);
      // show the contract metadata only when it exists
      setHasContractMeta(true);
    } else {
      console.log("no metadata");
    }
  };

  const clickToCopy = () => {
    const copyEle = document.querySelector(".addrText");
    const range = document.createRange();
    window.getSelection().removeAllRanges();
    range.selectNode(copyEle);
    window.getSelection().addRange(range);
    document.execCommand("Copy");
    window.getSelection().removeAllRanges();
  };

  let panel;
  if (contractType === "ERC721") {
    panel = (
      <Panel_ERC721
        contractInstance={contractInstance}
        userAddress={userWallet.address}
        isConnected={isConnected}
      />
    );

    // navigate(`/contract/${contractAddress}`);
  } else if (contractType === "ERC1155") {
    panel = (
      <Panel_ERC1155
        contractInstance={contractInstance}
        userAddress={userWallet.address}
        isConnected={isConnected}
      />
    );

    // navigate(`/contract/${contractAddress}`);
  }

  /* Render Function */
  return (
    <div>
      {/* Show the contract and  you can copy it */}
      <div className="divClass">
        <span className="contractText">Contract:</span>
        <span className="addrText">{contractAddress}</span>
        <CopyOutlined onClick={clickToCopy} />
      </div>

      {/* Show the contract interaction panel if a valid contract is provided */}
      <div className="container">
        <div className="row">
          <div className="col contractInfo">
            <div>
              Name: {contractName} <br />
              Symbol: {contractSymbol} <br />
              Owner: <span className="blueText">{contractOwner}</span>
            </div>
          </div>
          {hasContractMeta && (
            <div className="col contractInfo">
              <div>
                Name: {exteralName} <br />
                Description: {externalDescipt} <br />
                <span className="blueText">{externalLink}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>{panel}</div>
    </div>
  );
};

ContractPanel.propTypes = {
  contractAddress: PropTypes.string,
};

export default ContractPanel;
