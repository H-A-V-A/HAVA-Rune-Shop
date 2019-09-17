import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProductsTHUNK} from '../store/product'

class ProductList extends Component {
  componentDidMount() {
    this.props.getAllProducts()
  }
  render() {
    return (
      <div>
        {this.props.products ? (
          this.props.products.map(product => {
            return (
              <div key={product.id}>
                <h3>{product.name}</h3>
                <img src={product.imageUrl} />
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
