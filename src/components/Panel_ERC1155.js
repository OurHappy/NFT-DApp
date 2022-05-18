import React, { useState } from "react";
import {
  InputGroup,
  FormControl,
  Accordion,
  Button,
  Alert,
} from "react-bootstrap";
import { balanceOf, totalSupply, burn, transfer, uri } from "../utils/contract";
import PropTypes from "prop-types";

const Panel_ERC1155 = ({
  contractInstance,
  userAddress,
  isConnected,
  isDisable,
}) => {
  const [balanceAccount, setBalanceAccount] = useState(null);
  const [balanceId, setBalanceid] = useState(null);
  const [supplyId, setSupplyId] = useState(null);
  const [uriId, setUriId] = useState(null);
  const [uriResult, setUriResult] = useState();
 
  const [transferFrom, setTransferFrom] = useState();
  const [transferTo, setTransferTo] = useState();
  const [transferId, setTransferId] = useState();
  const [transferAmount, setTransferAmount] = useState();
  const [transferData, setTransderData] = useState();
  const [supplyResult, setSupplyResult] = useState("unit256");
  const [balanceResult, setBalanceResult] = useState("unit256");
  const [burnResult, setBurnresult] = useState("result");
  const [burnAccount, setBurnAccount] = useState("unit256");
  const [burnId, setBurnId] = useState("uint256");
  const [burnAmount, setBurnAmount] = useState("uint256");
  const [transferResult, setTransferResult] = useState("result");

  const balanceAccountOnChange = (e) => {
    setBalanceAccount(e.target.value);
  };

  const balanceIdOnChange = (e) => {
    setBalanceid(e.target.value);
  };

  const supplyIdOnChange = (e) => {
    setSupplyId(e.target.value);
  };

  const uriIdOnChange = (e) => {
    setUriId(e.target.value);
  };

  const burnAccountOnChange = (e) => {
    setBurnAccount(e.target.value);
  };

  const burnIdOnChange = (e) => {
    setBurnId(e.target.value);
  };

  const burnAmountOnChange = (e) => {
    setBurnAmount(e.target.value);
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

  const transferAmountOnChange = (e) => {
    setTransferAmount(e.target.value);
  };

  const transferDataOnChange = (e) => {
    setTransderData(e.target.value);
  };

  const querySupply = () => {
    let result = totalSupply(contractInstance, supplyId);
    result.then((msg) => setSupplyResult(msg));
  };

  const queryBalance = () => {
    let result = balanceOf(contractInstance, balanceAccount, balanceId);
    result.then((msg) => setBalanceResult(msg));
  };

  const queryUri = () => {
    let result = uri(contractInstance, uriId);
    result.then((msg) => setUriResult(msg));
    console.log(contractInstance);
  };

  const burnToken = () => {
    let result = burn(
      contractInstance,
      burnAccount,
      burnId,
      burnAmount,
      userAddress
    );
    result.then((msg) => setBurnresult(msg.transactionHash));
    result.catch(setBurnresult("transaction rejected"));
  };

  const transferToken = () => {
    let result = transfer(
      contractInstance,
      transferFrom,
      transferTo,
      transferId,
      transferAmount,
      transferData,
      userAddress
    );
    result.then((msg) => setTransferResult(msg.transactionHash));
    result.catch(setTransferResult("transaction rejected"));
  };

  return (
    <div className="contractpanel">
      <h1 className="panelTitle">Action</h1>
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
                    placeholder="account(address)"
                    aria-label="account(address)"
                    aria-describedby="basic-addon1"
                    onChange={burnAccountOnChange}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="id(uint256)"
                    aria-label="id(uint256)"
                    aria-describedby="basic-addon1"
                    onChange={burnIdOnChange}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="valeu(uint256)"
                    aria-label="value(uint256)"
                    aria-describedby="basic-addon1"
                    onChange={burnAmountOnChange}
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
                <Alert variant="danger" className="alertClass alert-danger">
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
            Transfer
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
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="amount(uint256)"
                    aria-label="<input>(uint256)"
                    aria-describedby="basic-addon1"
                    onChange={transferAmountOnChange}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="data(bytes)"
                    aria-label="<input>(uint256)"
                    aria-describedby="basic-addon1"
                    onChange={transferDataOnChange}
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
                <Alert variant="danger" className="alertClass">
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

      <h1 className="panelTitle">Contract</h1>
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
                    placeholder="Account(address)"
                    aria-label="Account"
                    aria-describedby="basic-addon1"
                    onChange={balanceAccountOnChange}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="id(unit256)"
                    aria-label="id(unit256)"
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
            TotalSupply
          </Accordion.Header>
          <Accordion.Body>
            <div className="contractunit">
              <>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="id(unit256)"
                    aria-label="id(unit256)"
                    aria-describedby="basic-addon1"
                    onChange={supplyIdOnChange}
                  />
                </InputGroup>
              </>
              {isDisable && (
                <Button
                  variant="primary"
                  onClick={querySupply}
                  disabled
                  className="btnClick"
                >
                  Query
                </Button>
              )}
              {!isDisable && (
                <Button
                  variant="primary"
                  onClick={querySupply}
                  className="btnClick"
                >
                  Query
                </Button>
              )}
              <p className="result">{supplyResult}</p>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2" className="accordionItemNext">
          <Accordion.Header className="customAccordition">Uri</Accordion.Header>
          <Accordion.Body>
            <div className="contractunit">
              <>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="<input>(uint256)"
                    aria-label="<input>(uint256)"
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
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

Panel_ERC1155.propTypes = {
  contractInstance: PropTypes.object.isRequired,
  userAddress: PropTypes.string,
  isConnected: PropTypes.bool,
  isDisable: PropTypes.bool,
};

export default Panel_ERC1155;
