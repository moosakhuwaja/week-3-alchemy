import { useEffect, useState } from "react";
import { getLatestBlocks } from "../utils/api";
import { shortenAddress } from "../utils/shortenAddress";
import { PaperAirplaneIcon as PaperIcon } from "@heroicons/react/24/outline";
import { getLatestTransactions } from "../utils/api";

const TxCard = ({ item }) => {
  return (
    <div
      className="mx-3 mt-2 flex flex-row items-center border-b-[0.5px] py-3 dark:border-tertiaryBgDark "
      key={item.transactionHash}
    >
      <div className="mx-3 flex w-1/3 ">
        <div className="mx-3 my-auto">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-gray-500 sm:w-12 sm:h-12">
            <PaperIcon />
          </div>
        </div>
        <div className="flex flex-col" title={item.transactionHash}>
          <h4 className="text-sm font-medium">
            <p>{shortenAddress(item.transactionHash)}</p>
          </h4>
          <p className="text-xs">{item.agoTimestamp} ago</p>
        </div>
      </div>
      <div className="flex w-2/3 justify-center" title={item.from}>
        <div>
          <div className="flex text-sm font-medium">
            <h4 className="mr-1">From: </h4>
            <p>{shortenAddress(item.from)}</p>
          </div>
          <div className="flex text-sm font-medium" title={item.to}>
            <p className="mr-1">To: </p>
            <p>{shortenAddress(item.to)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const LatetsTxs = () => {
  const [latestTransactions, setLatestTransactions] = useState([]);

  useEffect(() => {
    getLatestTransactions()
      .then((res) => {
        setLatestTransactions(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="mx-1 overflow-hidden rounded-xl border shadow-lg dark:border-tertiaryBgDark dark:bg-transactionBgDark dark:shadow-tertiaryBgLight/20 w-full">
      <h3 className="m-4 text-base font-bold">Latest Transactions</h3>
      <div className="border-[0.5px] dark:border-tertiaryBgDark" />
      {latestTransactions.map((item) => (
        <TxCard key={item.transactionHash} item={item} />
      ))}

      <h3 className="py-4 text-center text-sm font-medium uppercase text-transactionGray hover:text-activeDark">
        😅
      </h3>
    </section>
  );
};

export default LatetsTxs;
