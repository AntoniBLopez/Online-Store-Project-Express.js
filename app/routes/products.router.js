const express = require('express');

const ProductsService = require('../../services/products.service')

const validatorHandler = require('../../middlewares/validator.handler') // Traemos el validador
const { createProductScheme, updateProductScheme, getProductScheme } = require('../../schemes/product.scheme') // Traemos el esquema para los productos

const service = new ProductsService()

const router = express.Router()

router.get('/', async (req, res) => {

  const productsList = await service.find() // se ejecutará pasados los 5 segundos que he simulado en el archivo de service

  res.json(productsList)
})

router.get('/:id',
  validatorHandler(getProductScheme, "params"), // le añadimos el middleware validator antes de que entre en el middleware de ejecución,
  // como primer parámetro le pasamos el esquema validador correspondiente al endpoint,
  async (req, res, next) => {
    try {
      const { id } = req.params
      const product = await service.findOne(id)
      res.json(product)
    } catch (err) {
      next(err) // aquí es donde lo hacemos de forma explícita, le decimos que
      // ejecute los middlewares que tengamos de tipo error
    }
  }
)

router.post('/',
  validatorHandler(createProductScheme, 'body'), // le añado el middleware valdiator correspondiente y listo
  async (req, res) => {
    const body = req.body
    const newProduct = await service.create(body)
    res.status(201).json(newProduct)
  }
)

router.patch('/:id',
  validatorHandler(getProductScheme, 'params'), // le añado el middleware valdiator para el id ( aquí usamos get para validar que obetenemos el id correcto )
  validatorHandler(updateProductScheme, 'body'), // luego el middleware valdiator para el cuerpo ( aquí usamos update para validar que cumple con las condiciones necesarias para crear un nuevo objeto )
  async (req, res, next) => {

    try { // capturamos el error que nos pueda dar el codigo

      const { body, params: { id } } = req;
      const product = await service.update(id, body)
      res.json(product)
    } catch (error) { // si hay un error ejecutamos un middleware error
      next(error)
    }
  }
)

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const response = await service.delete(id)
  res.json(response)
})

module.exports = router
