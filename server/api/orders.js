const router = require('express').Router()
const {OrderProduct, Order, Product} = require('../db/models')
module.exports = router

router.delete('/:orderId/:productId', async (req, res, next) => {
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

router.put('/:orderId', async (req, res, next) => {
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
