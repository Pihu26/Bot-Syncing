const { ethers } = require("ethers");
const { contractAddress, abi } = require("./constant");
const { readBlock, writeBlock } = require("./readAndWriteBlock");
const fs = require("fs");
const async = require("async");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(contractAddress, abi, signer);
const filePath = "./blockFile.txt";

/**
 * Checks if file is empty
 *
 * @param {string} filePath - Path to fie
 * @returns - returns "True " if file is empty or else "False"
 */
function isFileEmpty(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size === 0;
}

/**
 * This is the main function which start the bot.
 * Checks if file has blocknumbers or not then start the block from where the block ends.
 * Gets the log of the previous blocks.
 * And start listening the ping event onwards.
 *
 */

async function main() {
  console.log("BOT STARTING NOW!!!");
  await checkForPendingTransaction();
  let startBlock;
  const currentBlock = await provider.getBlockNumber();

  if (isFileEmpty(filePath)) {
    startBlock = (await provider.getBlockNumber()) - 1;
  } else {
    startBlock = await readBlock();
    console.log(`Resuming from Block: ${startBlock}`);
  }

  console.log(`Started detecting ping from block ${startBlock}`);
  const logs = await provider.getLogs({
    fromBlock: startBlock + 1,
    toBlock: currentBlock,
    address: contractAddress,
    topics: [ethers.id("Ping()")],
  });
  await queue.push(logs);
  listenPings();
}

/**
 * Listens to the  new ping events
 */
async function listenPings() {
  try {
    provider.on(
      {
        address: contractAddress,
        topics: [ethers.id("Ping()")],
      },
      (log) => {
        console.log("Detected new Ping event!");
        queue.push(log);
      }
    );
  } catch (error) {
    if (
      error.code === "UNKNOWN_ERROR" &&
      error.message.includes("filter not found")
    ) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await main();
    } else {
      console.error(error);
    }
  }

  console.log("Listening for new Ping events...");
}

const queue = async.queue(async (log, callback) => {
  try {
    await writeBlock(log.blockNumber);
    console.log(`Transaction hash of ping: ${log.transactionHash}`);
    const tx = await contract.pong(log.transactionHash);
    console.log("Transcation hash of pong sent:", tx.hash);
    const receipt = await tx.wait(1);
    console.log("BlockNumber of pong transaction:", receipt.blockNumber);
    console.log("Listening for new Ping events...");
  } catch (error) {
    console.error("Error processing transaction:", error);
  } finally {
    callback();
  }
}, 1);

/**
 * Checks for the previous  pending transactions
 */
async function checkForPendingTransaction() {
  const pendingTx = provider.getTransactionCount(signer.address, "pending");
  const currentTx = provider.getTransactionCount(signer.address, "latest");
  if (pendingTx > currentTx) {
    console.log("Waiting for pending transactions to be mined...");
  }

  while (pendingTx > currentTx) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
