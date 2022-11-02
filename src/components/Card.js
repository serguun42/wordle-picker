import { string } from 'prop-types';
import CardGame from './CardGame';
import CardAbout from './CardAbout';
import './Card.css';

/** @typedef {"game" | "about"} CardRoleType */
/**
 * @param {{ cardRole: CardRoleType }} props
 */
export default function Card({ cardRole }) {
  return <div className="card">{cardRole === 'game' ? <CardGame /> : cardRole === 'about' ? <CardAbout /> : null}</div>;
}

Card.propTypes = {
  cardRole: string.isRequired,
};
