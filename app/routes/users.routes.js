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

router.post('/:userId/shoppingCart', (req, res) => {
  const body = req.body
  const name1 = 'Toni'
  const { userId } = req.params
  res.json([
    {
      userId,
      name: name1,
      welcome: `Hola ${name1}`,
      products: body
    }
  ])
})

router.put('/:userId/paymentPage', (req, res) => {
  const { body, params: { userId } } = req;
  res.json([
    {
      name: 'Toni',
      welcome: `Hola Toni`,
      userId,
      tTotalPrice: body[0].price + body[1].price + body[2].price
    }
  ])
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  res.json(
    {
      message: "Deleted",
      id,
    }
  )
})

module.exports = router
