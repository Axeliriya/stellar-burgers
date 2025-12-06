import { burgerConstructorSelectors } from '../support/selectors/burger-constructor';

describe('[e2e] Burger Constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');

    cy.get(burgerConstructorSelectors.ingredientCard).should('have.length', 3);
  });

  it('Добавление ингредиентов в конструктор', () => {
    cy.addIngredientByIndex(0);
    cy.addIngredientByIndex(1);
    cy.addIngredientByIndex(2);

    cy.get(burgerConstructorSelectors.bunTop)
      .should('be.visible')
      .and('contain.text', '(верх)');

    cy.get(burgerConstructorSelectors.bunBottom)
      .should('be.visible')
      .and('contain.text', '(низ)');

    cy.get(burgerConstructorSelectors.fillingItem).should('have.length', 2);
  });

  it('Открытие и закрытие модального окна с ингредиентами', () => {
    cy.openIngredientModal(0);
    cy.get(burgerConstructorSelectors.modal).should('be.visible');

    cy.closeModal();
    cy.get(burgerConstructorSelectors.modal).should('not.exist');

    cy.openIngredientModal(0);

    cy.closeModalByOverlay();
    cy.get(burgerConstructorSelectors.modal).should('not.exist');
  });

  it('Создание заказа, когда пользователь авторизован', () => {
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');

    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    cy.loginAsTestUser();

    cy.visit('/');

    cy.get(burgerConstructorSelectors.ingredientCard).should('have.length', 3);

    cy.addIngredientByIndex(0);
    cy.addIngredientByIndex(1);
    cy.addIngredientByIndex(2);

    cy.get(burgerConstructorSelectors.orderButton).click();

    cy.wait('@createOrder');

    cy.get(burgerConstructorSelectors.orderNumber)
      .should('be.visible')
      .and('contain.text', '89498');

    cy.closeModal();

    cy.shouldHaveEmptyConstructor();

    cy.logout();
  });
});
