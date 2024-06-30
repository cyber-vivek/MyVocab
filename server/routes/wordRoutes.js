const router = require('express').Router();
const {addWord, getWords} = require('../controllers/WordControllers');

router.post('/add-word', addWord);
router.get('/getWords', getWords)

module.exports = router;