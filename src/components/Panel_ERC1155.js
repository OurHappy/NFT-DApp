import React, { useState } from "react";
import {
  InputGroup,
  FormControl,
  Accordion,
  Button,
} from "react-bootstrap";
import { balanceOf, totalSupply } from "../utils/contract";
import PropTypes from "prop-types";

const Panel_ERC1155 = ({ contractInstance }) => {
  const [balanceAccount, setBalanceAccount] = useState(null);
  const [balanceId, setBalanceid] = useState(null);
  const [supplyId, setSupplyId] = useState(null);
  const [uriId, setUriId] = useState(null);
  const [supplyResult, setSupplyResult] = useState("unit256");
  const [balanceResult, setBalanceResult] = useState("unit256");

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

  const querySupply = () => {
    let result = totalSupply(contractInstance, supplyId);
    result.then((msg) => setSupplyResult(msg));
  };

  const queryBalance = () => {
    let result = balanceOf(contractInstance, balanceAccount, balanceId);
    result.then((msg) => setBalanceResult(msg));
  };

  const queryUri = () => {
    //get token uri
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
              <Button variant="primary" onClick={queryBalance}>
                Query
              </Button>{" "}
              <p className="result">{balanceResult}</p>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>totalSupply</Accordion.Header>
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
              <Button variant="primary" onClick={querySupply}>
                Query
              </Button>{" "}
              <p className="result">{supplyResult}</p>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>uri</Accordion.Header>
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
              <Button variant="primary" onClick={queryUri}>
                Query
              </Button>{" "}
              <p className="result">{supplyResult}</p>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

Panel_ERC1155.propTypes = {
  contractInstance: PropTypes.object.isRequired,
};

export default Panel_ERC1155;
