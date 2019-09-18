const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: 'No description Available'
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  price: {
    // I want you to figure out the floating point number
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
})

module.exports = Product
