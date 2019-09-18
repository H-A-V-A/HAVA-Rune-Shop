import React from 'react'
import {connect} from 'react-redux'
import {getCartTHUNK} from '../store/order'
import CartItem from './cartItem'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.sumCart = this.sumCart.bind(this)
  }

  componentDidMount() {
    this.props.getCart(this.props.user.id)
  }

  sumCart() {
    console.log(this.props)
    return this.props.cart.orderProducts.reduce((accum, orderProduct) => {
      return accum + orderProduct.quantity * orderProduct.product.price
    }, 0)
  }

  render() {
    return (
      <div className="content-body">
        <h2>Cart:</h2>
        <div className="flex wrap">
          {this.props.cart ? (
            this.props.cart.orderProducts.map(orderProduct => (
              <CartItem
                key={orderProduct.id}
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
        <button type="button">CHECKOUT</button>
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
