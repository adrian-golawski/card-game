import { Card, CardValue } from '../interfaces/deck-of-cards-api';

const CARD_ORDER = [
  CardValue.ACE,
  CardValue.NUM2,
  CardValue.NUM3,
  CardValue.NUM4,
  CardValue.NUM5,
  CardValue.NUM6,
  CardValue.NUM7,
  CardValue.NUM8,
  CardValue.NUM9,
  CardValue.NUM10,
  CardValue.JACK,
  CardValue.QUEEN,
  CardValue.KING,
];

export function compareCards({ value: a }: Card, { value: b }: Card): number {
  const orderA = CARD_ORDER.indexOf(a);
  const orderB = CARD_ORDER.indexOf(b);

  if (orderA < orderB) {
    return -1;
  } else if (orderA > orderB) {
    return 1;
  }

  return 0;
}
