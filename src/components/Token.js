import React, { useEffect, useState } from "react";
import { getTokenMeta } from "../utils/contract";
import { makeContract } from "../utils/web3Client";
import { FormControl } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import { balanceOf721 } from "../utils/contract";
import { balanceOf, totalSupply } from "../utils/contract";
import { useNavigate } from "react-router";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { init } from "../utils/web3Client";

const Token = (props) => {
  /* Variables */
  const contractAddress = props.contractAddress;
  const accountAddress = props.accountAddress;
  let contractType, contractInstance;
  let tokenMeta = null;
  let navigate = useNavigate();
  let params = useParams();

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
  const [isImg, setIsImg] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [initToken, setInitToken] = useState(false);

  const [testLogic, setTestLogic] = useState();

  useEffect(() => {
    if (params.tokenid !== undefined) {
      uriSearchToken(params.tokenid);
    }
  }, [props.contractInstance]);
  /* Functions */

  const resetStates = () => {
    setShowToken(0);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") searchToken(event);
  };
  // build token meta data
  let showTokenMeta = async (tokenMeta, tokenId) => {
    const defaultType = ["id", "name", "description", "external_url", "image"];

    let tokenObject;
    if (tokenMeta["data"]) tokenObject = tokenMeta["data"];
    else tokenObject = tokenMeta;

    for (let [key, value] of Object.entries(tokenObject)) {
      if (defaultType.includes(key)) {
        if (key === "name") setName(value);
        else if (key === "description") setDescription(value);
        else if (key === "external_url") setExLink(value);
        else if (key === "image") {
          setImg(value.replace("ipfs://", "https://ipfs.io/ipfs/"));
          setIsImg(true);

          let ext = value.substr(value.lastIndexOf(".") + 1);
          if (ext === "mp4" || ext === "webm") {
            setIsVideo(true);
            setIsImg(false);
          }
        }
      } else {
        // setMeta(...value);
      }
    }

    if (contractType === "ERC1155") {
      let supplyResult = totalSupply(props.contractInstance, tokenId);
      supplyResult.then((msg) => setSupply(msg));

      if (props.isConnect) {
        let ownResult = balanceOf(
          props.contractInstance,
          accountAddress,
          tokenId
        );
        ownResult.then((msg) => setOwn(msg));
      } else {
        setOwn("Please connect the Metamask to check balance");
      }

      // only 1155 can see the token's total supply
      setIs1155(true);
    } else if (contractType === "ERC721") {
      if (props.isConnect) {
        let ownResult = balanceOf721(props.contractInstance, accountAddress);
        ownResult.then((msg) => setOwn(msg));
      } else {
        setOwn("Please connect the Metamask to check balance");
      }
    }
  };

  // to see whether it is a valid token
  let tokenValid = async (ID) => {
    if (props.contractInstance == null && props.contractAddress !== "test") {
      init();
      console.log("null instance!");
      let { contractInterface, contract } = await makeContract(contractAddress);
      contractType = contractInterface;
      props.setContractInstance(contract);
      console.log("contractInstance at uri", contractInstance);
    } else {
      console.log("already gave contractInstnace");
    }

    if (
      props.contractInstance !== null &&
      props.contractInstance !== undefined
    ) {
      console.log("double");
      tokenMeta = await getTokenMeta(props.contractInstance, ID);

      if (tokenMeta === null) {
        console.log("Fail to catch token meta data...");
        return false;
      } else {
        showTokenMeta(tokenMeta, ID);
        console.log("successfully get token meta!");
        return true;
      }
    }
  };

  let uriSearchToken = async (tokenid) => {
    console.log("searching uri ");
    if (props.contractInstance !== undefined) {
      let val = await tokenValid(tokenid);

      if (val) {
        console.log("inside val");
        setShowToken(1);
      }
    }
  };

  let searchToken = async (event) => {
    let val = await tokenValid(event.target.value);
    if (val) {
      setShowToken(1);
      navigate(`${event.target.value}`);
    } else {
      setShowToken(0);
    }
  };

  /* Render functions */
  return (
    <div className="divClass">
      <div>
        <span className="tokenText">Token:</span>
        {showToken === 0 && (
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
        )}
      </div>

      {/* if token exists, show the token */}
      <div>
        {showToken === 1 && (
          <Container>
            <Row>
              <Col md={6}>
                {isImg && <img src={img} className="tokenImg"></img>}
                {isVideo && (
                  <video controls className="tokenImg">
                    <source src={img} type="video/mp4"></source>
                  </video>
                )}
              </Col>
              <Col md={6}>
                <div className="tokenInfo">
                  Name: {name} <br />
                  Description: {description} <br />
                  <br />
                  External Link: {exLink} <br />
                  {/* Other meta: {meta} <br /> */}
                  <br />
                  {is1155 && <p>Total Supply: {supply}</p>}
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
  contractAddress: PropTypes.string.isRequired,
  accountAddress: PropTypes.string.isRequired,
  isConnect: PropTypes.bool,
  contractInstance: PropTypes.object,
  setContractInstance: PropTypes.func,
};

export default Token;
