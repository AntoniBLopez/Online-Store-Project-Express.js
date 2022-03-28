// Solo voy a implementar los servicios modulares con los 2 get que tengo en este archivo para este ejemplo:

const express = require('express');

const ProductsService = require('../../services/products.service') // traigo la clase

const service = new ProductsService() // Creo una instáncia de la clase

const router = express.Router()

router.get('/', (req, res) => {

  const productsList = service.find() // uso la instáncia y accedo al buscador que me retorna la lista de productos

  res.json(productsList)
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  const product = service.findOne(id) // ejecuto la instáncia con su método findOne (buscar uno) y le paso el id que nos pasen en el endpoint
  res.json(product) // imprimo el resultado del método findOne
})

router.post('/', (req, res) => {
  const body = req.body
  res.status(201).json(
    {
      message: "Creation",
      data: body
    }
  )
})

router.patch('/:id', (req, res) => {
  const { body, params: { id } } = req;
  res.json(
    {
      message: "Update",
      data: body,
      id,
    }
  )
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  res.json(
    {
      message: "Deleted",
      id,
    }
  )
})

module.exports = router
