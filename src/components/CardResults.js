import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FilterWordsWithRows from '../util/filter-words-with-rows';
import Ripple from './Ripple';
import './CardResults.css';
import dispatcher from '../util/dispatcher';

export default function CardResults() {
  /** @type {{ rows: import('../types/Row').Row[] }} */
  const { rows } = useSelector((state) => state.rows);
  /** @type {{ words: string[] }} */
  const { words } = useSelector((state) => state.words);

  const filteredWords = FilterWordsWithRows(words, rows);

  const [isExpanded, setExpanded] = useState(false);
  const [timesUpdated, setTimesUpdated] = useState(0);

  const SwitchResults = () => setExpanded(!isExpanded);

  useEffect(() => {
    const RowsChangedHandler = () => setTimesUpdated(timesUpdated + 1);

    dispatcher.link('rowsChanged', RowsChangedHandler);
    return () => dispatcher.unlink('rowsChanged', RowsChangedHandler);
  });

  return (
    <>
      <div className="card__buttons">
        <div
          className={`card__button ${filteredWords.length > 5 ? 'default-pointer' : ''} default-no-select`}
          onClick={() => filteredWords.length > 5 && SwitchResults()}
        >
          <span className="material-icons">
            {filteredWords.length > 5 ? (isExpanded ? 'unfold_less' : 'unfold_more') : 'close'}
          </span>
          <span>
            {filteredWords.length > 5
              ? isExpanded
                ? 'View less results'
                : `View all ${filteredWords.length} results`
              : filteredWords.length
              ? 'No more results'
              : 'No matching words'}
          </span>
          {filteredWords.length > 5 && <Ripple />}
        </div>
      </div>

      {filteredWords.length ? (
        <div className="card-results__list" key={timesUpdated}>
          {filteredWords.slice(0, isExpanded ? undefined : 5).map((word) => (
            <div className="card-results__word" key={word}>
              {word}
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}
