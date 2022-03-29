const express = require('express');

const ProductsService = require('../../services/products.service')

const service = new ProductsService()

const router = express.Router()

router.get('/', async (req, res) => {

  const productsList = await service.find() // se ejecutará pasados los 5 segundos que he simulado en el archivo de service

  res.json(productsList)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const product = await service.findOne(id)
  res.json(product)
})

router.post('/', async (req, res) => {
  const body = req.body
  const newProduct = await service.create(body)
  res.status(201).json(newProduct)
})

router.patch('/:id', async (req, res) => {

  try { // capturamos el error que nos pueda dar el codigo

    const { body, params: { id } } = req;
    const product = await service.update(id, body)
    res.json(product)
  } catch (error) { // si hay un error respondemos con un tipo de dato json con un status(404)

    res.status(404).json({
      message: error.message
    })
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const response = await service.delete(id)
  res.json(response)
})

module.exports = router
