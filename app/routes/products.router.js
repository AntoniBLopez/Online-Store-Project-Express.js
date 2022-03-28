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
  const newProduct = service.create(body)
  res.status(201).json(newProduct)
})

router.patch('/:id', (req, res) => {
  const { body, params: { id } } = req;
  const product = service.update(id, body) // ejecutamos el método update pasandole sus respectivos parámetros
  res.json(product)
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  const response = service.delete(id)
  res.json(response)
})

module.exports = router
