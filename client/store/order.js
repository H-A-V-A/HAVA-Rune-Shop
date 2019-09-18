import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const DELETE_ITEM = 'DELETE_ITEM'

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
const deleteItem = id => ({type: DELETE_ITEM, id})
/**
 * THUNK CREATORS
 */
export const getCartTHUNK = userId => {
  return async dispatch => {
    let {data} = await axios.get(`/api/users/${userId}/cart`)
    dispatch(getCart(data))
  }
}

export const addToCartTHUNK = (userId, productId, qty) => {
  console.log(qty)
  return async dispatch => {
    await axios.post(`/api/users/${userId}/cart/add/${productId}`, {qty})
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
          ...state.cart,
          orderProducts: state.cart.orderProducts.filter(product => {
            return product.productId !== action.id
          })
        }
      }
    default:
      return state
  }
}
