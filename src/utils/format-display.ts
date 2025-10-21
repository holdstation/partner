export function formatDisplay(
  value: number,
  opts: Partial<{
    disableSmallValue?: boolean;
    decimalToShow: number;
    locale: string;
    minimumDecimalToShow?: number;
    disable: boolean;
  }>,
  firstSynbol?: string,
): string {
  if (isNaN(value)) {
    return "0";
  }

  const decimalToShow = opts.decimalToShow ?? 5;
  const op = {
    maximumFractionDigits: decimalToShow,
    minimumFractionDigits: opts?.minimumDecimalToShow ?? 0,
    roundingMode: "floor",
  };
  const formatter = new Intl.NumberFormat(opts.locale || "en-US", op);

  if (opts.disable) {
    return formatter.format(value);
  }

  if (
    !opts.disableSmallValue &&
    Math.abs(value) < Math.pow(10, -decimalToShow) &&
    value > 0
  ) {
    return `< ${firstSynbol || ""}${formatter.format(Math.pow(10, -decimalToShow))}`;
  }

  return `${firstSynbol || ""}${formatter.format(value)}`;
}
