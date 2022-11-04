import { useSelector } from 'react-redux';
import Ripple from './Ripple';
import Row from './Row';
import store from '../store';
import { addEmptyRow, deleteRow } from '../store/rows';
import './CardGame.css';
import PopupDeletionConfirm from '../util/popups/deletion-confirm';

export default function CardGame() {
  /** @type {{ rows: import('../types/Row').Row[] }} */
  const { rows } = useSelector((state) => state.rows);

  const DeleteRow = () => PopupDeletionConfirm(() => store.dispatch(deleteRow()));

  const AddEmptyRow = () => store.dispatch(addEmptyRow());

  return (
    <div className="card-game" key={rows.length} onContextMenu={(e) => e.preventDefault()}>
      <div className={`card-game__rows ${!rows.length ? 'card-game__rows--hidden' : ''}`}>
        {rows.map((row, rowIndex) => (
          <Row
            row={row}
            key={row.map((letter) => letter.key).join('')}
            rowIndex={rowIndex}
            isLast={rowIndex === rows.length - 1}
          />
        ))}
      </div>

      <div className="card__buttons">
        {rows.length ? (
          <div className="card__button default-pointer default-no-select" onClick={DeleteRow}>
            <span className="material-icons">delete</span>
            <span>Delete last row</span>
            <Ripple />
          </div>
        ) : null}
        <div className="card__button default-pointer default-no-select" onClick={AddEmptyRow}>
          <span className="material-icons">add</span>
          <span>Add filter/row</span>
          <Ripple />
        </div>
      </div>
    </div>
  );
}
