export const burgerConstructorSelectors = {
  ingredientCard: '[data-cy=ingredient]',
  addButton: 'button:contains("Добавить")',
  bunTop: '[data-cy=burger-constructor-bun-top]',
  bunBottom: '[data-cy=burger-constructor-bun-bottom]',
  fillingItem: '[data-cy=burger-constructor-filling-item]',
  orderButton: 'button:contains("Оформить заказ")',
  modal: '[data-cy=modal]',
  modalClose: '[data-cy=modal-close]',
  modalOverlay: '[data-cy=modal-overlay]',
  orderNumber: '[data-cy=order-number]',
  ingredientLink: 'a[href^="/ingredients/"]'
} as const;

export type TBurgerConstructorSelectors =
  (typeof burgerConstructorSelectors)[keyof typeof burgerConstructorSelectors];
