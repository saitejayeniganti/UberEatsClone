import {
  ADD_CART,
  ADD_CART_FROMDB,
  EMPTY_CART,
} from "../constants/action-types";

const initState = {
  cart: [],
};

//

const rootReducer = (state = initState, action) => {
  if (action.type == ADD_CART) {
    let storeCart = state.cart;
    for (let id in storeCart) {
      if (storeCart[id].dishId == action.payload.dishId) {
        storeCart[id].quantity = action.payload.quantity;
        break;
      }
      if (id == storeCart.length - 1) storeCart.push(action.payload);
    }
    let fin = [];
    if (state.cart.length === 0) fin = [action.payload];
    else fin = [...storeCart];
    return Object.assign({}, state, {
      cart: fin,
    });
  }
  if (action.type == ADD_CART_FROMDB) {
    return Object.assign({}, state, {
      cart: action.payload,
    });
  }
  if (action.type == EMPTY_CART) {
    return Object.assign({}, state, {
      cart: [],
    });
  }
  return state;
};

export default rootReducer;
