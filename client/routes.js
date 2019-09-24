import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  GuestHome,
  ProductList,
  Cart,
  SingleProduct,
  Unauthorized,
  NotFound
} from './components'
import {me} from './store'
import Checkout from './components/checkout'
import {getCartTHUNK} from './store/order'
import {PoseGroup} from 'react-pose'
import {ParentContainer} from './components/posed'
import OrderHistory from './components/orderHistory'
import StripyCheckout from './components/StripeComponent'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div className="content-body">
        <PoseGroup>
          <ParentContainer key={location.pathname}>
            <Switch>
              {/* Routes placed here are available to all visitors */}
              <Route path="/products/:id" component={SingleProduct} />
              <Route path="/products" component={ProductList} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/cart" component={Cart} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/unauthorized" component={Unauthorized} />
              <Route exact path="/" component={GuestHome} />

              <Route path="/stripe" component={StripyCheckout} />

              {isLoggedIn && (
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path="/home" component={UserHome} />
                  <Route path="/history" component={OrderHistory} />
                </Switch>
              )}

              {/* <Route path="/" component={GuestHome} /> */}
              {/* Displays our Login component as a fallback */}
              <Route component={NotFound} />
            </Switch>
          </ParentContainer>
        </PoseGroup>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    getCart(userId) {
      dispatch(getCartTHUNK(userId))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
