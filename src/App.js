import "./App.css";
import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar";
import Searchbox from './components/Searchbox';
import ContractPanel from "./components/ContractPanel";

import { init } from './utils/web3Client';
import { getProvider } from './utils/provider';


function App() {

  /* States */
  const [appState, setAppState] = useState('initializing');
  const [isContract, setIsContract] = useState(0);
  const [address, setAddress] = useState('test');

  useEffect(() => {
    initApp();
  }, [])

  /* Functions */
  async function initApp() {
    const provider = await getProvider();
    if (provider) {
      const initialized = init(provider);
      if (initialized) {
        setAppState('ready');
        return;
      }
    }
    setAppState('no_provider');
  }

  let onSearchChange = (addr) => {
    setIsContract(1);
    setAddress(addr);
  }


  /* Render Function */
  return (
    <Router>
      <Fragment>
        <div className="App">
          {/* Add a navbar contain the wallet connect status */}
          <Navbar />

          <Routes>
            {/* Add a search bar to enter contract address */}
            {isContract === 0 && <Route exact path='/' element={<Searchbox searchChange={onSearchChange} />} />}
            {isContract && <Route exact path='/' element={<ContractPanel contractAddress={address} />} />}
          </Routes>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
