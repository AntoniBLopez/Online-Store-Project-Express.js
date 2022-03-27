const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router()

router.get('/', (req, res) => {

  const { size } = req.query

  const products = []

  const limit = size || 10

  for (let index = 0; index < limit; index++) {
    products.push({
    name: faker.commerce.productName(),
    price: Number(faker.commerce.price()),
    image: faker.image.imageUrl()
    })
  }

  res.json(products)
})

router.get('/:id', (req, res) => {
  const { id } = req.params

  res.json({
    id,
    name: 'Product2',
    price: 2000
  })
})

router.post('/', (req, res) => {
  const body = req.body

  res.json(
    {
      message: "Creation",
      data: body
    }
  )
})

router.patch('/:id', (req, res) => {

  const { id } = req.params

  const body = req.body

  res.json(
    {
      message: "Update",
      data: body,
      id,
    }
  )
})

router.delete('/:id', (req, res) => {

  const { id } = req.params

  // const body = req.body // aquí en delete no necesitamos añadir un cuerpo ( body ) -->
  // Simplemente queremos mandarle un identificador y que lo elimine

  res.json(
    {
      message: "Deleted",
      id,
    }
  )
})

module.exports = router
