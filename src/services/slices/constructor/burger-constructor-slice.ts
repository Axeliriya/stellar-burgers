import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { TIngredient, TConstructorIngredient } from '@utils-types';
import { RootState } from '../../../services/store';

interface ConstructorState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addConstructorBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },
    addConstructorIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const ingredient = action.payload;
      if (ingredient.type === 'bun') {
        state.bun = ingredient;
      } else {
        state.ingredients.push(ingredient);
      }
    },
    removeConstructorIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ing) => ing.id !== action.payload
      );
    },
    moveUpConstructorIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0) {
        [state.ingredients[index - 1], state.ingredients[index]] = [
          state.ingredients[index],
          state.ingredients[index - 1]
        ];
      }
    },
    moveDownConstructorIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < state.ingredients.length - 1) {
        [state.ingredients[index], state.ingredients[index + 1]] = [
          state.ingredients[index + 1],
          state.ingredients[index]
        ];
      }
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    selectConstructorBun: (state: ConstructorState) => state.bun,
    selectConstructorIngredients: (state: ConstructorState) =>
      state.ingredients,
    selectConstructorItems: createSelector(
      [
        (state: ConstructorState) => state.bun,
        (state: ConstructorState) => state.ingredients
      ],
      (bun, ingredients) => ({
        bun,
        ingredients
      })
    )
  }
});

export const {
  selectConstructorBun,
  selectConstructorIngredients,
  selectConstructorItems
} = burgerConstructorSlice.getSelectors(
  (state: RootState) => state.burgerConstructor
);

export const {
  addConstructorBun,
  addConstructorIngredient,
  removeConstructorIngredient,
  moveUpConstructorIngredient,
  moveDownConstructorIngredient,
  clearConstructor
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
