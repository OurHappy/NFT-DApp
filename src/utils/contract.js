import sample1155Meta from "./sample1155TokenMeta.json";
import sample721Meta from "./sample721TokenMeta.json";
import sampleOurSong1155ContractMeta from "./sampleOurSong1155ContractMeta.json";
import sampleOurSong721ContractMeta from "./sampleOurSong721ContractMeta.json";
import axios from "axios";

import * as IPFS from "ipfs-core";

const ERC721InterfaceID = "0x5b5e139f"; // ERC721Metadata
const ERC1155InterfaceID = "0xd9b67a26"; // ERC1155
let dataUrl = "https://stage.oursong.com/api/metadata";

export async function getIPFSdata(ipfsPath) {
  const ipfs = await IPFS.create();
  let hash = ipfsPath.replace("ipfs://", "");
  let info = [];

  for await (const item of ipfs.get(hash)) {
    info.push(item.toString());
  }

  return JSON.parse(info[1]);
}

export async function getBase64data(str) {
  let index = str.search("base64,");
  index = index + 7;
  str = str.substr(index);

  // decode base64 to string, then to JSON
  let decodeStr = JSON.parse(atob(str));
  return decodeStr;
}

export async function getTokenMeta(contract, tokenId) {
  if (contract !== undefined) {
    let ERC1155 = await isERC1155(contract);
    let ERC721 = await isERC721(contract);

    if (ERC1155) {
      let tokenURI = await contract.methods.uri(tokenId).call();
      if (tokenURI.includes("ipfs://")) {
        //the meta is stored in IPFS
        let tokenMeta = getIPFSdata(tokenURI);
        // return {tokenMeta, tokenURI};
        return tokenMeta;
      } else if (tokenURI.includes("data:application/json;base64")) {
        // the meta is base64 format
        let tokenMeta = getBase64data(tokenURI);
        // return {tokenMeta, tokenURI};
        return tokenMeta;
      } else {
        // replace the {id} with the actual token ID in lowercase, and leading zero padded to 64 hex characters
        let tokenIdNew = Number(tokenId).toString(16).toLowerCase();
        let zeroNum = 64 - tokenIdNew.length;
        for (let i = 0; i < zeroNum; i++) {
          tokenIdNew = "0" + tokenIdNew;
        }
        tokenURI = tokenURI.replace("{id}", tokenIdNew);
      }

      // get metadata with Oursong API
      let newDataUrl = dataUrl + "?uri=" + tokenURI;
      let tokenMeta = await axios
        .get(newDataUrl, {
          responseType: "json",
        })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.log(err);
          return null;
        });
      // return {tokenMeta, tokenURI};
      return tokenMeta;
    } else if (ERC721) {
      let tokenURI = await contract.methods.tokenURI(tokenId).call();
  
      if (tokenURI.includes("ipfs://")) {
        //the meta is stored in IPFS
        let tokenMeta = getIPFSdata(tokenURI);
        // return {tokenMeta, tokenURI};
        return tokenMeta;
      } else if (tokenURI.includes("data:application/json;base64")) {
        // the meta is base64 format
        let tokenMeta = getBase64data(tokenURI);
        // return {tokenMeta, tokenURI};
        return tokenMeta;
      } else {
        // get metadata with Oursong API
        let newDataUrl = dataUrl + "?uri=" + tokenURI;
        let tokenMeta = await axios
          .get(newDataUrl, {
            responseType: "json",
          })
          .then((res) => {
            return res;
          })
          .catch((err) => {
            console.log(err);
            return null;
          });
        // return {tokenMeta, tokenURI};
        return tokenMeta;
      }
    } 
  }
}

export async function getContractMeta(contract) {
  let ERC1155 = await isERC1155(contract);
  let ERC721 = await isERC721(contract);
  let contractUri = await contract.methods.contractURI().call((err, res) => {
    if (err) {
      console.log(err);
      return null;
    }
    return res;
  });

  if (contractUri == null) {
    return null;
  } else {
    if (ERC1155) {
      let newDataUrl = dataUrl + "?uri=" + contractUri;
      let contractMeta = await axios
        .get(newDataUrl, {
          responseType: "json",
        })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.log(err);
          return null;
        });
      return {contractMeta, contractUri};
    } else if (ERC721) {
      let newDataUrl = dataUrl + "?uri=" + contractUri;
      let contractMeta = await axios
        .get(newDataUrl, {
          responseType: "json",
        })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.log(err);
          return null;
        });
      return {contractMeta, contractUri};
    }
    return null;
  }
}

export async function isERC721(contract) {
  let result = null;
  try {
    result = await contract.methods
      .supportsInterface(ERC721InterfaceID)
      .call();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function isERC1155(contract) {
  let result = null;
  try {
    result = await contract.methods
      .supportsInterface(ERC1155InterfaceID)
      .call();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function burn(contract, account, id, amount, accountAddress) {
  console.log("ca=", accountAddress);
  let result = await contract.methods
    .burn(account, id, amount)
    .send({ from: accountAddress });

  return result;
}
export async function transfer(
  contract,
  from,
  to,
  id,
  amount,
  data,
  accountAddress
) {
  let result = await contract.methods
    .safeTransferFrom(from, to, id, amount, data)
    .send({ from: accountAddress });

  return result;
}

export async function brun721token(contract, id, accountAddress) {
  let result = await contract.methods.burn(id).send({ from: accountAddress });
  return result;
}
export async function transfer721token(
  contract,
  fromAddress,
  toAddress,
  id,
  accountAddress
) {
  let result = await contract.methods
    .transferFrom(fromAddress, toAddress, id)
    .send({ from: accountAddress });
  return result;
}

export async function uri(contract, id) {
  let uri = await contract.methods.uri(id).call();
  return uri;
}

export async function uri721(contract, id) {
  let uri = contract.methods.tokenURI(id).call();
  return uri;
}

export async function symbol(contract) {
  let symbol = await contract.methods.symbol().call();
  return symbol;
}

export async function name(contract) {
  let name = await contract.methods.name().call();
  return name;
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
