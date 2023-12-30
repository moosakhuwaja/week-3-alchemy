import React, { useEffect, useState } from "react";
import { addressData } from "../utils/addressData";

function Address(address) {
  const [txResult, setRestlt] = useState({});
  useEffect(() => {
    // Define an async function to use await
    const fetchData = async () => {
      try {
        const result = await addressData(address);
        setRestlt(result);
        console.log(typeof txResult);
        console.log(txResult);
        console.log("txResult");
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
        <h1 className="text-black">Transaction info</h1>
      </div>

      <ul className="w-[100%] text-sm font-medium text-gray-900 bg-transparent border border-gray-200 rounded-lg dark:bg-transparent dark:border-gray-600 dark:text-white">
        <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
          txaddress: {address.address}
        </li>
        <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
          blockHash: {txResult.blockHash}
        </li>
        <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
          blockNumber: {parseInt(txResult.blockNumber, 16)}
        </li>
        <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
          hash: {txResult.hash}
        </li>
        <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
          chainId: {parseInt(txResult.chainId, 16)}
        </li>
        <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
          from: {txResult.from}
        </li>
        <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
          gas: {parseInt(txResult.gas, 16) / 1e9}
        </li>
        <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
          gasPrice: {parseInt(txResult.gasPrice, 16) / 1e9} wei
        </li>
        <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
          nonce: {parseInt(txResult.nonce, 16)}
        </li>
        <li className="w-full px-4 py-2 rounded-b-lg">
          value: {parseInt(txResult.value, 16) / 1e9 / 1e9} eth
        </li>
      </ul>
    </div>
  );
}

export default Address;
