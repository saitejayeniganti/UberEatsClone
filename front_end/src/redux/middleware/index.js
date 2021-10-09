import { ADD_CART } from "../constants/action-types";

export function addCartMiddleware({ dispatch }) {
  return function (next) {
    return function (action) {
      // if(action.type===ADD_CART)
      // {

      // }
      return next(action);
    };
  };
}
