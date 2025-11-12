export const processingStatusData = [
    {
      text: "Waiting for Crypto",
      value: 20,
    },
    {
      text: "Crypto Received",
      value: 21,
    },
    {
      text: "Crypto Failed",
      value: 22,
    },
    {
      text: "Withdrawing Fiat",
      value: 23,
    },
    {
      text: "Fiat Sent",
      value: 24,
    },
    {
      text: "Fiat Failed",
      value: 25,
    },
  ];
  
  export function getLabelColorProcessingState(status?: number) {
    switch (status) {
      case 23:
      case 20: {
        return "warning";
      }
  
      case 21: {
        return "purple";
      }
      case 22: {
        return "error";
      }
  
      case 24: {
        return "blue";
      }
      case 25: {
        return "error";
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
  