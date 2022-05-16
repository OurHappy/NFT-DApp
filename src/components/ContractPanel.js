import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { makeContract } from "../utils/web3Client";
import { getContractOwner, name, symbol } from "../utils/contract";
import { getContractMeta } from "../utils/contract";
import CopyOutlined from "@ant-design/icons/CopyOutlined";
import LinkOutlined from "@ant-design/icons/LinkOutlined";
import Panel_ERC1155 from "./Panel_ERC1155";
import Panel_ERC721 from "./Panel_ERC721";
import UserWallet from '../context/userWallet';
import {Container, Col, Row, Card, ListGroup} from 'react-bootstrap';

const ContractPanel = ({
  contractAddress, isDisable, tokenImg
}) => {
  /* Variables */
  let contractInfo = null;
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
  const [externalDescipt, setExternalDescript] = useState(null);
  const [externalLink, setExternalLink] = useState(null);
  const [contractType, setContractType] = useState(null);
  const [hasContractMeta, setHasContractMeta] = useState(false);
  const [loading, setLoading] = useState("false");
  const [contractUri, setContractUri] = useState(null);

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

    contractInfo = await getContractMeta(contract);
    if (contractInfo != null) {
      contractMeta = contractInfo['contractMeta'];
      setContractUri(contractInfo['contractUri']);
    }
    
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
    const copyEle = document.querySelector(".addressCopy");
    const range = document.createRange();
    window.getSelection().removeAllRanges();
    range.selectNode(copyEle);
    window.getSelection().addRange(range);
    document.execCommand("Copy");
    window.getSelection().removeAllRanges();
  };

  const clickToContractMeta = () => {
    window.open(contractUri);
  };

  const clickToContractName = () => {
    window.open(externalLink);
  };

  const clickToEtherscan = () => {
    let etherscanAddr = "https://etherscan.io/address/" + contractAddress;
    window.open(etherscanAddr);
  };

  let panel;
  if (contractType === "ERC721") {
    panel = (
      <Panel_ERC721
        contractInstance={contractInstance}
        userAddress={userWallet.address}
        isConnected={isConnected}
        isDisable={isDisable}
      />
    );

    // navigate(`/contract/${contractAddress}`);
  } else if (contractType === "ERC1155") {
    panel = (
      <Panel_ERC1155
        contractInstance={contractInstance}
        userAddress={userWallet.address}
        isConnected={isConnected}
        isDisable={isDisable}
      />
    );

    // navigate(`/contract/${contractAddress}`);
  }

  /* Render Function */
  return (
    <div className="contractPanel">
      <div className="topField">
        <h1 className="text-center contractText">Contract</h1>
        <Container>
          <Row>
            <Col className="test">  
              <div className="imgBox">
                <img src={tokenImg} className="contractImg"></img>
              </div>
            </Col>
            <Col>
              <div className="contractInfo">
                <div className="contractName">{contractName} {externalLink != null && <LinkOutlined onClick={clickToContractName}/>}</div>
                {externalDescipt != null && <div className="contractDescription">{externalDescipt}</div>}
                <div className="contractCard">
                  <Card className="contractAddress">
                    <Card.Header className="addressTitle">Contract Owner</Card.Header>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="addressText">{contractOwner}</ListGroup.Item>
                    </ListGroup>
                  </Card>
                </div>
                <div className="contractCard">
                  <Card className="contractAddress">
                    <Card.Header className="addressTitle">Contract Address</Card.Header>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="addressText addressCopy">{contractAddress}  <CopyOutlined onClick={clickToCopy} /></ListGroup.Item>
                    </ListGroup>
                  </Card>
                </div>
                <div className="originalData">
                  Original data: <LinkOutlined onClick={clickToContractMeta}/>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="bottomField">
        <div className="actionText">Action</div>
        <div>{panel}</div>
        <div className="etherscanLink">
          View on Etherscan <LinkOutlined onClick={clickToEtherscan}/>
        </div>
      </div>
    </div>
  );
};

ContractPanel.propTypes = {
  contractAddress: PropTypes.string,
  isDisable: PropTypes.bool,
  tokenImg: PropTypes.string
};

export default ContractPanel;
