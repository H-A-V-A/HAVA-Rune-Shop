import React from 'react'
import {connect} from 'react-redux'
import {deleteItemTHUNK, updateCartTHUNK} from '../store/order'
import {Link} from 'react-router-dom'
import {ContainerVertical} from '../components'

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
    return (
      <ContainerVertical className="cart-item">
        <img src={product.imageUrl} />
        <div className="cart-item-text">
          <Link to={`/products/${product.id}`}>
            <h3>{product.name}</h3>
          </Link>
          <div>
            <p>
              Unit Price: {product.price} <i className="fas fa-coins" />
            </p>
            <div>
              <p className="quantity-label">Quantity:</p>
              <select
                name="quantity"
                onChange={this.handleSelect}
                defaultValue={this.props.quantity}
              >
                {[
                  ...Array(this.props.quantity > 10 ? this.props.quantity : 10)
                ].map((option, index) => {
                  return (
                    <option value={index + 1} key={index}>
                      {index + 1}
                    </option>
                  )
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
              Remove
            </button>
          </div>
        </div>
      </ContainerVertical>
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
