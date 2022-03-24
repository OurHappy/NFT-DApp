import React, { useState } from "react";

import { InputGroup, FormControl, Accordion, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { balanceOf721, ownerOf721 } from "../utils/contract";

const Panel_ERC721 = ({ contractInstance }) => {
  const [uriId, setUriId] = useState(null);
  const [balanceId, setBalanceId] = useState(null);
  const [balanceResult, setBalanceResult] = useState("uint256");
  const [ownerId, setOwnerId] = useState(null);
  const [ownerResult, setOwnerResult] = useState("address");
  const [tokenId,setTokenId]=useState(null);

  console.log(contractInstance);
  const balanceIdOnChange = (e) => {
    setBalanceId(e.target.value);
  };

  const ownerIdOnChange = (e) => {
    setOwnerId(e.target.value);
  };

  const queryBalance = () => {
    let result = balanceOf721(contractInstance, balanceId);
    result.then((msg) => setBalanceResult(msg));
  };

  const queryOwner = () => {
    let result = ownerOf721(contractInstance, ownerId);
    result.then((msg) => setOwnerResult(msg));
  };

  return (
    <div className="contractpanel">
      <h2>721!</h2>
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
              <p className="result">{ownerResult}</p>
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
