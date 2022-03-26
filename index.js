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

// escoger la cantidad que queremos crear de productos asignándole un número a un parámetro query

app.get('/products', (req, res) => {

  const { size } = req.query

  const products = []

  const limit = size || 10 // le asignamos a una variable llamada limit lo que nos pasen como valor
  // del parámetro query size y si no pasan nada, como es null o undefined se va a almacenar el número 10

    for (let index = 0; index < limit; index++) { // le pasamos la variable limit para que indique el límite de la cantidad a generar de objetos aleatorios
      products.push({
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      image: faker.image.imageUrl()
    })
  }

  res.json(products) // enviamos como respuesta un tipo de dato json, y el dato son los productos que hemos generado anteriormente
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
