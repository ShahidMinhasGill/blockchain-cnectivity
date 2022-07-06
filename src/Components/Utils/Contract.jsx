export const contractAddress = '0x048EF2E7a5d5ECE34478bfA6F4E26ef1ba4c0856';
export const cotractAbi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "string", "name": "_FullName", "type": "string" }, { "internalType": "string", "name": "_DoB", "type": "string" }, { "internalType": "string", "name": "_EmailID", "type": "string" }, { "internalType": "string", "name": "_useraddress", "type": "string" }, { "internalType": "string", "name": "_city", "type": "string" }, { "internalType": "uint256", "name": "_zip", "type": "uint256" }, { "internalType": "string", "name": "_gender", "type": "string" }, { "internalType": "string", "name": "_religion", "type": "string" }, { "internalType": "string", "name": "__IdFront", "type": "string" }, { "internalType": "string", "name": "__IdBack", "type": "string" }], "name": "AddUser", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "__FullName", "type": "string" }, { "internalType": "uint256", "name": "_zip", "type": "uint256" }, { "internalType": "string", "name": "__DoB", "type": "string" }, { "internalType": "string", "name": "__EmailID", "type": "string" }, { "internalType": "string", "name": "__useraddress", "type": "string" }, { "internalType": "string", "name": "__city", "type": "string" }, { "internalType": "string", "name": "__gender", "type": "string" }, { "internalType": "string", "name": "__religion", "type": "string" }, { "internalType": "string", "name": "__IdFront", "type": "string" }, { "internalType": "string", "name": "__IdBack", "type": "string" }], "name": "UpdateUserInfo", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "UserMap", "outputs": [{ "internalType": "address", "name": "MetaMaskaddress", "type": "address" }, { "internalType": "string", "name": "FullName", "type": "string" }, { "internalType": "string", "name": "DoB", "type": "string" }, { "internalType": "string", "name": "EmailAddress", "type": "string" }, { "internalType": "string", "name": "useraddress", "type": "string" }, { "internalType": "string", "name": "IdFront", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_login", "type": "uint256" }], "name": "ViewUsers", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "_UserMap", "outputs": [{ "internalType": "string", "name": "city", "type": "string" }, { "internalType": "bool", "name": "status", "type": "bool" }, { "internalType": "uint256", "name": "zip", "type": "uint256" }, { "internalType": "string", "name": "gender", "type": "string" }, { "internalType": "string", "name": "religion", "type": "string" }, { "internalType": "string", "name": "IdBack", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_password", "type": "uint256" }], "name": "setpassword", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]