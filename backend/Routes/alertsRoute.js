const express = require('express')
const router = express.Router()
const {
  userAlerts
} = require('../Controllers/alertsController')

router.post('/:id/:id2', userAlerts);


module.exports = router