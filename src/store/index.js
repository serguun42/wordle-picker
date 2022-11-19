import { configureStore } from '@reduxjs/toolkit';
import { reducer as themeReducer } from './theme';
import { showMessage, hideMessage, reducer as messageReducer } from './message';
import { reducer as wordsReducer, saveWords } from './words';
import dispatcher from '../util/dispatcher';
import { addEmptyRow, addRowByWord, changeLetter, deleteRow, reducer as rowsReducer } from './rows';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    message: messageReducer,
    words: wordsReducer,
    rows: rowsReducer,
  },
});

dispatcher.link(
  'themeChanged',
  /** @param {import("./theme").ThemeObject} appliedTheme */ (appliedTheme) => {
    setTimeout(() => store.dispatch(showMessage(appliedTheme.name)));
  }
);

dispatcher.link('message', (messageText) => store.dispatch(showMessage(messageText)));
dispatcher.link('hideMessageIfPossible', (currentMessageId) => {
  if (store.getState().message.lastId === currentMessageId) store.dispatch(hideMessage());
});

dispatcher.link('storeWords', /** @param {string[]} words */ (words) => store.dispatch(saveWords(words)));

dispatcher.link('addRowByWord', /** @param {string} word */ (word) => store.dispatch(addRowByWord(word)));
dispatcher.link('addEmptyRow', () => store.dispatch(addEmptyRow()));
dispatcher.link('deleteRow', () => store.dispatch(deleteRow()));
dispatcher.link(
  'changeLetter',
  /** @param {import('./rows').UpdatedLetterPayload} updatedLetterPayload */ (updatedLetterPayload) =>
    store.dispatch(changeLetter(updatedLetterPayload))
);

export default store;
