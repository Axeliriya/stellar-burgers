import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';
import type { TOrder } from '@utils-types';
import type { RootState } from '../../../services/store';

type TOrderInfoState = {
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderInfoState = {
  order: null,
  isLoading: false,
  error: null
};

export const fetchOrderByNumber = createAsyncThunk<
  TOrder,
  number,
  { rejectValue: string }
>('orderInfo/fetchByNumber', async (number, { rejectWithValue }) => {
  try {
    const response = await getOrderByNumberApi(number);
    if (!response.orders || response.orders.length === 0) {
      return rejectWithValue('Заказ не найден');
    }
    return response.orders[0];
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Ошибка загрузки заказа'
    );
  }
});

export const orderInfoSlice = createSlice({
  name: 'orderInfo',
  initialState,
  reducers: {
    clearOrderInfo: (state) => {
      state.order = null;
      state.error = null;
      state.isLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Не удалось загрузить заказ';
      });
  },
  selectors: {
    selectOrderInfo: (state: TOrderInfoState) => state.order,
    selectOrderInfoLoading: (state: TOrderInfoState) => state.isLoading,
    selectOrderInfoError: (state: TOrderInfoState) => state.error
  }
});

export const { clearOrderInfo } = orderInfoSlice.actions;

export const { selectOrderInfo, selectOrderInfoLoading, selectOrderInfoError } =
  orderInfoSlice.getSelectors((state: RootState) => state.orderInfo);

export default orderInfoSlice.reducer;
