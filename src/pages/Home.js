import { useSelector } from 'react-redux';
import Ripple from '../components/Ripple';
import store from '../store';
import { nextTheme } from '../store/theme';
import './Home.css';

const WORDLE_FIRST_DATE = new Date(2021, 5, 19, 0, 0, 0, 0);
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export default function Home() {
  /** @type {{ theme: import("../store/theme").ThemeObject }} */
  const themeState = useSelector((state) => state.theme);

  const daysPassed = Math.floor((Date.now() - WORDLE_FIRST_DATE.getTime()) / DAY);

  return (
    <>
      <h1 className="home__title default-title-font">Wordle Picker</h1>

      <div className="home__flex">
        <div className="home__flex__side">
          <div className="home__action-cards-container">
            <div className="home__action-card home__action-card--accent default-no-select">
              <i className="material-icons">today</i>
              <div>Wordle #{daysPassed}</div>
            </div>
            <div
              className="home__action-card default-pointer default-no-select"
              onClick={() => store.dispatch(nextTheme())}
            >
              <i className="material-icons">{themeState.icon}</i>
              <div>Switch theme</div>
              <Ripple />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
