const express = require('express');
const UsersService = require('../../services/users.service') // Traigo el servicio del negocio para la ruta de los usuarios

const service = new UsersService() // creo unsa instáncia

const router = express.Router()

router.get('/', (req, res) => {
  const { limit, offset } = req.query

  if (limit && offset) {
    res.json({
      limit,
      offset,
    })
  } else {
    res.send('No hay parámetros')
  }
})

router.post('/:userId/shoppingCart', (req, res) => {

  const { body, params: { userId } } = req

  const name = 'Toni'

  res.json(service.create(userId, name, body)) // Ejecuto la instáncia con el método correspondiente al endpoint
})

router.put('/:userId/paymentPage', (req, res) => { // Actualizar usuarios en la zona de pago
  const { body, params: { userId } } = req;

  res.json(service.find(userId, body))
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  res.json(service.delete(id))
})

module.exports = router
