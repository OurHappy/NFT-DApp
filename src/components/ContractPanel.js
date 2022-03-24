import React, { useState, useEffect } from "react";
import Token from "./Token";
import PropTypes from "prop-types";
import { makeContract } from "../utils/web3Client";
import { getContractOwner, name, symbol } from "../utils/contract";
// import { Icon, message } from 'antd';
import CopyOutlined from "@ant-design/icons/CopyOutlined";
import { Card } from "react-bootstrap";
import { Button } from "bootstrap";
import Panel_ERC1155 from "./Panel_ERC1155";
import Panel_ERC721 from "./Panel_ERC721";
// import './styleContract.css';

const ContractPanel = ({ contractAddress }) => {
  /* States */
  /* The followings are the states which need to call API */
  const [contractName, setContractName] = useState("test Name");
  const [contractSymbol, setContractSymbol] = useState("test symbol");
  const [contractOwner, setContractOwner] = useState("test Owner");
  const [exteralName, setExternalName] = useState("");
  const [externalDescipt, setExternalDescript] = useState("");
  const [externalLink, setExternalLink] = useState("External Link");
  const [contractType, setContractType] = useState(null);
  const [contractInstance, setContractInstance] = useState("contract");

  useEffect(() => {
    getContractData();
  }, []);

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
    panel = <Panel_ERC721 contractInstance={contractInstance} />;
  } else if (contractType === "ERC1155") {
    panel = <Panel_ERC1155  contractInstance={contractInstance} />;
  }

  /* Render Function */
  return (
    <div>
      <Token />
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
          <div className="col contractInfo">
            <div>
              Name: {exteralName} <br />
              Description: {externalDescipt} <br />
              <span className="blueText">{externalLink}</span>
            </div>
          </div>
        </div>
      </div>
      <div>{panel}</div>
    </div>
  );
};

ContractPanel.propTypes = {
  contractAddress: PropTypes.string.isRequired,
};

export default ContractPanel;
