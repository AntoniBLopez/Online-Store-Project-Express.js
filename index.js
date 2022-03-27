const express = require('express');
const routerApi = require('./app/server'); // al requerir una carpeta ya busca y añade directamente el
// archivo que tenga el nombre index.js dentro del directorio

const app = express()
const port = 3002

app.get('/', (req, res) => {
  res.send('Hello, welcome to my server in express')
})

routerApi(app) // Llamamos la función que hemos importado del archivo index.js de la carpeta routes y le
// pasamos como argumento la variable app que es la aplicación que creamos al ejecutar express

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`)
})
