const express = require('express');
const routerApi = require('./app/server');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

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
app.use(boomErrorHandler) // Aquí lo ejecutamos para comprobar si es de tipo boom, si no se ejecuta next(err) que es la siguiente línea
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`)
})
