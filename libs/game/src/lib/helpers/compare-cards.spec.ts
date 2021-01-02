import { Card, CardValue } from '@card-game/cards';

import { compareCards } from './compare-cards';

describe('compareCards', () => {
  it('should return -1 when the first card is smaller', () => {
    const cardA: Card = {
      code: '',
      image: '',
      suit: '',
      value: CardValue.ACE,
    };

    const cardB: Card = {
      code: '',
      image: '',
      suit: '',
      value: CardValue.JACK,
    };

    expect(compareCards(cardA.value, cardB.value)).toBe(-1);
  });

  it('should return 0 when the cards are equal', () => {
    const cardA: Card = {
      code: '',
      image: '',
      suit: '',
      value: CardValue.NUM10,
    };

    const cardB: Card = {
      code: '',
      image: '',
      suit: '',
      value: CardValue.NUM10,
    };

    expect(compareCards(cardA.value, cardB.value)).toBe(0);
  });

  it('should return 1 when the first card is bigger', () => {
    const cardA: Card = {
      code: '',
      image: '',
      suit: '',
      value: CardValue.KING,
    };

    const cardB: Card = {
      code: '',
      image: '',
      suit: '',
      value: CardValue.JACK,
    };

    expect(compareCards(cardA.value, cardB.value)).toBe(1);
  });
});
