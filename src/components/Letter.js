import { func, object } from 'prop-types';
import './Letter.css';

/**
 * @param {{ letter: import('../types/Row').Letter, updateRows: Function }} props
 */
export default function Letter({ letter, updateRows }) {
  const SwitchLetterState = () => {
    if (letter.state === 'correct') letter.state = 'present';
    else if (letter.state === 'present') letter.state = 'absent';
    else if (letter.state === 'absent') letter.state = 'correct';
    else letter.state = 'correct';

    updateRows();
  };

  return (
    <div
      className={`letter letter--${letter.state} default-pointer-with-border default-no-select`}
      onClick={SwitchLetterState}
      onContextMenu={(e) => {
        e.preventDefault();
        SwitchLetterState();
        return false;
      }}
    >
      {letter.value[0] || ' '}
    </div>
  );
}

Letter.propTypes = {
  letter: object.isRequired,
  updateRows: func.isRequired,
};
