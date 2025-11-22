import { getIngredientsApi } from '@api';
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { RootState } from '../../../services/store';

type TIngredientsState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TIngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const getIngredients = createAsyncThunk<
  TIngredient[],
  void,
  { rejectValue: string }
>('ingredients/getIngredients', async (_, { rejectWithValue }) => {
  try {
    const data = await getIngredientsApi();
    return data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error
        ? error.message
        : 'Не удалось загрузить ингредиенты'
    );
  }
});

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Не удалось загрузить ингредиенты';
      });
  },
  selectors: {
    selectIngredients: (state: TIngredientsState) => state.ingredients,
    selectIngredientsLoading: (state: TIngredientsState) => state.isLoading,
    selectIngredientsError: (state: TIngredientsState) => state.error,
    selectIngredientById: (
      state: TIngredientsState,
      id: string | undefined
    ): TIngredient | undefined =>
      id ? state.ingredients.find((ing) => ing._id === id) : undefined
  }
});

export const {
  selectIngredients,
  selectIngredientsLoading,
  selectIngredientsError,
  selectIngredientById
} = ingredientsSlice.getSelectors((state: RootState) => state.ingredients);
export default ingredientsSlice.reducer;
