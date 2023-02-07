import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';
export const Store = createContext();

//const savedCart = Cookies.get('cart');
const initialState = {
  cart: Cookies.get('cart')
    ? JSON.parse(Cookies.get('cart'))
    : {
        cartItems: [],
        shippingAddress: {},
        paymentMethod: '',
      },
};

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      const updatedCart = { ...state.cart, cartItems };
      Cookies.set('cart', JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart };
    }
    case 'CART_REMOVE_ITEM': {
      const actionItem = action.payload;
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== actionItem.slug
      );
      const updatedCart = { ...state.cart, cartItems };
      Cookies.set('cart', JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart };
    }
    case 'CART_UPDATE_ITEM_QTY': {
      const newQuantity = action.payload.quantity;
      const updateItem = action.payload.item;

      const cartItems = state.cart.cartItems.map((item) => {
        if (item.slug === updateItem.slug) {
          item.quantity = newQuantity;
        }
        return item;
      });
      const updatedCart = { ...state.cart, cartItems };
      Cookies.set('cart', JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart };
    }

    case 'CART_CLEAR_ITEMS':
      return { ...state, cart: { ...state.cart, cartItems: [] } };

    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            ...action.payload,
          },
        },
      };

    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
        },
      };

    case 'CART_RESET':
      return {
        ...state,
        cart: {
          cartItems: [],
          shippingAddress: { location: {} },
          paymentMethod: '',
        },
      };
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{children}</Store.Provider>;
}
