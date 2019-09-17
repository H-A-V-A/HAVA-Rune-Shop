import React from 'react'

class CartItem extends React.Component {
  render() {
    const product = this.props.product

    return (
      <div className="listed-product">
        <img src={product.imageUrl} />
        <h4>Product: {product.name}</h4>
        <label htmlFor="quantity">Quantity:</label>
        <select name="quantity">
          <option value={this.props.quantity}>{this.props.quantity}</option>
        </select>
        <strong>Price: {product.price}</strong>
        <br />
        <button type="button">Remove Item</button>
      </div>
    )
  }
}

export default CartItem
