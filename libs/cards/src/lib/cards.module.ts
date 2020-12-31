import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CardsEffects } from './+state/cards2/cards.effects';
import { CardsFacade } from './+state/cards2/cards.facade';
import * as fromCards from './+state/cards2/cards.reducer';
import { CardsService } from './services/cards.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromCards.CARDS_FEATURE_KEY, fromCards.reducer),
    EffectsModule.forFeature([CardsEffects]),
  ],
  providers: [CardsService, CardsFacade],
})
export class CardsModule {}
