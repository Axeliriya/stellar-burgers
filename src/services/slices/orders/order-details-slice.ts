import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import type { TOrder } from '@utils-types';
import type { RootState } from '../../../services/store';

type TOrderDetailsState = {
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderDetailsState = {
  order: null,
  isLoading: false,
  error: null
};

export const createOrder = createAsyncThunk<
  TOrder,
  string[],
  { rejectValue: string }
>('orderDetails/createOrder', async (ingredientIds, { rejectWithValue }) => {
  try {
    const res = await orderBurgerApi(ingredientIds);
    return res.order;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Не удалось оформить заказ'
    );
  }
});

export const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.error = null;
      state.isLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Ошибка при оформлении заказа';
      });
  },
  selectors: {
    selectCurrentOrder: (state: TOrderDetailsState) => state.order,
    selectOrderDetailsLoading: (state: TOrderDetailsState) => state.isLoading,
    selectOrderDetailsError: (state: TOrderDetailsState) => state.error
  }
});

export const { clearOrder } = orderDetailsSlice.actions;

export const {
  selectCurrentOrder,
  selectOrderDetailsLoading,
  selectOrderDetailsError
} = orderDetailsSlice.getSelectors((state: RootState) => state.orderDetails);

export default orderDetailsSlice.reducer;
