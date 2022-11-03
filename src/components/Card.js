import { string } from 'prop-types';
import CardGame from './CardGame';
import CardResults from './CardResults';
import CardAbout from './CardAbout';
import './Card.css';

/** @typedef {"game" | "results" | "about"} CardRoleType */
/**
 * @param {{ cardRole: CardRoleType }} props
 */
export default function Card({ cardRole }) {
  return (
    <div className="card">
      {cardRole === 'game' ? (
        <CardGame />
      ) : cardRole === 'results' ? (
        <CardResults />
      ) : cardRole === 'about' ? (
        <CardAbout />
      ) : null}
    </div>
  );
}

Card.propTypes = {
  cardRole: string.isRequired,
};
