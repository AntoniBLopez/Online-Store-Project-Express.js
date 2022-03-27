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

router.patch('/:id', (req, res) => { // lo usamos como el post porque también recibe un body pero -->
  // tenemos que recibir un id ( el id del producto que el usuario quiere editar )

  const { id } = req.params // obtenemos los parámetros

  const body = req.body

  res.json(// enviamos una respuesta con un tipo de dato json
    {
      message: "Update",
      data: body, // le devolvemos el body que nos ha enviado ( los datos )
      id, // le devolvemos el parámetro
    }
  )
})

module.exports = router
