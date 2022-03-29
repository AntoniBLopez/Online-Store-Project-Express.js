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

function boomErrorHandler (err, req, res, next) { // recuerda que debe tener los 4 parámetros

  // cuando creamos un error con boom el programa le agrega una propiedad ( isBoom ) a error (err):

   // identificamos que el error sea de tipo boom
  // ( si la propiedad err.isBoom existe, es porque es un error de tipo boom)
  if (err.isBoom) {
    const { output } = err // De este error, boom tiene toda la información del error llamado output

    // Si es de tipo boom finalizamos la petición ejecutando el error boom
    res.status(output.statusCode).json(output.payload)

    // El status code debe de ser dinámico, para ello usamos output.statusCode
    // Y el json ( o lo que le vamos a enviar como información ) viene en output.payload
  }
  next(err) // si no es de tipo boom ejecutamos un middleware error normal
}

module.exports = { logErrors, errorHandler, boomErrorHandler }
// exportamos la función creada boomErrorHandler para pdoer usarla
