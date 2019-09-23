import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProductTHUNK} from '../store/singleProduct'
import {addToCartTHUNK, addToGuestCartTHUNK} from '../store/order'
import {ContainerVertical} from '../components'

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

    if (this.props.user.id) {
      this.props.addToCart(
        this.props.user.id,
        this.props.match.params.id,
        this.state.quantity
      )
    } else {
      this.props.addToGuestCart(this.props.selectedProduct, this.state.quantity)
    }
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

    return (
      <ContainerVertical>
        <div className="flex">
          <div className="item-detail">
            <h1>{name}</h1>
            <div className="item-detail-box">
              <div>
                <img src={imageUrl} />
              </div>
              <div>
                <p>{description}</p>
                <hr />
                <div className="description">
                  <div className="labels">
                    <p>Price:</p>
                    <p>Stock:</p>
                  </div>
                  <div className="values">
                    <p>
                      {price} <i className="coin right" />
                    </p>
                    <p>{stock !== 0 ? `${stock}×` : 'Out of Stock!'}</p>
                  </div>
                </div>
                <div>
                  <form method="POST" onSubmit={this.handleSubmit}>
                    <select name="quantity" onChange={this.handleSelect}>
                      {[...Array(10)].map((option, index) => {
                        return (
                          <option value={index + 1} key={index}>
                            {index + 1}
                          </option>
                        )
                      })}
                    </select>
                    <hr />
                    <button type="submit">
                      Add To Cart <i className="fas fa-cart-plus" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContainerVertical>
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
    dispatch(addToCartTHUNK(userId, productId, qty)),
  addToGuestCart: (product, qty) => dispatch(addToGuestCartTHUNK(product, qty))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
