export function getOrderType(id: number) {
  switch (String(id)) {
    case "1":
      return "On-ramp";

    case "2":
      return "Off-ramp";
    default:
      break;
  }
}

export const selectDataOrderType = [
  {
    label: "On-ramp",
    value: "1",
  },
  {
    label: "Off-ramp",
    value: "2",
  },
];
