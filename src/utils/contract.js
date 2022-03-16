const ERC721InterfaceID = "0x5b5e139f"; // ERC721Metadata
const ERC1155InterfaceID = "0xd9b67a26"; // ERC1155

export async function getTokenMeta(contract, tokenId) {
  // let tokenURI = await contract.methods.uri(tokenId).call((err, res) => {
  //   return res;
  // });
}

export async function getContractMeta(contract) {
  // let contractURI = await contract.methods.contractURI().call((err, res) => {
  //   return res;
  // });

  let meta = {
    name: "OurSong Vibe NFT ERC1155",
    description:
      "OurSong is the world\u2019s first music NFT marketplace. For the first time in history, music and sentiments can be packaged, sold and traded as meaningful digital assets. Buying and collecting music is back in a big way.",
    image: "https://stage.oursong.com/images/oursong-logo-v3.png",
    external_url: "https://stage.oursong.com",
    seller_fee_basis_points: 1000,
    fee_recipient: "0xd90E0Ad754Ac08e8708Df7eAD69e3f590c076aa2",
  };

  return meta;
}

export async function isERC721(contract) {
  let result = await contract.methods
    .supportsInterface(ERC721InterfaceID)
    .call();
  return result;
}

export async function isERC1155(contract) {
  let result = await contract.methods
    .supportsInterface(ERC1155InterfaceID)
    .call();
  return result;
}

export async function burn() {}
export async function transfer() {}

export async function symbol(contract) {
  return contract.methods.symbol().call();
}

export async function name(contract) {
  return contract.methods.name().call();
}

export async function ownerOf(contract) {
  return contract.methods.owner().call();
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
    console.log("error");
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

// export function createContract(web3, address) {
//   // Check contract is 721 or 1155
//   // Then create related class instance
// }
