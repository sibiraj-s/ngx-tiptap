/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should render the editor', () => {
    cy.get('.ProseMirror').should('have.length', 4);
    cy.get('.ProseMirror').should('have.attr', 'contenteditable');
    cy.get('.ProseMirror').should('contain.text', 'text editor');
  });

  it('should render bubble menu on selection', () => {
    cy.get('#editor-with-bubble-menu .ProseMirror').focus().type('{selectall}');
    cy.get('[data-test-id=bubble-menu]').should('have.length', 1);
  });

  it('should render floating menu', () => {
    cy.get('#editor-with-floating-menu .ProseMirror').focus().type('{selectall}').clear();
    cy.get('[data-test-id=floating-menu]').should('have.length', 1);
  });
});
