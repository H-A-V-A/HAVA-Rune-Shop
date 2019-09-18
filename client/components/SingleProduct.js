import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProductTHUNK} from '../store/singleProduct'
import {addToCartTHUNK} from '../store/order'
import Axios from 'axios'

class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.addToCart(
      this.props.user.id,
      this.props.match.params.id,
      this.state.quantity
    )
  }

  handleSelect(event) {
    this.setState({
      quantity: event.target.value
    })
  }

  render() {
    const {
      name,
      description,
      imageUrl,
      stock,
      price
    } = this.props.selectedProduct
    let arr = []
    for (let i = 0; i < 10; i++) {
      arr.push(i + 1)
    }
    return (
      <div className="content-body">
        <h1>{name}</h1>
        <div className="flex width-70">
          <div className="item-img">
            <img src={imageUrl} />
          </div>
          <div className="item-detail">
            <h2>{description}</h2>
            <p>
              Price: {price} <i className="fas fa-coins" />
            </p>
            <p>Available Stock: {stock}</p>
            <form method="POST" onSubmit={this.handleSubmit}>
              <select name="quantity" onChange={this.handleSelect}>
                {arr.map(index => {
                  return (
                    <option value={index} key={index}>
                      {index}
                    </option>
                  )
                })}
              </select>
              <button type="submit">
                Add To Cart <i className="fas fa-cart-plus" />
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  selectedProduct: state.selectedProduct,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getSingleProduct: id => dispatch(getSingleProductTHUNK(id)),
  addToCart: (userId, productId, qty) =>
    dispatch(addToCartTHUNK(userId, productId, qty))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
