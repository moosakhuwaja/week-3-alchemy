import { useEffect, useState } from "react";
import { getLatestBlocks } from "../utils/api";
import { shortenAddress } from "../utils/shortenAddress";
import { CubeIcon as BlockIcon, CubeIcon } from "@heroicons/react/24/outline";
// import { PageLink } from "./pageLink";
const BlockCard = ({ item }) => {
  return (
    <div
      className="mx-3 mt-2 flex flex-row items-center border-b-[0.5px] py-3 dark:border-tertiaryBgDark"
      key={item.number}
    >
      <div className="mx-3 flex w-1/3 ">
        <div className="mx-3 my-auto">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-gray-500 sm:w-12 sm:h-12">
            <CubeIcon />
          </div>
        </div>
        <div className="flex flex-col ">
          <h4 className="text-sm font-medium">
            <p>{item.number}</p>
          </h4>
          <p className="text-xs">{item.agoTimestamp} ago</p>
        </div>
      </div>
      <div className="flex w-2/3 justify-center">
        <div>
          <div className="flex text-sm font-medium">
            <h4 className="mr-1">Fee Recipient: </h4>
            <p>{shortenAddress(item.miner)}</p>
          </div>
          <h4 className="text-sm font-medium">
            <p>{item.transactions.length} txns</p>
          </h4>
        </div>
        {/* <div className="flex items-center">
            <p className="text-xs">{item.gasUsedInEth} Eth</p>
          </div> */}
      </div>
    </div>
  );
};

const LatestBlock = () => {
  const [latestBlocks, setLatestBlocks] = useState([]);

  useEffect(() => {
    const fetchLatestBlock = async () => {
      try {
        const response = await getLatestBlocks();
        setLatestBlocks(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLatestBlock();
  }, []);

  console.log("latestBlocks", latestBlocks);

  return (
    <section className="mx-1 overflow-hidden rounded-xl border shadow-lg dark:border-tertiaryBgDark dark:bg-transactionBgDark dark:shadow-tertiaryBgLight/20 w-full mb-2">
      <h3 className="m-4 text-base font-bold">Latest Blocks</h3>
      <div className="border-[0.5px] dark:border-tertiaryBgDark" />
      {latestBlocks.map((item) => (
        <BlockCard key={item.number} item={item} />
      ))}

      <h3 className="py-4 text-center text-sm font-medium uppercase text-transactionGray hover:text-activeDark">
        😅
      </h3>
    </section>
  );
};

export default LatestBlock;
