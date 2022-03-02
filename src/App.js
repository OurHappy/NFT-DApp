import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Remove the sample React code */}
      {/* Install bootstrap for styling */}
      {/* Add a navbar contain the wallet connect status */}
      {/* Add a search bar to enter contract address */}
      {/* Show the contract interaction panel if a valid contract is provided */}
      {/* Show token metadata if a valid token is provided */}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
