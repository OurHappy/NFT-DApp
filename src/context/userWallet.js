import React from 'react';

export const userWallet = React.createContext({
  address: null,
  setAddress () {},
  network: null,
  setNetwork () {},
  isConnected () {
    return !!this.address;
  }
});

export default userWallet;