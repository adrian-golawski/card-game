import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AppModule } from './app.module';

describe('AppModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [AppModule],
        providers: [
          {
            provide: RouterModule,
            useValue: RouterTestingModule.withRoutes([
              {
                path: '',
                redirectTo: '/test',
                pathMatch: 'full',
              },
            ]),
          },
        ],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(AppModule).toBeDefined();
  });
});
