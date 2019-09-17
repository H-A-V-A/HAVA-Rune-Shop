import React from 'react'

class CartItem extends React.Component {
  render() {
    const product = this.props.product

    return (
      <div>
        <img src={product.imageUrl} />
        <h4>Product: {product.name}</h4>
        Quantity:
        <select>
          <option value={this.props.quantity}>{this.props.quantity}</option>
        </select>
        <button type="button">Remove Item</button>
      </div>
    )
  }
}

export default CartItem
