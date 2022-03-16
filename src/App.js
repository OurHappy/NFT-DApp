import "./App.css";
import { Fragment, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar";
import Searchbox from './components/Searchbox';
import ContractPanel from "./components/ContractPanel";


function App() {
  
  /* States */
  const [isContract, setIsContract] = useState(0);
  const [address, setAddress] = useState('test');

  /* Functions */
  // to see whether it is a valid contract
  // 之後會改成 contract 是否合法的 API，這邊測試是「test123」為合法
    let contractValid = (addr) => {  
      if(addr === "test123" || addr === "") return true;  // 注意沒有輸入時也是判定合法
      else return false;
  }

  let onSearchChange = (event) => {
    let val = contractValid(event.target.value);

    if(event.target.value === "") {
      setIsContract(isContract => 0);
      setAddress(address => '');
    } else if (val) {
      setIsContract(isContract => 1);
      setAddress(address => event.target.value);
    } else {
      setIsContract(isContract => 0);
      setAddress(address => '');
    }
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
            { isContract === 0 && <Route exact path ='/' element={<Searchbox searchChange={onSearchChange}/>}/> }
            { isContract && <Route exact path ='/' element={<ContractPanel contractAddress={address}/>}/> }
          </Routes>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
