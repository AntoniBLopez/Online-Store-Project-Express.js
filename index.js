const express = require('express');
const routerApi = require('./app/server');

const { logErrors, errorHandler } = require('./middlewares/error.handler')

const app = express()
const port = 3002

app.use(express.json()) // Esta línea de código nos sirve para tener un middleware, -->
// Con este ajuste (codigo) ya podemos recibir información de tipo json que nos envía el usuario

app.get('/', (req, res) => {
  res.send('Hello, welcome to my server in express')
})

routerApi(app)

// Debemos de tener en cuenta el orden en el que los estamos ejecutando
app.use(logErrors)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`)
})
