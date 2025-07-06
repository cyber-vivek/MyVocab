export const pronounceWord = (word) => {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-IN'; // You can change language as needed
  speechSynthesis.speak(utterance);
};
