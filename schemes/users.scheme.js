const Joi = require('joi')

const id = Joi.string().uuid()
const name = Joi.string().min(3).max(15)
const age = Joi.number().min(18).max(140)
const products = Joi.string().min(3).max(20)
const price = Joi.number().integer().min(10)
const totalPrice = Joi.number().integer().min(30)

const createUsersScheme = Joi.object({

  name: name.required(), // indicamos que para la creación de un producto es obligatorio un nombre
  age: age.required(),

})

const updateUserShoppingCartScheme = Joi.object({ // creamos otro para la actualización
  id,
  products,
  price,
})

const updateUserPaymentScheme = Joi.object({ // creamos otro para la actualización
  id: id.required(),
  products: products.required(),
  totalPrice: totalPrice.required(),
})

const getUserScheme = Joi.object({ // creamos otro para obtener un usuario
  // aquí se valida que venga un id con el formato correcto // a pesar de solo tener un campo es buena práctica
  // dejarlo como objeto para enviarlo de forma más fácil al middleware validator
  id: id.required(),
})

module.exports = { createUsersScheme, updateUserShoppingCartScheme, updateUserPaymentScheme, getUserScheme }
