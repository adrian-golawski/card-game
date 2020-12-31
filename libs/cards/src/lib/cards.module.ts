import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CardsEffects } from './+state/cards/cards.effects';
import { CardsFacade } from './+state/cards/cards.facade';
import * as fromCards from './+state/cards/cards.reducer';
import { CardsService } from './services/cards.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromCards.CARDS_FEATURE_KEY, fromCards.reducer),
    EffectsModule.forFeature([CardsEffects]),
    HttpClientModule,
  ],
  providers: [CardsService, CardsFacade],
})
export class CardsModule {}
