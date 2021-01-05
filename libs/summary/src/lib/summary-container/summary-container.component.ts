import { Component, OnInit } from '@angular/core';
import { GameFacade } from '@card-game/game';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'card-game-summary-container',
  templateUrl: './summary-container.component.html',
  styleUrls: ['./summary-container.component.scss'],
})
export class SummaryContainerComponent implements OnInit {
  score$: Observable<number> = this.gameFacade.score$.pipe(
    // tslint:disable-next-line:no-magic-numbers
    map((score) => score / 10)
  );
  constructor(private readonly gameFacade: GameFacade) {}

  ngOnInit(): void {}

  playAgain(): void {
    this.gameFacade.startNewGame();
  }
}
