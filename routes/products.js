const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router() // Le añadimos un enrutador que es como crear una "mini app" para luego vincularlo con la app principal

// escoger la cantidad que queremos crear de productos asignándole un número a un parámetro query

router.get('/', (req, res) => { // Le he quitado el endpoint principal products porque luego lo voy a asignar en la app principal que es donde voy a importar este archivo

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

module.exports = router
