const router = require('express').Router()
const {Order, OrderProduct, Product} = require('../db/models')
module.exports = router

router.post('/cart/add', (req, res, next) => {
  try {
    if (!req.session.cart) {
      req.session.cart = [
        {
          product: req.body.product,
          quantity: Number(req.body.qty)
        }
      ]
    } else {
      const matchingItem = req.session.cart.find(
        orderProduct => orderProduct.product.id === req.body.product.id
      )

      if (matchingItem) {
        matchingItem.quantity += Number(req.body.qty)
      } else {
        req.session.cart.push({
          product: req.body.product,
          quantity: Number(req.body.qty)
        })
      }
    }
    res.json(req.session.cart)
  } catch (error) {
    next(error)
  }
})

router.get('/cart', (req, res, next) => {
  try {
    if (req.session.cart) {
      res.json(req.session.cart)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/cart', (req, res, next) => {
  try {
    const matchingItem = req.session.cart.find(
      orderProduct => orderProduct.product.id === req.body.productId
    )
    matchingItem.quantity = Number(req.body.qty)
    res.json(req.session.cart)
  } catch (error) {
    next(error)
  }
})

router.delete('/cart/:productId', (req, res, next) => {
  try {
    req.session.cart = req.session.cart.filter(
      orderProduct => orderProduct.product.id !== Number(req.params.productId)
    )
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.put('/checkout', async (req, res, next) => {
  try {
    let order = await Order.create({userId: null, status: 'closed'})
    req.session.cart.forEach(async orderProduct => {
      await OrderProduct.create({
        orderId: order.id,
        productId: orderProduct.product.id,
        quantity: orderProduct.quantity
      })
      const product = await Product.findOne({
        where: {
          id: orderProduct.product.id
        }
      })
      await product.update({
        stock: product.stock - Number(orderProduct.quantity)
      })
    })
    req.session.cart = []
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
