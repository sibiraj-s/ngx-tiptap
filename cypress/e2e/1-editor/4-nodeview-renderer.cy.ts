describe('ngx-tiptap: nodeview-renderer', () => {
  beforeEach(() => {
    cy.visit('/nodeview-renderer');
  });

  it('should render the editor', () => {
    cy.get('.ProseMirror').should('have.length', 1);
    cy.get('.ProseMirror').should('have.attr', 'contenteditable');
    cy.get('.ProseMirror').should('contain.text', 'node views.');
  });

  it('should render the counter component', () => {
    cy.get('button')
      .contains('clicked 0 times')
      .click()
      .should('contain.text', 'clicked 1 times')
      .click()
      .should('contain.text', 'clicked 2 times');
  });

  it('should render the editable component', () => {
    cy.get('.angular-component-with-content').contains('is editable').type('.');
    cy.get('.angular-component-with-content').should('contain.text', 'This text is editable.');
  });
});
