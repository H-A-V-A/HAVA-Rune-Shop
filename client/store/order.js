import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const DELETE_ITEM = 'DELETE_ITEM'
const CLEAR_CART = 'CLEAR_CART'
const REMOVE_USER = 'REMOVE_USER'
/**
 * INITIAL STATE
 */
const initialState = {
  history: [],
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
    try {
      if (userId) {
        let {data} = await axios.get(`/api/users/${userId}/cart`)
        dispatch(getCart(data))
      } else {
        let {data} = await axios.get('/api/guest/cart')
        dispatch(getCart({orderProducts: data}))
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export const addToCartTHUNK = (userId, productId, qty) => {
  return async dispatch => {
    try {
      await axios.post(`/api/users/${userId}/cart/add/${productId}`, {qty})
      let {data} = await axios.get(`/api/users/${userId}/cart`)
      dispatch(getCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateCartTHUNK = (userId, productId, qty) => {
  return async dispatch => {
    try {
      if (userId) {
        await axios.put(`/api/users/${userId}/cart/update/${productId}`, {qty})
        let {data} = await axios.get(`/api/users/${userId}/cart`)
        dispatch(getCart(data))
      } else {
        //make guest update cart route
        await axios.put('/api/guest/cart', {productId, qty})
        let {data} = await axios.get('/api/guest/cart')
        dispatch(getCart({orderProducts: data}))
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteItemTHUNK = (userId, orderId, productId) => {
  return async dispatch => {
    try {
      if (orderId) {
        await axios.delete(`/api/users/${userId}/cart/${orderId}/${productId}`)
        dispatch(deleteItem(productId))
      } else {
        await axios.delete(`/api/guest/cart/${productId}`)
        let {data} = await axios.get('/api/guest/cart')
        dispatch(getCart({orderProducts: data}))
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export const placeOrderTHUNK = (userId, orderId) => {
  return async dispatch => {
    try {
      await axios.put(`/api/users/${userId}/checkout/${orderId}`)
      dispatch(clearCart())
    } catch (error) {
      console.error(error)
    }
  }
}

export const addToGuestCartTHUNK = (product, qty) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/guest/cart/add`, {
        product,
        qty
      })
      dispatch(getCart({orderProducts: data}))
    } catch (error) {
      console.error(error)
    }
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
    case CLEAR_CART:
    case REMOVE_USER: //Fall through
      return {...state, cart: initialState.cart}
    default:
      return state
  }
}
