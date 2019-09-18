import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'

/**
 * INITIAL STATE
 */
const products = []

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products})

/**
 * THUNK CREATORS
 */

export const getProductsTHUNK = () => {
  return async dispatch => {
    // don't forget try/catch
    const {data} = await axios.get('/api/products')
    dispatch(getProducts(data))
  }
}

/**
 * REDUCER
 */
export default function(state = products, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
