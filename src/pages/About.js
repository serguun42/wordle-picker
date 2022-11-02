import Card from '../components/Card';
import './About.css';

export default function About() {
  return (
    <>
      <h1 className="about__title default-title-font">Wordle Picker</h1>
      <h4 className="about__subtitle default-title-font">How to use</h4>

      <Card cardRole="about" />
    </>
  );
}
