export class chains {
  static EthereumMainnet = {
    id: 1,
    name: "Ethereum Mainnet",
  };
  static RopstenTestnet = {
    id: 3,
    name: "Ropsten Testnet",
  };
  static RinkebyTestnet = {
    id: 4,
    name: "Rinkeby Testnet",
  };
  static ThunderCoreTestnet = {
    id: 18,
    name: "ThunderCore Testnet",
  };
  static BSCMainnet = {
    id: 56,
    name: "Smart Chain Mainnet",
  };
  static BSCTestnet = {
    id: 97,
    name: "Smart Chain Testnet",
  };
  static ThunderCoreMainnet = {
    id: 108,
    name: "ThunderCore Mainnet",
  };
  static Polygon = {
    id: 137,
    name: "Polygon",
  };
  static PolygonTestnet = {
    id: 80001,
    name: "Polygon Testnet",
  };

  static get all () {
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

  static getChainNameById (chainId) {
    const match = chains.all.find(chain => chain.id === chainId);
    if (match) return match.name;
    else return null;
  }
};