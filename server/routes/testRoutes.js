const { generateTest } = require('../controllers/TestController');

const router = require('express').Router();

router.post('/generate', generateTest);

module.exports = router;