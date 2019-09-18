'use strict'

const db = require('../server/db')
const {User, Product, Order, OrderProduct} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'guthix@jagex.com', password: 'fullstackisawesome'})
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Health Potion',
      imageUrl: '/images/products/potionRed.png',
      description: 'Tastes like fruit punch.',
      stock: 500,
      price: 750
    }),
    Product.create({
      name: 'Mana Potion',
      imageUrl: '/images/products/potionBlue.png',
      description: 'Tastes blue.',
      stock: 500,
      price: 750
    }),
    Product.create({
      name: 'Stamina Potion',
      imageUrl: '/images/products/potionGreen.png',
      description: 'Not sure what it tastes like.',
      stock: 500,
      price: 750
    }),
    Product.create({
      name: 'Bag of Infinite Space',
      imageUrl: '/images/products/backpack.png',
      description: 'Fits two items.',
      stock: 200,
      price: 7500
    }),
    Product.create({
      name: 'Treasure Seeker Map',
      imageUrl: '/images/products/map.png',
      description: 'It leads to nothing.',
      stock: 300,
      price: 1200
    }),
    Product.create({
      name: 'Scroll of Knowledge',
      imageUrl: '/images/products/scroll.png',
      description:
        'Actually just the Treasure Seeker Map rolled up, but now 2× cooler looking.',
      stock: 300,
      price: 2400
    }),
    Product.create({
      name: 'Mystical Letter',
      imageUrl: '/images/products/envelope.png',
      description:
        'If you are thinking it is just a folded up Treasure Seeker Map, you might be correct.',
      stock: 300,
      price: 3600
    }),
    Product.create({
      name: 'The Forbidden Tome',
      imageUrl: '/images/products/tome.png',
      description:
        'If you look closely, you can see the pages are all made of the same map.',
      stock: 150,
      price: 6000
    }),
    Product.create({
      name: 'Bow of the Woodsman',
      imageUrl: '/images/products/bow.png',
      description: 'This bow is great for squirrels.',
      stock: 75,
      price: 15000
    }),
    Product.create({
      name: 'Mighty Bow of the Woodsman',
      imageUrl: '/images/products/upg_bow.png',
      description: 'This bow is great for mighty squirrels.',
      stock: 50,
      price: 30000
    }),
    Product.create({
      name: 'Dagger of Sharpness',
      imageUrl: '/images/products/dagger.png',
      description: 'The result of a sword being sharpened too much.',
      stock: 100,
      price: 15000
    }),
    Product.create({
      name: 'Gold Dagger of Sharpness',
      imageUrl: '/images/products/upg_dagger.png',
      description: 'Maybe adding some gold will entice you to buy this.',
      stock: 50,
      price: 25000
    })
  ])

  const orders = await Promise.all([
    Order.create({
      status: 'open',
      userId: 1
    })
  ])

  const orderProducts = await Promise.all([
    OrderProduct.create({
      quantity: 2,
      orderId: 1,
      productId: 6
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${orderProducts.length} order products`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
