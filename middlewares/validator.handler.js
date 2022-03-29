const boom = require("@hapi/boom");
const req = require("express/lib/request");

// Algo muy importante es que tenemos que configurar el middlware para que sea dinámico


function validatorHandler (scheme, property) { // en vez de recibir (req, res, next), vamos a recibir el esquema que vamos a validar y la propiedad
  // Esto es porque al final vamos a evaluar de cada request, de alguna propiedad en específico ( body, params, query )
  // sacar del request esa información y ahí sí aplicar un esquema, para ello vamos a utilizar las closures

  const data = req[property] // Si es un POST: req.body, Si es un GET: req.params, También puede venir de un: req.query ( depende de dónde venga la información, se lo pasamos a property y listo )

  return (req, res, next) => {

    const { error } = scheme.validate(data) // si este esquema viene de joi tiene un método que se llama validate y como parámetro le pasamos los datos que queremos validar

    if (error) {
      next(boom.badRequest(error)) // esto nos envía un error de tipo 400
    }
    next() //si todo está bien le decimos que siga

    // estamos retrnando un middleware de forma dinámica
  }
}

module.exports = validatorHandler
