const homeRouter = require('./home.js'); // importamos el archivo modular
const testRouter = require('./test/test.js');
const productsRouter = require('./products.js');
const usersRouter = require('./users.js');
const categoriesRouter = require('./categories.js');

function routersApi(app) { // en esta función es donde hacemos el llamado a cualsea el endpoint del que están queriendo recibir una respuesta
  app.use('/api/home', homeRouter)
  app.use('/api/test', testRouter)
  app.use('/api/products', productsRouter) // Aquí es donde definimos el endpoint principal products del archivo products.js
  app.use('/api/users', usersRouter)
  app.use('/api/categories', categoriesRouter)
}

module.exports = routersApi // exportamos la función

// Recuerda que todo esto lo hacemos para cumplir con el principio de una sola responsabilidad
