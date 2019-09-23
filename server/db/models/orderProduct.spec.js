const {expect} = require('chai')
const {Order, Product, OrderProduct, User} = require('./index')
const db = require('../db.js')

describe('orderProduct model', () => {
  beforeEach(() => db.sync({force: true}))

  describe('column definitions and validations', () => {
    it('has a `quantity`, `orderId`, and `productId`', async () => {
      const orderProduct = await OrderProduct.create({
        quantity: 5
      })

      expect(orderProduct.quantity).to.equal(5)
    })

    it('`quantity` is required', () => {
      const orderProduct = OrderProduct.build()
      return orderProduct.validate().then(
        () => {
          throw new Error('Validation should have failed!')
        },
        err => {
          expect(err).to.be.an('error')
        }
      )
    })

    it('has a one-many relationship with Order and Product', async () => {
      const user = await User.create({
        email: 'henc@email.com',
        password: 'password',
        salt: 'saltypassword',
        googleId: 0
      })
      const orderProduct = await OrderProduct.create({
        quantity: 1
      })
      const order = await Order.create({
        status: 'open'
      })
      const product = await Product.create({
        name: 'Test Product 1',
        stock: 100,
        price: 100
      })

      await order.setUser(user)
      await orderProduct.setProduct(product)
      await orderProduct.setOrder(order)

      expect(orderProduct.orderId).to.be.equal(order.id)
      expect(orderProduct.productId).to.be.equal(product.id)
    })
  })
})
