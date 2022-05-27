import React from "react";
import { Alert } from "react-bootstrap";

const Defaultpage = () => {
  return (
    <div className="defaultPage">
      <div className="errorTitle">
        Unable to detect Ethereum provider
      </div>
      <div className="errorText">
        Chick the link below to install MetaMask extension to broswer.
        <br />
        <a
          href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
          target="_blank"
          rel="noreferrer"
        >
          Install MetaMask (chrome extension)
        </a>
      </div>
    </div>
  );
};

export default Defaultpage;
