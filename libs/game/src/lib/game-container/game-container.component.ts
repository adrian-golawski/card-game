import { Component, Inject, OnInit } from '@angular/core';
import { Card, CardsFacade } from '@card-game/cards';

import { Observable } from 'rxjs';
import { delay, filter, map, withLatestFrom } from 'rxjs/operators';

import { GameFacade } from '../+state/game/game.facade';
import { ROUND_COUNT } from '../tokens';

const IMG_LOAD_DELAY = 500;
const ARBITRARY_SCORE_MULTIPLIER = 10;

@Component({
  selector: 'card-game-game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.scss'],
})
export class GameContainerComponent implements OnInit {
  constructor(
    private readonly cardsFacade: CardsFacade,
    private readonly gameFacade: GameFacade,
    @Inject(ROUND_COUNT) public readonly roundCount: number
  ) {}
  cards: Card[];

  roundsLeft$: Observable<number> = this.gameFacade.roundsLeft$;
  allCards$: Observable<Card[]> = this.cardsFacade.playedCards$.pipe(
    map((playedCards) => {
      return Array(this.roundCount + 1)
        .fill(null)
        .map((_, i) => playedCards[i] || null)
        .reverse();
    })
  );

  reverseCardIndex: number = this.roundCount + 1;

  score$: Observable<number> = this.gameFacade.score$.pipe(
    delay(IMG_LOAD_DELAY),
    // tslint:disable-next-line:no-magic-numbers
    map((score) => score / ARBITRARY_SCORE_MULTIPLIER)
  );
  betGiven$: Observable<boolean> = this.gameFacade.betGiven$;
  betLower$: Observable<boolean> = this.gameFacade.betLower$;
  resultLoading$: Observable<boolean> = this.gameFacade.resultLoading$;
  gameInProgress$: Observable<boolean> = this.gameFacade.gameInProgress$;
  reverseCard(index: number): void {
    this.reverseCardIndex = index;
  }

  ngOnInit(): void {
    this.allCards$.pipe(delay(IMG_LOAD_DELAY)).subscribe((result) => {
      this.reverseCard(result.findIndex((card) => card));
    });
  }

  giveBet(lower: boolean): void {
    this.gameFacade.giveBet(lower);
  }

  verifyBet(): void {
    this.gameFacade.verifyBet();
  }

  restartGame(): void {
    this.gameFacade.restartGame();
  }
}
