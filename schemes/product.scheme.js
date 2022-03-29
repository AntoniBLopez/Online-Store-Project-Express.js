const Joi = require('joi')

const id = Joi.string().uuid() // indicamos que tipo de campo es = .string // y luego validamos
const name = Joi.string().alphanum().min(3).max(15) // que sea de tipo string, que sea alfanumérico, que mínimo tenga 3 caracteres y máximo 15
const price = Joi.number().integer().min(10) // que sea de tipo number, que sea entero, que el precio mínimo sea de 10

const createProductScheme = Joi.object({ // esta variable reune todos los campos

  name: name.required(), // indicamos que para la creación el nombre es requerido
  price: price.required(), // indicamos que para la creación el nombre es requerido

})

const updateProductScheme = Joi.object({ // creamos otro para la actualización
  name,
  price,
})

const getProductScheme = Joi.object({ // creamos otro para obtener
  // aquí se valida que venga un id con el formato correcto // a pesar de solo tener un campo es buena práctica
  // dejarlo como objeto para enviarlo de forma más fácil al middleware validator
  id: id.required(),
})

module.exports = { createProductScheme, updateProductScheme, getProductScheme }
