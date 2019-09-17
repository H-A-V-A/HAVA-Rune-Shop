import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'

/**
 * INITIAL STATE
 */
const initialState = {
  all: [],
  cart: {
    orderProducts: []
  }
}

/**
 * ACTION CREATORS
 */
const getCart = cart => ({type: GET_CART, cart})

/**
 * THUNK CREATORS
 */
export const getCartTHUNK = userId => {
  return async dispatch => {
    let {data} = await axios.get(`/api/users/${userId}/cart`)
    dispatch(getCart(data))
  }
}

export const addToCartTHUNK = (userId, productId) => {
  return async dispatch => {
    await axios.post(`/api/users/${userId}/cart/add/${productId}`)
    let {data} = await axios.get(`/api/users/${userId}/cart`)
    dispatch(getCart(data))
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {...state, cart: action.cart}
    default:
      return state
  }
}
