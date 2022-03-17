import detectEthereumProvider from '@metamask/detect-provider';

export const getProvider = async () => {
  let provider = await detectEthereumProvider();
  return provider;
};