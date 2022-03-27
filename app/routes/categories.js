const express = require('express');

const router = express.Router()

router.get('/:categoryId', (req, res) => {
  const { categoryId } = req.params

  res.json({
    categoryId,
  })
})

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params

  res.json({
    categoryId,
    productId,
  })
})

module.exports = router
