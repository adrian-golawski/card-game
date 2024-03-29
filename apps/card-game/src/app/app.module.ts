import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CardsModule } from '@card-game/cards';
import { GameModule, ROUND_COUNT } from '@card-game/game';
import { WelcomeModule } from '@card-game/welcome';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { localStorageSync } from 'ngrx-store-localstorage';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { DeckGuard } from './deck.guard';
import { routes } from './routes';

// tslint:disable:no-any
export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['game', 'card'], rehydrate: true })(reducer);
}
const metaReducers: MetaReducer<any, any>[] = [localStorageSyncReducer];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled',
    }),
    StoreModule.forRoot(
      { router: routerReducer },
      {
        metaReducers,
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    WelcomeModule,
    GameModule,
    CardsModule,
  ],
  providers: [
    DeckGuard,
    // tslint:disable-next-line:no-magic-numbers
    { provide: ROUND_COUNT, useValue: environment.production ? 30 : 3 },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
