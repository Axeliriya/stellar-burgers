import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import type { TOrder } from '@utils-types';
import type { RootState } from '../../../services/store';

type TUserOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TUserOrdersState = {
  orders: [],
  isLoading: false,
  error: null
};

export const fetchUserOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('userOrders/fetchUserOrders', async (_, { rejectWithValue }) => {
  try {
    return await getOrdersApi();
  } catch (error) {
    return rejectWithValue(
      error instanceof Error
        ? error.message
        : 'Не удалось загрузить ваши заказы'
    );
  }
});

export const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? null;
      });
  },
  selectors: {
    selectUserOrders: (state: TUserOrdersState) => state.orders,
    selectUserOrdersLoading: (state: TUserOrdersState) => state.isLoading,
    selectUserOrdersError: (state: TUserOrdersState) => state.error
  }
});

export const {
  selectUserOrders,
  selectUserOrdersLoading,
  selectUserOrdersError
} = userOrdersSlice.getSelectors((state: RootState) => state.userOrders);

export default userOrdersSlice.reducer;
