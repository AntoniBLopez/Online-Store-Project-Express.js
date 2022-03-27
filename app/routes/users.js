const express = require('express');

const router = express.Router()

router.get('/', (req, res) => {
  const { limit, offset } = req.query

  if (limit && offset) {
    res.json({
      limit,
      offset,
    })
  } else {
    res.send('No hay parámetros')
  }
})

router.get('/:userId/shoppingCart', (req, res) => {

  const name1 = 'Toni'

  const { userId } = req.params

  res.json([
    {
      userId,
      name: name1,
      welcome: `Hola ${name1}`,
      products: [
        {
          name: 'sofa',
          price: 1000
        },
        {
          name: 'fridge',
          price: 1200
        },
        {
          name: 'washing machine',
          price: 2300
        }
      ]
    }
  ])
})

router.get('/:userId/paymentPage', (req, res) => {

  const { userId } = req.params

  res.json([
    {
      userId,
      name: 'Toni',
      welcome: `Hola Toni`,
      products: [
        {
          name: 'sofa',
          price: 1000
        },
        {
          name: 'fridge',
          price: 1200
        },
        {
          name: 'washing machine',
          price: 2300
        }
      ]
    }
  ])
})

module.exports = router
