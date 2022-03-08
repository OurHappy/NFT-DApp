import Web3 from "web3";

const ERC721InterfaceID = "0x5b5e139f"; // ERC721Metadata
const ERC1155InterfaceID = "0xd9b67a26"; // ERC1155

class Contract {
  constructor(contract) {
    this.contract = contract;
  }
  async getTokenMeta() {}
  async isERC721() {}
  async isERC1155() {}
  async burn() {}
  async transfer() {}
  async symbol() {}
  async name() {}
}

class ERC721Contract extends Contract {
  async ownerOf() {}
  async balanceOf() {}
  async totalSupply() {}
}

class ERC1155Contract extends Contract {
  async balanceOf() {}
}

export function createContract(web3, address) {
  // Check contract is 721 or 1155
  // Then create related class instance
}
