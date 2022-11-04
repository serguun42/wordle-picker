export type LetterState = 'correct' | 'present' | 'absent';

export type Letter = {
  value: string;
  state: LetterState;
  key: string;
};

export type Row = Letter[];

export default Row;
