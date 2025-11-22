import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  burgerConstructorReducer,
  ingredientsReducer,
  userReducer,
  feedReducer,
  orderDetailsReducer,
  userOrdersReducer,
  orderInfoReducer
} from '@slices';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  ingredients: ingredientsReducer,
  feed: feedReducer,
  user: userReducer,
  orderDetails: orderDetailsReducer,
  orderInfo: orderInfoReducer,
  userOrders: userOrdersReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
