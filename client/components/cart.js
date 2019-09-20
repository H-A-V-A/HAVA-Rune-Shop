import React from 'react'
import {connect} from 'react-redux'
import {getCartTHUNK} from '../store/order'
import CartItem from './cartItem'
import {Link} from 'react-router-dom'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.sumCart = this.sumCart.bind(this)
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.props.getCart(this.props.user.id)
    }
  }

  sumCart() {
    return this.props.cart.orderProducts.reduce((accum, orderProduct) => {
      return accum + orderProduct.quantity * orderProduct.product.price
    }, 0)
  }

  render() {
    return (
      <div className="content-body">
        <h2>Cart:</h2>
        <div className="flex column">
          {this.props.cart ? (
            this.props.cart.orderProducts.map(orderProduct => (
              <CartItem
                key={orderProduct.product.id}
                product={orderProduct.product}
                quantity={orderProduct.quantity}
              />
            ))
          ) : (
            <h2>No items in cart!</h2>
          )}
        </div>
        <h3>
          Total: {this.props.cart ? `${this.sumCart()} ` : '0 '}
          <i className="fas fa-coins" />
        </h3>
        <Link to="/checkout">
          <button type="button">
            CHECKOUT <i className="fas fa-cash-register" />
          </button>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.orders.cart,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getCart: userId => dispatch(getCartTHUNK(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
