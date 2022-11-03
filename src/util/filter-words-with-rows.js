/**
 * @param {string[]} words
 * @param {import('../types/Row').Row[]} rows
 * @returns {string[]}
 */
const FilterWordsWithRows = (words, rows) => {
  /** @type {{ [letter: string]: number[] }} */
  const presentLettersPositions = {};
  /** @type {{ rx: RegExp, inverse: boolean }[]} */
  const rules = [];

  rows.forEach((row) => {
    const correctOnlyRule = row
      .map((letter, letterIndex) => {
        if (letter.state !== 'correct') return '.';

        presentLettersPositions[letter.value] = [letterIndex];

        return letter.value;
      })
      .join('');
    if (correctOnlyRule !== '.....') rules.push({ rx: new RegExp(correctOnlyRule), inverse: false });

    const onlyPresentLetters = row.map((letter) => (letter.state === 'present' ? letter : null));
    onlyPresentLetters.forEach((presentLetter, presentLetterIndex) => {
      if (!presentLetter) return;

      if (!presentLettersPositions[presentLetter.value])
        presentLettersPositions[presentLetter.value] = [0, 1, 2, 3, 4].filter((pos) => pos !== presentLetterIndex);
      else
        presentLettersPositions[presentLetter.value] = presentLettersPositions[presentLetter.value].filter(
          (pos) => pos !== presentLetterIndex
        );

      rules.push({
        rx: new RegExp(presentLetter.value.padStart(presentLetterIndex + 1, '.').padEnd(5, '.')),
        inverse: true,
      });
    });

    const totallyAbsent = row
      .filter((letter, letterIndex) => {
        if (letter.state !== 'absent') return false;
        if (letter.value in presentLettersPositions) {
          if (presentLettersPositions[letter.value].includes(letterIndex))
            presentLettersPositions[letter.value] = presentLettersPositions[letter.value].filter(
              (pos) => pos !== letterIndex
            );

          return false;
        }

        return true;
      })
      .map((letter) => letter.value)
      .filter((letter, index, array) => index === array.indexOf(letter))
      .join('');
    if (totallyAbsent) rules.push({ rx: new RegExp(`[${totallyAbsent}]`), inverse: true });

    const onlyPreciselyAbsentValues = row.map((letter) => (letter.state === 'absent' ? letter.value : '')).join('');
    const preciselyAbsent = row.map((letter) => (letter.state === 'absent' ? `[^${letter.value}]` : '.')).join('');
    if (preciselyAbsent !== '.....' && onlyPreciselyAbsentValues !== totallyAbsent)
      rules.push({ rx: new RegExp(preciselyAbsent), inverse: false });
  });

  Object.keys(presentLettersPositions).forEach((letter) => {
    if (!presentLettersPositions[letter]?.length) delete presentLettersPositions[letter];

    rules.push({ rx: new RegExp(letter), inverse: false });
  });

  // console.clear();
  // console.log(JSON.stringify(presentLettersPositions, false, 2));
  // console.log(JSON.stringify(rules, (_, value) => (value instanceof RegExp ? value.source : value), 2));

  rules.forEach((rule) => {
    // eslint-disable-next-line no-bitwise
    words = words.filter((word) => rule.rx.test(word) ^ rule.inverse);
  });

  return words;
};

export default FilterWordsWithRows;
