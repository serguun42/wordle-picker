import { bool, number, object } from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import store from '../store';
import { changeLetter } from '../store/rows';
import dispatcher from '../util/dispatcher';
import './Letter.css';

/**
 * @param {{ letter: import('../types/Row').Letter, rowIndex: number, letterIndex: number, autoFocus: boolean }} props
 */
export default function Letter({ letter, rowIndex, letterIndex, autoFocus }) {
  /** @type {import("react").MutableRefObject<HTMLInputElement>} */
  const inputRef = useRef();
  const [isNeverFocused, setNeverFocused] = useState(true);

  useState(() => {
    /**
     * @param {number} switchingRowIndex
     * @param {number} switchingLetterIndex
     */
    const SwitchLetterInputEventHandler = (switchingRowIndex, switchingLetterIndex) => {
      if (switchingRowIndex !== rowIndex || switchingLetterIndex !== letterIndex) return;
      if (inputRef.current) inputRef.current.focus();
    };

    dispatcher.link('switchLetterInput', SwitchLetterInputEventHandler);
    return () => dispatcher.unlink('switchLetterInput', SwitchLetterInputEventHandler);
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = letter.value;
      if (autoFocus && isNeverFocused) {
        inputRef.current.focus();
        setNeverFocused(false);
      }
    }
  }, [inputRef.current]);

  const SwitchLetterState = () => {
    /** @type {import('../types/Row').LetterState} */
    const newLetterState =
      letter.state === 'correct'
        ? 'present'
        : letter.state === 'present'
        ? 'absent'
        : letter.state === 'absent'
        ? 'unknown'
        : 'correct';

    store.dispatch(changeLetter({ rowIndex, letterIndex, letterState: newLetterState }));
  };

  /** @param {string} [presetLetterValue] */
  const SaveLetterValue = (presetLetterValue) => {
    if (typeof presetLetterValue !== 'string') presetLetterValue = '';

    const newLetterValue = presetLetterValue || inputRef.current?.value?.[0] || '';
    store.dispatch(changeLetter({ rowIndex, letterIndex, letterValue: newLetterValue.toLowerCase() }));
  };

  const NextLetterInput = () => dispatcher.call('switchLetterInput', rowIndex, letterIndex + 1);
  const PreviousLetterInput = () => dispatcher.call('switchLetterInput', rowIndex, letterIndex - 1);

  /** @param {InputEvent} e */
  const OnChange = (e) => {
    const setLetterValue = e.target?.value?.[0] || '';

    SaveLetterValue(setLetterValue);

    if (setLetterValue) NextLetterInput();
    else PreviousLetterInput();
  };

  /** @param {KeyboardEvent} e */
  const OnKeyDown = (e) => {
    const setLetterValue = e.target?.value?.[0] || '';
    if (setLetterValue && /^[a-z]$/i.test(e.key)) {
      NextLetterInput();
      return;
    }

    if (e.key === 'Backspace') {
      e.preventDefault();
      if (inputRef.current) inputRef.current.value = '';
      SaveLetterValue('');
      PreviousLetterInput();
    }

    if (e.key === 'ArrowLeft') PreviousLetterInput();
    if (e.key === 'ArrowRight') NextLetterInput();
  };

  /** @param {KeyboardEvent} e */
  const OnKeyUp = (e) => {
    if (e.code === 'Enter' || e.key === 'Enter') NextLetterInput();
  };

  return (
    <input
      className={`letter letter--${letter.state} default-pointer-with-border`}
      tabIndex={rowIndex * 10 + letterIndex + 1}
      type="text"
      inputMode="text"
      maxLength="1"
      value={letter.value}
      onChange={OnChange}
      onBlur={SaveLetterValue}
      onKeyDown={OnKeyDown}
      onKeyUp={OnKeyUp}
      ref={inputRef}
      onContextMenu={(e) => {
        e.preventDefault();
        SwitchLetterState();
        return false;
      }}
    />
  );
}

Letter.propTypes = {
  letter: object.isRequired,
  rowIndex: number.isRequired,
  letterIndex: number.isRequired,
  autoFocus: bool,
};

Letter.defaultProps = {
  autoFocus: false,
};
