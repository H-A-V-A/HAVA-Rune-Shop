import axios from 'axios'

const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

const getSingleProduct = selectedProduct => ({
  type: GET_SINGLE_PRODUCT,
  selectedProduct
})

export const getSingleProductTHUNK = id => {
  return async dispatch => {
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch(getSingleProduct(data))
  }
}

const selectedProduct = {}

export default function(state = selectedProduct, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.selectedProduct
    default:
      return state
  }
}
