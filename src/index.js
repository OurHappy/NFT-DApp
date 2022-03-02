import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import WalletInfo from "./components/WalletInfo";
import "./styles/style.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <WalletInfo />
  </React.StrictMode>,
  document.getElementById("root")
);
