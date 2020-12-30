import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { GameModule } from '@card-game/game';
import { SummaryModule } from '@card-game/summary';
import { WelcomeModule } from '@card-game/welcome';

import { AppComponent } from './app.component';
import { routes } from './routes';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled',
    }),
    WelcomeModule,
    GameModule,
    SummaryModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
