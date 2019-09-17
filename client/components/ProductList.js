import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProductsTHUNK} from '../store/product'
import {addToCartTHUNK} from '../store/order'
import {Link} from 'react-router-dom'

class ProductList extends Component {
  constructor() {
    super()
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  handleAddToCart(productId) {
    console.log('PRODUCT ID: ', productId)
    console.log('USER ID: ', this.props.user.id)
    this.props.addToCart(this.props.user.id, productId)
  }

  componentDidMount() {
    this.props.getAllProducts()
  }
  render() {
    return (
      <div className="flex">
        {this.props.products ? (
          this.props.products.map(product => {
            return (
              <div key={product.id} className="listed-product">
                <Link to={`products/${product.id}`}>
                  <h3>{product.name}</h3>
                  <img src={product.imageUrl} />
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    this.handleAddToCart(product.id)
                  }}
                >
                  AddToCart
                </button>
              </div>
            )
          })
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getAllProducts: () => dispatch(getProductsTHUNK()),
  addToCart: (userId, productId) => dispatch(addToCartTHUNK(userId, productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
