import { burgerConstructorSelectors } from './selectors/burger-constructor';

Cypress.Commands.add('addIngredientByIndex', (index: number) => {
  cy.get(burgerConstructorSelectors.ingredientCard)
    .eq(index)
    .within(() => cy.get(burgerConstructorSelectors.addButton).click());
});

Cypress.Commands.add('openIngredientModal', (index: number) => {
  cy.get(burgerConstructorSelectors.ingredientCard)
    .eq(index)
    .find(burgerConstructorSelectors.ingredientLink)
    .click();
});

Cypress.Commands.add('closeModal', () => {
  cy.get(burgerConstructorSelectors.modalClose).click();
});

Cypress.Commands.add('closeModalByOverlay', () => {
  cy.get(burgerConstructorSelectors.modalOverlay).click({ force: true });
});

Cypress.Commands.add('loginAsTestUser', () => {
  cy.setCookie('accessToken', 'mock-access-token');
  window.localStorage.setItem('refreshToken', 'mock-refresh-token');
});

Cypress.Commands.add('logout', () => {
  cy.clearCookie('accessToken');
  window.localStorage.removeItem('refreshToken');
});

Cypress.Commands.add('shouldHaveEmptyConstructor', () => {
  cy.get(burgerConstructorSelectors.bunTop).should('not.exist');
  cy.get(burgerConstructorSelectors.bunBottom).should('not.exist');
  cy.get(burgerConstructorSelectors.fillingItem).should('have.length', 0);
});
