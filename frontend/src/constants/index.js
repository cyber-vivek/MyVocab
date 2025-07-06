export const WORDS_PAGE_SIZE = 10;

export const SOME_ERROR_OCCURED = 'Some Error Occurred!';

export const PARTS_OF_SPEECH = [
  {name: 'Noun', key: 'noun'},
  {name: 'Pronoun', key: 'pronoun'},
  {name: 'Verb', key:'verb'},
  {name: 'Adverb', key: 'adverb'},
  {name: 'Adjective', key: 'adjective'},
  {name: 'Preposition', key: 'preposition'},
  {name: 'Conjunction', key: 'conjunction'},
  {name: 'Interjection', key: 'interjection'},
]

export const INITIAL_DEFINITION = {
  definition: '',
  example: '',
}

export const INITIAL_MEANING_DATA = {
  partOfSpeech: '',
  definitions: [JSON.parse(JSON.stringify(INITIAL_DEFINITION))]
}

export const INITIAL_ADD_WORD_FORM_DATA = {
  name: '',
  meanings: [JSON.parse(JSON.stringify(INITIAL_MEANING_DATA))],
}

export const SEARCH_DEBOUNCE_TIME = 700;

export const TEST_QUESTION_NUMBERS = [
  {value: 2, label: '2 Questions'},
  {value: 5, label: '5 Questions'},
  {value: 10, label: '10 Questions'},
]