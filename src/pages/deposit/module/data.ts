// 2, 6/ queryby ?sort_by=
// ORDER_SORT_FIELD_CREATED_AT  OrderSortField = 1
// ORDER_SORT_FIELD_UPDATED_AT  OrderSortField = 2
// ORDER_SORT_FIELD_EXPIRED_AT  OrderSortField = 3
// ORDER_SORT_FIELD_AMOUNT      OrderSortField = 4

// WAITING

// 5/ filter theo ?processing_states=
//  // Deposit flow
//  ORDER_PROCESSING_STATE_DEPOSIT_FIAT_PENDING              OrderProcessingState = 10 // Waiting for user to deposit fiat
//  ORDER_PROCESSING_STATE_DEPOSIT_FIAT_CONFIRMED            OrderProcessingState = 11 // Fiat deposit confirmed
//  ORDER_PROCESSING_STATE_DEPOSIT_FIAT_FAILED               OrderProcessingState = 12 // Fiat failed to deposit
//  ORDER_PROCESSING_STATE_DEPOSIT_FIAT_WAITING_FOR_APPROVAL OrderProcessingState = 16 // Waiting for admin approval of fiat transfer
//  ORDER_PROCESSING_STATE_DEPOSIT_CRYPTO_PENDING            OrderProcessingState = 13 // Waiting for USDT transfer on-chain
//  ORDER_PROCESSING_STATE_DEPOSIT_CRYPTO_CONFIRMED          OrderProcessingState = 14 // USDT transfer confirmed
//  ORDER_PROCESSING_STATE_DEPOSIT_CRYPTO_FAILED             OrderProcessingState = 15 // USDT failed to transfer
//  // Withdraw flow
//  ORDER_PROCESSING_STATE_WITHDRAW_CRYPTO_PENDING   OrderProcessingState = 20 // Waiting for user to send USDT
//  ORDER_PROCESSING_STATE_WITHDRAW_CRYPTO_CONFIRMED OrderProcessingState = 21 // USDT received/locked
//  ORDER_PROCESSING_STATE_WITHDRAW_CRYPTO_FAILED    OrderProcessingState = 22 // USDT failed to received/locked
//  ORDER_PROCESSING_STATE_WITHDRAW_FIAT_PENDING     OrderProcessingState = 23 // Waiting for fiat withdrawal processing
//  ORDER_PROCESSING_STATE_WITHDRAW_FIAT_CONFIRMED   OrderProcessingState = 24 // Fiat sent to user
//  ORDER_PROCESSING_STATE_WITHDRAW_FIAT_FAILED      OrderProcessingState = 25 // Fiat failed sent to user

// New
//   ORDER_PROCESSING_STATE_DEPOSIT_FIAT_PENDING     OrderProcessingState = 10 // Waiting for user to deposit fiat

//   ORDER_PROCESSING_STATE_WITHDRAW_FIAT_PENDING    OrderProcessingState = 23 // Waiting for fiat withdrawal processing

// Pending
//   ORDER_PROCESSING_STATE_DEPOSIT_FIAT_CONFIRMED    OrderProcessingState = 11 // Fiat deposit confirmed
//   ORDER_PROCESSING_STATE_DEPOSIT_CRYPTO_PENDING    OrderProcessingState = 13 // Waiting for USDT transfer on-chain

//   ORDER_PROCESSING_STATE_WITHDRAW_FIAT_CONFIRMED   OrderProcessingState = 24 // Fiat sent to user
//   ORDER_PROCESSING_STATE_WITHDRAW_CRYPTO_PENDING   OrderProcessingState = 20 // Waiting for user to send USDT

// Completed
//   ORDER_PROCESSING_STATE_DEPOSIT_CRYPTO_CONFIRMED  OrderProcessingState = 14 // USDT transfer confirmed

//   ORDER_PROCESSING_STATE_WITHDRAW_CRYPTO_CONFIRMED  OrderProcessingState = 21 // USDT received/locked

// Failed
//    ORDER_PROCESSING_STATE_DEPOSIT_FIAT_FAILED               OrderProcessingState = 12 // Fiat failed to deposit
//    ORDER_PROCESSING_STATE_DEPOSIT_CRYPTO_FAILED             OrderProcessingState = 15 // USDT failed to transfer

//    ORDER_PROCESSING_STATE_WITHDRAW_CRYPTO_FAILED    OrderProcessingState = 22 // USDT failed to received/locked
//    ORDER_PROCESSING_STATE_WITHDRAW_FIAT_FAILED      OrderProcessingState = 25 // Fiat failed sent to user

// Waiting
//    ORDER_PROCESSING_STATE_DEPOSIT_FIAT_WAITING_FOR_APPROVAL OrderProcessingState = 16 // Waiting for admin approval of fiat transfer

export enum STATUS {
  New = "New",
  Pending = "Pending",
  Completed = "Completed",
  Failed = "Failed",
  Waiting = "Waiting",
}

export function getStatus(status?: number) {
  switch (status) {
    case 10:
    case 23: {
      return "New";
    }

    case 11:
    case 13:
    case 20:
    case 24: {
      return "Pending";
    }

    case 14:
    case 21: {
      return "Completed";
    }

    case 12:
    case 15:
    case 22:
    case 25: {
      return "Failed";
    }

    case 16: {
      return "Waiting";
    }

    default:
      break;
  }
}

export function getColorStatus(status?: string) {
  switch (status) {
    case STATUS.New: {
      return "blue";
    }
    case STATUS.Pending: {
      return "warning";
    }
    case STATUS.Completed: {
      return "success";
    }
    case STATUS.Failed: {
      return "error";
    }
    case STATUS.Waiting: {
      return "gold";
    }
  }
}

export function getColorStatus2(status?: number) {
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

export function getStatus2(status?: number) {
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
