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

function App() {
  /* States */
  const [appState, setAppState] = useState("initializing");
  const [isContract, setIsContract] = useState(0);
  const [address, setAddress] = useState("test");
  const [providerExist, setProviderExist] = useState(false);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    initApp();
  }, []);

  /* Functions */
  async function initApp() {
    const provider = await getProvider();
    if (provider) {
      const initialized = init(provider);
      setProviderExist(true);
      if (initialized) {
        setAppState("ready");
        return;
      }
    } else if (provider === null) {
      setProviderExist(false);
    }
    setAppState("no_provider");
  }

  const onSearchChange = (addr) => {
    setIsContract(1);
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
          <Navbar clickChange={clickMenuAction} accountChange={accountAction} />

          <Routes>
            {isContract === 0 && providerExist && (
              <Route
                exact
                path="/"
                element={<Searchbox searchChange={onSearchChange} />}
              />
            )}
            {isContract && (
              <Route
                exact
                path="/"
                element={<ContractPanel contractAddress={address} accountAddress={account}/>}
              />
            )}
            {!providerExist && (
              <Route exact path="/" element={<Defaultpage />} />
            )}
          </Routes>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
