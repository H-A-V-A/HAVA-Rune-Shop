import React from 'react'
import {connect} from 'react-redux'
import {deleteItemTHUNK} from '../store/order'

class CartItem extends React.Component {
  render() {
    const product = this.props.product

    return (
      <div className="listed-product">
        <img src={product.imageUrl} />
        <h4>Product: {product.name}</h4>
        <label htmlFor="quantity">Quantity:</label>
        <select name="quantity">
          <option value={this.props.quantity}>{this.props.quantity}</option>
        </select>
        <strong>
          Price: {product.price} <i className="fas fa-coins" />
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
