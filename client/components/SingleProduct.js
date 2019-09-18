import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProductTHUNK} from '../store/singleProduct'

class SingleProduct extends Component {
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id)
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
      <div className="content-body">
        <h1>{name}</h1>
        <div className="flex">
          <div>
            <img src={imageUrl} />
          </div>
          <div className="item-detail">
            <h2>{description}</h2>
            <p>Stock: {stock}</p>
            <p>
              Price: {price} <i className="fas fa-coins" />
            </p>
            <button type="button">
              Add To Cart <i className="fas fa-cart-plus" />
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  selectedProduct: state.selectedProduct
})

const mapDispatchToProps = dispatch => ({
  getSingleProduct: id => dispatch(getSingleProductTHUNK(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
