declare global {
  namespace Cypress {
    interface Chainable {
      addIngredientByIndex(index: number): Chainable<JQuery<HTMLElement>>;
      openIngredientModal(index: number): Chainable<JQuery<HTMLElement>>;
      closeModal(): Chainable<JQuery<HTMLElement>>;
      closeModalByOverlay(): Chainable<JQuery<HTMLElement>>;
      loginAsTestUser(): Chainable<void>;
      logout(): Chainable<void>;
      shouldHaveEmptyConstructor(): Chainable<void>;
    }
  }
}

export {};
