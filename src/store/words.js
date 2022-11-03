import { createSlice } from '@reduxjs/toolkit';
import dispatcher from '../util/dispatcher';
import LogMessageOrError from '../util/log';

const WORDS_SOURCE_URL = process.env.NODE_ENV === 'development' ? '/data/words.short.txt' : '/data/words.txt';

/**
 * @param {string} wordsRaw
 * @returns {string}
 */
const ParseWordsRaw = (wordsRaw) =>
  (wordsRaw || '')
    .split('\n')
    .filter(Boolean)
    .map((word) => word.toLowerCase())
    .filter((word, index, array) => index === array.indexOf(word));

export const wordsSlice = createSlice({
  name: 'words',

  /** @type {{ words: string[] }} */
  initialState: { words: ParseWordsRaw(localStorage.getItem('wordsRaw') || '') },

  reducers: {
    /**
     * @param {{ payload: string }} action
     */
    saveWords: (state, action) => {
      state.words = ParseWordsRaw(action.payload);
      localStorage.setItem('wordsRaw', action.payload);
    },

    getWords: () => {
      fetch(WORDS_SOURCE_URL)
        .then((res) => {
          if (res.ok) return res.text();

          return Promise.reject(new Error(`Status code ${res.status} ${res.statusText} (${res.url})`));
        })
        .then((wordsRaw) => dispatcher.call('storeWords', wordsRaw))
        .catch(LogMessageOrError);
    },
  },
});

export const { saveWords, getWords } = wordsSlice.actions;

export const { reducer } = wordsSlice;
