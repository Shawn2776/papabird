import React from "react";

const capitalizeFirstLetter = (word) => {
  const firstLetter = word.charAt(0);

  const firstLetterCap = firstLetter.toUpperCase();

  const remainingLetters = word.slice(1);

  const capitalizedWord = firstLetterCap + remainingLetters;

  return capitalizedWord;
};

export default capitalizeFirstLetter;
