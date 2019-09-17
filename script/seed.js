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
      name: 'easter egg',
      imageUrl:
        'https://oldschool.runescape.wiki/images/thumb/7/74/Easter_egg_detail.png/200px-Easter_egg_detail.png?e96cb',
      description: 'look at all the pretty colors',
      stock: 500,
      price: 1200
    }),
    Product.create({
      name: 'rune scimitar',
      imageUrl:
        'https://oldschool.runescape.wiki/images/2/25/Rune_scimitar_detail.png?73c56',
      description: 'It is sharp',
      stock: 15,
      price: 42000
    }),
    Product.create({
      name: 'party hat (red)',
      imageUrl:
        'https://oldschool.runescape.wiki/images/thumb/d/dd/Red_partyhat_detail.png/240px-Red_partyhat_detail.png?b9481',
      description: 'so expensive. it is a party',
      stock: 3,
      price: 200000
    }),
    Product.create({
      name: 'party hat (yellow)',
      imageUrl:
        'https://oldschool.runescape.wiki/images/thumb/2/24/Yellow_partyhat_detail.png/240px-Yellow_partyhat_detail.png?d7f85',
      description: 'so expensive. it is a party, feeling yellow',
      stock: 6,
      price: 200000
    }),
    Product.create({
      name: 'party hat (blue)',
      imageUrl:
        'https://oldschool.runescape.wiki/images/thumb/9/92/Blue_partyhat_detail.png/240px-Blue_partyhat_detail.png?d81d8',
      description: 'BLUE PARTY BLUE PARTY I am blue dabidi dabidie',
      stock: 2,
      price: 200000
    }),
    Product.create({
      name: 'party hat (purple)',
      imageUrl:
        'https://oldschool.runescape.wiki/images/thumb/4/4d/Purple_partyhat_detail.png/240px-Purple_partyhat_detail.png?a8d1a',
      description: 'PURPLE is not a real color your eyes are deceiving you',
      stock: 7,
      price: 200000
    }),
    Product.create({
      name: 'party hat (green)',
      imageUrl:
        'https://oldschool.runescape.wiki/images/thumb/0/08/Green_partyhat_detail.png/240px-Green_partyhat_detail.png?678bf',
      description: 'Green Day all day everyday',
      stock: 4,
      price: 200000
    }),
    Product.create({
      name: 'party hat (white)',
      imageUrl:
        'https://oldschool.runescape.wiki/images/thumb/2/22/White_partyhat_detail.png/240px-White_partyhat_detail.png?d7f85',
      description: 'So boring who would ever choose this',
      stock: 2,
      price: 200000
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
