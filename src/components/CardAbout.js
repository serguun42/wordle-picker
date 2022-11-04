import { Link } from 'react-router-dom';
import Ripple from './Ripple';
import './CardAbout.css';

export default function CardAbout() {
  const isMobile = 'ontouchstart' in window;

  return (
    <div className="card-about">
      <ol>
        <li>
          Come up with word and fill it into{' '}
          <a href="https://www.nytimes.com/games/wordle" target="_blank" rel="noopener noreferrer">
            <i>actual Wordle game</i>
          </a>
          .
        </li>
        <li>
          Fill same word in this picker. Then mark each letter by color as in <i>actual Wordle</i> –{' '}
          {isMobile ? (
            <span>
              <b>long press on tile</b> or <b>swipe it left/right</b>
            </span>
          ) : (
            <span>
              <b>right click on tile</b> or <b>double click it</b>
            </span>
          )}{' '}
          to change its color. Color meaning:
          <ul className="card-about__marks">
            <li>
              <span className="card-about__correct-mark">Green color</span> indicates that letter is placed where it
              should be.
            </li>
            <li>
              <span className="card-about__present-mark">Yellow color</span> indicates that letter is present in given
              word at least one time – but its position is wrong.
            </li>
            <li>
              <span className="card-about__absent-mark">Gray/black color</span> indicates that letter is not present in
              this word (or that there is no second occurence of it if this is letter presented once already – but this
              scenario is quite rare).
            </li>
          </ul>
        </li>
        <li>
          After setting tiles to matching colors, check out results filtered by given tiles. Choose the most valid word
          from lower card (expand for more words if possible).
        </li>
        <li>Repeat if necessary.</li>
        <li>¿¿¿</li>
        <li>
          PROFIT! (<i>Don&apos;t forget that Wordle gives only 6 tries</i>)
        </li>
      </ol>

      <div className="card__buttons">
        <Link className="card__button default-pointer default-no-select" to="/">
          <span className="material-icons">home</span>
          <span>Home page</span>
          <Ripple />
        </Link>
      </div>
    </div>
  );
}
