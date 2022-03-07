import Web3 from "web3";

const ERC721InterfaceID = "0x5b5e139f"; // ERC721Metadata
const ERC1155InterfaceID = "0xd9b67a26"; // ERC1155

class Contract {
  constructor(contract) {
    this.contract = contract;
  }
  getTokenMeta() {}
  isERC721() {}
  isERC1155() {}
  burn() {}
  transfer() {}
  symbol() {}
  name() {}
}

class ERC721Contract extends Contract {
  ownerOf() {}
  balanceOf() {}
  totalSupply() {}
}

class ERC1155Contract extends Contract {
  balanceOf() {}
}

export function createContract(web3, address) {
  // Check contract is 721 or 1155
  // Then create related class instance
}
