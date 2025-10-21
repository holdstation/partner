const chains = {
  1: "Ethereum",
  56: "BNB Smart Chain (BSC)",
  137: "Polygon",
  43114: "Avalanche (C-Chain)",
};

export function getNameChainById(id?: number) {
  return chains[Number(id) as keyof typeof chains];
}
