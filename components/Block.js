import React, { useEffect, useState } from "react";
import { blockData } from "../utils/blockData";
import { timeAgo } from "../utils/time";

function Block(blockNumber) {
  const [blockResult, setRestlt] = useState({});
  useEffect(() => {
    // Define an async function to use await
    const fetchData = async () => {
      try {
        const result = await blockData(blockNumber);
        setRestlt(result);
        console.log(typeof blockResult);
        console.log(blockResult);
        console.log("blockResult");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the async function
    fetchData();
  }, []);

  return (
    <div style={{ backgroundColor: "transparent", color: "white" }}>
      <div className="flex justify-center">
        <h1 className="text-black">Block info</h1>
      </div>

      <ul className="w-[100%] text-sm font-medium text-gray-900 bg-transparent border border-gray-200 rounded-lg dark:bg-transparent dark:border-gray-600 dark:text-white">
        <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
          Block number: {blockNumber.blockNumber}
        </li>
        <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
          difficulty: {parseInt(blockResult.difficulty, 16)}
        </li>

        <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
          hash: {blockResult.hash}
        </li>

        <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
          miner: {blockResult.miner}
        </li>
        <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
          parentHash: {blockResult.parentHash}
        </li>
        <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
          gasLimit: {parseInt(blockResult.gasLimit, 16) / 1e9}
        </li>
        <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
          totalDifficulty: {parseInt(blockResult.totalDifficulty)}
        </li>
        <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
          nonce: {parseInt(blockResult.nonce, 16)}
        </li>
        <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
          size: {parseInt(blockResult.size)}
        </li>
        <li className="w-full px-4 py-2 rounded-b-lg">
          timestamp: {timeAgo(blockResult.timestamp)}
        </li>
      </ul>
    </div>
  );
}

export default Block;
