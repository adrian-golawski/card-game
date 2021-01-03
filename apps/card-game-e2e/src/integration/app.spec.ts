import { betLowerButton, drawNextButton } from '../support/game.po';
import { finalScore, playAgainButton } from '../support/summary.po';
import { getContinueButton, getStartButton } from '../support/welcome.po';

describe('main game scenario', () => {
  it('should display initial start page', () => {
    cy.server();
    cy.visit('/');
    cy.route('GET', '/api/card/deck/new/shuffle/?deck_count=1', {
      success: true,
      deck_id: 'defe4mwg6kyk',
      remaining: 52,
      shuffled: true,
    }).as('getNewDeck');
    cy.route('GET', '/api/card/deck/defe4mwg6kyk/draw/?count=1', {
      success: true,
      deck_id: 'defe4mwg6kyk',
      cards: [
        {
          code: '7C',
          image: 'https://deckofcardsapi.com/static/img/7C.png',
          images: {
            svg: 'https://deckofcardsapi.com/static/img/7C.svg',
            png: 'https://deckofcardsapi.com/static/img/7C.png',
          },
          value: '7',
          suit: 'CLUBS',
        },
      ],
      remaining: 51,
    }).as('drawNewCard0');

    getStartButton().should('be.visible');
    getContinueButton().should('not.be.visible');

    getStartButton().click();
    betLowerButton().click();

    cy.route('GET', '/api/card/deck/defe4mwg6kyk/draw/?count=1', {
      success: true,
      deck_id: 'defe4mwg6kyk',
      cards: [
        {
          code: 'AD',
          image: 'https://deckofcardsapi.com/static/img/aceDiamonds.png',
          images: {
            svg: 'https://deckofcardsapi.com/static/img/aceDiamonds.svg',
            png: 'https://deckofcardsapi.com/static/img/aceDiamonds.png',
          },
          value: 'ACE',
          suit: 'DIAMONDS',
        },
      ],
      remaining: 50,
    }).as('drawNewCard1');

    drawNextButton().click();

    betLowerButton().click();

    cy.route('GET', '/api/card/deck/defe4mwg6kyk/draw/?count=1', {
      success: true,
      deck_id: 'defe4mwg6kyk',
      cards: [
        {
          code: '4S',
          image: 'https://deckofcardsapi.com/static/img/4S.png',
          images: {
            svg: 'https://deckofcardsapi.com/static/img/4S.svg',
            png: 'https://deckofcardsapi.com/static/img/4S.png',
          },
          value: '4',
          suit: 'SPADES',
        },
      ],
      remaining: 49,
    }).as('drawNewCard2');

    drawNextButton().click();

    betLowerButton().click();

    cy.route('GET', '/api/card/deck/defe4mwg6kyk/draw/?count=1', {
      success: true,
      deck_id: 'defe4mwg6kyk',
      cards: [
        {
          code: 'AS',
          image: 'https://deckofcardsapi.com/static/img/AS.png',
          images: {
            svg: 'https://deckofcardsapi.com/static/img/AS.svg',
            png: 'https://deckofcardsapi.com/static/img/AS.png',
          },
          value: 'ACE',
          suit: 'SPADES',
        },
      ],
      remaining: 48,
    }).as('drawNewCard3');

    drawNextButton().click();

    finalScore().should('be.visible');
    playAgainButton().should('be.visible');
  });
});
