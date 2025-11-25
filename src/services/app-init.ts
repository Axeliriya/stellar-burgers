import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredients } from './slices/ingredients/ingredients-slice';
import { getUser } from './slices/user/user-actions';
import { getCookie } from '../utils/cookie';
import { setAuthChecked } from './slices/user/user-slice';

export const initializeApp = createAsyncThunk(
  'app/initialize',
  async (_, { dispatch }) => {
    await dispatch(getIngredients()).unwrap();

    const token = getCookie('accessToken');

    if (token) {
      await dispatch(getUser())
        .unwrap()
        .catch(() => null);
    } else {
      dispatch(setAuthChecked(true));
    }
  }
);
