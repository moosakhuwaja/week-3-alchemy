import axios from "axios";
import { Utils } from "alchemy-sdk";
const url = `https://eth-mainnet.g.alchemy.com/v2/Dl7JfLhOHL4D4mOeQ6ShgUblD7JDPFGE`;
// Optional Config object, but defaults to demo api-key and eth-mainnet.

export async function blockData(blockNumber) {
  const batch = {
    jsonrpc: "2.0",
    id: 0,
    method: "eth_getBlockByNumber",
    params: ["0x" + blockNumber.blockNumber.toString(16), false]
  };
  const response = await axios.post(url, batch);
  const result = response.data.result;

  return result;

  //   return json_data.map(
  //     ({ blockHash, blockNumber, from, transactions, gasUsed }) => ({
  //       blockHash,
  //       blockNumber: parseInt(blockNumber, 16),
  //       from,
  //       gasUsedInEth: Utils.formatUnits(gasUsed._hex, "gwei"),
  //       transactions,
  //       gasUsed,
  //       agoTimestamp: timeAgo(timestamp)
  //     })
  //   );
}
