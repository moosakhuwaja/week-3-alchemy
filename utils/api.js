import { Utils } from "alchemy-sdk";
const { Alchemy, Network } = require("alchemy-sdk");
import { timeAgo } from "./time";
// Configures the Alchemy SDK
const config = {
  apiKey: "Dl7JfLhOHL4D4mOeQ6ShgUblD7JDPFGE", // Replace with your API key
  network: Network.ETH_MAINNET // Replace with your network
};
const alchemy = new Alchemy(config);

export const getLatestBlocks = async (maxBlocks = 15) => {
  // Get the latest block number from the Alchemy API.
  const latestBlock = await alchemy.core.getBlockNumber();

  // Create an array of promises to retrieve the latest blocks.
  const blockPromises = [];
  for (let i = 0; i < maxBlocks; i++) {
    blockPromises.push(alchemy.core.getBlock(latestBlock - i));
  }

  // Wait for all of the block promises to resolve.
  const latestBlocksRaw = await Promise.all(blockPromises);

  console.log("latestBlocksRaw", latestBlocksRaw);

  // Map the raw block data to a more structured format.
  return latestBlocksRaw.map(
    ({ miner, number, timestamp, transactions, gasUsed }) => ({
      miner,
      number,
      timestamp,
      transactions,
      gasUsed,
      gasUsedInEth: Utils.formatUnits(gasUsed._hex, "gwei"),
      agoTimestamp: timeAgo(timestamp)
    })
  );
};

export const getLatestTransactions = async (maxTxns = 15) => {
  // Get the latest block number
  const latestBlock = await alchemy.core.getBlockNumber();
  // Get the transactions and timestamp of the latest block
  const { transactions, timestamp } = await alchemy.core.getBlock(latestBlock);

  // Create an array of promises to get the transaction receipts for each transaction
  const transactionsPromises = [];
  for (let i = 0; i < maxTxns; i++) {
    transactionsPromises.push(
      alchemy.core.getTransactionReceipt(transactions[i])
    );
  }
  // Get the transaction receipts for all the promises at once
  const latestTransactions = await Promise.all(transactionsPromises);

  console.log("latestTransactions", latestTransactions);

  // Map the transaction receipts to a new array with selected properties and a formatted timestamp
  return latestTransactions.map(
    ({ blockNumber, from, to, transactionHash }) => ({
      blockNumber,
      to,
      from,
      transactionHash,
      agoTimestamp: timeAgo(timestamp)
    })
  );
};
