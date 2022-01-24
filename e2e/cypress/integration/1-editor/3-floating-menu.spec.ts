/// <reference types="cypress" />

describe('ngx-tiptap: floating-menu', () => {
  beforeEach(() => {
    cy.visit('/floating-menu');
  });

  it('should render the editor', () => {
    cy.get('.ProseMirror').should('have.length', 1);
    cy.get('.ProseMirror').should('have.attr', 'contenteditable');
    cy.get('.ProseMirror').should('contain.text', 'Medium-like editor');
  });

  it('should render floating menu', () => {
    cy.get('#editor-with-floating-menu .ProseMirror').focus().type('{selectall}').clear();
    cy.get('[data-test-id=floating-menu]').should('have.length', 1);
  });
});
