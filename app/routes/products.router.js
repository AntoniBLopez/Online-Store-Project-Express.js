const express = require('express');

const ProductsService = require('../../services/products.service')

const service = new ProductsService()

const router = express.Router()

router.get('/', async (req, res) => {

  const productsList = await service.find() // se ejecutará pasados los 5 segundos que he simulado en el archivo de service

  res.json(productsList)
})

// Para que funcione se debe de capturar el error de forma explícita
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await service.findOne(id)
    res.json(product)
  } catch (err) {
    next(err) // aquí es donde lo hacemos de forma explícita, le decimos que
    // ejecute los middlewares que tengamos de tipo error
  }
})

router.post('/', async (req, res) => {
  const body = req.body
  const newProduct = await service.create(body)
  res.status(201).json(newProduct)
})

router.patch('/:id', async (req, res, next) => {

  try { // capturamos el error que nos pueda dar el codigo

    const { body, params: { id } } = req;
    const product = await service.update(id, body)
    res.json(product)
  } catch (error) { // si hay un error ejecutamos un middleware error
    next(error)
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const response = await service.delete(id)
  res.json(response)
})

module.exports = router
