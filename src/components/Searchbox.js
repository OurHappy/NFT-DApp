import React, { useState } from 'react';
import { isContractAddress } from '../utils/web3Client'
import "./styleSearchbox.css"

const Searchbox = (props) => {

  /* States */
  const [warnText, setWarnText] = useState('');

  /* Functions */
  // to see whether it is a valid contract
  const handleKeyPress = event => {
    if (event.key == 'Enter') searchAction(event);
  }

  const resetStates = () => {
    setWarnText('');
  }

  let contractValid = (addr) => {
    return isContractAddress(addr)
  }

  let searchAction = (event) => {
    const inputVal = event.target.value;
    let isValid = contractValid(inputVal);

    if (isValid) {
      props.searchChange(inputVal);
    } else {
      setWarnText("This is not a valid contract address");
    }
  }

  /* Render Function */
  return (
    <div className='divClass-search'>
      <input
        type="search"
        placeholder="Contract address"
        onKeyPress={handleKeyPress}
        onChange={resetStates}
        className={`searchBoxClass ${warnText ? 'invalid' : ''}`}
      />
      <div className="warnClass">{warnText}</div>
    </div>
  );
}

export default Searchbox;