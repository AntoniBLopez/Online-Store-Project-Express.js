const express = require('express');

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    welcome: "You are on the main page",
    access: ["categories", 'products']
  })
})

module.exports = router
