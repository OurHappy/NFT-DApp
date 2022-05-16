import React, { useState } from "react";
import PropTypes from "prop-types";
import { isContractAddress } from "../utils/web3Client";
import { FormControl, Form } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Stack from "react-bootstrap/Stack";

const Searchbox = (props) => {
  /* Variables */
  let navigate = useNavigate();

  /* States */
  const [warnText, setWarnText] = useState("");

  /* Functions */

  const handleKeyPress = (event) => {
    if (event.key === "Enter") searchAction(event);
  };

  const resetStates = () => {
    setWarnText("");
  };

  const contractValid = (addr) => {
    return isContractAddress(addr);
  };

  const searchAction = (event) => {
    const inputVal = event.target.value;
    const isValid = contractValid(inputVal);

    if (isValid) {
      navigate(`contract/${inputVal}`);
    } else {
      setWarnText("This is not a valid contract address");
    }
  };

  /* Render Function */
  return (
    <Stack direction="horizontal" gap="3" className="searchStack">
      <div className="leftcontent">
        <p>
          <b>
            {" "}
            Current Chain: <br />
            {props.currentNetwork}
          </b>
        </p>
      </div>
      <div className="divClass-search">
        <InputGroup className="mb-3 ">
          <FormControl
            placeholder="Contract Address"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onKeyPress={handleKeyPress}
            onChange={resetStates}
            className={`searchBoxClass ${warnText ? "invalid" : ""}`}
          />
        </InputGroup>
        <InputGroup>
          <FormControl
            placeholder="Token Id"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onKeyPress={handleKeyPress}
            onChange={resetStates}
            className={`searchBoxClass ${warnText ? "invalid" : ""}`}
          />
        </InputGroup>
        <div className="warnClass">{warnText}</div>
      </div>
    </Stack>
  );
};

Searchbox.propTypes = {
  searchChange: PropTypes.func,
  currentNetwork: PropTypes.string,
};

export default Searchbox;
