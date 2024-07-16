const router = require('express').Router();
const {addWord, getWords, updateWord, deleteWord, getRevisionWord, markRevision} = require('../controllers/WordControllers');

router.post('/add-word', addWord);
router.get('/getWords', getWords);
router.post('/update-word', updateWord);
router.post('/delete-word', deleteWord);
router.get('/revision-words', getRevisionWord);
router.post('/mark-revision', markRevision);

module.exports = router;