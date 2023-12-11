const convertToSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
};

const decodeSlug = (slug: string) => {
  const words = slug.split('-');
  const decodedWords = words.map((word) => {
    const decodedWord = decodeURIComponent(word);
    return decodedWord.charAt(0).toUpperCase() + decodedWord.slice(1);
  });
  return decodedWords.join(' ');
};

export const slugUtils = {
  convertToSlug,
  decodeSlug,
};
