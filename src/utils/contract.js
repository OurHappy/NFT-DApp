import sample1155Meta from './sample1155TokenMeta.json';
import sample721Meta from './sample721TokenMeta.json';
import sampleOurSong1155ContractMeta from './sampleOurSong1155ContractMeta.json';
import sampleOurSong721ContractMeta from './sampleOurSong721ContractMeta.json';
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

    return sample1155Meta;  // for test, return sample 1155 token (because of CORS policy error)

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
      return null;
    });
  } else if (ERC721) {
    let tokenURI = await contract.methods.tokenURI(tokenId).call();
    console.log(tokenURI);
    return sample721Meta;  // for test, return sample 721 token (because of CORS policy error)

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
      return null;
    });
  }
}

export async function getContractMeta(contract) {
  let ERC1155 = await isERC1155(contract);
  let ERC721 = await isERC721(contract);
  let contractUri;

  await contract.methods.contractURI().call((err, res) => {
    if (err) {
      console.log(err);
      return null;
    }
    contractUri = res;
  });
  console.log(contractUri);

  if (ERC1155) {
    return sampleOurSong1155ContractMeta; // for test, return sample 1155 contract meta (because of CORS policy error)

    await axios.get(contractUri, {
      headers: {
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Origin": "*",
      },
      responseType: "json",
    }).then((res) => {
      return res;
    }).catch((err) => {
      console.log(err);
      return null;
    });
  } else if (ERC721) {
    return sampleOurSong721ContractMeta;  // for test, return sample 721 contract meta (because of CORS policy error)

    await axios.get(contractUri, {
      headers: {
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Origin": "*",
      },
      responseType: "json",
    }).then((res) => {
      return res;
    }).catch((err) => {
      console.log(err);
      return null;
    });
  }
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
  const result = await contract.methods.owner().call((res) => res);
  return result;
}

export async function ownerOf(contract) {
  const result = await contract.methods.owner().call();
  return result;
}
export async function balanceOf(contract, address, id) {
  let balance = await contract.methods.balanceOf(address, id).call();

  return balance;
}

export async function totalSupply(contract, tokenId) {
  let supply = await contract.methods.totalSupply(tokenId).call();
  return supply;
}

export async function balanceOf721(contract, account) {
  let balance = await contract.methods.balanceOf(account).call();
  return balance;
}

export async function ownerOf721(contract, id) {
  let owner = await contract.methods.ownerOf(id).call();

  return owner;
}

// export async function totalSupply721(contract) {
//   let supply = await contract.methods.totalSupply().call();
//   console.log(supply);
//   return supply;
// }

// export async function balanceOf() {}

// export function createContract(web3, address) {
//   // Check contract is 721 or 1155
//   // Then create related class instance
// }
