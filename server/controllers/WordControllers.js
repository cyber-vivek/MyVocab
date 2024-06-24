const Word = require('../models/wordModel');
const axios = require('axios');

const addWord = async (req, res, next) => {
  const body = req.body;
  const name  = body.name;
  const userDefinition = body.definitions || [];
  const apiResponse = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${name}`);
  const apiData = apiResponse.data;
  let phonetics = {};
  let meanings = [];
  let origin = apiData[0].origin || '';
  apiData?.forEach(word => {
    let wmeanings = word.meanings || [];
    wmeanings?.forEach(meaning => {
      meaning.definitions = meaning?.definitions.map(def => ({ definition: def.definition, example: def.example }))
    })
    meanings = [...meanings, ...wmeanings];
    if(word?.phonetics?.length && !!phonetics?.audio?.length) {
      phonetics = {text: word.phonetics[0].text, audio: word.phonetics[0].audio};
    }
  });
  const word = new Word({name, userDefinition, phonetics, origin, meanings});
  word.save().then(() => {
    return res.json({message: 'Word Added Successfully!', data: word});
  }).catch(err => {
    return res.status(400).json({message: 'Some Error Occured!', error: err});
  })
}

const getWords = async (req, res, next) => {
  const {pageNo = 1, pageSize = 10} = req.query;
  if(pageNo < 1) {
    return res.status(400).json({message: 'Invalid Page Number'});
  }
  const data = await Word.find({}).skip((pageNo -1)*pageSize).limit(pageSize).lean();
  const totalRecords = await Word.countDocuments({});
  const paginationInfo = {
    pageNo,
    pageSize,
    totalRecords,
  }
  return res.json({message: 'Words Fetched Successfully!', data, paginationInfo});
}

module.exports = {
  addWord,
  getWords
}