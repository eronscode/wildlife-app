const decodeSlug = (slug: string) => {
  const words = slug.split('-');
  const decodedWords = words.map((word) => {
    const decodedWord = decodeURIComponent(word);
    return decodedWord.charAt(0).toUpperCase() + decodedWord.slice(1);
  });
  return decodedWords.join(' ');
};

const convertToTitleCase = (str: string) => {
  return str
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const stringUtils = {
  decodeSlug,
  convertToTitleCase,
};
