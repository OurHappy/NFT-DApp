import Web3 from "web3";

const ERC721InterfaceID = "0x5b5e139f"; // ERC721Metadata
const ERC1155InterfaceID = "0xd9b67a26"; // ERC1155

export async function getTokenMeta() {}
export async function isERC721() {}
export async function isERC1155() {}
export async function burn() {}
export async function transfer() {}
export async function symbol() {}
export async function name() {}

export async function ownerOf() {}
export async function balanceOf() {}
export async function totalSupply() {}

export async function balanceOf() {}

export function createContract(web3, address) {
  // Check contract is 721 or 1155
  // Then create related class instance
}
