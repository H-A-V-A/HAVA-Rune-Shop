import React from 'react'
import {connect} from 'react-redux'
import {getCartTHUNK, placeOrderTHUNK} from '../store/order'

class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.sumCart = this.sumCart.bind(this)
  }

  componentDidMount() {
    console.log(this.props.user)
    this.props.getCart(this.props.user.id)
  }

  sumCart() {
    return this.props.cart.orderProducts.reduce((accum, orderProduct) => {
      return accum + orderProduct.quantity * orderProduct.product.price
    }, 0)
  }

  render() {
    return (
      <div className="content-body flex">
        <div className="checkout-left">
          <h3>Shipping Info:</h3>
          <p>The Products will be sent to: {this.props.user.email}</p>
          <h3>Payment:</h3>
          <p>It's on the Fullstack credit card!</p>
          <h3>Order Info:</h3>
          <ul>
            {this.props.cart.orderProducts.map(orderProduct => {
              const product = orderProduct.product
              return (
                <li key={orderProduct.id}>
                  {product.name} - {product.price}{' '}
                  <i className="fas fa-coins" />
                  x {orderProduct.quantity}
                </li>
              )
            })}
          </ul>
        </div>
        <div className="checkout-right">
          <p>
            Total before tax: {this.sumCart()} <i className="fas fa-coins" />{' '}
          </p>
          <p>
            Tax: {Math.floor(this.sumCart() / 10)}{' '}
            <i className="fas fa-coins" />{' '}
          </p>
          <p>
            Total: {Math.floor(this.sumCart() * 1.1)}{' '}
            <i className="fas fa-coins" />{' '}
          </p>
          <button
            type="button"
            onClick={() =>
              this.props.placeOrder(this.props.user.id, this.props.cart.id)
            }
          >
            Place Order
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.orders.cart,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getCart: userId => dispatch(getCartTHUNK(userId)),
  placeOrder: (userId, orderId) => dispatch(placeOrderTHUNK(userId, orderId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
