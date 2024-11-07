import { getGreeting } from '../support/app.po';

describe('myshell-fun', () => {
  it('should display welcome message', () => {
    // cy.visit('http://localhost:3000/app/detail?id=0ec12a92-9a92-11ef-b5ea-9ebb585eaf7d')
    cy.visit('https://www.baidu.com');
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Welcome myshell-fun');
  });
});
