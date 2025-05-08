import './commands';
import '@4tw/cypress-drag-drop';

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});
