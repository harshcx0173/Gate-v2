"use strict";

var express = require('express');
var router = express.Router();
var towerController = require('../controllers/towerController');
router.get('/', towerController.getTowers);
router.post('/', towerController.createTower);
router.put('/:id', towerController.updateTower);
router["delete"]('/:id', towerController.deleteTower);
module.exports = router;