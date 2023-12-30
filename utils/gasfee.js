import axios from "axios";

const url = `https://eth-mainnet.g.alchemy.com/v2/Dl7JfLhOHL4D4mOeQ6ShgUblD7JDPFGE`;
// Optional Config object, but defaults to demo api-key and eth-mainnet.

export async function gasPrice() {
  const batch = {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_gasPrice"
  };
  const response = await axios.post(url, batch);
  const hexNumber = response.data.result;

  // Convert hex to decimal
  const decimalNumber = parseInt(hexNumber, 16);
  const gasPriceInGwei = decimalNumber / 1e9;

  return gasPriceInGwei;
}
