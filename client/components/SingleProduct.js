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
      <div>
        <h1>{name}</h1>
        <img src={imageUrl} />
        <p>{description}</p>
        <p>Stock: {stock}</p>
        <p>Price: {price} X Gold pieces</p>
        <button type="button">AddToCart</button>
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
