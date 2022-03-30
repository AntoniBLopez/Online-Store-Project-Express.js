const express = require('express');
const cors = require('cors');
const routerApi = require('./app/server');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const app = express()
const port = 3002

app.use(express.json()) // Esta línea de código nos sirve para tener un middleware, -->
// Con este ajuste (codigo) ya podemos recibir información de tipo json que nos envía el usuario




const whiteList = ['http://localhost:3002', "http://127.0.0.1:5500", 'https://myapp.com','http://localhost:5500'] // estos son los orígenes de los cuales sí quiero recibir peticiones
// Puedo añadir host locales o también dominios. Para que funcione debo de añadir la url del origen que está queriendo acceder a mi servidor

const options = { // Para que funcione

  origin: (origin, cb) => {

    if (whiteList.includes(origin) || !origin) {
      cb(null, true) // aquí en el primer parámetro le digo que no hay ningun error, y en el segundo que el acceso está permitiro
    } else {
      cb(new Error('no está permitido'))
    }
  }
}

app.use(cors(options)) // De esta manera habilitamos al dominio deseado y no a cualquier dominio



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
