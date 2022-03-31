import React, { useState } from "react";

import { InputGroup, FormControl, Accordion, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import {
  balanceOf721,
  ownerOf721,
  brun721token,
  transfer721token,
} from "../utils/contract";

const Panel_ERC721 = ({ contractInstance }) => {
  const [uriId, setUriId] = useState(null);
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

  const queryBalance = () => {
    let result = balanceOf721(contractInstance, balanceId);
    result.then((msg) => setBalanceResult(msg));
  };

  const queryOwner = () => {
    let result = ownerOf721(contractInstance, ownerId);
    result.then((msg) => setOwnerResult(msg));
  };

  const burnToken = () => {
    let result = brun721token(contractInstance, burnId);
    result.then((msg) => setBurnResult(msg.transactionHash));
    result.catch(setBurnResult("transaction rejected"));
  };

  const transferToken = () => {
    let result = transfer721token(
      contractInstance,
      transferFrom,
      transferTo,
      transferId
    );
    result.then((msg) => setTransferResult(msg.transactionHash));
    result.catch(setTransferResult("transaction rejected"));
  };

  return (
    <div className="contractpanel">
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>balanceOf</Accordion.Header>
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
              <Button variant="primary" onClick={queryBalance}>
                Query
              </Button>{" "}
              <p className="result">{balanceResult}</p>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>ownerOf</Accordion.Header>
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
              <Button variant="primary" onClick={queryOwner}>
                Query
              </Button>{" "}
              <p className="result">{ownerResult}</p>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>tokenURI</Accordion.Header>
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
              <Button variant="primary" onClick={queryOwner}>
                Query
              </Button>{" "}
              <p className="result">{}</p>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>burn</Accordion.Header>
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
              <Button variant="primary" onClick={burnToken}>
                burn
              </Button>{" "}
              <p className="result">{burnResult}</p>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>transferFrom</Accordion.Header>
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
              <Button variant="primary" onClick={transferToken}>
                transfer
              </Button>{" "}
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
};
export default Panel_ERC721;
