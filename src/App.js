import "./App.css";
import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Searchbox from "./components/Searchbox";
import "./styles/style.css";
import LinkOutlined from "@ant-design/icons/LinkOutlined";

import { getChain, init } from "./utils/web3Client";
import { getProvider } from "./utils/provider";
import Defaultpage from "./components/Defaultpage";
import AppState from "./context/appState";
import UserWallet from "./context/userWallet";
import Detail from "./pages/Detail";

function App() {
  /* Variables */

  /* States */
  const [appState, setAppState] = useState("initializing");
  const [userAddress, setUserAddress] = useState("");
  const [providerExist, setProviderExist] = useState(false);
  const [web3Instance, setWeb3Instance] = useState(null);
  const [currentNetwork, setCurrentNetwork] = useState(null);
  const [contractType, setContractType] = useState(null);

  useEffect(() => {
    initApp();
  }, []);

  /* Functions */
  async function initApp() {
    if (web3Instance === null) {
      const provider = await getProvider();
      if (provider) {
        const initialized = init(provider);
        setWeb3Instance(initialized.instance);
        setProviderExist(true);

        if (initialized.result) {
          const network = await getChain();
          setCurrentNetwork(network);
          setAppState("ready");
          return;
        }
      } else if (provider === null) {
        setProviderExist(false);
      }
      setAppState("no_provider");
    }
  }

  function isConnected() {
    return !!userAddress;
  }

  /* Render Function */
  return (
    <AppState.Provider value={appState}>
      <UserWallet.Provider
        value={{
          address: userAddress,
          setAddress: setUserAddress,
          network: currentNetwork,
          setNetwork: setCurrentNetwork,
          isConnected,
        }}
      >
        <Router>
          <Fragment>
            <div className="App">
              <Navbar />

              <Routes>
                <Route
                  path="/"
                  element={
                    providerExist ? (
                      <Searchbox currentNetwork={currentNetwork} />
                    ) : (
                      <Defaultpage />
                    )
                  }
                />
                <Route path="contract/:address" element={<Detail />}>
                  <Route path=":tokenId" element={<Detail />} />
                </Route>
              </Routes>
            </div>
          </Fragment>
        </Router>
      </UserWallet.Provider>
    </AppState.Provider>
  );
}

export default App;
