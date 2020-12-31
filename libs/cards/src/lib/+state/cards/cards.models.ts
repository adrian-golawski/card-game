import { Card } from '@card-game/cards';

export interface DeckEntity {
  id: string;
  remaining: number;
  playedCards: Card[];
}
