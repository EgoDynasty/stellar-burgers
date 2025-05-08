describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as('placeOrder');

    cy.login();

    cy.visit('/');

    cy.wait('@getIngredients');
  });

  it('Обработка добавления ингредиента в конструктор', () => {
    cy.get('[data-testid=ingredient-bun1]').should('be.visible');
    cy.get('[data-testid=ingredient-filling1]').should('be.visible');

    cy.get('[data-testid=ingredient-bun1] button').click();
    cy.get('[data-testid=constructor-bun]').should('contain.text', 'Флюоресцентная булка R2-D3');

    cy.get('[data-testid=ingredient-filling1] button').click();
    cy.get('[data-testid=constructor-filling]').should('contain.text', 'Мясо бессмертных моллюсков Protostomia');
  });

  it('Обработка открытия и закрытия модального окна ингредиента', () => {
    cy.get('[data-testid=ingredient-bun1]').click();
    cy.get('[data-testid=modal]').should('be.visible');

    cy.get('[data-testid=modal-close]').click();
    cy.get('[data-testid=modal]').should('not.exist');
  });

  it('Обработка закрытия модального окна по оверлею', () => {
    cy.get('[data-testid=ingredient-bun1]').click();
    cy.get('[data-testid=modal]').should('be.visible');

    cy.get('[data-testid=modal-overlay]').click({ force: true });
    cy.get('[data-testid=modal]').should('not.exist');
  });

  it('Обработка создания заказа', () => {
    cy.get('[data-testid=ingredient-bun1] button').click();
    cy.get('[data-testid=constructor-bun]').should('contain.text', 'Флюоресцентная булка R2-D3');

    cy.get('[data-testid=ingredient-filling1] button').click();
    cy.get('[data-testid=constructor-filling]').should('contain.text', 'Мясо бессмертных моллюсков Protostomia');

    cy.get('[data-testid=order-button]').click();
    cy.wait('@placeOrder', { requestTimeout: 10000 }).then((interception) => {
      expect(interception.response?.statusCode).to.eq(200);
    });

    cy.get('[data-testid=modal]').should('be.visible');
    cy.get('[data-testid=order-number]').should('contain.text', '12345');

    cy.get('[data-testid=modal-close]').click();
    cy.get('[data-testid=modal]').should('not.exist');

    cy.get('[data-testid=constructor-bun]').should('not.exist');
    cy.get('[data-testid=constructor-filling]').should('not.exist');
  });
});
