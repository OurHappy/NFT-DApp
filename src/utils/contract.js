import sample1155Meta from './sample1155TokenMeta.json';
import sample721Meta from './sample721TokenMeta.json';
import sampleOurSong1155ContractMeta from './sampleOurSong1155ContractMeta.json';
import axios from 'axios';

const ERC721InterfaceID = "0x5b5e139f"; // ERC721Metadata
const ERC1155InterfaceID = "0xd9b67a26"; // ERC1155

export async function getTokenMeta(contract, tokenId) {
  let ERC1155 = await isERC1155(contract);
  let ERC721 = await isERC721(contract);

  if (ERC1155) {
    let tokenURI = await contract.methods.uri(tokenId).call();

    /* replace the {id} with the actual token ID in lowercase,
       and leading zero padded to 64 hex characters
    */
    let tokenIdNew = (Number(tokenId).toString(16)).toLowerCase();
    let zeroNum = 64 - tokenIdNew.length;
    for (let i = 0; i < zeroNum; i++) {
      tokenIdNew = "0" + tokenIdNew;
    }
    tokenURI = tokenURI.replace("{id}", tokenIdNew);
    console.log(tokenURI);

    await axios.get(tokenURI, {
      headers: {
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Origin": "*",
      },
      responseType: "json",
    }).then((res) => {
      return res;
    }).catch((err) => {
      console.log(err);
      return sample1155Meta;
    });
  } else if (ERC721) {
    let tokenURI = await contract.methods.tokenURI(tokenId).call();
    console.log(tokenURI);

    await axios.get(tokenURI, {
      headers: {
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Origin": "*",
      },
      responseType: "json",
    }).then((res) => {
      return res;
    }).catch((err) => {
      console.log(err);
      return sample721Meta;
    });
  }
}

export async function getContractMeta(contract) {
  return sampleOurSong1155ContractMeta;
  // let contractURI = await contract.methods.contractURI().call((err, res) => {
  //   return res;
  // });
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

export async function getContractOwner(contract) {
  const result = contract.methods.owner().call(res => res);
  return result;
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
