import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

class Navbar extends React.Component {
  render() {
    const {handleClick, isLoggedIn, cart} = this.props

    return (
      <div id="header">
        <Link to="/">
          <img id="logo" src="/images/HavasRuneshop.png" />
        </Link>
        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <div className="nav-left">
                <Link to="/products">Products</Link>
              </div>
              <div className="nav-right">
                <Link to="/home">Home</Link>
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
                <Link to="/cart" id="cart-nav">
                  <i className="fas fa-shopping-cart" />
                  <div id="cart-qty">
                    {cart.orderProducts.reduce((totalItems, product) => {
                      return totalItems + product.quantity
                    }, 0)}
                  </div>
                </Link>
              </div>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <div className="nav-left">
                <Link to="/products">Products</Link>
              </div>
              <div className="nav-right">
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
                <Link to="/cart" id="cart-nav">
                  <i className="fas fa-shopping-cart" />
                  <div id="cart-qty">
                    {cart.orderProducts.reduce((totalItems, product) => {
                      return totalItems + product.quantity
                    }, 0)}
                  </div>
                </Link>
              </div>
            </div>
          )}
        </nav>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.orders.cart
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
