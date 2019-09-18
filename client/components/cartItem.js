import React from 'react'
import {connect} from 'react-redux'
import {deleteItemTHUNK} from '../store/order'

class CartItem extends React.Component {
  render() {
    const product = this.props.product
    let arr = []
    for (let i = 0; i < 10; i++) {
      arr.push(i + 1)
    }

    return (
      <div className="listed-product">
        <img src={product.imageUrl} />
        <h4>Product: {product.name}</h4>
        <label htmlFor="quantity">Quantity:</label>
        <select name="quantity">
          {arr.map(index => {
            if (index === this.props.quantity) {
              return (
                <option value={index} key={index} selected>
                  {index}
                </option>
              )
            } else {
              return (
                <option value={index} key={index}>
                  {index}
                </option>
              )
            }
          })}
        </select>
        <strong>
          Unit Price: {product.price} <i className="fas fa-coins" />
        </strong>
        <br />
        <button
          type="button"
          onClick={() => this.props.deleteItem(this.props.orderId, product.id)}
        >
          Remove Item
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orderId: state.orders.cart.id
})

const mapDispatchToProps = dispatch => ({
  deleteItem: (orderId, productId) =>
    dispatch(deleteItemTHUNK(orderId, productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(CartItem)
