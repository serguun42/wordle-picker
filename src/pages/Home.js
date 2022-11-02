import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
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
  const navigate = useNavigate();

  /** @type {{ theme: import("../store/theme").ThemeObject }} */
  const themeState = useSelector((state) => state.theme);

  const daysPassed = Math.floor((Date.now() - WORDLE_FIRST_DATE.getTime()) / DAY);

  return (
    <>
      <h1 className="home__title default-title-font">Wordle Picker</h1>
      <h4 className="home__subtitle default-title-font">Today&apos;s Wordle number is #{daysPassed}</h4>

      <div className="home__action-cards-container">
        <div
          className="home__action-card home__action-card--accent default-pointer default-no-select"
          onClick={() => navigate('/about')}
        >
          <i className="material-icons">info</i>
          <div>How to use</div>
          <Ripple inheritTextColor />
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

      <Card cardRole="game" />
    </>
  );
}
