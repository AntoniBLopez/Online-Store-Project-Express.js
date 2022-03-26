const express = require('express');

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
  const { id } = req.params

  res.json({
    id,
    name: 'Product2',
    price: 2000
  })
})


// Vamos a ver cómo obtener parámetros Query

app.get('/users', (req, res) => { // como el parámetro Query es opcional no lo vamos a definir directamente en el PATH, lo vamos a definir como parámetro dentro de nuestro REQuest (petición/solicitud)
  const { limit, offset } = req.query // en vez de decirles que solicitamos el parámetro por su id, le decimos que solicitamos el query ( duda/pregunta/interrogante ) por su id
  // le añadimos limit y offset porque es la estratégia de paginación que quieren que tenga users, entonces los asignamos

  // Como son opcionales debemos de hacer una validación con if por si no nos envían los parámetros limit & offset poder
  // enviarle todos los datos de los usuarios sin la necesidad de paginar:
  if (limit && offset) {
    res.json({ // si vienen los parámetros le enviamos la respuesta con json
      limit,
      offset,
    })
  } else {
    res.send('No hay parámetros') // recuerda que con send enviamos una respuesta "normal"
  }
})

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params

  res.json({
    categoryId,
    productId,
  })
})

// Reto: crear usuarios, carrito de compras, página de pagos ... ( Crear los endpoints de get que retorne un array de productos y el de detalle ( con su ID ) )

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
