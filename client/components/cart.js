import React from 'react'
import {connect} from 'react-redux'
import {getCartTHUNK} from '../store/order'
import CartItem from './cartItem'

class Cart extends React.Component {
  componentDidMount() {
    this.props.getCart(this.props.user.id)
  }

  render() {
    console.log(this.props)

    return (
      <div>
        <h2>Cart:</h2>
        <ul>
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
        </ul>
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
