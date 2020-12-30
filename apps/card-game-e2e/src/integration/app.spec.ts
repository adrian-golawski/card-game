import { getGreeting } from '../support/app.po';

describe('card-game', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('card-game');
  });
});
