const {expect} = require('chai')
const request = require('supertest')
const app = require('../index')

describe('Guest Routes', () => {
  const dummyProduct1 = {
    id: 1,
    name: 'Health Potion'
  }
  const dummyProduct2 = {
    id: 5,
    name: 'Treasure Seeker Map'
  }

  describe('POST /guest/add', () => {
    it('can add a single item to guest cart', async () => {
      const res = await request(app)
        .post('/api/guest/cart/add')
        .send({product: dummyProduct1, qty: 1})

      expect(res.body[0].product.name).to.equal(dummyProduct1.name)
      expect(res.body[0].quantity).to.equal(1)
    })

    it('can add a quantity of items to guest cart', async () => {
      const res = await request(app)
        .post('/api/guest/cart/add')
        .send({product: dummyProduct2, qty: 3})

      expect(res.body[0].product.name).to.equal(dummyProduct2.name)
      expect(res.body[0].quantity).to.equal(3)
    })

    it('can add different types of items to guest cart', async () => {
      const agent = request.agent(app)
      await agent
        .post('/api/guest/cart/add')
        .send({product: dummyProduct2, qty: 3})
      const res = await agent
        .post('/api/guest/cart/add')
        .send({product: dummyProduct1, qty: 1})

      expect(res.body[0].product.name).to.equal(dummyProduct2.name)
      expect(res.body[0].quantity).to.equal(3)
      expect(res.body[1].product.name).to.equal(dummyProduct1.name)
      expect(res.body[1].quantity).to.equal(1)
    })

    it('can increase quantity of something in the cart', async () => {
      const agent = request.agent(app)
      await agent
        .post('/api/guest/cart/add')
        .send({product: dummyProduct1, qty: 1})
      const res = await agent
        .post('/api/guest/cart/add')
        .send({product: dummyProduct1, qty: 1})

      expect(res.body[0].product.name).to.equal(dummyProduct1.name)
      expect(res.body[0].quantity).to.equal(2)
    })
  })

  describe('GET /guest/cart', () => {
    it('returns the full cart', async () => {
      const agent = request.agent(app)
      await agent
        .post('/api/guest/cart/add')
        .send({product: dummyProduct1, qty: 1})
      await agent
        .post('/api/guest/cart/add')
        .send({product: dummyProduct2, qty: 7})
      const res = await agent.get('/api/guest/cart')

      expect(res.body[0].product.name).to.equal(dummyProduct1.name)
      expect(res.body[0].quantity).to.equal(1)
      expect(res.body[1].product.name).to.equal(dummyProduct2.name)
      expect(res.body[1].quantity).to.equal(7)
    })
  })

  describe('PUT /guest/cart', () => {
    it('updates the quantity of an item in cart', async () => {
      const agent = request.agent(app)
      await agent
        .post('/api/guest/cart/add')
        .send({product: dummyProduct1, qty: 1})
      const res = await agent
        .put('/api/guest/cart')
        .send({productId: dummyProduct1.id, qty: 3})

      expect(res.body[0].product.name).to.equal(dummyProduct1.name)
      expect(res.body[0].quantity).to.equal(3)
    })
  })
})
