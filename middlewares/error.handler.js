function logErrors (err, req, res, next) {
  console.log('logErrors')
  console.error(err);
  next(err) // Aquí estamos monitoreando el error, sin embargo indicamos
  // al ejecutar next() que siga con la ejecución normal hacia el siguiente middleware

  // es importante saber que en next(err) como le estamos pasando el error estamos ejecutando
  // un middleware de tipo error

  // Cuando no le enviamos nada es un middleware normal
  // Al enviar el error llegará a otro middleware de tipo error
}

// Este siguiente middleware va a detectar un error pero va a crear un formato para
// devolverselo a nuestro cliente ( es decir, no vamos a continuar con el siguiente middleware,
// vamos a hacer que sea el punto final )

function errorHandler (err, req, res, next) { // aunque no estemos usando next debemos ponerlo como
  // parámetro, porque es la forma en la que el programa detecta que es un middleware de tipo error,
  // debe tener los 4 parámetros
  console.log('errorsHandler')

  res.status(500).json({
    messageError: err.message,
    stack: err.stack
  })
}

module.exports = { logErrors, errorHandler }
