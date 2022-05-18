import React, { useState } from "react";

import {
  InputGroup,
  FormControl,
  Accordion,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import PropTypes from "prop-types";
import {
  balanceOf721,
  ownerOf721,
  brun721token,
  transfer721token,
  uri721,
  getIPFSdata,
} from "../utils/contract";

const Panel_ERC721 = ({
  contractInstance,
  userAddress,
  isConnected,
  isDisable,
}) => {
  const [balanceId, setBalanceId] = useState(null);
  const [balanceResult, setBalanceResult] = useState("uint256");
  const [ownerId, setOwnerId] = useState(null);
  const [ownerResult, setOwnerResult] = useState("address");
  const [tokenId, setTokenId] = useState(null);
  const [burnId, setBurnId] = useState("uint256");
  const [burnResult, setBurnResult] = useState("result");
  const [transferFrom, setTransferFrom] = useState();
  const [transferTo, setTransferTo] = useState();
  const [transferId, setTransferId] = useState();
  const [transferResult, setTransferResult] = useState();
  const [uriId, setUriId] = useState(null);
  const [uriResult, setUriResult] = useState(null);
  const [parsedUri, setParsedUri] = useState(null);
  const [parsedName, setParsedName] = useState(null);
  const [parsedDescription, setParsedDescription] = useState(null);
  const [parsedImgLink, setParsedImgLink] = useState("");

  // const onClickTester = () => {
  //   let result = getIPFSdata(uriResult);
  //   result
  //     .then((msg) => {
  //       return JSON.parse(msg);
  //     })
  //     .then((msg) => {
  //       setParsedUri({ ...msg });
  //       setParsedName(msg.name);
  //       setParsedDescription(msg.description);
  //       setParsedImgLink(msg.image.replace("ipfs://", "https://ipfs.io/ipfs/"));
  //     });

  //   result.catch((msg) => console.log("error", msg));
  // };

  const balanceIdOnChange = (e) => {
    setBalanceId(e.target.value);
  };

  const ownerIdOnChange = (e) => {
    setOwnerId(e.target.value);
  };

  const burnIdOnChange = (e) => {
    setBurnId(e.target.value);
  };

  const transferFromOnChange = (e) => {
    setTransferFrom(e.target.value);
  };

  const transferToOnChange = (e) => {
    setTransferTo(e.target.value);
  };

  const transferIdOnChange = (e) => {
    setTransferId(e.target.value);
  };

  const uriIdOnChange = (e) => {
    setUriId(e.target.value);
  };

  const queryBalance = () => {
    let result = balanceOf721(contractInstance, balanceId);
    result.then((msg) => setBalanceResult(msg));
  };

  const queryOwner = () => {
    let result = ownerOf721(contractInstance, ownerId);
    result.then((msg) => setOwnerResult(msg));
  };

  const queryUri = async () => {
    let result = uri721(contractInstance, uriId);
    result.then((msg) => setUriResult(msg));
  };

  const burnToken = () => {
    let result = brun721token(contractInstance, burnId, userAddress);
    result.then((msg) => setBurnResult(msg.transactionHash));
    result.catch(setBurnResult("transaction rejected"));
  };

  const transferToken = () => {
    let result = transfer721token(
      contractInstance,
      transferFrom,
      transferTo,
      transferId,
      userAddress
    );
    result.then((msg) => setTransferResult(msg.transactionHash));
    result.catch(setTransferResult("transaction rejected"));
  };

  // let uriSection;
  // if (uriResult !== null) {
  //   uriSection = (
  //     <div>
  //       <Button variant="primary" onClick={onClickTester}>
  //         Parse this uri
  //       </Button>
  //       <Card style={{ width: "18rem" }}>
  //         <Card.Img variant="top" src={parsedImgLink} />
  //         <Card.Body>
  //           <Card.Title>{parsedName}</Card.Title>
  //           <Card.Text>{parsedDescription}</Card.Text>
  //           {/* <Button variant="primary">Go somewhere</Button> */}
  //         </Card.Body>
  //       </Card>
  //     </div>
  //   );
  // }

  return (
    <div className="contractpanel">
      <h1 className="panelTitle">Action</h1>

      <Accordion className="Accordion">
        <Accordion.Item eventKey="0" className="accordionItem">
          <Accordion.Header className="customAccordition">
            BalanceOf
          </Accordion.Header>
          <Accordion.Body>
            <div className="contractunit">
              <>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="owner(address)"
                    aria-label="owner"
                    aria-describedby="basic-addon1"
                    onChange={balanceIdOnChange}
                  />
                </InputGroup>
              </>
              {isDisable && (
                <Button
                  variant="primary"
                  onClick={queryBalance}
                  disabled
                  className="btnClick"
                >
                  Query
                </Button>
              )}
              {!isDisable && (
                <Button
                  variant="primary"
                  onClick={queryBalance}
                  className="btnClick"
                >
                  Query
                </Button>
              )}
              <p className="result">{balanceResult}</p>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1" className="accordionItemNext">
          <Accordion.Header className="customAccordition">
            OwnerOf
          </Accordion.Header>
          <Accordion.Body>
            <div className="contractunit">
              <>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="tokenId(unit256)"
                    aria-label="id(unit256)"
                    aria-describedby="basic-addon1"
                    onChange={ownerIdOnChange}
                  />
                </InputGroup>
              </>
              {isDisable && (
                <Button
                  variant="primary"
                  onClick={queryOwner}
                  disabled
                  className="btnClick"
                >
                  Query
                </Button>
              )}
              {!isDisable && (
                <Button
                  variant="primary"
                  onClick={queryOwner}
                  className="btnClick"
                >
                  Query
                </Button>
              )}
              <p className="result">{ownerResult}</p>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2" className="accordionItemNext">
          <Accordion.Header className="customAccordition">
            TokenURI
          </Accordion.Header>
          <Accordion.Body>
            <div className="contractunit">
              <>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="tokenId(unit256)"
                    aria-label="id(unit256)"
                    aria-describedby="basic-addon1"
                    onChange={uriIdOnChange}
                  />
                </InputGroup>
              </>
              {isDisable && (
                <Button
                  variant="primary"
                  onClick={queryUri}
                  disabled
                  className="btnClick"
                >
                  Query
                </Button>
              )}
              {!isDisable && (
                <Button
                  variant="primary"
                  onClick={queryUri}
                  className="btnClick"
                >
                  Query
                </Button>
              )}
              <p className="result">{uriResult}</p>
              {/* <div>{uriSection}</div> */}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <h1 className="panelTitle">Contract</h1>
      <Accordion className="Accordion">
        <Accordion.Item eventKey="0" className="accordionItem">
          <Accordion.Header className="customAccordition">
            Burn
          </Accordion.Header>
          <Accordion.Body>
            <div className="contractunit">
              <>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="tokenId(uint256)"
                    aria-label="id(uint256)"
                    aria-describedby="basic-addon1"
                    onChange={burnIdOnChange}
                  />
                </InputGroup>
              </>
              {isConnected && !isDisable && (
                <Button
                  variant="primary"
                  onClick={burnToken}
                  className="btnClick"
                >
                  burn
                </Button>
              )}
              {!isConnected && (
                <Alert variant="danger" className="alertClass .alert-danger">
                  Please connect your metamask wallet before burning.
                </Alert>
              )}
              {(!isConnected || isDisable) && (
                <Button
                  variant="primary"
                  onClick={burnToken}
                  disabled
                  className="btnClick"
                >
                  burn
                </Button>
              )}
              <p className="result">{burnResult}</p>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1" className="accordionItemNext">
          <Accordion.Header className="customAccordition">
            TransferFrom
          </Accordion.Header>
          <Accordion.Body>
            <div className="contractunit">
              <>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="from(address)"
                    aria-label="<input>(uint256)"
                    aria-describedby="basic-addon1"
                    onChange={transferFromOnChange}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="to(address)"
                    aria-label="<input>(uint256)"
                    aria-describedby="basic-addon1"
                    onChange={transferToOnChange}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="id(uint256)"
                    aria-label="<input>(uint256)"
                    aria-describedby="basic-addon1"
                    onChange={transferIdOnChange}
                  />
                </InputGroup>
              </>
              {isConnected && !isDisable && (
                <Button
                  variant="primary"
                  onClick={transferToken}
                  className="btnClick"
                >
                  transfer
                </Button>
              )}
              {!isConnected && (
                <Alert variant="danger" className="alertClass .alert-danger">
                  Please connect your metamask wallet before transferring.
                </Alert>
              )}
              {(!isConnected || isDisable) && (
                <Button
                  variant="primary"
                  onClick={transferToken}
                  disabled
                  className="btnClick"
                >
                  transfer
                </Button>
              )}
              <p className="result">{transferResult}</p>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

Panel_ERC721.propTypes = {
  contractInstance: PropTypes.object.isRequired,
  userAddress: PropTypes.string,
  isConnected: PropTypes.bool,
  isDisable: PropTypes.bool,
};
export default Panel_ERC721;
