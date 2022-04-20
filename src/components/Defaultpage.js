import React from "react";
import { Alert } from "react-bootstrap";

const Defaultpage = () => {
  return (
    <div>
      <Alert variant="danger">
        <Alert.Heading>Unable to detect ethereum provider</Alert.Heading>
        <p>
          Chick the link below to install metamask extension to broswer.
          <br />
          <a
            href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
            target="_blank"
            rel="noreferrer"
          >
            install MetaMask (chrome extension)
          </a>
        </p>
      </Alert>
    </div>
  );
};

export default Defaultpage;
