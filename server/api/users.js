const router = require('express').Router()
const {User, Order, OrderProduct, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/cart', async (req, res, next) => {
  try {
    if (req.user && req.user.id === Number(req.params.userId)) {
      const cart = await Order.findOne({
        where: {
          userId: req.params.userId,
          status: 'open'
        },
        include: {model: OrderProduct, include: [Product]}
      })
      res.json(cart)
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:userId/cart/update/:id', async (req, res, next) => {
  try {
    if (req.user && req.user.id === Number(req.params.userId)) {
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
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/:userId/cart/add/:id', async (req, res, next) => {
  try {
    const cart = await Order.findOne({where: {userId: req.params.userId}})

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
})

router.delete('/cart/delete', async (req, res, next) => {
  try {
    await OrderProduct.delete({
      where: {
        orderId: req.body.orderId,
        productId: req.body.productId
      }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
