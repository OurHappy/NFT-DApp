import "./App.css";
import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Searchbox from "./components/Searchbox";
import ContractPanel from "./components/ContractPanel";
import "./styles/style.css";

import { init } from "./utils/web3Client";
import { getProvider } from "./utils/provider";
import Defaultpage from "./components/Defaultpage";
import Panel_ERC1155 from "./components/Panel_ERC1155";
import Token from "./components/Token";

function App() {
  /* Variables */

  /* States */
  const [appState, setAppState] = useState("initializing");
  const [isContract, setIsContract] = useState(0);
  const [address, setAddress] = useState("test");
  const [providerExist, setProviderExist] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [initAtAppjs, setInitAtAppjs] = useState(false);
  const [isConnect, setIsConnect] = useState(false);
  const [contractInstance, setContractInstance] = useState(null);

  useEffect(() => {
    initApp();
  }, []);

  /* Functions */
  async function initApp() {
    const provider = await getProvider();
    if (provider) {
      console.log("get a provider at App.js");
      setInitAtAppjs(true);
      const initialized = init(provider);
      setProviderExist(true);

      if (initialized) {
        setAppState("ready");
        console.log("inited web3 at App.js");

        return;
      }
    } else if (provider === null) {
      setProviderExist(false);
    }
    setAppState("no_provider");
  }

  const onSearchChange = (addr) => {
    setIsContract(true);
    setAddress(addr);
  };

  const clickMenuAction = () => {
    setIsContract(0);
  };

  const accountAction = (accountAddr) => {
    setAccount(accountAddr);
  };

  /* Render Function */
  return (
    <Router>
      <Fragment>
        <div className="App">
          <Navbar
            clickChange={clickMenuAction}
            setUserAddress={setUserAddress}
            isConnect={isConnect}
            setIsConnect={setIsConnect}
          />

          <Routes>
            {providerExist && (
              <Route
                path="/"
                element={<Searchbox searchChange={onSearchChange} />}
              />
            )}
            <Route
              path="contract/:address"
              element={
                <Fragment>
                  <Token
                    contractAddress={address}
                    accountAddress={userAddress}
                    isConnect={isConnect}
                    contractInstance={contractInstance}
                    setContractInstance={setContractInstance}
                  />
                  <ContractPanel
                    contractAddress={address}
                    setContractAddress={setAddress}
                    userAddress={userAddress}
                    initAtAppjs={initAtAppjs}
                    contractInstance={contractInstance}
                    setContractInstance={setContractInstance}
                  />
                </Fragment>
              }
            ></Route>

            <Route
              path="contract/:address/:tokenid"
              element={
                <Fragment>
                  <Token
                    contractAddress={address}
                    accountAddress={userAddress}
                    isConnect={isConnect}
                    contractInstance={contractInstance}
                    setContractInstance={setContractInstance}
                  />
                  <ContractPanel
                    contractAddress={address}
                    setContractAddress={setAddress}
                    userAddress={userAddress}
                    initAtAppjs={initAtAppjs}
                    setContractInstance={setContractInstance}
                    contractInstance={contractInstance}
                  />
                </Fragment>
              }
            ></Route>

            {!providerExist && <Route path="/" element={<Defaultpage />} />}
          </Routes>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
