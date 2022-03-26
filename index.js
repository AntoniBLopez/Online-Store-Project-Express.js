const express = require('express');

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello my server in express')
})

app.get('/new-route', (req, res) => {
  res.send("Hi i'm a new endpoint")
})

// Lo que más vamos a usar es .json porque lo nuestro es una API y vamos a comunicar
// datos normalmente a clientes de frontend o aplicaciones móviles que se encargan de renderizar la información
// nosotros no vamos a renderizar como tal si no que vamos a tener todo el papel de una API

app.get('/products', (req, res) => {
  res.json({ // Le pasamos un objeto y ver como lo va a renderizar
    name: "Producto 1",
    price: 1000
  })
})

// creo nuevos endpoints ( routes ) de prueba:

app.get('/categories', (req, res) => {
  res.json({
    name: "Electrodomésticos",
    name2: "Deportes"
  })
})

app.get('/home', (req, res) => {
  res.json({
    welcome: "Welcome to my online store",
    access: "categories"
  })
})


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
