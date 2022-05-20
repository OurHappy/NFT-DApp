import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  FormControl,
  InputGroup,
  Spinner,
  Card,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router";
import PropTypes from "prop-types";
import {
  balanceOf721,
  getTokenMeta,
  balanceOf,
  totalSupply,
  isERC1155,
  isERC721,
} from "../utils/contract";
import { makeContract } from "../utils/web3Client";
import UserWallet from "../context/userWallet";
import LinkOutlined from "@ant-design/icons/LinkOutlined";

const Token = (props) => {
  /* Variables */
  const { contractAddress, tokenId, isDisable, passImage } = props;

  const userWallet = useContext(UserWallet);
  const currentNetwork = userWallet.network;
  const accountAddress = userWallet.address;
  const isConnect = userWallet.isConnected();
  const chainName = userWallet.network;

  let contractType;
  let tokenMeta = null;
  let navigate = useNavigate();
  let params = useParams();

  /* States */
  const [showToken, setShowToken] = useState(0);
  /* The followings are the states which need to call API */
  const [name, setName] = useState("None");
  const [description, setDescription] = useState("None");
  const [exLink, setExLink] = useState("None");
  const [supply, setSupply] = useState(0);
  const [own, setOwn] = useState(0);
  const [img, setImg] = useState("");
  const [is1155, setIs1155] = useState(false);
  const [isImg, setIsImg] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [loadToken, setLoadToken] = useState(false);
  const [contractInstance, setContractInstance] = useState(null);
  const [tokenLoading, setTokenLoading] = useState(false);
  const [standard, setStandard] = useState("");

  useEffect(() => {
    if (contractAddress && tokenId) {
      uriSearchToken(tokenId);
    }
  }, [contractAddress, tokenId]);
  /* Functions */

  useEffect(() => {
    if (isConnect) {
      let ownResult = balanceOf(contractInstance, accountAddress, tokenId);
      ownResult.then((msg) => setOwn(msg));
    }
  }, [isConnect]);

  const resetStates = () => {
    setShowToken(0);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchToken(event);
    }
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
          // Since base64 image can be shown directly, no need to decode base64 for image
          setImg(value.replace("ipfs://", "https://ipfs.io/ipfs/"));
          passImage(value.replace("ipfs://", "https://ipfs.io/ipfs/"));
          setIsImg(true);

          let ext = value.substr(value.lastIndexOf(".") + 1);
          if (ext === "mp4" || ext === "webm") {
            setIsVideo(true);
            setIsImg(false);
          }
        }
        // check standard type
        let result = await makeContract(contractAddress);
        setStandard(result.contractInterface);
        setContractInstance(result.contract);
        if (result.contractInterface === "ERC1155") {
          let supplyResult = totalSupply(result.contract, tokenId);
          supplyResult.then((msg) => setSupply(msg));
        }

        if (isConnect) {
          console.log("connected!");
          let ownResult = balanceOf(result.contract, accountAddress, tokenId);
          ownResult.then((msg) => setOwn(msg));
        }
      } else {
        // setMeta(...value);
      }
    }

    if (standard === "ERC1155") {
      console.log("1155");
      let supplyResult = totalSupply(contractInstance, tokenId);
      supplyResult.then((msg) => console.log("supply=", msg));

      if (isConnect) {
        let ownResult = balanceOf(contractInstance, accountAddress, tokenId);
        ownResult.then((msg) => setOwn(msg));
      } else {
        setOwn("Please connect the Metamask to check balance");
      }

      // only 1155 can see the token's total supply
      setIs1155(true);
    } else if (standard === "ERC721") {
      if (isConnect) {
        let ownResult = balanceOf721(contractInstance, accountAddress);
        ownResult.then((msg) => setOwn(msg));
      } else {
        setOwn("Please connect the Metamask to check balance");
      }
    }
  };

  let uriTokenValid = async (ID) => {
    let result = await makeContract(contractAddress);

    if (result.contract !== null && loadToken === false) {
      let tokenMeta = await getTokenMeta(result.contract, ID);

      if (tokenMeta === null) {
        return false;
      } else {
        showTokenMeta(tokenMeta, ID);
        setLoadToken(true);
        return true;
      }
    } else {
      return false;
    }
  };

  let getContract = async () => {
    if (contractInstance) return contractInstance;
    else if (contractAddress !== "") {
      let { contract } = await makeContract(contractAddress);
      setContractInstance(contract);
      return contract;
    } else {
      return null;
    }
  };

  // to see whether it is a valid token
  let tokenValid = async (ID) => {
    let contract = await getContract();

    if (contract !== null) {
      tokenMeta = await getTokenMeta(contract, ID);

      if (tokenMeta === null) {
        return false;
      } else {
        showTokenMeta(tokenMeta, ID);
        setLoadToken(true);
        return true;
      }
    }
  };

  let uriSearchToken = async (tokenid) => {
    if (contractInstance === null) {
      let val = await uriTokenValid(tokenid);

      if (val) {
        setShowToken(1);
      }
    }
  };

  let searchToken = async (event) => {
    setTokenLoading(true);
    let val = await tokenValid(event.target.value);
    setTokenLoading(false);
    if (val) {
      setShowToken(1);
      props.setTokenId(event.target.value);
      navigate(`${event.target.value}`);
    } else {
      setShowToken(0);
    }
  };

  function renderScanLink() {
    let link = "";
    switch (currentNetwork) {
      case "Ethereum Mainnet":
        link = (
          <a
            href={"https://etherscan.io/address/" + contractAddress}
            target="_blank"
            rel="noreferrer"
            className="viewLink"
          >
            View on Etherscan<LinkOutlined></LinkOutlined>
          </a>
        );
        break;
      case "Rinkeby Testnet":
        link = (
          <a
            href={"https://rinkeby.etherscan.io/address/" + contractAddress}
            target="_blank"
            rel="noreferrer"
            className="viewLink"
          >
            View on Etherscan <LinkOutlined className="linkIcon"></LinkOutlined>
          </a>
        );
        break;
      case "Ropsten Testnet":
        link = (
          <a
            href={"https://ropsten.etherscan.io/address/" + contractAddress}
            target="_blank"
            rel="noreferrer"
            className="viewLink"
          >
            Original data
          </a>
        );
        break;
      case "ThunderCore Mainnet":
        link = (
          <a
            href={"https://scan.thundercore.com/address/" + contractAddress}
            target="_blank"
            rel="noreferrer"
            className="viewLink"
          >
            View on Thundercore Scan
          </a>
        );
        break;
      case "ThunderCore Testnet":
        link = (
          <a
            href={
              "https://scan-testnet.thundercore.com/address/" + contractAddress
            }
            target="_blank"
            rel="noreferrer"
            className="viewLink"
          >
            View on Thundercore Scan
          </a>
        );
        break;

      case "Smart Chain Mainnet":
        link = (
          <a
            href={"https://bscscan.com/address/" + contractAddress}
            target="_blank"
            rel="noreferrer"
            className="viewLink"
          >
            View on BSC Scan
          </a>
        );
        break;
      case "Smart Chain Testnet":
        link = (
          <a
            href={"https://testnet.bscscan.com/address/" + contractAddress}
            target="_blank"
            rel="noreferrer"
            className="viewLink"
          >
            View on BSC Scan
          </a>
        );
        break;
      case "Polygon":
        link = (
          <a
            href={"https://polygonscan.com/address/" + contractAddress}
            target="_blank"
            rel="noreferrer"
            className="viewLink"
          >
            View on Polyscan
          </a>
        );
        break;
      case "Polygon Testnet":
        link = (
          <a
            href={"https://mumbai.polygonscan.com/address" + contractAddress}
            target="_blank"
            rel="noreferrer"
            className="viewLink"
          >
            View on Polyscan
          </a>
        );
        break;
      default:
        link = null;
        break;
    }
    // console.log("Network:", currentNetwork, link);
    return link;
  }
  /* Render functions */
  return (
    <div className="divClass">
      <div>
        {isDisable && (
          <div>
            You have changed your chain, please return to the home page to
            search again.
          </div>
        )}
      </div>
      <div>
        {showToken === 0 && isDisable === false && (
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

      <div>
        {tokenLoading && (
          <Container>
            <Row>
              <Col md={{ offset: 6 }}>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </Col>
            </Row>
          </Container>
        )}
      </div>

      <div>
        {showToken === 1 && (
          <Container>
            <Row>
              <Col md={4} className="leftTokenSection">
                {isImg && (
                  <div className="imgBox">
                    <img src={img} className="contractImg"></img>
                  </div>
                )}
                {isVideo && (
                  <video controls className="tokenImg">
                    <source src={img} type="video/mp4"></source>
                  </video>
                )}
              </Col>
              <Col md={7}>
                <div className="tokenInfo">
                  <div className="nameSection">{name}</div>
                  <br />
                  <div className="desSection">
                    {description === null ? description : "No description"}
                  </div>
                  <br />
                  {/* External Link: {exLink} <br /> */}
                  <div className="cardsSection">
                    <Container>
                      <Row>
                        <Col>
                          <Card className="tokenCard">
                            <Card.Body className="tokenBody">
                              <Card.Title className="cardTitle">
                                Blockchain
                              </Card.Title>
                              <hr className="tokenHr" />
                              <Card.Text className="cardText">
                                {chainName}
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col>
                          <Card className="tokenCard">
                            <Card.Body className="tokenBody">
                              <Card.Title className="cardTitle">
                                Standard
                              </Card.Title>
                              <hr className="tokenHr" />

                              <Card.Text className="cardText">
                                {standard}
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col>
                          <Card className="tokenCard">
                            <Card.Body className="tokenBody">
                              <Card.Title className="cardTitle">
                                Token Id
                              </Card.Title>
                              <hr className="tokenHr" />

                              <Card.Text className="cardText">
                                {tokenId}
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          {standard == "ERC1155" && (
                            <Card className="tokenCard">
                              <Card.Body className="tokenBody">
                                <Card.Title className="cardTitle">
                                  Total Supply
                                </Card.Title>
                                <hr className="tokenHr" />

                                <Card.Text className="cardText">
                                  {supply}
                                </Card.Text>
                              </Card.Body>
                            </Card>
                          )}
                        </Col>
                        <Col>
                          {isConnect && (
                            <Card className="tokenCard">
                              <Card.Body className="tokenBody">
                                <Card.Title className="cardTitle">
                                  You Owned
                                </Card.Title>
                                <hr className="tokenHr" />

                                <Card.Text className="cardText">
                                  {own}
                                </Card.Text>
                              </Card.Body>
                            </Card>
                          )}
                        </Col>
                        <Col></Col>
                      </Row>
                    </Container>
                  </div>
                  <div className="scanLink"> {renderScanLink()}</div>
                  <br />
                  {/* Other meta: {meta} <br /> */}
                  <br />
                  <br />
                  {/* {is1155 && <p>Total Supply: {supply}</p>}
                  You owned: {own} */}
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
  contractAddress: PropTypes.string,
  tokenId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isDisable: PropTypes.bool,
  setTokenId: PropTypes.func,
  passImage: PropTypes.func,
};

export default Token;
