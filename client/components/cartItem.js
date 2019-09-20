import React from 'react'
import {connect} from 'react-redux'
import {deleteItemTHUNK, updateCartTHUNK} from '../store/order'
import {Link} from 'react-router-dom'

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
      arr.push(i + 1)
    }

    return (
      <div className="cart-item">
        <img src={product.imageUrl} />
        <div className="cart-item-text">
          <Link to={`/products/${product.id}`}>
            <h3>{product.name}</h3>
          </Link>
          <p>
            Unit Price: {product.price} <i className="fas fa-coins" />
          </p>
          <p className="quantity-label">Quantity:</p>
          <select name="quantity" onChange={this.handleSelect}>
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
        </div>
        <button
          type="button"
          onClick={() =>
            this.props.deleteItem(
              this.props.user.id,
              this.props.orderId,
              product.id
            )
          }
        >
          <i className="fas fa-times" />
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
  deleteItem: (userId, orderId, productId) =>
    dispatch(deleteItemTHUNK(userId, orderId, productId)),
  updateCart: (userId, productId, qty) =>
    dispatch(updateCartTHUNK(userId, productId, qty))
})

export default connect(mapStateToProps, mapDispatchToProps)(CartItem)
