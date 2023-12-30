const addressRegex = /^0x[0-9a-fA-F]{40}$/;
const blockRegex = /^[0-9]{1,9999}$/;
const txRegex = /^0x[0-9a-fA-F]{64}$/;

export function getAddressType(input) {
  if (blockRegex.test(input)) {
    return "Block Number";
  } else if (txRegex.test(input)) {
    return "Transaction Hash";
  } else {
    return "Unknown Type";
  }
}
