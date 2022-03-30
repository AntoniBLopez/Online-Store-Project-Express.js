const express = require('express');
const UsersService = require('../../services/users.service') // Traigo el servicio del negocio para la ruta de los usuarios

const service = new UsersService() // creo una instáncia

const validatorHandler = require('../../middlewares/validator.handler')
const { createUsersScheme, updateUserShoppingCartScheme, updateUserPaymentScheme, getUserScheme } = require('../../schemes/users.scheme')

const router = express.Router()

router.get('/',
  validatorHandler(getUserScheme, 'query'),
  (req, res) => {

    const { body, query: { id } } = req

    res.json(service.find(id, body))
  }
)

router.post('/:userId/shoppingCart',
  validatorHandler(updateUserShoppingCartScheme, 'body'),
  (req, res) => {

    const { body, params: { userId } } = req

    const name = 'Toni'

    res.json(service.createShoppingCart({
      userId,
      name,
      body,
    })) // Ejecuto la instáncia con el método correspondiente al endpoint
  }
)

router.put('/:userId/paymentPage', (req, res) => { // Actualizar usuarios en la zona de pago
  const { body, params: { userId } } = req;

  res.json(service.find(userId, body))
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  res.json(service.delete(id))
})

module.exports = router
