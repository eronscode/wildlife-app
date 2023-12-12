/// <reference types="cypress" />

describe('app', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/animals**').as('searchRequest');
    cy.visit('http://localhost:4000');
  });

  it('performs a search and shows search results', () => {
    const searchName = 'lion';

    cy.get('input').type(searchName);
    cy.contains('Search').click();

    cy.get('[role="status"][aria-label="Loading"]').should('be.visible');

    cy.wait('@searchRequest').then((interception) => {
      expect(interception.request.url).to.include(`/animals?name=${searchName}`);
    });

    cy.get('[role="status"][aria-label="Loading"]').should('not.exist');
    cy.get('.results-container').should('be.visible');
    cy.get('.results-container').contains('cape lion', { matchCase: false });
  });

  it('performs a search and shows error if no results', () => {
    const searchName = 'some weird search term';

    cy.get('input').type(searchName);
    cy.contains('Search').click();

    cy.get('[role="status"][aria-label="Loading"]').should('be.visible');

    cy.wait('@searchRequest').then((interception) => {
      expect(interception.request.url).to.include(
        `/animals?name=${encodeURIComponent(searchName)}`,
      );
    });

    cy.get('[role="status"][aria-label="Loading"]').should('not.exist');

    cy.get('.results-container').should('not.exist');
    cy.contains(`No results found for "${searchName}"`).should('be.visible');
  });

  it('loads animal details from API on details page', () => {
    const searchName = 'lion';

    cy.get('input').type(searchName).type('{enter}');

    cy.wait('@searchRequest');

    cy.get('.results-container a').eq(0).click();

    cy.url().then((url) => {
      const animalName = url.split('/').pop();

      cy.wait('@searchRequest').then((interception) => {
        expect(interception.request.url).to.include(`/animals?name=${animalName}`);
        expect(interception?.response?.statusCode).to.equal(200);
      });

      cy.contains(decodeURIComponent(animalName ?? '')).should('be.visible');
      cy.contains('Back to search', { matchCase: false }).should('be.visible');
      cy.contains('Taxonomy', { matchCase: false }).should('be.visible');
      cy.contains('Characteristics', { matchCase: false }).should('be.visible');
    });
  });

  it('searches for an animal, adds to favourites, navigates to favourites, and verifies selected favourites', () => {
    const searchName = 'fish';

    cy.get('input').type(searchName).type('{enter}');

    cy.get('.results-container a').eq(1).click();

    cy.url().should('include', '/animal/');
    cy.url().then((url) => {
      const animalName = url.split('/').pop();
      const selectedItem = decodeURIComponent(animalName ?? '');

      cy.contains('Add to Favourites', { matchCase: false }).click();

      cy.contains('Remove from Favourites', { matchCase: false }).should('be.visible');

      cy.get('header').contains('favourite animals', { matchCase: false }).click();
      cy.contains('my favourites', { matchCase: false }).should('be.visible');
      cy.contains(selectedItem, { matchCase: false }).should('be.visible');
    });
  });
});
