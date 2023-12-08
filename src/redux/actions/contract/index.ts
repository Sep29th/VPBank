import {Contract} from "../../../interfaces";

export const resetContract = (contract: Contract): any => {
  return {
    type: "CONTRACT_RESET",
    contract: contract
  }
}