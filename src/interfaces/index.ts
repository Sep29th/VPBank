export type User = {
  id: bigint | null,
  name: string | null,
  address: string | null,
  identification_card: string | null,
  date_identification_card: string | null,
  gender: string | null,
  birth_date: string | null,
  job: string | null,
  income: string | null,
  loan_purpose: string | null,
  phone_number: string | null,
  relative_phone_number: string | null,
  relationship: string | null,
  bank_name: string | null,
  bank_account_number: string | null,
  beneficiary_name: string | null,
  receive_address: string | null,
  name_receive_person: string | null,
  phone_receive_person: string | null,
  remaining_money: bigint | null,
  face_image: string | null,
  front_identification_card: string | null,
  back_identification_card: string | null,
  created_at: string | null,
  updated_at: string | null
}

export type Contract = {
  id: bigint | null,
  user_id: bigint | null,
  contract_code: string | null,
  loan_money: bigint | null,
  payment_term: number | null,
  sign: string | null,
  current_status: number | null,
  created_at: string | null,
  updated_at: string | null
}

export type Notification = {
  id: bigint | null,
  user_id: bigint | null,
  content: string | null,
  created_at: string | null,
  updated_at: string | null
}

export type History = {
  id: bigint | null,
  user_id: bigint | null,
  account_balance_fluctuations: string | null,
  content: string | null,
  comment: string | null,
  created_at: string | null,
  updated_at: string | null
}

export type propMessage = {
  success: any,
  error: any
}