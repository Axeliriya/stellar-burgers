export enum ModalType {
  Ingredient = 'ingredient',
  FeedOrder = 'feed-order',
  ProfileOrder = 'profile-order',
  OrderSuccess = 'order-success'
}

export const MODAL_TITLES: Record<ModalType, string> = {
  [ModalType.Ingredient]: 'Детали ингредиента',
  [ModalType.FeedOrder]: 'Params',
  [ModalType.ProfileOrder]: 'Params',
  [ModalType.OrderSuccess]: ''
};
