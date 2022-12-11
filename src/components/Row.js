import { array, bool, number } from 'prop-types';
import Letter from './Letter';
import './Row.css';

/** @param {{ row: import('../types/Row').Row, rowIndex: number, isLast: boolean }} props */
export default function Row({ row, rowIndex, isLast }) {
  if (!Array.isArray(row)) return null;

  return (
    <div className="row">
      <div className="row__letters">
        {row.map((letter, letterIndex) => (
          <Letter
            key={letter.key}
            letter={letter}
            rowIndex={rowIndex}
            letterIndex={letterIndex}
            autoFocus={isLast && !letterIndex && !letter.value}
          />
        ))}
      </div>
    </div>
  );
}

Row.propTypes = {
  row: array.isRequired,
  rowIndex: number.isRequired,
  isLast: bool,
};

Row.defaultProps = {
  isLast: false,
};
