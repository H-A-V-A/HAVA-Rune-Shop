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
    this.props.addToCart(this.props.user.id, productId)
  }

  componentDidMount() {
    this.props.getAllProducts()
  }
  render() {
    return (
      <div className="flex products-list">
        {this.props.products ? (
          this.props.products.map(product => {
            return (
              <div key={product.id} className="listed-product">
                <Link to={`products/${product.id}`}>
                  <h2>{product.name}</h2>
                  <img src={product.imageUrl} />
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    this.handleAddToCart(product.id)
                  }}
                >
                  <i className="fas fa-cart-plus" />
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
