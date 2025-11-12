export enum STATUS {
  New = "New",
  Pending = "Pending",
  Completed = "Completed",
  Failed = "Failed",
  Waiting = "Waiting",
}

export function getLabelColorOrderStatus(status?: number) {
  switch (status) {
    case 1: {
      return "blue";
    }
    case 2: {
      return "processing";
    }
    case 3: {
      return "success";
    }
    case 4: {
      return "error";
    }
    case 5: {
      return "default";
    }
    case 0: {
      return "volcano";
    }
  }
}

export function getLabelOrderStatus(status?: number) {
  switch (status) {
    case 0: {
      return "Unspecified";
    }

    case 1: {
      return "Created";
    }

    case 2: {
      return "Processing";
    }

    case 3: {
      return "Completed";
    }

    case 4: {
      return "Failed";
    }

    case 5: {
      return "Closed";
    }

    default:
      break;
  }
}

export const filterStatusData = [
  {
    text: "Unspecified",
    value: "0",
  },
  {
    text: "Created",
    value: "1",
  },
  {
    text: "Processing",
    value: "2",
  },
  {
    text: "Completed",
    value: "3",
  },
  {
    text: "Failed",
    value: "4",
  },
  {
    text: "Closed",
    value: "5",
  },
];



export const processingStatusData = [
  {
    text: "Waiting for Fiat",
    value: 10,
  },
  {
    text: "Fiat Confirmed",
    value: 11,
  },
  {
    text: "Fiat Failed",
    value: 12,
  },
  {
    text: "Waiting for Crypto",
    value: 13,
  },
  {
    text: "Crypto Confirmed",
    value: 14,
  },
  {
    text: "Crypto Failed",
    value: 15,
  },
  {
    text: "Awaiting Approval",
    value: 16,
  },
];

export function getLabelColorProcessingState(status?: number) {
  switch (status) {
    case 13:
    case 10: {
      return "warning";
    }

    case 14:
    case 11: {
      return "blue";
    }

    case 15:
    case 12: {
      return "error";
    }

    case 16: {
      return "gold";
    }

    default: {
      return "default";
    }
  }
}

export function getLabelProcessingState(status?: number) {

  const item = processingStatusData.find((e) => e.value === status);

  return item?.text;
}