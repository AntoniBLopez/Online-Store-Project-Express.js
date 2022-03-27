const express = require('express');

const router = express.Router()

router.get('/new-route', (req, res) => {
  res.send("Hi i'm a new endpoint")
})

module.exports = router
