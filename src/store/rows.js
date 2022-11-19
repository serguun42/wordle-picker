import { createSlice } from '@reduxjs/toolkit';
import dispatcher from '../util/dispatcher';
import GetKey from '../util/get-key';
import LogMessageOrError from '../util/log';

/**
 * @typedef {Object} UpdatedLetterPayload
 * @property {number} rowIndex
 * @property {number} letterIndex
 * @property {import('../types/Row').LetterState} [letterState]
 * @property {string} [letterValue]
 */

export const rowsSlice = createSlice({
  name: 'rows',

  /** @type {{ rows: import('../types/Row').Row[] }} */
  initialState: {
    rows: [
      [
        { value: 'c', state: 'absent', key: GetKey('letter') },
        { value: 'r', state: 'absent', key: GetKey('letter') },
        { value: 'a', state: 'absent', key: GetKey('letter') },
        { value: 't', state: 'absent', key: GetKey('letter') },
        { value: 'e', state: 'absent', key: GetKey('letter') },
      ],
    ],
  },

  reducers: {
    /** @param {{ payload: string }} action */
    addRowByWord: (state, action) => {
      const word = action.payload;
      if (typeof word !== 'string') return;

      state.rows.push(
        word
          .split('')
          .slice(0, 5)
          .map((letter) => ({ value: letter, state: 'absent', key: GetKey('letter') }))
      );
      dispatcher.call('rowsChanged');
    },

    addEmptyRow: (state) => {
      state.rows.push(
        Array.from(
          { length: 5 },
          /** @returns {import('../types/Row').Letter} */ () => ({ value: '', state: 'absent', key: GetKey('letter') })
        )
      );
      dispatcher.call('rowsChanged');
    },

    deleteRow: (state) => {
      state.rows.pop();
      dispatcher.call('rowsChanged');
    },

    /**
     * @param {{ payload: UpdatedLetterPayload }} action
     */
    changeLetter: (state, action) => {
      const { rowIndex, letterIndex, letterState, letterValue } = action.payload;

      const row = state.rows[rowIndex];
      if (!row) {
        LogMessageOrError(new Error(`No row with index ${rowIndex}`));
        return;
      }

      const letter = row[letterIndex];
      if (!letter) {
        LogMessageOrError(new Error(`No letter with index ${rowIndex} at row ${rowIndex}`));
        return;
      }

      if (typeof letterState === 'string') letter.state = letterState;
      if (typeof letterValue === 'string') letter.value = letterValue;

      dispatcher.call('rowsChanged');
    },
  },
});

export const { addRowByWord, addEmptyRow, deleteRow, changeLetter } = rowsSlice.actions;

export const { reducer } = rowsSlice;
