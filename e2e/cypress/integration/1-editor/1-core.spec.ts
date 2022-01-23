/// <reference types="cypress" />

describe('ngx-tiptap', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should render the editor', () => {
    cy.get('.ProseMirror').should('have.length', 1);
    cy.get('.ProseMirror').should('have.attr', 'contenteditable');
    cy.get('.ProseMirror').should('contain.text', 'Lorem Ipsum');
  });
});
