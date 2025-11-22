import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredients } from './slices/ingredients/ingredients-slice';
import { getUser } from './slices/user/user-actions';
import { fetchFeeds } from './slices/feed/feed-slice';
import { getCookie } from '../utils/cookie';
import { setAuthChecked } from './slices/user/user-slice';

export const initializeApp = createAsyncThunk(
  'app/initialize',
  async (_, { dispatch }) => {
    const promises = [];

    promises.push(dispatch(getIngredients()).unwrap());
    promises.push(
      dispatch(fetchFeeds())
        .unwrap()
        .catch(() => null)
    );

    const token = getCookie('accessToken');

    if (token) {
      promises.push(
        dispatch(getUser())
          .unwrap()
          .catch(() => null)
      );
    } else {
      dispatch(setAuthChecked(true));
    }

    await Promise.all(promises);
  }
);
