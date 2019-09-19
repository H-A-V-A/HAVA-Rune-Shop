const router = require('express').Router()
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
        matchingItem.quantity += req.body.qty
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
    req.session.cart = req.session.cart.filter(orderProduct => {
      if (orderProduct.product.id === req.params.id) {
        return false
      } else {
        return true
      }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
