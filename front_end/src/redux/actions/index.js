import { ADD_CART } from "../constants/action-types";
import { ADD_CART_FROMDB } from "../constants/action-types";

export function addCart(payload) {
  return { type: ADD_CART, payload };
}

export function addCartFromDB(payload) {
  return { type: ADD_CART_FROMDB, payload };
}
