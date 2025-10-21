export interface PartnerType {
  id: string;
  name: string;
  description: string;
  buffer_rate: number;
  app_key: string;
  default_user: string;
  created_at: CreatedAt;
  updated_at: UpdatedAt;
  checksum_key: string;
  purpose: number;
  limit?:Limit[]
}

export interface CreatedAt {
  seconds: number;
  nanos: number;
}

export interface UpdatedAt {
  seconds: number;
  nanos: number;
}


export interface Limit {
  min: number;
  max: number;
  order_type:number;
}
