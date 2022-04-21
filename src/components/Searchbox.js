import React, { useState } from "react";
import PropTypes from "prop-types";
import { isContractAddress } from "../utils/web3Client";
import { FormControl } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Searchbox = (props) => {
  let navigate = useNavigate();
  /* States */
  const [warnText, setWarnText] = useState("");

  /* Functions */
  // to see whether it is a valid contract
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
      props.searchChange(inputVal);
      navigate(`contract/${inputVal}`);
    } else {
      setWarnText("This is not a valid contract address");
    }
  };

  /* Render Function */
  return (
    <div className="divClass-search">
      <div>
        <InputGroup className="mb-3 searchbar">
          <FormControl
            placeholder="Contract Address"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onKeyPress={handleKeyPress}
            onChange={resetStates}
            className={`searchBoxClass ${warnText ? "invalid" : ""}`}
          />
        </InputGroup>
        <div className="warnClass">{warnText}</div>
      </div>
    </div>
  );
};

Searchbox.propTypes = {
  searchChange: PropTypes.func,
};

export default Searchbox;
