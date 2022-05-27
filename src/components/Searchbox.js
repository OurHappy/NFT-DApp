import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import {
  isContractAddress,
  getChain,
  on,
  removeListener,
} from "../utils/web3Client";
import {
  FormControl,
  InputGroup,
  Spinner,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Stack from "react-bootstrap/Stack";

const Searchbox = (props) => {
  /* Variables */
  let navigate = useNavigate();

  /* States */
  const [warnText, setWarnText] = useState("");
  const [chainName, setChainName] = useState("");
  const [state, setState] = useState({});
  const [contractLoading, setContractLoading] = useState(false);
  const [inputContract, setInputContract] = useState(null);
  const [inputId, setInputId] = useState(null);

  useEffect(() => {
    on("chainChanged", showCurrentChain);
    return () => {
      setState({});
    };
  }, []);

  useEffect(() => {
    showCurrentChain();
  }, [chainName]);

  /* Functions */

  async function showCurrentChain() {
    let chainName = await getChain();
    setChainName(chainName);
  }

  // const handleKeyPress = (event) => {
  //   if (event.key === "Enter") searchAction(event);
  // };

  const inputContractOnChange = (e) => {
    setInputContract(e.target.value);
    setWarnText("");
  };

  const inputIdOnChange = (e) => {
    setInputId(e.target.value);
  };

  const handleBtnClick = () => {
    setContractLoading(true);
    const inputVal = inputContract;
    const isValid = contractValid(inputVal);
    setContractLoading(false);

    if (isValid) {
      navigate(`contract/${inputVal}/${inputId}`);
    } else {
      setWarnText("This is not a valid contract address");
    }
  };

  const resetStates = () => {
    setWarnText("");
  };

  const contractValid = (addr) => {
    return isContractAddress(addr);
  };

  const searchAction = (event) => {
    setContractLoading(true);
    const inputVal = event.target.value;
    const isValid = contractValid(inputVal);
    setContractLoading(false);

    if (isValid) {
      navigate(`contract/${inputVal}`);
    } else {
      setWarnText("This is not a valid contract address");
    }
  };

  /* Render Function */
  return (
    <Fragment>
      {/* <div> */}
      {/* <Stack direction="horizontal" className="searchStack"> */}
      <Container className="vh-100  m-0 mainContainer">
        <Row className="vh-100 ">
          <Col className="m-0 p-0">
            <div className="leftcontent ">
              <p>
                Current Chain: <br />
                {props.currentNetwork}
              </p>
            </div>
          </Col>
          <Col className="p-0 m-0">
            <div className="divClass-search">
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Contract Address"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={inputContractOnChange}
                  className={`searchBoxClass ${warnText ? "invalid" : ""}`}
                />
              </InputGroup>
              <InputGroup>
                <FormControl
                  placeholder="Token Id"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={inputIdOnChange}
                  className={`searchBoxClass ${warnText ? "invalid" : ""}`}
                />
              </InputGroup>

              <Button
                variant="outline-dark"
                id="btnSearch"
                onClick={handleBtnClick}
              >
                Search
              </Button>

              <div className="warnClass">{warnText}</div>
            </div>
          </Col>
        </Row>
      </Container>
      {/* </Stack> */}

      <div>
        {contractLoading && (
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
      {/* </div> */}
    </Fragment>
  );
};

Searchbox.propTypes = {
  searchChange: PropTypes.func,
  currentNetwork: PropTypes.string,
};

export default Searchbox;
