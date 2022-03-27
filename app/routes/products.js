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

router.post(('/'), (req, res) => { // .post sirve para crear algo a partir de una petición que nos hace el usuario
  const body = req.body // Recogemos los datos de todo el body
  // El body es donde estan todos los datos que nos están llegando desde Insomnia ( herramienta desde -->
  // la que estamos simulando las peticiones del usuario )

  res.json( // le respondemos con un .json
    {
      message: "Creation",
      data: body // le enviamos los datos que nos han llegado
    }
  )
})

// Para que nos funcione bien el .json que estamos respondiendo a la petición del usuario tenemos que -->
// implementar un middleware ( producto intermedio ), para ello vamos a implementar un middleware nativo que tiene express -->
// Lo hacemos desde el archivo en el que tenemos la app principal ( index.js )

module.exports = router
