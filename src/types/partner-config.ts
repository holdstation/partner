export interface PartnerConfigType {
  buffer_rate: BufferRate[] | null;
  chain_id: number | null;
  created_at: CreatedAt;
  partner_id: string;
  threshold: Threshold[] | null;
  token_address: string | null;
  updated_at: UpdatedAt;
}

export interface BufferRate {
  order_type: number;
  partner_share: number;
  rate: number;
}

export interface CreatedAt {
  nanos: number;
  seconds: number;
}

export interface Threshold {
  max: number;
  min: number;
  provider: number;
}

export interface UpdatedAt {
  nanos: number;
  seconds: number;
}
