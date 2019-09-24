const router = require('express').Router()
const {Order, OrderProduct, Product} = require('../db/models')
const auth = require('./auth')
module.exports = router

router.put('/:userId/cart/update', auth.isAuthorized, (req, res, next) => {
  try {
    const orderProduct = req.session.cart.orderProducts.find(product => {
      return product.productId === req.body.productId
    })

    orderProduct.quantity = Number(req.body.qty)

    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.post('/:userId/cart/add', auth.isAuthorized, (req, res, next) => {
  try {
    const orderProduct = req.session.cart.orderProducts.find(product => {
      return product.productId === req.body.product.id
    })
    if (orderProduct) {
      orderProduct.quantity += Number(req.body.qty)
    } else {
      req.session.cart.orderProducts.push({
        quantity: Number(req.body.qty),
        orderId: req.session.cart.id,
        productId: req.body.product.id,
        product: req.body.product
      })
    }

    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

router.delete(
  '/:userId/cart/:productId',
  auth.isAuthorized,
  (req, res, next) => {
    try {
      req.session.cart.orderProducts = req.session.cart.orderProducts.filter(
        orderProduct => {
          return orderProduct.productId !== Number(req.params.productId)
        }
      )
      res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }
)

router.put('/:userId/checkout/', auth.isAuthorized, async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.body.orderId,
        status: 'open'
      }
    })

    Promise.all(
      req.session.cart.orderProducts.forEach(async orderProduct => {
        let product1 = await Product.findOne({
          where: {id: orderProduct.productId}
        })
        if (orderProduct.quantity > product1.stock) {
          console.log('Qty over stock')
          const err = new Error('Quantity over Stock!')
          next(err)
        }
      })
    )

    await OrderProduct.destroy({
      where: {orderId: order.id}
    })

    Promise.all(
      req.session.cart.orderProducts.forEach(async orderProduct => {
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
    )

    await order.update({status: 'closed'})

    await Order.create({status: 'open', userId: req.user.id})
    req.session.cart = await Order.findOne({
      where: {
        userId: req.user.id,
        status: 'open'
      },
      include: {model: OrderProduct, include: [Product]}
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.get('/:userId/cart', auth.isAuthorized, async (req, res, next) => {
  try {
    if (!req.session.cart || !req.session.cart.id) {
      req.session.cart = await Order.findOne({
        where: {
          userId: req.params.userId,
          status: 'open'
        },
        include: {model: OrderProduct, include: [Product]}
      })
    }
    res.json(req.session.cart)
  } catch (error) {
    next(error)
  }
})
