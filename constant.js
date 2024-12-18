const contractAddress = "0xA7F42ff7433cB268dD7D59be62b00c30dEd28d3D";

const abi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "pinger",
        type: "address",
      },
    ],
    name: "NewPinger",
    type: "event",
  },
  { anonymous: false, inputs: [], name: "Ping", type: "event" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "txHash",
        type: "bytes32",
      },
    ],
    name: "Pong",
    type: "event",
  },
  {
    inputs: [{ internalType: "address", name: "_pinger", type: "address" }],
    name: "changePinger",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "ping",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "pinger",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "_txHash", type: "bytes32" }],
    name: "pong",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

module.exports = { contractAddress, abi };
