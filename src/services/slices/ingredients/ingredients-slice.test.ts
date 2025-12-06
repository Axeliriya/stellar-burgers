import reducer, { getIngredients, initialState } from './ingredients-slice';
import { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '2',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  },
  {
    _id: '3',
    name: 'Соус с шипами Антарианского плоскоходца',
    type: 'sauce',
    proteins: 101,
    fat: 99,
    carbohydrates: 100,
    calories: 100,
    price: 88,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
  }
];

describe('[ingredientsSlice]', () => {
  it('должен возвращать initialState при неизвестном экшене', () => {
    const state = reducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });

  describe('getIngredients', () => {
    it('pending: isLoading = true, error = null', () => {
      const state = reducer(initialState, getIngredients.pending(''));

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.ingredients).toEqual([]);
    });

    it('fulfilled: сохраняет ингредиенты и isLoading = false', () => {
      const state = reducer(
        initialState,
        getIngredients.fulfilled(mockIngredients, '')
      );

      expect(state.isLoading).toBe(false);
      expect(state.ingredients).toEqual(mockIngredients);
      expect(state.error).toBeNull();
    });

    it('rejected: isLoading = false, сохраняет ошибку из payload', () => {
      const errorMessage = 'Network Error';
      const state = reducer(
        initialState,
        getIngredients.rejected(null, '', undefined, errorMessage)
      );

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.ingredients).toEqual([]);
    });

    it('rejected: использует сообщение по умолчанию, если payload пустой', () => {
      const state = reducer(
        initialState,
        getIngredients.rejected(null, '', undefined)
      );

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Не удалось загрузить ингредиенты');
    });
  });
});
