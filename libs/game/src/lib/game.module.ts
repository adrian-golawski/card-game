import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { GameEffects } from './+state/game/game.effects';
import { GameFacade } from './+state/game/game.facade';
import * as fromGame from './+state/game/game.reducer';
import { GameContainerComponent } from './game-container/game-container.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromGame.GAME_FEATURE_KEY, fromGame.reducer),
    EffectsModule.forFeature([GameEffects]),
  ],
  declarations: [GameContainerComponent],
  providers: [GameFacade],
})
export class GameModule {}
