export function renderShortAddress(
  address: string,
  startChars: number,
  endChars?: number,
) {
  const chars = startChars;
  const charsEnd = typeof endChars == "undefined" ? startChars : endChars;

  if (!address) {
    return address;
  }

  if (address.length < chars + charsEnd) {
    return address;
  }

  return `${address.slice(0, chars)}...${address.slice(address.length - charsEnd)}`;
}

export const formatAddress = (
  rawAddress: string,
  chars: number = 4,
  endChars?: number,
) => {
  return renderShortAddress(rawAddress, chars, endChars);
};
