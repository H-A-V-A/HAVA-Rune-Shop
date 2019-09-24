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
      <ContainerVertical>
        <h1>Order History for {this.props.user.email}</h1>
        <hr />
        <ParentContainer className="flex column">
          <div>
            {this.props.history.map(order => {
              const orderDate = new Date(order.updatedAt)
              return (
                <div key={order.id}>
                  <h1>
                    Order #{order.id} – Date: {orderDate.toDateString()}
                  </h1>
                  {order.orderProducts.map(orderProduct => {
                    return (
                      <div key={orderProduct.id}>
                        <Link to={`/products/${orderProduct.productId}`}>
                          {orderProduct.product.name} x {orderProduct.quantity}
                        </Link>
                      </div>
                    )
                  })}
                  <h4>Total: {this.sumCart(order)}</h4>
                  <hr />
                </div>
              )
            })}
          </div>
        </ParentContainer>
      </ContainerVertical>
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
