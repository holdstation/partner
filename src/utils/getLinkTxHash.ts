export function getLinkTxHash(txHash: string, chain_id: number) {
  if (chain_id == 56) {
    return `https://bscscan.com/tx/${txHash}`;
  }

  if (chain_id == 1) {
    return `https://etherscan.io/tx/${txHash}`;
  }

  return "";
}
