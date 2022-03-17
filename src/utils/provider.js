import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';

export const getProvider = async () => {
    let provider = await detectEthereumProvider();
    return provider;
}