import { bool, number, object } from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import store from '../store';
import { changeLetter } from '../store/rows';
import dispatcher from '../util/dispatcher';
import './Letter.css';

const SWIPE_STATE_CHANGE_TRAVEL = 30;
const SWIPE_STATE_CHANGE_TIMEOUT = 100;

/**
 * @param {{ letter: import('../types/Row').Letter, rowIndex: number, letterIndex: number, autoFocus: boolean }} props
 */
export default function Letter({ letter, rowIndex, letterIndex, autoFocus }) {
  /** @type {import("react").MutableRefObject<HTMLInputElement>} */
  const inputRef = useRef();
  const [isNeverFocused, setNeverFocused] = useState(true);
  const [touchOrigin, setTouchOrigin] = useState(0);
  let swipeChangeTime = Date.now();

  useEffect(() => {
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

  /**
   * @param {boolean} [rotationPosivite]
   * @returns {void}
   */
  const SwitchAndSaveLetterState = (rotationPosivite = true) => {
    if (Date.now() - swipeChangeTime < SWIPE_STATE_CHANGE_TIMEOUT) return;

    /** @type {import('../types/Row').LetterState} */
    const nextState = letter.state === 'correct' ? 'present' : letter.state === 'present' ? 'absent' : 'correct';
    /** @type {import('../types/Row').LetterState} */
    const prevState = letter.state === 'correct' ? 'absent' : letter.state === 'absent' ? 'present' : 'correct';
    const newLetterState = rotationPosivite ? nextState : prevState;

    store.dispatch(changeLetter({ rowIndex, letterIndex, letterState: newLetterState }));
  };

  /** @param {string} [presetLetterValue] */
  const SaveLetterValue = (presetLetterValue) => {
    const newLetterValue =
      typeof presetLetterValue === 'string' ? presetLetterValue : inputRef.current?.value?.[0] || '';

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

  /** @param {TouchEvent} e */
  const OnTouchStart = (e) => {
    const touch = e.touches[0];
    setTouchOrigin(touch.clientX);
  };

  /** @param {TouchEvent} e */
  const OnTouchMove = (e) => {
    if (typeof touchOrigin !== 'number') return;

    const touch = e.touches[0];
    const movement = touch.clientX - touchOrigin;

    if (movement > SWIPE_STATE_CHANGE_TRAVEL) {
      setTouchOrigin(null);
      SwitchAndSaveLetterState(true);
      swipeChangeTime = Date.now();
    } else if (movement < -SWIPE_STATE_CHANGE_TRAVEL) {
      setTouchOrigin(null);
      SwitchAndSaveLetterState(false);
      swipeChangeTime = Date.now();
    }
  };

  return (
    <input
      className={`letter letter--${letter.state} default-pointer default-no-select`}
      tabIndex={rowIndex * 10 + letterIndex + 1}
      type="text"
      inputMode="text"
      maxLength="1"
      value={letter.value}
      onChange={OnChange}
      onKeyDown={OnKeyDown}
      onKeyUp={OnKeyUp}
      onDoubleClick={() => SwitchAndSaveLetterState(true)}
      onContextMenu={(e) => {
        e.preventDefault();
        SwitchAndSaveLetterState(true);
        return false;
      }}
      onTouchStart={OnTouchStart}
      onTouchMove={OnTouchMove}
      ref={inputRef}
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
