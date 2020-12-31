import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { CardsFacade } from '@card-game/cards';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DeckGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly cardsFacade: CardsFacade
  ) {}

  public canActivate(): Observable<boolean | UrlTree> {
    return this.cardsFacade.deckLoaded$.pipe(
      map((deckLoaded): boolean | UrlTree =>
        deckLoaded ? true : this.router.createUrlTree(['/'])
      )
    );
  }
}
