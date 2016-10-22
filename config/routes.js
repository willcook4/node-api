const router = require('express').Router();
const fruitsController = require('../controllers/fruitsController');

router.route('/fruit')
  .get(fruitsController.getFruits)
  .post(fruitsController.postFruit);

router.route('/fruit/:id')
  .get(fruitsController.getFruit)
  .put(fruitsController.updateFruit)
  .patch(fruitsController.updateFruit)
  .delete(fruitsController.deleteFruit);

module.exports = router;