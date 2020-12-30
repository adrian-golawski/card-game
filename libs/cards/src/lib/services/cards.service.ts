import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import {
  AddToPileResponse,
  Card,
  CreateDeckResponse,
  DrawCardResponse,
  GetPileResponse,
} from '../interfaces/deck-of-cards-api';

const API_PREFIX = '/api/card';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  constructor(private readonly httpClient: HttpClient) {}

  getNewDeck(): Observable<CreateDeckResponse> {
    return this.httpClient.get<CreateDeckResponse>(
      `${API_PREFIX}/deck/new/shuffle/?deck_count=1`
    );
  }

  getExistingDeck(deckId: string): Observable<CreateDeckResponse> {
    return this.httpClient.get<CreateDeckResponse>(
      `${API_PREFIX}/deck/${deckId}/`
    );
  }

  drawCardFromDeck(deckId: string): Observable<DrawCardResponse> {
    return this.httpClient.get<DrawCardResponse>(
      `${API_PREFIX}/deck/${deckId}/draw/?count=1`
    );
  }

  addCardToPlayedPile(
    { code }: Card,
    deckId: string
  ): Observable<AddToPileResponse> {
    return this.httpClient.get<AddToPileResponse>(
      `${API_PREFIX}/deck/${deckId}/pile/played/add/?cards=${code}`
    );
  }

  getPlayedCards(deckId: string): Observable<GetPileResponse> {
    return this.httpClient.get<GetPileResponse>(
      `${API_PREFIX}/deck/${deckId}/pile/played/list`
    );
  }
}
