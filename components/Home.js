import React from "react";
import Search from "./Search";
import Info from "./info";
import LatestBlock from "./LatestBlocks";
import LatetsTxs from "./latestTxs";

function HC() {
  return (
    <div>
      <Search />
      <Info />
      <div className="flex flex-col w-full lg:flex-row lg:w-full">
        <LatestBlock className="lg:w-1/2" />
        <LatetsTxs className="lg:w-1/2" />
      </div>
    </div>
  );
}

export default HC;
