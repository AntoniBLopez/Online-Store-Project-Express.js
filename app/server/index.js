const express = require('express'); // traemos el módulo expres para crear un .Router


const homeRouter = require('../routes/home.js');
const testRouter = require('../routes/test/test.js');
const productsRouter = require('../routes/products.js');
const usersRouter = require('../routes/users.js');
const categoriesRouter = require('../routes/categories.js');

function routersApi(app) {
  const router = express.Router() // Creamos el router

  app.use('/api/v1', router) // creamos un PATH global para todos los endpoints

  router.use('/home', homeRouter)// aquí ahora en vez de app usamos router y se les añade el PATH /api/v1
  router.use('/test', testRouter)
  router.use('/products', productsRouter)
  router.use('/users', usersRouter)
  router.use('/categories', categoriesRouter)
}

module.exports = routersApi
