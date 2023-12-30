import axios from "axios";

const url = `https://eth-mainnet.g.alchemy.com/v2/Dl7JfLhOHL4D4mOeQ6ShgUblD7JDPFGE`;

export async function getLatestBlockNumber() {
  const batch = {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_blockNumber"
  };
  const response = await axios.post(url, batch);
  const hexNumber = response.data.result;
  const latestBlock = parseInt(hexNumber, 16);
  return latestBlock;
}
