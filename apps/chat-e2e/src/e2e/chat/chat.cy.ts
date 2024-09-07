describe('chat: Chat component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=chat--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to Chat!');
  });
});
