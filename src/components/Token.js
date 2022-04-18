import React, { useState } from "react";
import { getTokenMeta } from "../utils/contract";
import { makeContract } from "../utils/web3Client";
import { FormControl } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import { balanceOf721 } from "../utils/contract";
import { balanceOf, totalSupply } from "../utils/contract";
import { Container, Row, Col} from "react-bootstrap";

const Token = (props) => {
  /* Variables */
  const contractAddress = props.contractAddr;
  const accountAddress = props.accountAddr;
  let contractType, contractInstance;
  let tokenMeta = null;

  /* States */
  const [showToken, setShowToken] = useState(0);
  /* The followings are the states which need to call API */
  const [name, setName] = useState("None");
  const [description, setDescription] = useState("None");
  const [exLink, setExLink] = useState("None");
  const [meta, setMeta] = useState("None");
  const [supply, setSupply] = useState(0);
  const [own, setOwn] = useState(0);
  const [img, setImg] = useState("");
  const [is1155, setIs1155] = useState(false);

  /* Functions */
  const handleKeyPress = (event) => {
    if (event.key === "Enter") searchToken(event);
  };

  const resetStates = () => {
    setShowToken(0);
  };

  // build token meta data
  let showTokenMeta = async (tokenMeta, tokenId) => {
    const defaultType = ["id", "name", "description", "external_url", "image"];
    for (let [key, value] of Object.entries(tokenMeta)) {
      if (defaultType.includes(key)) {
        if (key === "name") setName(value);
        else if (key === "description") setDescription(value);
        else if (key === "external_url") setExLink(value);
        else if (key === "image")
          setImg(value.replace("ipfs://", "https://ipfs.io/ipfs/"));
      } else {
        setMeta(...value);
      }
    }

    if (contractType === "ERC1155") {
      let supplyResult = totalSupply(contractInstance, tokenId);
      supplyResult.then((msg) => setSupply(msg));

      let ownResult = balanceOf(contractInstance, accountAddress, tokenId);
      ownResult.then((msg) => setOwn(msg));

      // only 1155 can see the token's total supply
      setIs1155(true);
    } else if (contractType === "ERC721") {
      let ownResult = balanceOf721(contractInstance, accountAddress);
      ownResult.then((msg) => setOwn(msg));
    }
  };

  // to see whether it is a valid token
  let tokenValid = async (ID) => {
    let { contractInterface, contract } = await makeContract(contractAddress);
    contractType = contractInterface;
    contractInstance = contract;

    tokenMeta = await getTokenMeta(contract, ID);
    console.log(tokenMeta);
    if (tokenMeta === null) {
      console.log("Fail to catch token meta data...");
      return false;
    } else {
      showTokenMeta(tokenMeta, ID);
      return true;
    }
  };

  let searchToken = async (event) => {
    let val = await tokenValid(event.target.value);
    if (val) {
      setShowToken(1);
    } else {
      setShowToken(0);
    }
  };

  /* Render functions */
  return (
    <div className="divClass">
      <div>
        <span className="tokenText">Token:</span>

        <div className="token-search">
          <InputGroup className="searchbar">
            <FormControl
              placeholder="Token ID"
              aria-label="Token ID"
              onKeyPress={handleKeyPress}
              onChange={resetStates}
              className="tokenSearchClass"
            />
          </InputGroup>
        </div>
        
      </div>

      {/* if token exists, show the token */}
      <div>
        {showToken === 1 && (
          <Container>
            <Row>
              <Col md={6}>
                <img src={img} className="tokenImg"></img>
              </Col>
              <Col md={6}>
                <div className="tokenInfo">
                  Name: {name} <br />
                  Description: {description} <br />
                  <br />
                  External Link: {exLink} <br />
                  {/* Other meta: {meta} <br /> */}
                  <br />
                  {is1155 && (<p>Total Supply: {supply}</p>)}
                  You owned: {own}
                </div>
              </Col>
            </Row>
          </Container>

        )}
      </div>
    </div>
  );
};

Token.propTypes = {
  contractAddr: PropTypes.string.isRequired,
  accountAddr: PropTypes.string.isRequired,
};

export default Token;
