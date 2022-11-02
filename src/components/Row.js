import { array, func, number } from 'prop-types';
import Letter from './Letter';
import './Row.css';

/** @param {{ row: import('../types/Row').Row, rowIndex: number, updateRows: Function }} props */
export default function Row({ row, rowIndex, updateRows }) {
  if (!Array.isArray(row)) return null;
  if (typeof rowIndex !== 'number') return null;

  return (
    <div className="row">
      <div className="row__index default-no-select">#{rowIndex + 1}</div>
      <div className="row__letters">
        {row.map((letter) => (
          <Letter letter={letter} key={letter.key} updateRows={updateRows} />
        ))}
      </div>
    </div>
  );
}

Row.propTypes = {
  row: array.isRequired,
  rowIndex: number.isRequired,
  updateRows: func.isRequired,
};
