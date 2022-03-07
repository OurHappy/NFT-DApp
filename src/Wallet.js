import React, {useState} from 'react';
import './style.css';

const Wallet = () => {
    const [networkId, setNetworkId] = useState(0);
    const [address, setAddress] = useState("None");
    const [networkName, setNetworkName] = useState("None");
    const [balance, setBalance] = useState(0);
    const [status, setStatus] = useState("Unconnect");

    // provider
    const Web3 = require('web3');
    const web3 = new Web3(Web3.givenProvider || "http://localhost:3000");

    // after clicking the button, run ConnectAction
    let ConnectAction = () => {
        // get the address, need to use 'requestAccounts' instead of 'getAccounts'
        web3.eth.requestAccounts(function (err, addr) {
            setAddress(address => addr[0]);
            web3.eth.getBalance(addr[0], (err, bal) => {
                let number = Math.round(web3.utils.fromWei(bal, 'ether') * 1000) / 1000;
                setBalance(balance => number);
            });
        });

        // get the network ID and name, and set the status
        web3.eth.net.getId(function (err, ID) {
            setNetworkId(networkId => ID);
            if(ID == 1) setNetworkName(networkName => "Mainnet");
            else if(ID == 4) setNetworkName(networkName => "Rinkeby Testnet");
            else if(ID == 18) setNetworkName(networkName => "Thundercore Testnet");
            else return "";

            if(ID != 0) setStatus("Connected");
        });
    }

    return (
        <div className="bw2">
            <button type="button" className="btn btn-light grow" onClick={ConnectAction}>CONNECT</button>
            <div className="light-yellow pv2">
                Status: {status}
            </div>
            <div className="text-class pv3">
                Network: {networkName} <br></br>
                Address: {address} <br></br>
                Balance: {balance}
            </div>
        </div>
    );   
}

export default Wallet;