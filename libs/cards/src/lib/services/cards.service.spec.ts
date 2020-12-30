import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { CardsService } from './cards.service';

describe('CardsService', () => {
  let service: CardsService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CardsService,
        {
          provide: HttpClient,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    });
    service = TestBed.inject(CardsService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
