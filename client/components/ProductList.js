import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProductsTHUNK} from '../store/product'
import {addToCartTHUNK, addToGuestCartTHUNK} from '../store/order'
import {Link} from 'react-router-dom'

class ProductList extends Component {
  constructor() {
    super()
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  handleAddToCart(product) {
    if (this.props.user.id) {
      this.props.addToCart(this.props.user.id, product.id, 1)
    } else {
      this.props.addToGuestCart(product, 1)
    }
  }

  componentDidMount() {
    this.props.getAllProducts()
  }
  render() {
    return (
      <div className="flex wrap products-list">
        {this.props.products ? (
          this.props.products.map(product => {
            return (
              <div key={product.id} className="listed-product">
                <Link to={`/products/${product.id}`}>
                  <h2>{product.name}</h2>

                  <img src={product.imageUrl} />
                </Link>
                <div>{product.stock}×</div>
                <div>
                  <i className="fas fa-coins" /> {product.price}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    this.handleAddToCart(product)
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
  addToCart: (userId, productId, qty) =>
    dispatch(addToCartTHUNK(userId, productId, qty)),
  addToGuestCart: (product, qty) => dispatch(addToGuestCartTHUNK(product, qty))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
