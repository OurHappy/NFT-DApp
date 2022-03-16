import React, { useState } from 'react';
import Token from './Token';
// import { Icon, message } from 'antd';
import CopyOutlined from '@ant-design/icons/CopyOutlined';
import './styleContract.css'

const ContractPanel = ({contractAddress}) => {
    /* States */
    /* The followings are the states which need to call API */
    const [contractName, setContractName] = useState("test Name");
    const [contractSymbol, setContractSymbol] = useState("test symbol");
    const [contractOwner, setContractOwner] = useState("test Owner");
    const [exteralName, setExternalName] = useState("");
    const [externalDescipt, setExternalDescript] = useState("");
    const [externalLink, setExternalLink] = useState("External Link");
    
    /* Functions */
    let clickToCopy = () => {
        const copyEle = document.querySelector('.addrText')
        const range = document.createRange();
        window.getSelection().removeAllRanges();
        range.selectNode(copyEle);
        window.getSelection().addRange(range);
        document.execCommand("Copy");
        window.getSelection().removeAllRanges();
    }

    /* Render Function */
    return (
        <div>
            <Token />
            {/* Show the contract and  you can copy it */}
            <div className="divClass">
                <span className="contractText">Contract:</span>
                <span className="addrText">{contractAddress}</span>
                <CopyOutlined onClick={clickToCopy} />
            </div>
            
            {/* Show the contract interaction panel if a valid contract is provided */}
            <div className="container">
                <div className="row">
                    <div className="col contractInfo">
                        <div>
                            Name:  {contractName} <br/>
                            Symbol:  {contractSymbol} <br/>
                            Owner:  <span className="blueText">{contractOwner}</span>
                        </div>
                    </div>
                    <div className="col contractInfo">
                        <div>
                            Name:  {exteralName} <br/>
                            Description:  {externalDescipt} <br/>
                            <span className="blueText">{externalLink}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContractPanel;