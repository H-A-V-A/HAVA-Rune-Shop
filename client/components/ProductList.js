import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProductsTHUNK} from '../store/product'
import {addToCartTHUNK, addToGuestCartTHUNK} from '../store/order'
import {Link} from 'react-router-dom'
import {ParentContainer, ContainerHorizontal} from '../components'

class ProductList extends Component {
  constructor() {
    super()
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  handleAddToCart(product) {
    if (this.props.user.id) {
      this.props.addToCart(this.props.user.id, product, 1)
    } else {
      this.props.addToGuestCart(product, 1)
    }
  }

  componentDidMount() {
    this.props.getAllProducts()
  }
  render() {
    return (
      <ParentContainer className="flex wrap products-list">
        {this.props.products ? (
          this.props.products.map(product => {
            return (
              <ContainerHorizontal key={product.id} className="listed-product">
                <Link to={`/products/${product.id}`}>
                  <h2>{product.name}</h2>
                  <img src={product.imageUrl} />
                </Link>
                <div className="stock-label">{product.stock}×</div>
                <div className="bottom-labels">
                  <div className="price-label">
                    <div className="coin left" />
                    {product.price}
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
              </ContainerHorizontal>
            )
          })
        ) : (
          <h1>Loading...</h1>
        )}
      </ParentContainer>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getAllProducts: () => dispatch(getProductsTHUNK()),
  addToCart: (userId, product, qty) =>
    dispatch(addToCartTHUNK(userId, product, qty)),
  addToGuestCart: (product, qty) => dispatch(addToGuestCartTHUNK(product, qty))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
