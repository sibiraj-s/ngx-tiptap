/// <reference types="cypress" />

describe('ngx-tiptap: bubble-menu', () => {
  beforeEach(() => {
    cy.visit('/bubble-menu');
  });

  it('should render the editor', () => {
    cy.get('.ProseMirror').should('have.length', 1);
    cy.get('.ProseMirror').should('have.attr', 'contenteditable');
    cy.get('.ProseMirror').should('contain.text', 'Lorem Ipsum');
  });

  it('should render bubble menu on selection', () => {
    cy.get('#editor-with-bubble-menu .ProseMirror').focus().type('{selectall}');
    cy.get('[data-test-id=bubble-menu]').should('have.length', 1);
  });
});
