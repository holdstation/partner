export function getTextPercent(value: string) {
  switch (value) {
    case "Day":
      return "yesterday";

    case "Week":
      return "last week";

    case "Month":
      return "last month";
      
    default:
      break;
  }
}
