const express = require('express');
const routerApi = require('./app/server');

const app = express()
const port = 3002

app.use(express.json()) // Esta línea de código nos sirve para tener un middleware, -->
// Con este ajuste ya podemos recibir información de tipo json que nos envían por POST

app.get('/', (req, res) => {
  res.send('Hello, welcome to my server in express')
})

routerApi(app)

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`)
})
