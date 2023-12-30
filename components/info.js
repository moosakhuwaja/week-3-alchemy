import Image from "next/image";
import { CubeIcon, FireIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
// values from alchemy
import { getLatestBlockNumber } from "../utils/alchemy";
import { gasPrice } from "../utils/gasfee";

export const Info = () => {
  const [latestBlock, setLatestBlock] = useState(null);
  const [ethPrice, setEthPrice] = useState(null);
  const [ethGasPrice, setEthGasPrice] = useState(null);

  useEffect(() => {
    const fetchLatestValues = async () => {
      try {
        const blockNumber = await getLatestBlockNumber();
        setLatestBlock(blockNumber);
      } catch (error) {
        console.error("Error fetching latest block:", error);
      }
    };

    fetchLatestValues();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount
  useEffect(() => {
    const fetchGas = async () => {
      try {
        const gas = await gasPrice();
        setEthGasPrice(gas);
      } catch (error) {
        console.error("Error fetching gas fee:", error);
      }
    };

    fetchGas();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  useEffect(() => {
    const apiUrl =
      "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setEthPrice(data.USD);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 border-[#d9d9d9]">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-indigo-50 sm:w-12 sm:h-12">
            <Image
              src="http://www.rb.gy/6oxyah"
              alt="Description"
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
          <h6 className="text-4xl font-bold text-deep-purple-accent-400">
            ${ethPrice}
          </h6>
          <p className="mb-2 font-bold text-md">Ethereum price</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-gray-500 sm:w-12 sm:h-12">
            <CubeIcon />
          </div>
          <h6 className="text-4xl font-bold text-deep-purple-accent-400">
            {latestBlock}
          </h6>
          <p className="mb-2 font-bold text-md">Latest Block</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-gray-500 sm:w-12 sm:h-12">
            <FireIcon />
          </div>
          <h6 className="text-4xl font-bold text-deep-purple-accent-400">
            {ethGasPrice} Gwei
          </h6>
          <p className="mb-2 font-bold text-md">Gas Fee</p>
        </div>
      </div>
    </div>
  );
};

export default Info;
