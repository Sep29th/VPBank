import {Contract} from "../../../interfaces";

export const handleContract = (state: Contract = {
  id: null,
  user_id: null,
  contract_code: null,
  loan_money: null,
  payment_term: null,
  sign: null,
  current_status: null,
  created_at: null,
  updated_at: null
}, actions: { type: string, contract: Contract }): Contract => {
  switch (actions.type) {
    case "CONTRACT_RESET":
      return {...actions.contract};
    default:
      return state;
  }
}