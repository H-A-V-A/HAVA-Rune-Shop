const router = require('express').Router()
const {Order, OrderProduct, Product} = require('../db/models')
const auth = require('./auth')
module.exports = router

router.get('/:userId/cart', auth.isAuthorized, async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'open'
      },
      include: {model: OrderProduct, include: [Product]}
    })
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

router.put(
  '/:userId/cart/update/:id',
  auth.isAuthorized,
  async (req, res, next) => {
    try {
      const cart = await Order.findOne({
        where: {
          userId: req.params.userId,
          status: 'open'
        },
        include: {model: OrderProduct, include: [Product]}
      })

      const orderProduct = await OrderProduct.findOne({
        where: {orderId: cart.id, productId: req.params.id}
      })

      orderProduct.update({
        quantity: Number(req.body.qty)
      })
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  '/:userId/cart/add/:id',
  auth.isAuthorized,
  async (req, res, next) => {
    try {
      const cart = await Order.findOne({
        where: {userId: req.params.userId, status: 'open'}
      })

      const orderProduct = await OrderProduct.findOne({
        where: {orderId: cart.id, productId: req.params.id}
      })

      if (orderProduct) {
        await orderProduct.update({
          quantity: orderProduct.quantity + Number(req.body.qty)
        })
      } else {
        await OrderProduct.create({
          quantity: req.body.qty,
          orderId: cart.id,
          productId: req.params.id
        })
      }

      res.status(201)
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:userId/cart/:orderId/:productId', async (req, res, next) => {
  try {
    await OrderProduct.destroy({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId
      }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.put('/:userId/checkout/:orderId/', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.orderId,
        status: 'open'
      }
    })
    await order.update({status: 'closed'})
    await Order.create({status: 'open', userId: req.user.id})
    console.log('order', order)
    const orderProduct = await OrderProduct.findOne({
      where: {
        orderId: order.id
      }
    })
    const product = await Product.findOne({
      where: {
        id: orderProduct.productId
      }
    })
    await product.update({stock: product.stock - Number(orderProduct.quantity)})
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
