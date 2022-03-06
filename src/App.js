import React, {Component} from 'react';
import Wallet from './Wallet';

class App extends Component {
  
  render() {
    return (
      <div className='tc courier pv3'>
        <h1>NFT-DApp</h1>
        <h2>Connect To The Wallet</h2>
        <div>
          <Wallet />
        </div>
      </div>
    );
  }
}

export default App;
