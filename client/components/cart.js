import React from 'react'
import {connect} from 'react-redux'
import {getCartTHUNK} from '../store/order'
import CartItem from './cartItem'
import {Link} from 'react-router-dom'
import {ParentContainer, ContainerVertical} from '../components'

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
      <ContainerVertical className="cart">
        <h1>Cart</h1>
        <ParentContainer className="flex column">
          {this.props.cart.orderProducts.length ? (
            this.props.cart.orderProducts.map(orderProduct => (
              <CartItem
                key={orderProduct.product.id}
                product={orderProduct.product}
                quantity={orderProduct.quantity}
              />
            ))
          ) : (
            <h2 id="no-items">No items in cart!</h2>
          )}
        </ParentContainer>
        <h2>
          <div id="cart-total">
            <p>Total: </p>
            <p id="cart-price">
              {this.props.cart ? `${this.sumCart()} ` : '0'}
              <i className="coin right" />
            </p>
          </div>
          <Link to="/checkout">
            <button
              type="button"
              disabled={!this.props.cart.orderProducts.length}
            >
              Checkout <i className="fas fa-shopping-basket" />
            </button>
          </Link>
        </h2>
      </ContainerVertical>
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
