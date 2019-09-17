const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('orderProduct', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  }
})

module.exports = OrderProduct
