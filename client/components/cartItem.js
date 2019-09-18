import React from 'react'
import {connect} from 'react-redux'
import {deleteItemTHUNK, updateCartTHUNK} from '../store/order'

class CartItem extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(event) {
    this.setState({
      quantity: event.target.value
    })
    setTimeout(() => {
      this.props.updateCart(
        this.props.user.id,
        this.props.product.id,
        this.state.quantity
      )
    }, 0)
  }

  render() {
    const product = this.props.product
    let arr = []
    for (let i = 0; i < 10; i++) {
      // .....wut
      // the nerve...the audacity
      arr.push(i + 1)
    }

    return (
      <div className="listed-product">
        <img src={product.imageUrl} />
        <h4>Product: {product.name}</h4>
        <label htmlFor="quantity">Quantity:</label>
        <select name="quantity" onChange={this.handleSelect}>
          {arr.map(index => {
            // better ways to do this
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
  orderId: state.orders.cart.id,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  deleteItem: (orderId, productId) =>
    dispatch(deleteItemTHUNK(orderId, productId)),
  updateCart: (userId, productId, qty) =>
    dispatch(updateCartTHUNK(userId, productId, qty))
})

export default connect(mapStateToProps, mapDispatchToProps)(CartItem)
