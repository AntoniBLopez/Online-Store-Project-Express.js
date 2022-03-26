const express = require('express');

const app = express()
const port = 3002

app.get('/', (req, res) => {
  res.send('Hello my server in express')
})

app.get('/new-route', (req, res) => {
  res.send("Hi i'm a new endpoint")
})

app.get('/products', (req, res) => { // Lo que normalmente esperamos de un método get y el path /products es una lista de productos ( con un array )
  res.json([
    {
      name: 'Product1',
      price: 1000
    },
    {
      name: 'Product2',
      price: 2000
    }
  ])
})

app.get('/products/:id', (req, res) => {
  const { id } = req.params // Envio una petición ( req ) de que quiero recibir el parámetro ( .params ) id ( .PARÁMETRO )
  // En la línea de justo encima estoy usando la desestructuración de ES6

  res.json({ // añadimos el código de respuesta a la petición
    id, // esto es igual a: id: id,
    name: 'Product2',
    price: 2000
  })
})

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params // recojemos los identificadores de los parámetros

  res.json({
    categoryId, // = categoryId: categoryId
    productId, // = productId: productId
  })
}) // lo que estamos haciendo es capturar los parámetros que vienen por URL y los estamos recogiendo desde nuestro programa y los imprimimos de retorno


// Reto: crear usuarios, carrito de compras, página de pagos ... ( Crear los endpoints de get que retorne un array de productos y el de detalle ( con su ID ) )

const name1 = 'Toni'
const name2 = 'Maria'
const name3 = 'Ara'

app.get('/users', (req, res) => {
  res.json([
    {
      name: name1,
      welcome: `Hola ${name1}`
    },
    {
      name: name2,
      welcome: `Hola ${name2}`
    },
    {
      name: name3,
      welcome: `Hola ${name3}`
    }
  ])
})

app.get('/users/:id', (req, res) => {

  const { id } = req.params

  res.json(
    {
      id,
      name: name1,
      welcome: `Hola ${name1}`
    }
  )
})

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


// creo nuevos endpoints ( routes ) de prueba:

app.get('/home', (req, res) => {
  res.json({
    welcome: "Welcome to my online store",
    access: "categories"
  })
})


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
