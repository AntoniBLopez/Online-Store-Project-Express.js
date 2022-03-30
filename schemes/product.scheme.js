const Joi = require('joi')

const id = Joi.string().uuid() // indicamos que tipo de campo es = .string // y luego validamos
const name = Joi.string().min(3).max(15) // que sea de tipo string, que sea alfanumérico, que mínimo tenga 3 caracteres y máximo 15
const price = Joi.number().integer().min(10) // que sea de tipo number, que sea entero, que el precio mínimo sea de 10
const image = Joi.string().uri()

const createProductScheme = Joi.object({ // esta variable reune todos los campos

  name: name.required(), // indicamos que para la creación de un producto es obligatorio un nombre
  price: price.required(), // required() significa que es obligatorio añadir un precio a la creación del producto
  image: image.required(), // required() significa que es obligatorio añadir una imágen a la creación del producto

})

const updateProductScheme = Joi.object({ // creamos otro para la actualización
  name, // esto significa que no es obligatorio añadir un nombre al actualizar o modificar pero si se añade tiene que cumplir con los requisitos
  price,
  image,
})

const getProductScheme = Joi.object({ // creamos otro para obtener
  // aquí se valida que venga un id con el formato correcto // a pesar de solo tener un campo es buena práctica
  // dejarlo como objeto para enviarlo de forma más fácil al middleware validator
  id: id.required(),
})

module.exports = { createProductScheme, updateProductScheme, getProductScheme }
