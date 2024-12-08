# Ethereum Ping-Pong Bot

## Overview
This bot listens for `Ping` events on an Ethereum smart contract, processes the transactions, and sends a `Pong` response to each `Ping` event. It broadcasts the details of the transactions including the `Ping` and `Pong` transaction hashes.

## Prerequisites

- Node.js installed
- An Ethereum node provider (e.g., Infura, Alchemy, or a local Ethereum node)
- A private Ethereum wallet key for signing transactions

## Configure Environment Variables
Create a .env file in the root directory of the project and add the following variables:


```bash
npm install
RPC_URL=<your_ethereum_rpc_url>
PRIVATE_KEY=<your_private_key>
```

## Running the Bot
To start the bot, run the following command:

```bash
node bot.js
```

