declare namespace Cypress {
    interface Chainable {
      login(): Chainable<void>;
    }
  }
  
  Cypress.Commands.add('login', () => {
    cy.setCookie('accessToken', 'Bearer mockAccessToken');
    localStorage.setItem('refreshToken', 'mockRefreshToken');
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.window().then((win) => {
      const { dispatch } = win.store || {};
      if (dispatch) {
        dispatch({
          type: 'auth/fetchUser/fulfilled',
          payload: { email: 'test@example.com', name: 'Test User' }
        });
      }
    });
  });
