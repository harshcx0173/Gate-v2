const express = require('express');
const router = express.Router();
const towerController = require('../controllers/towerController');
router.get('/', towerController.getTowers);
router.post('/', towerController.createTower);
router.put('/:id', towerController.updateTower);
router.delete('/:id', towerController.deleteTower);
module.exports = router;