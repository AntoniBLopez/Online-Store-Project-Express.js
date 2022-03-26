const express = require('express');
const faker = require('faker');

const app = express()
const port = 3002

app.get('/', (req, res) => {
  res.send('Hello my server in express')
})

app.get('/home', (req, res) => {
  res.json({
    welcome: "Welcome to my online store",
    access: "categories"
  })
})

app.get('/new-route', (req, res) => {
  res.send("Hi i'm a new endpoint")
})

app.get('/products', (req, res) => {

  const products = [] // Creamos un array vacío para añadir los productos aleatorios que vamos a crear

  for (let index = 0; index < 100; index++) { // para ello generamos un loop con 100 iteraciones
    // en el que le haremos push al array vacío de productos  con los productos aleatorios que creemos
  products.push({
    name: faker.commerce.productName(), // con faker.comerce.productName() generamos un nombre aleatorio de un porducto
    price: Number(faker.commerce.price()), // con faker.comerce.price() generamos un precio aleatorio, como viene en string lo pasamos a número
    image: faker.image.imageUrl() // de esta manera generamos la URL de una imagen aleatoria
  })

  }

  res.json(products) // devolvemos a la petición del usuario el array de productos
})

app.get('/products/:id', (req, res) => {
  const { id } = req.params

  res.json({
    id,
    name: 'Product2',
    price: 2000
  })
})


// Obtener parámetros Query

app.get('/users', (req, res) => {
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

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params

  res.json({
    categoryId,
    productId,
  })
})


const name1 = 'Toni'

app.get('/users/:userId/shoppingCart', (req, res) => {

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

app.get('/users/:userId/paymentPage', (req, res) => {

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


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
