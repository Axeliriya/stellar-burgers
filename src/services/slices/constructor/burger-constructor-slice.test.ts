import reducer, {
  addConstructorIngredient,
  removeConstructorIngredient,
  moveUpConstructorIngredient,
  moveDownConstructorIngredient,
  clearConstructor,
  initialState
} from './burger-constructor-slice';
import { TIngredient } from '@utils-types';

const mockBun: TIngredient = {
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
};

const mockMain: TIngredient = {
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
};

const mockSauce: TIngredient = {
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
};

describe('[burgerConstructorSlice]', () => {
  it('должен корректно инициализироваться', () => {
    const state = reducer(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual(initialState);
  });

  it('должен добавлять булку через addConstructorIngredient', () => {
    const ingredientWithId = { ...mockBun, id: 'uuid-1' };
    const state = reducer(
      initialState,
      addConstructorIngredient(ingredientWithId)
    );

    expect(state.bun).toEqual(ingredientWithId);
    expect(state.ingredients).toEqual([]);
  });

  it('должен добавлять начинку через addConstructorIngredient', () => {
    const ingredientWithId = { ...mockMain, id: 'uuid-2' };
    const state = reducer(
      initialState,
      addConstructorIngredient(ingredientWithId)
    );

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(ingredientWithId);
    expect(state.bun).toBeNull();
  });

  it('должен удалять ингредиент из начинки по id', () => {
    const initial = {
      bun: null,
      ingredients: [
        { ...mockMain, id: 'uuid-1' },
        { ...mockSauce, id: 'uuid-2' },
        { ...mockMain, id: 'uuid-3' }
      ]
    };

    const state = reducer(initial, removeConstructorIngredient('uuid-2'));

    expect(state.ingredients).toHaveLength(2);
    expect(state.ingredients.map((i) => i.id)).toEqual(['uuid-1', 'uuid-3']);
  });

  it('должен перемещать элемент начинки вверх', () => {
    const initial = {
      bun: null,
      ingredients: [
        { ...mockMain, id: '1', name: 'Котлета' },
        { ...mockSauce, id: '2', name: 'Соус' },
        { ...mockMain, id: '3', name: 'Ещё котлета' }
      ]
    };

    const state = reducer(initial, moveUpConstructorIngredient(2));

    expect(state.ingredients[1].name).toBe('Ещё котлета');
    expect(state.ingredients[2].name).toBe('Соус');
  });

  it('должен перемещать элемент начинки вниз', () => {
    const initial = {
      bun: null,
      ingredients: [
        { ...mockMain, id: '1', name: 'Котлета' },
        { ...mockSauce, id: '2', name: 'Соус' },
        { ...mockMain, id: '3', name: 'Ещё котлета' }
      ]
    };

    const state = reducer(initial, moveDownConstructorIngredient(0));

    expect(state.ingredients[0].name).toBe('Соус');
    expect(state.ingredients[1].name).toBe('Котлета');
  });

  it('не должен ломаться при попытке переместить первый элемент вверх', () => {
    const initial = {
      bun: null,
      ingredients: [{ ...mockMain, id: '1', name: 'Первый' }]
    };

    const state = reducer(initial, moveUpConstructorIngredient(0));
    expect(state.ingredients[0].name).toBe('Первый');
  });

  it('не должен ломаться при попытке переместить последний элемент вниз', () => {
    const initial = {
      bun: null,
      ingredients: [{ ...mockMain, id: '1', name: 'Последний' }]
    };

    const state = reducer(initial, moveDownConstructorIngredient(0));
    expect(state.ingredients[0].name).toBe('Последний');
  });

  it('должен полностью очищать конструктор', () => {
    const filledState = {
      bun: { ...mockBun, id: 'bun-id' },
      ingredients: [
        { ...mockMain, id: '1' },
        { ...mockSauce, id: '2' }
      ]
    };

    const state = reducer(filledState as any, clearConstructor());
    expect(state).toEqual(initialState);
  });
});
