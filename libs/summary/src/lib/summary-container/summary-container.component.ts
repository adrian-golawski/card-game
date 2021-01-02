import { Component, OnInit } from '@angular/core';
import { GameFacade } from '@card-game/game';

import { Observable } from 'rxjs';

@Component({
  selector: 'card-game-summary-container',
  templateUrl: './summary-container.component.html',
  styleUrls: ['./summary-container.component.scss'],
})
export class SummaryContainerComponent implements OnInit {
  score$: Observable<number> = this.gameFacade.score$;
  constructor(private readonly gameFacade: GameFacade) {}

  ngOnInit(): void {}

  playAgain(): void {
    this.gameFacade.startNewGame();
  }
}
