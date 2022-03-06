import React, {useState} from 'react';
import './style.css';

const Wallet = () => {
    const [networkId, setNetworkId] = useState(0);
    const [address, setAddress] = useState("None");
    const [networkName, setNetworkName] = useState("None");
    //const [balance, setBalance] = useState(0.0);
    const [status, setStatus] = useState("Unconnect");

    // provider
    const Web3 = require('web3');
    const web3 = new Web3(Web3.givenProvider || "http://localhost:3000");
    
    // get the network name by the ID
    let getNetworkName = (ID) => {
        if(ID == 1) return "Mainnet";
        else if(ID == 4) return "Rinkeby Testnet";
        else if(ID == 18) return "Thundercore Testnet";
        else return "";
    }

    // after clicking the button, run ConnectAction
    let ConnectAction = () => {
        // get the address, need to use 'requestAccounts' instead of 'getAccounts'
        web3.eth.requestAccounts(function (err, addr) {
            setAddress(address => addr);
        });

        // get the network ID and the name
        web3.eth.net.getId(function (err, ID) {
            setNetworkId(networkId => ID);
        });
        setNetworkName(networkName => getNetworkName(networkId));
        
        // // get the balance
        // if(address == "None") setBalance(balance => 0);
        // else {
        //     web3.eth.getBalance(address, (err, bal) => {
        //         let number = Math.round(web3.utils.fromWei(bal, 'ether') * 1000) / 1000;
        //         setBalance(balance => number);
        //     });
        // }

        if(networkId != 0) setStatus("Connected");
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
            </div>
        </div>
    );   
}

export default Wallet;