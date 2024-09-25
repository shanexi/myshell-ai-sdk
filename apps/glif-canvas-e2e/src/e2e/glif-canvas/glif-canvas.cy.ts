describe('glif-canvas: GlifCanvas component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=glifcanvas--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to GlifCanvas!');
  });
});
