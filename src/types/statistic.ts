export interface StatisticType {
    meta: Meta
    series: Series[]
  }
  
  export interface Meta {
    description: string
    interval: string
    kind: string
    partner_id: string
  }
  
  export interface Series {
    data: Partial<Daum>[]
    name: string
  }
  
  export interface Daum {
    category: string
    pct_change: number
    previous: number
    ts: string
    value: number
  }
  