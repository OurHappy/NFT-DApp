import Web3 from "web3";

const ERC721InterfaceID = "0x5b5e139f"; // ERC721Metadata
const ERC1155InterfaceID = "0xd9b67a26"; // ERC1155

async function getTokenMeta() {}
async function isERC721() {}
async function isERC1155() {}
async function burn() {}
async function transfer() {}
async function symbol() {}
async function name() {}

async function ownerOf() {}
async function balanceOf() {}
async function totalSupply() {}

async function balanceOf() {}

export function createContract(web3, address) {
  // Check contract is 721 or 1155
  // Then create related class instance
}
