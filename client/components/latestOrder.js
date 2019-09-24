import React from 'react'
import {connect} from 'react-redux'
import {getHistoryTHUNK} from '../store/order'
import {ParentContainer} from './posed'
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
    const latest = this.props.history.length - 1
    if (this.props.history[latest]) {
      const orderDate = new Date(this.props.history[latest].updatedAt)

      return (
        <div className="flex column">
          <h4>Latest Order – Date: {orderDate.toDateString()}</h4>
          <ul>
            {this.props.history[latest].orderProducts.map(orderProduct => {
              return (
                <li key={orderProduct.id}>
                  <Link to={`/products/${orderProduct.productId}`}>
                    {orderProduct.product.name} x {orderProduct.quantity}
                  </Link>
                </li>
              )
            })}
          </ul>
          <h4>Total: {this.sumCart(this.props.history[latest])}</h4>
          <Link to="/history">
            <button type="button">View All</button>
          </Link>
        </div>
      )
    } else {
      return <h4>No history available</h4>
    }
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
