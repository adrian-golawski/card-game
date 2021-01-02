import { Component } from '@angular/core';
import { GameFacade } from '@card-game/game';

import { Observable } from 'rxjs';

@Component({
  selector: 'card-game-welcome-container',
  templateUrl: './welcome-container.component.html',
  styleUrls: ['./welcome-container.component.scss'],
})
export class WelcomeContainerComponent {
  gameInProgress$: Observable<boolean> = this.gameFacade.gameInProgress$;
  constructor(private readonly gameFacade: GameFacade) {}

  startNewGame(): void {
    this.gameFacade.startNewGame();
  }
}
