import { Card, CardValue } from '@card-game/cards';

const CARD_ORDER = {
  [CardValue.ACE]: 1,
  [CardValue.NUM2]: 2,
  [CardValue.NUM3]: 3,
  [CardValue.NUM4]: 4,
  [CardValue.NUM5]: 5,
  [CardValue.NUM6]: 6,
  [CardValue.NUM7]: 7,
  [CardValue.NUM8]: 8,
  [CardValue.NUM9]: 9,
  [CardValue.NUM10]: 10,
  [CardValue.JACK]: 11,
  [CardValue.QUEEN]: 12,
  [CardValue.KING]: 13,
};

export function compareCards(a: CardValue, b: CardValue): number {
  if (CARD_ORDER[a] < CARD_ORDER[b]) {
    return -1;
  } else if (CARD_ORDER[a] > CARD_ORDER[b]) {
    return 1;
  }

  return 0;
}
