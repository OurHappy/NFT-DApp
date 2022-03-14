const ERC721InterfaceID = "0x5b5e139f"; // ERC721Metadata
const ERC1155InterfaceID = "0xd9b67a26"; // ERC1155

export async function getTokenMeta() {}
export async function isERC721() {}
export async function isERC1155() {
  return true;
}
export async function burn() {}
export async function transfer() {}

export async function symbol(contract) {
  let a = contract.methods.symbol().call((err, res) => {
    return res;
  });
}
export async function name(contract) {
  return contract.methods.name().call();
}

export async function ownerOf(contract) {
  contract.methods.ownerOf().call((err, res) => {
    if (err) {
      console.log("error");
    } else {
      return res;
    }
  });
}
export async function balanceOf(address, id) {
  if (isERC1155(address)) {
    this.methods.balanceOf(address, id).call((err, res) => {
      if (err) {
        console.log("error");
      } else {
        return res;
      }
    });
  } else {
    console.log("error here!");
  }
}
export async function totalSupply(contract, tokenId) {
  contract.methods.totalSupply(tokenId).call((err, res) => {
    if (err) {
      console.log("error");
    } else {
      console.log("res", res);
    }
  });
}

// export async function balanceOf() {}

export function createContract(web3, address) {
  // Check contract is 721 or 1155
  // Then create related class instance
}
