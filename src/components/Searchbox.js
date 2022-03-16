import React, {useState} from 'react';
import "./styleSearchbox.css"

const Searchbox = (props) => {

    /* States */
    const [warnText, setWarnText] = useState('');

    /* Functions */
    // to see whether it is a valid contract
    // 之後會改成 contract 是否合法的 API，這邊測試是「test123」為合法
    let contractValid = (addr) => {  
        if(addr === "test123" || addr === "") return true;
        else return false;
    }

    let searchAction = (event) => {
        let val = contractValid(event.target.value);

        if(event.target.value === "") {
            setWarnText(warnText => "");
            props.searchChange(event);

            let box = document.querySelector('.searchBoxClass');
            box.style = "color: black";
        } else if (val) {
            setWarnText(warnText => "");
            props.searchChange(event);

            let box = document.querySelector('.searchBoxClass');
            box.style = "color: black";
        } else {
            setWarnText(warnText => "This is not a valid contract address");
            props.searchChange(event);

            let box = document.querySelector('.searchBoxClass');
            box.style = "color: rgb(255, 93, 81)";
        }
    }

    /* Render Function */
    return (
    <div className='divClass-search'>
        <input 
            type="search"
            placeholder="Contract address"
            onChange = {searchAction}
            className="searchBoxClass"
        />
        <div className="warnClass">{warnText}</div>
    </div>
  );
}

export default Searchbox;