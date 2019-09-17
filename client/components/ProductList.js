import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProductsTHUNK} from '../store/product'
import {Link} from 'react-router-dom'

class ProductList extends Component {
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
                <button type="button">AddToCart</button>
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
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  getAllProducts: () => dispatch(getProductsTHUNK())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
