import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { cold } from '@nrwl/angular/testing';

import { of } from 'rxjs';

import { Card, CardValue } from '../interfaces/deck-of-cards-api';
import { CardsService } from './cards.service';

describe('CardsService', () => {
  let service: CardsService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CardsService,
        {
          provide: HttpClient,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    });
    service = TestBed.inject(CardsService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getNewDeck()', () => {
    it('should return new Deck from Deck of Cards API', () => {
      const response = {
        success: true,
        deck_id: '3p40paa87x90',
        shuffled: true,
        remaining: 52,
      };

      const result = cold('(a|)', { a: response });
      const { get } = httpClient;

      (get as jest.Mock).mockReturnValue(of(response));

      expect(service.getNewDeck()).toBeObservable(result);
      expect(get).toBeCalledWith('/api/card/deck/new/shuffle/?deck_count=1');
    });
  });

  describe('getExistingDeck()', () => {
    it('should return an existing Deck from Deck of Cards API', () => {
      const response = {
        success: true,
        deck_id: '3p40paa87x90',
        shuffled: true,
        remaining: 52,
      };

      const result = cold('(a|)', { a: response });
      const { get } = httpClient;

      (get as jest.Mock).mockReturnValue(of(response));

      expect(service.getExistingDeck('3p40paa87x90')).toBeObservable(result);
      expect(get).toBeCalledWith('/api/card/deck/3p40paa87x90/');
    });
  });

  describe('drawCardFromDeck()', () => {
    it('should return a card from a given Deck of Cards API', () => {
      const card = {
        image: 'https://deckofcardsapi.com/static/img/KH.png',
        value: 'KING',
        suit: 'HEARTS',
        code: 'KH',
      };
      const response = {
        success: true,
        cards: [card],
        deck_id: '3p40paa87x90',
        remaining: 51,
      };

      const result = cold('(a|)', { a: response });
      const { get } = httpClient;

      (get as jest.Mock).mockReturnValue(of(response));

      expect(service.drawCardFromDeck('3p40paa87x90')).toBeObservable(result);
      expect(get).toBeCalledWith('/api/card/deck/3p40paa87x90/draw/?count=1');
    });
  });

  describe('addCardToPlayedPile()', () => {
    it('should add a card to a played pile in Deck of Cards API', () => {
      const card: Card = {
        image: 'https://deckofcardsapi.com/static/img/KH.png',
        value: CardValue.KING,
        suit: 'HEARTS',
        code: 'KH',
      };
      const deckId = '3p40paa87x90';
      const response = {
        success: true,
        deck_id: deckId,
        remaining: 12,
        piles: {
          discard: {
            remaining: 2,
          },
        },
      };

      const result = cold('(a|)', { a: response });
      const { get } = httpClient;

      (get as jest.Mock).mockReturnValue(of(response));

      expect(service.addCardToPlayedPile(card, deckId)).toBeObservable(result);
      expect(get).toBeCalledWith(
        `/api/card/deck/${deckId}/pile/played/add/?cards=${card.code}`
      );
    });
  });

  describe('getPlayedCards()', () => {
    it('should return cards from played pile of a given Deck from Cards API', () => {
      const card: Card = {
        image: 'https://deckofcardsapi.com/static/img/KH.png',
        value: CardValue.KING,
        suit: 'HEARTS',
        code: 'KH',
      };
      const deckId = '3p40paa87x90';
      const response = {
        success: true,
        deck_id: deckId,
        remaining: 12,
        piles: {
          discard: {
            remaining: 2,
          },
        },
      };

      const result = cold('(a|)', { a: response });
      const { get } = httpClient;

      (get as jest.Mock).mockReturnValue(of(response));

      expect(service.getPlayedCards(deckId)).toBeObservable(result);
      expect(get).toBeCalledWith(`/api/card/deck/${deckId}/pile/played/list`);
    });
  });
});
