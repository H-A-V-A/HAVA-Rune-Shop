import React from 'react'
import {connect} from 'react-redux'
import {getHistoryTHUNK} from '../store/order'
import {ContainerVertical, ParentContainer} from './posed'
import {Link} from 'react-router-dom'

class OrderHistory extends React.Component {
  componentDidMount() {
    this.props.getHistory(this.props.user.id)
  }

  sumCart(order) {
    return order.orderProducts.reduce((accum, orderProduct) => {
      return accum + orderProduct.quantity * orderProduct.product.price
    }, 0)
  }

  render() {
    return (
      <div>
        <h1>Order History for {this.props.user.email}</h1>
        <hr />
        <ParentContainer className="flex column">
          <div>
            {this.props.history.map(order => {
              const orderDate = new Date(order.updatedAt)
              return (
                <ContainerVertical key={order.id}>
                  <h3>
                    Order #{order.id} – Date: {orderDate.toDateString()}
                  </h3>
                  <ul>
                    {order.orderProducts.map(orderProduct => {
                      return (
                        <li key={orderProduct.id}>
                          <Link to={`/products/${orderProduct.productId}`}>
                            {orderProduct.product.name} x{' '}
                            {orderProduct.quantity}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                  <h4>Total: {this.sumCart(order)}</h4>
                  <hr />
                </ContainerVertical>
              )
            })}
          </div>
        </ParentContainer>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  history: state.orders.history,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getHistory: userId => dispatch(getHistoryTHUNK(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
