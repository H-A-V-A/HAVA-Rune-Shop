const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll({order: [['id', 'ASC']]})
    res.json(allProducts)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const singleProduct = await Product.findOne({
      where: {
        id
      }
    })
    res.json(singleProduct)
  } catch (error) {
    next(error)
  }
})

// router.put('/:id', async (req, res, next) => {
//   try {
//     console.log('BOOOOOODDDDDYDDDDD', req.body)
//     const singleProduct = await Product.findOne({
//       where: {
//         id: req.params.id
//       }
//     })
//     await singleProduct.update({ stock: singleProduct.stock - Number(req.body.quantity) })
//   } catch (error) {
//     next(error)
//   }
// })
