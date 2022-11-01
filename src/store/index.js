import { configureStore } from '@reduxjs/toolkit';
import { reducer as themeReducer } from './theme';
import { showMessage, hideMessage, reducer as messageReducer } from './message';
import dispatcher from '../util/dispatcher';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    message: messageReducer,
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

export default store;
