import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Observable } from 'rxjs';

@Injectable()
export class GameEffects {
  constructor(private readonly actions: Observable<Action>) {}
}
