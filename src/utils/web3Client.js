/* import web3.js library */


/** web3 instance */
function init(){
  // init function should create a web3 instance with ethereum provider
  // return false if unable to create a web3 instance
}

function isMetamask(){
  // check if user has metamask installed
}

function makeContract(address) {
  // should return a web3 Contract instance
}


/** web3 contract */
function isERC1155(contract){
  // check if the provided contract implement ERC1155 interface
}

function isERC721(contract){
  // check if the provided contract implement ERC721 interface
}

function balanceOf(address, tokenId){
  // check the token amount the address hold
}

function ownerOf(tokenId){
  // check the owner address of the token
}

function tokenURI(tokenId) {
  // get the token metadata URI
}

function transfer(fromAddress, toAddress, tokenId, amount) {
  // transfer token
}

function burn(address, tokenId, amount) {
  // burn token
}
