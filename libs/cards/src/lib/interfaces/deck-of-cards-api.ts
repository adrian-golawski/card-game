export interface CreateDeckResponse {
  success: boolean;
  deck_id: string;
  shuffled: boolean;
  remaining: number;
}

export interface DrawCardResponse {
  success: boolean;
  cards: Card[];
  deck_id: string;
  remaining: number;
}

export interface Card {
  image: string;
  value: CardValue;
  suit: string;
  code: CardCode;
}

export interface AddToPileResponse {
  success: boolean;
  deck_id: string;
  remaining: number;
  piles: {
    [key: string]: {
      remaining: number;
    };
  };
}

export interface GetPileResponse {
  success: boolean;
  deck_id: string;
  remaining: number;
  piles: {
    [key: string]: {
      cards: Card[];
      remaining?: number;
    };
  };
}

export type CardCode = string;

export enum CardValue {
  ACE = 'ACE',
  NUM2 = '2',
  NUM3 = '3',
  NUM4 = '4',
  NUM5 = '5',
  NUM6 = '6',
  NUM7 = '7',
  NUM8 = '8',
  NUM9 = '9',
  NUM10 = '0',
  JACK = 'JACK',
  QUEEN = 'QUEEN',
  KING = 'KING',
}
