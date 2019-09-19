const router = require('express').Router()
const {User, Order, OrderProduct, Product} = require('../db/models')
module.exports = router

// router.get('/', async (req, res, next) => {
//   try {
//     const users = await User.findAll({
//       // explicitly select only the id and email fields - even though
//       // users' passwords are encrypted, it won't help if we just
//       // send everything to anyone who asks!
//       attributes: ['id', 'email']
//     })
//     res.json(users)
//   } catch (err) {
//     next(err)
//   }
// })

router.post('/guest/cart/add/:id', (req, res, next) => {
  try {
    if (!req.session.cart) {
      req.session.cart = [
        {
          productId: req.params.id,
          quantity: Number(req.body.qty),
          price: req.body.price
        }
      ]
    } else {
      req.session.cart.push({
        productId: req.params.id,
        quantity: Number(req.body.qty),
        price: req.body.price
      })
    }
    res.json(req.session.cart)
  } catch (error) {
    next(error)
  }
})

router.get('/guest/cart', (req, res, next) => {
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
})
