export class chains {
  static EthereumMainnet = {
    id: 1,
    name: "Ethereum Mainnet",
    abb: "ethereum",
  };
  static RopstenTestnet = {
    id: 3,
    name: "Ropsten Testnet",
    abb: "ropsten",
  };
  static RinkebyTestnet = {
    id: 4,
    name: "Rinkeby Testnet",
    abb: "rinkeby",
  };
  static ThunderCoreTestnet = {
    id: 18,
    name: "ThunderCore Testnet",
    abb: "thundercore_test",
  };
  static BSCMainnet = {
    id: 56,
    name: "Smart Chain Mainnet",
    abb: "bsc",
  };
  static BSCTestnet = {
    id: 97,
    name: "Smart Chain Testnet",
    abb: "bsc_test",
  };
  static ThunderCoreMainnet = {
    id: 108,
    name: "ThunderCore Mainnet",
    abb: "thundercore",
  };
  static Polygon = {
    id: 137,
    name: "Polygon",
    abb: "polygon",
  };
  static PolygonTestnet = {
    id: 80001,
    name: "Polygon Testnet",
    abb: "poly_test",
  };

  static get all() {
    return [
      chains.EthereumMainnet,
      chains.RopstenTestnet,
      chains.RinkebyTestnet,
      chains.ThunderCoreTestnet,
      chains.BSCMainnet,
      chains.BSCTestnet,
      chains.ThunderCoreMainnet,
      chains.Polygon,
      chains.PolygonTestnet,
    ];
  }

  static getChainNameById(chainId) {
    const match = chains.all.find((chain) => chain.id === chainId);
    if (match) return match.name;
    else return null;
  }

  static getChainAbbById(chainId) {
    const match = chains.all.find((chain) => chain.id === chainId);
    if (match) return match.abb;
    else return null;
  }
 
}
