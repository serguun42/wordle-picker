import { useState } from 'react';
import Ripple from './Ripple';
import Row from './Row';
import './CardGame.css';

/** @type {import('../types/Row').Row} */
const DEFAULT_ROW = [
  { value: 'c', state: 'unknown' },
  { value: 'r', state: 'unknown' },
  { value: 'a', state: 'unknown' },
  { value: 't', state: 'unknown' },
  { value: 'e', state: 'unknown' },
];

export default function CardGame() {
  /** @type {[import('../types/Row').Row[]]} */
  const [rows, setRows] = useState([DEFAULT_ROW]);

  const UpdateRows = () => setRows(rows.map((row) => row.map((letter) => ({ ...letter }))));

  const DeleteRow = () => {
    rows.pop();
    UpdateRows();
  };

  const AddRow = () => {
    /** @type {import('../types/Row').Row} */
    const newRow = Array.from(
      { length: 5 },
      /** @returns {import('../types/Row').Letter} */ () => ({ value: '', state: 'unknown' })
    );

    rows.push(newRow);
    UpdateRows();
  };

  return (
    <div className="card-game" key={rows.length}>
      <div className={`card-game__rows ${!rows.length ? 'card-game__rows--hidden' : ''}`}>
        {rows.map((row, rowIndex) => (
          <Row row={row} rowIndex={rowIndex} key={row.map((letter) => letter.key).join('-')} updateRows={UpdateRows} />
        ))}
      </div>

      <div className="card-game__buttons">
        {rows.length ? (
          <div className="card-game__button default-pointer default-no-select" onClick={DeleteRow}>
            <span className="material-icons">delete</span>
            <span>Delete last row</span>
            <Ripple />
          </div>
        ) : null}
        <div className="card-game__button default-pointer default-no-select" onClick={AddRow}>
          <span className="material-icons">add</span>
          <span>Add filter</span>
          <Ripple />
        </div>
      </div>
    </div>
  );
}
