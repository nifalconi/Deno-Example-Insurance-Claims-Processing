export interface Claim {
  amount: number
  id: number
}

export interface Insurer {
  balance: number
  id: number
}

export interface InsurersPerClaim {
  [claimId: number]: number[];
}