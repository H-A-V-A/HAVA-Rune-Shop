/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Product = db.model('product')
const Order = db.model('order')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  xdescribe('/api/users/cart', () => {
    const codysEmail = 'cody@puppybook.com'

    // beforeEach(() => {
    //   const user =  User.create({
    //     email: codysEmail,
    //     password: '123'
    //   })
    // })

    it('GET /api/users/cart', async () => {
      const user = User.create({
        email: codysEmail,
        password: '123'
      })
      const res = await request(app)
        .get(`/api/users/1/cart`)
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.userId).to.be.equal(user.id)
    })

    it('POST /api/users/1/cart/add/1', async () => {
      const user = await User.create({
        email: codysEmail,
        password: '123'
      })
      const order = await Order.create({
        userId: user.id,
        status: 'open'
      })
      console.log(user)
      const product = await Product.create({
        name: 'Health Potion',
        imageUrl: '/images/products/potionRed.png',
        description: 'test Potion',
        stock: '30',
        price: '750'
      })
      console.log(product)
      const res = await request(app)
        .post(`/api/users/1/cart/add/1`)
        .expect(201)

      const res2 = await request(app)
        .get(`/api/users/1/cart`)
        .expect(200)

      expect(res2.body).to.be.an('object')
      expect(res2.body.orderProducts[0].productId).to.be.equal(product.id)
    })
    // it('GET /api/users/1/cart', async () => {
    //   const res = await request(app)
    //     .get('/api/users/1/cart')
    //     .expect(200)

    //   expect(res.body).to.be.an('object')
    //   expect(res.body[0].userId).to.be.equal(1)

    // })

    // it('GET /api/users/1')
  }) // end describe('/api/users')
}) // end describe('User routes')
