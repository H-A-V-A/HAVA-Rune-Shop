import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const DELETE_ITEM = 'DELETE_ITEM'
const CLEAR_CART = 'CLEAR_CART'

/**
 * INITIAL STATE
 */
const initialState = {
  all: [], // rename to orderhistory if that's what it's for
  cart: {
    orderProducts: []
  }
}

/**
 * ACTION CREATORS
 */
const getCart = cart => ({type: GET_CART, cart})
const deleteItem = id => ({type: DELETE_ITEM, id})
const clearCart = () => ({type: CLEAR_CART})
/**
 * THUNK CREATORS
 */
export const getCartTHUNK = userId => {
  return async dispatch => {
    // don't forget try/catch
    let {data} = await axios.get(`/api/users/${userId}/cart`)
    dispatch(getCart(data))
  }
}

export const addToCartTHUNK = (userId, productId, qty) => {
  return async dispatch => {
    await axios.post(`/api/users/${userId}/cart/add/${productId}`, {qty})
    let {data} = await axios.get(`/api/users/${userId}/cart`)
    dispatch(getCart(data))
  }
}

export const updateCartTHUNK = (userId, productId, qty) => {
  return async dispatch => {
    await axios.put(`/api/users/${userId}/cart/update/${productId}`, {qty})
    let {data} = await axios.get(`/api/users/${userId}/cart`)
    dispatch(getCart(data))
  }
}

export const deleteItemTHUNK = (orderId, productId) => {
  return async dispatch => {
    await axios.delete(`/api/orders/${orderId}/${productId}`)
    dispatch(deleteItem(productId))
  }
}

export const placeOrderTHUNK = orderId => {
  return async dispatch => {
    await axios.put(`/api/orders/${orderId}`)
    dispatch(clearCart())
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {...state, cart: action.cart}
    case DELETE_ITEM:
      return {
        ...state,
        cart: {
          ...state.cart, // NICEEEEEEEEEE
          orderProducts: state.cart.orderProducts.filter(product => {
            return product.productId !== action.id
          })
        }
      }
    case CLEAR_CART:
      return {...state, cart: initialState.cart}
    default:
      return state
  }
}
