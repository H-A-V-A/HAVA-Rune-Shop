const router = require('express').Router()
const {OrderProduct, Order} = require('../db/models')
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
      where: {id: req.params.orderId}
    })
    // look into findOrCreate to possibly remove the need to create again here
    await order.update({status: 'closed'})
    await Order.create({status: 'open', userId: req.user.id})
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
