import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardsService } from './services/cards.service';

@NgModule({
  imports: [CommonModule],
  providers: [CardsService],
})
export class CardsModule {}
