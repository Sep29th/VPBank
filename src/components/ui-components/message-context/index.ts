import React, {createContext} from "react";
import {propMessage} from "../../../interfaces";

export const messageContext: React.Context<propMessage> = createContext({
  success: (): void => {
  }, error: (): void => {
  }
});