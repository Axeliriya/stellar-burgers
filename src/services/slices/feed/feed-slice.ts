// src/services/slices/feed/feed-slice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import type { TOrdersData, TOrder } from '@utils-types';
import type { RootState } from '../../../services/store';

type TFeedState = {
  ordersData: TOrdersData;
  isLoading: boolean;
  error: string | null;
};

export const initialState: TFeedState = {
  ordersData: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: false,
  error: null
};

export const fetchFeeds = createAsyncThunk<
  TOrdersData,
  void,
  { rejectValue: string }
>('feed/fetchFeeds', async (_, { rejectWithValue }) => {
  try {
    const data = await getFeedsApi();
    return data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error
        ? error.message
        : 'Не удалось загрузить ленту заказов'
    );
  }
});

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ordersData = action.payload;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Ошибка загрузки ленты';
      });
  },
  selectors: {
    selectFeedOrdersData: (state: TFeedState) => state.ordersData,
    selectFeedOrders: (state: TFeedState) => state.ordersData.orders,
    selectFeedIsLoading: (state: TFeedState) => state.isLoading,
    selectFeedError: (state: TFeedState) => state.error
  }
});

export const {
  selectFeedOrdersData,
  selectFeedOrders,
  selectFeedIsLoading,
  selectFeedError
} = feedSlice.getSelectors((state: RootState) => state.feed);

export default feedSlice.reducer;
