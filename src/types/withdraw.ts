import { PartnerType } from "./partner";

export interface WithdrawType {
  id: string;
  user_id: string;
  order_type: number;
  external_id: string;
  code: number;
  provider: number;
  amount: string;
  currency: string;
  rate: string;
  token_address: string;
  recipient: string;
  chain_id: number;
  partner_id: string;
  state: number;
  processing_state: number;
  body: Partial<Body>;
  pay_data: Partial<PayData>;
  expired_at: ExpiredAt;
  created_at: CreatedAt;
  updated_at: UpdatedAt;
  processing_time: number;
  payment_info: Partial<PaymentInfo>;
  client_ip: string;
  outcome: string;
  transactions: null | TransferInfo[];
  partner?: PartnerType;
  error?: OrderError;
}

interface OrderError {
  error_code: string;
  error_message: string;
  source: number;
  details: string;
  timestamp: string;
}

export interface Body {
  mchOrderNo: string;
  orderState: number;
  payData: string;
  payDataType: string;
  payOrderId: string;
}

export interface PayData {
  external_id: string;
  qr_image: string;
}

export interface ExpiredAt {
  seconds: number;
  nanos: number;
}

export interface CreatedAt {
  seconds: number;
  nanos: number;
}

export interface UpdatedAt {
  seconds: number;
  nanos: number;
}

export interface PaymentInfo {
  bank_id: number;
  full_name: string;
  account_type: number;
  account_number: string;
}

export interface TransferInfo {
  tx_hash: string;
  order_id: string;
  chain_id: number;
  body: Partial<Body>;
  status: number;
  block_number: number;
  nonce_used: number;
  created_at: CreatedAt;
}
